import { useState } from 'react'
import './App.css'
import { Continents } from './components/Continents'
import { StarWarsFilms } from './components/StarWars'
import { VisibleComponent } from './utils/type'

function App() {
  const [visibleComponent, setVisibleComponent] = useState<VisibleComponent>()
  return (
    <div className="App">
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
  )
}

export default App
