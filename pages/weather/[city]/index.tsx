import type { GetServerSidePropsContext, NextPage } from 'next'
import { useRouter } from 'next/router'
import { InfoCard } from '../../../components'

const Weather: NextPage = ({ hourlyCurrent }) => {
  const router = useRouter()
  const city = router.query.city as string

  console.log('PROPS ', hourlyCurrent)
  return (
    <div>
      <div style={{ padding: 48, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <InfoCard
            {...hourlyCurrent.current}
            city={city}
          />

          <div style={{ display: 'flex', flexDirection: 'column', flex: 1.5 }} />

        </div>
      </div>
    </div>
  )
}

// This gets called on every request
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const geolocation = context?.params?.city
  // Fetch data from external API
  const latLngRes = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${geolocation}&limit=1&appid=da5a958486de063288bb276060c81907`)
  const locationData = await latLngRes.json()
  let weatherData = {}

  if (locationData && locationData.length) {
    const lat = locationData[0].lat
    const lon = locationData[0].lon


    const res = await fetch(`https://api.openweathermap.org/data/2.5/onecall?units=metric&lat=${lat}&lon=${lon}&exclude=minutely&appid=${process.env.OPEN_WEATHER_KEY}`)
    weatherData = await res.json()
  }

  // Pass data to the page via props
  return { props: { hourlyCurrent: weatherData } }
}

export default Weather
