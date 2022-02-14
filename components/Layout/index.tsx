import React from 'react'
import Footer from '../Footer'
import Header from '../Header'

export const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default Layout
