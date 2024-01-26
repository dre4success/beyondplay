import { useLazyQuery, useQuery } from '@apollo/client'
import { gql } from '../__generated__'
import { useState } from 'react'
import { Auth } from './Auth'
import { VisibleComponent } from '../utils/type'

const STAR_WARS_FILMS = gql(/* GraphQL */ `
  query AllFims {
    allFilms {
      films {
        director
        releaseDate
        title
      }
    }
  }
`)

type StarWarsFilmsProps = {
  visibleComponent: VisibleComponent | undefined
  setVisibleComponent: (value: VisibleComponent) => void
}
export const StarWarsFilms = ({
  setVisibleComponent,
  visibleComponent,
}: StarWarsFilmsProps) => {
  const [authScreenVisible, setAuthScreenVisible] = useState(false)
  const [getFilms, { loading, data }] = useLazyQuery(STAR_WARS_FILMS)

  const jwtToken = localStorage.getItem('jwtToken')

  const handleShowFilms = () => {
    setVisibleComponent('starWars')
    if (jwtToken) {
      getFilms()
    } else {
      setAuthScreenVisible(true)
    }
  }

  if (loading) return <p>Loading...</p>
  return (
    <div>
      <button
        className="button"
        onClick={() => handleShowFilms()}
        style={{
          display: data && visibleComponent !== 'continents' ? 'none' : 'flex',
        }}
      >
        View Star Wars Films
      </button>
      <div
        style={{
          display: visibleComponent === 'continents' ? 'none' : 'flex',
        }}
        className="content-list-container"
      >
        {data?.allFilms?.films?.map((film) => (
          <div key={film?.title} className="item-card">
            <h4 className="item-name">{film?.title}</h4>
            <p className="item-info">Director: {film?.director}</p>
            <p className="item-info">Release Date: {film?.releaseDate}</p>
          </div>
        ))}
      </div>
      {authScreenVisible && visibleComponent !== 'continents' && (
        <Auth
          authScreenVisible={authScreenVisible}
          setAuthScreenVisible={setAuthScreenVisible}
        />
      )}
    </div>
  )
}
