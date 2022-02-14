import type { GetServerSidePropsContext, NextPage } from 'next'
import { useRouter } from 'next/router'
import { DaysForecast, HourlyForecast, InfoCard, Map } from '../../../components'

const Weather: NextPage = ({ hourlyCurrent, hourly5 }) => {
  const router = useRouter()
  const city = router.query.city as string

  // console.log('PROPS ', hourlyCurrent)
  return (
    <div>
      <div style={{ padding: 48, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <InfoCard
            {...hourlyCurrent.current}
            city={city}
          />

          <div style={{ display: 'flex', flexDirection: 'column', flex: 1.5 }}>
            <Map lat={hourlyCurrent?.lat} lng={hourlyCurrent?.lon} />
          </div>

        </div>

        <br />

        <DaysForecast
          data={hourly5.list}
        />

        <br />

        <div style={{ width: '100%' }}>
          <HourlyForecast
            data={hourlyCurrent?.hourly}
          />
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
  let hourly5 = {}

  if (locationData && locationData.length) {
    const lat = locationData[0].lat
    const lon = locationData[0].lon


    const res = await fetch(`https://api.openweathermap.org/data/2.5/onecall?units=metric&lat=${lat}&lon=${lon}&exclude=minutely&appid=${process.env.OPEN_WEATHER_KEY}`)
    weatherData = await res.json()

     // fetch 3 hour inrteval forecast for next 5 days
     const res1 = await fetch(`https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=${lat}&lon=${lon}&appid=${process.env.OPEN_WEATHER_KEY}`)
     hourly5 = await res1.json()
  }

  // Pass data to the page via props
  return { props: { hourlyCurrent: weatherData, hourly5 } }
}

export default Weather
