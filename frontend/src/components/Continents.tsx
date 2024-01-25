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
        onClick={() => getContinents()}
        style={{ display: data ? 'none' : 'block' }}
      >
        View All Continents
      </button>
      {!loading && data && (
        <div className="button-container">
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
      {showCountries && <Countries code={code} />}
    </div>
  )
}
