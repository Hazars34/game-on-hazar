import { useContext } from 'react'
import Alert from '@mui/material/Alert'
import { NotificationCtx } from '../../store/notification-ctx'

const Notification = () => {
  const ctx = useContext(NotificationCtx)
  if (ctx.active) {
    return (
      <Alert
        sx={{ position: 'absolute', zIndex: 40000, bottom: 32, right: 32 }}
        severity={ctx.type}
      >
        {ctx.message}
      </Alert>
    )
  } else return null
}

export default Notification
