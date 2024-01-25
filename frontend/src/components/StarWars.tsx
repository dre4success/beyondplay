import { useQuery } from '@apollo/client'
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
  const [showFilms, setShowFilms] = useState(false)
  const [authScreenVisible, setAuthScreenVisible] = useState(false)

  const jwtToken = localStorage.getItem('jwtToken')

  const handleShowFilms = () => {
    if (jwtToken) {
      setShowFilms(true)
    } else {
      setAuthScreenVisible(true)
    }
  }

  const { loading, data } = useQuery(STAR_WARS_FILMS)
  if (loading) return <p>Loading...</p>
  return (
    <div>
      <button
        className="button"
        onClick={() => handleShowFilms()}
        style={{ display: data ? 'none' : 'block' }}
      >
        View Star Wars Films
      </button>
      <div className="country-list-container">
        {data?.allFilms?.films?.map((film) => (
          <div key={film?.title} className="item-card">
            <h4 className="item-name">{film?.title}</h4>
            <p className="item-info">Director: {film?.director}</p>
            <p className="item-info">Release Date: {film?.releaseDate}</p>
          </div>
        ))}
      </div>
      {authScreenVisible && (
        <Auth
          authScreenVisible={authScreenVisible}
          setAuthScreenVisible={setAuthScreenVisible}
        />
      )}
    </div>
  )
}
