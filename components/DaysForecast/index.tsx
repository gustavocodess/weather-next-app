import moment from 'moment'
import React from 'react'
import styles from './DaysForecast.module.css'

export interface ForecastItem {
  dt: number;
  fHour: string;
  fDayMon: string;
  main: {
    temp: number;
  }
}

interface ForecastMap<Item = ForecastItem> {
  [key: string]: [Item];
}

interface Props {
  data: [ForecastItem]
}

export const DaysForecast: React.FC<Props> = ({ data }) => {
  const fDateList = data.map((item: ForecastItem) => {
    const date = moment(item.dt * 1000).format('YYYY-MM-DD h:mma')
    return {
      ...item,
      fDate: date,
      fDay: date.split(' ')?.[0],
      fHour: date.split(' ')?.[1],
      fDayMon: moment(item.dt * 1000).format('DD MMM YY')
    }
  })

  const tableMap: ForecastMap = {}


  fDateList.map((item) => {
    if (tableMap[item.fHour]) {
      tableMap[item.fHour].push(item)
    } else {
      tableMap[item.fHour] = [item]
    } 
  })

  const firstHour = fDateList[0].fHour

  const headers = tableMap[firstHour].map((item) => item.fDayMon)

  function renderRow(key: string, index: number) {
    return (
      <div key={`row-${key}-${index}`} className={styles.rowContainer}>
        <h4 className={styles.rowText}>
          {key}
        </h4>
        {
          tableMap[key].map((item, index) => (
            <p
              style={{ flex: 1, textAlign: 'center' }}
              key={`${item.dt}-${index}`}
            >
              {item?.main?.temp} °C
            </p>
          ))
        }
      </div>
    )
  }

  return (
    <div>
      <h2>
        5 day / 3 hour forecast
      </h2>
      <div className={styles.headerContainer}>
        <div className={styles.header}>
          {headers.map((day) => (
            <h3 style={{ textAlign: 'center', flex: 1 }} key={`${day}-weatherDay`}>{day}</h3>
          ))}
        </div>
        {
          Object.keys(tableMap).map((key, i) => renderRow(key, i))
        }
      </div>
    </div>
  )
}

export default DaysForecast
