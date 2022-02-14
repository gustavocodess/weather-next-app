import React from 'react'
import { Button as EButton } from 'evergreen-ui'

export const Button: React.FC = ({ label = 'click me', onClick = () => {} }) => {
  return (
    <EButton
      size="large"
      appearance="primary"
      onClick={onClick}
      backgroundColor="#e96e50"
      borderColor="#e96e50"
    >
      {label}
    </EButton>
  )
}

export default Button
