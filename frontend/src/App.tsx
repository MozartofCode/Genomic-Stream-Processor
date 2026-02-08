
import Dashboard from './components/Dashboard'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <main className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col overflow-hidden">
          <Dashboard />
        </div>
        <Sidebar />
      </main>
      <Footer />
    </>
  )
}

export default App
