import { useState } from 'react'
import './App.css'
import { Continents } from './components/Continents'
import { StarWarsFilms } from './components/StarWars'
import { VisibleComponent } from './utils/type'

function App() {
  const [visibleComponent, setVisibleComponent] = useState<VisibleComponent>()
  const jwtToken = localStorage.getItem('jwtToken')
  const handleLogout = () => {
    localStorage.removeItem('jwtToken')
    window.location.reload()
  }
  return (
    <div>
      <div className="App">
        {jwtToken && (
          <button className="button logout" onClick={handleLogout}>
            Logout
          </button>
        )}

        <div className="Header">
          <Continents
            setVisibleComponent={setVisibleComponent}
            visibleComponent={visibleComponent}
          />
          <StarWarsFilms
            setVisibleComponent={setVisibleComponent}
            visibleComponent={visibleComponent}
          />
        </div>
      </div>
    </div>
  )
}

export default App
