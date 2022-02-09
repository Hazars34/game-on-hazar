import React, { useState, useContext } from 'react'

export const NotificationCtx = React.createContext({
  active: false,
  type: undefined,
  message: '',
  notify: (type, message) => {},
})

export const NotificationCtxProvider = (props) => {
  const [active, setActive] = useState(false)
  const [type, setType] = useState('success')
  const [message, setMessage] = useState('')

  const handleNotification = (type, message) => {
    setType(type)
    setMessage(message)
    setActive(true)
    setTimeout(() => setActive(false), 5000)
  }
  return (
    <NotificationCtx.Provider
      value={{
        active: active,
        type: type,
        message: message,
        notify: handleNotification,
      }}
    >
      {props.children}
    </NotificationCtx.Provider>
  )
}
