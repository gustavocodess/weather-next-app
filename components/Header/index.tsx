import React from 'react'
import { FaCloudMoonRain } from 'react-icons/fa'
import styles from './Header.module.css'

const Header: React.FC = () => {
  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.title}>World Weather App</h1>
        <h5
          className={styles.subTitle}
        >Worldwide weather forecast live.</h5>
      </div>
      <FaCloudMoonRain size={72} color="#e96e50" />
    </div>
  )
}

export default Header
