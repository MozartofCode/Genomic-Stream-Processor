use pyo3::prelude::*;
use rand::Rng;
use std::sync::{Arc, atomic::{AtomicBool, Ordering}};
use tokio::time::{sleep, Duration};

/// A Python module implemented in Rust.
#[pymodule]
fn rust_producer(_py: Python, m: &PyModule) -> PyResult<()> {
    m.add_class::<Producer>()?;
    Ok(())
}

#[pyclass]
struct Producer {
    running: Arc<AtomicBool>,
    throttled: Arc<AtomicBool>,
}

#[pymethods]
impl Producer {
    #[new]
    fn new() -> Self {
        Producer {
            running: Arc::new(AtomicBool::new(false)),
            throttled: Arc::new(AtomicBool::new(false)),
        }
    }

    /// Start generating sequences.
    /// `callback`: A Python function to call with each generated sequence.
    fn start(&mut self, callback: PyObject) -> PyResult<()> {
        let running = self.running.clone();
        let throttled = self.throttled.clone();
        
        running.store(true, Ordering::SeqCst);

        // Spawn a tokio runtime on a new thread to avoid blocking Python GIL
        std::thread::spawn(move || {
            let rt = tokio::runtime::Runtime::new().unwrap();
            rt.block_on(async {
                let mut rng = rand::thread_rng();
                let bases = [b'A', b'C', b'G', b'T'];

                while running.load(Ordering::SeqCst) {
                    if throttled.load(Ordering::SeqCst) {
                        sleep(Duration::from_millis(100)).await; // Slow down when throttled
                        continue;
                    }

                    let seq_len = rng.gen_range(50..200);
                    let seq: String = (0..seq_len)
                        .map(|_| bases[rng.gen_range(0..4)] as char)
                        .collect();

                    // Acquire GIL to call Python callback
                    Python::with_gil(|py| {
                        if let Err(e) = callback.call1(py, (seq,)) {
                            eprintln!("Error calling implementation callback: {}", e);
                            running.store(false, Ordering::SeqCst); // Stop on error
                        }
                    });

                    // Simulate high throughput
                    sleep(Duration::from_millis(10)).await;
                }
            });
        });

        Ok(())
    }

    fn stop(&mut self) {
        self.running.store(false, Ordering::SeqCst);
    }

    fn set_throttle(&mut self, throttle: bool) {
        self.throttled.store(throttle, Ordering::SeqCst);
    }
}
