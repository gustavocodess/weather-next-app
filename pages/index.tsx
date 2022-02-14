
import { NextPage } from 'next'
import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import countriesData from '../data/countries'
import flagsData from '../data/flags'
import Button from '../components/Button'

const Home: NextPage = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>()
  const [selectedCity, setSelectedCity] = useState<string>()
  const [availableCities, setAvailableCities] = useState<Array<string>>([])

  const countries = countriesData.map((item) => item)

  const handleSetCities = (iso2: string) => {
    const cities = countries.find((country) => country.iso2 === iso2)?.cities || []
    setAvailableCities(cities)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        Hello World Weather

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
                {flagsData[country.iso2].emoji}
                {country.country}
              </option>
            ))
          }
        </select>

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
            <Button label="CHECK WEATHER" onClick={() => {}}/>
          )
        }


      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home
