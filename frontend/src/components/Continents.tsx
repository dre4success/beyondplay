import React from 'react'
import { gql } from '../__generated__'
import { useLazyQuery, useQuery } from '@apollo/client'
import { Countries } from './Countries'
import { VisibleComponent } from '../utils/type'

const GET_CONTINENTS = gql(/* GraphQL */ `
  query Continents {
    continents {
      code
      name
    }
  }
`)
type ContinentsProps = {
  visibleComponent: VisibleComponent | undefined
  setVisibleComponent: (value: VisibleComponent) => void
}
export const Continents = ({
  visibleComponent,
  setVisibleComponent,
}: ContinentsProps) => {
  const [getContinents, { loading, data }] = useLazyQuery(GET_CONTINENTS)
  const [showCountries, setShowCountries] = React.useState(false)
  const [code, setCode] = React.useState('')

  return (
    <div>
      <button
        className="button"
        onClick={() => {
          getContinents()
          setVisibleComponent('continents')
        }}
        style={{
          display: data && visibleComponent !== 'starWars' ? 'none' : 'flex',
        }}
      >
        View All Continents
      </button>
      {!loading && data && (
        <div
          style={{
            display: visibleComponent === 'starWars' ? 'none' : 'flex',
          }}
          className="button-container"
        >
          {data.continents.map((continent) => (
            <React.Fragment key={continent.code}>
              <button
                className={`button ${code === continent.code ? 'active' : ''}`}
                onClick={() => {
                  setShowCountries(true)
                  setCode(continent.code)
                }}
              >
                {continent.name}
              </button>
            </React.Fragment>
          ))}
        </div>
      )}
      {showCountries && visibleComponent !== 'starWars' && (
        <Countries code={code} />
      )}
    </div>
  )
}
