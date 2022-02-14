import React from 'react'
import styles from './Footer.module.css'

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <a
        href="https://www.linkedin.com/in/gustavo-garcia-it/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by{' '}
        <span className={styles.logo}>
          Gustavo Garcia
        </span>
      </a>
    </footer>
  )
}

export default Footer
