import moment from 'moment'
import React from 'react'
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts'
import useDimensions from '../../hooks/useDimensions'
import styles from './HourlyForecast.module.css'

interface WeatherItem {
  dt: number;
  temp: number;
  wind_speed: number;
}

interface Props {
  data: [WeatherItem];
}

export const HourlyForecast: React.FC<Props> = ({ data }) => {
  const size = useDimensions()
  const dayData = data.slice(0, 24)
  const temps = dayData.map((item) => ({
    time: moment(item.dt * 1000).format('h:mma'),
    temp: item.temp,
    fTemp: `${item.temp}°C`,
    wind: item.wind_speed,
  }))

  return (
    <div>
      <h3>Hourly Forecast</h3>
      <div className={styles.container}>
        <ComposedChart
          width={Number(size.width) - 120}
          height={400}
          data={temps}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <XAxis
            dataKey="time"
            label={{ value: 'Hour of day', position: 'insideBottom', offset: -16 }}
          />
          <YAxis label={{ value: 'Temperature in °C.', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Bar dataKey="wind" barSize={20} fill="#413ea0" />
          <Line type="monotoneY" dataKey="temp" stroke="#ff7300" />
        </ComposedChart>
      </div>
    </div>
  )
}

export default HourlyForecast
