import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import countriesData from '../data/countries'
import flagsData from '../data/flags'
import { Button, Layout } from '../components'

interface Country {
  iso2: string;
  cities: string[];
  country: string;
}
interface Flag {
  emoji: string;
}

interface FlagMap<T = Flag> {
  [key: string]: T;
}

const Home: NextPage = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>()
  const [selectedCity, setSelectedCity] = useState<string>()
  const [availableCities, setAvailableCities] = useState<Array<string>>([])

  const countries = countriesData.map((item: Country) => item)

  const flags = flagsData as FlagMap

  const handleSetCities = (iso2: string) => {
    const cities = countries.find((country) => country.iso2 === iso2)?.cities || []
    setAvailableCities(cities)
  }

  useEffect(() => {

  }, [selectedCountry, selectedCity])

  return (
    <div className={styles.container}>
      <Layout>
        <main className={styles.main}>
          <h4 className={styles.title}>
            Select a country
          </h4>
          <br />
          <div>
            <select
                name="countries_select"
                value={selectedCountry}
                onChange={(e) => {
                  setSelectedCountry(e.target.value)
                  handleSetCities(e.target.value)
                  setSelectedCity(undefined)
                }}
                defaultValue=""
                style={{ fontSize: 26, lineHeight: 26 }}
              >
                {
                  countries.map((country) => (
                    <option value={country.iso2} key={country.iso2} style={{ display: 'flex', flexDirection: 'row' }}>
                      {flags[country.iso2].emoji}
                      {country.country}
                    </option>
                  ))
                }
            </select>
          </div>
          
          <br />
          <br />
          {
            selectedCountry && (
              <>
              <p className={styles.title}>
                Select a city
              </p>
              <br />
              <div>
                <select
                  name="cities_select"
                  value={selectedCity}
                  onChange={(e) => {
                    setSelectedCity(e.target.value)
                  }}
                  defaultValue=""
                  style={{ fontSize: 26, lineHeight: 26 }}
                >
                  {
                    availableCities.map((city: string) => (
                      <option value={city} key={city}>
                        {city}
                      </option>
                    ))
                  }
                </select>
              </div>
              </>
            )
          }

          {
            selectedCountry && selectedCity && (
              <a style={{ marginTop: 26 }} href={`/weather/${selectedCity}-${selectedCountry}`.toLowerCase()}>
                <Button label="CHECK WEATHER" onClick={() => {}}/>
              </a>
            )
          }

        </main>
      </Layout>

    </div>
  )
}

export default Home
