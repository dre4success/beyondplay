import { useLazyQuery, useQuery } from '@apollo/client'
import { gql } from '../__generated__'

const GET_COUNTRIES = gql(/* GraphQL */ `
  query Countries($countriesFilter: CountryFilterInput) {
    countries(filter: $countriesFilter) {
      name
      languages {
        code
        name
      }
      capital
      emoji
      phones
    }
  }
`)

type CountriesProps = {
  code: string
}

export const Countries = ({ code }: CountriesProps) => {
  const { loading, data } = useQuery(GET_COUNTRIES, {
    variables: { countriesFilter: { continent: { in: [code] } } },
  })

  if (loading) return <p>Loading...</p>
  return (
    <div className="content-list-container">
      {data?.countries.map((country) => (
        <div key={country.name} className="item-card">
          <h4 className="item-name">{country.name}</h4>
          <p className="item-info">Flag: {country.emoji}</p>
          <p className="item-info">Dialling Code: {country.phones[0]}</p>
          <p className="item-info">Capital: {country.capital}</p>
          <div className="item-info">
            Languages:
            {country.languages?.map((language) => (
              <ul key={language.code} className="language">
                <li>{language.name}</li>
              </ul>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
