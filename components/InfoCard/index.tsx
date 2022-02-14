import React from 'react'
import { FaWind } from 'react-icons/fa'
import moment from 'moment'
import styles from './InfoCard.module.css'

export const InfoCard: React.FC = ({
  city,
  temp,
  feels_like,
  wind_speed,
  humidity,
  dew_point,
  dt }) => {

  return (
    <div className={styles.container}>
      <h3 style={{ marginBottom: 0 }}>
        Now at
        <span style={{ marginLeft: 4, marginRight: 4 }}>
          {(String(city)).split('-')[0].toUpperCase()},
        </span>
        {(String(city)).split('-')[1].toUpperCase()}
      </h3>
      <h2>{temp.toFixed(0)} °C</h2>
      <p style={{ fontSize: 14 }}>
        Feels like {feels_like.toFixed(0)} °C.
      </p>
      <p>
        <FaWind size={14} />
        <span style={{ marginLeft: 6 }}>{wind_speed} m/s</span>
      </p>
      <p>
        Humidity: {humidity}%
      </p>
      <p>
        Dew point: {dew_point.toFixed(0)} °C.
      </p>
      <br />
      <p style={{ fontSize: 12 }}>
        Last updated:
      </p>
      <p style={{ fontSize: 12 }}>
        {moment(dt * 1000).format('DD/MM/YYYY HH:mm:ss')}
      </p>
    </div>
  )
}

export default InfoCard
