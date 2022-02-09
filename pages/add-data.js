import { useState, Fragment } from 'react'
import SettingsDrawer from '../components/SettingsDrawer'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'

import AddGame from '../components/settings/AddGame'
import AddPlayer from '../components/settings/AddPlayer'
import AddActivity from '../components/settings/AddActivity'

const settings = () => {
  const [index, setIndex] = useState(0)

  const handleChange = (event, newValue) => {
    setIndex(newValue)
  }

  const subroutes = [
    {
      id: 0,
      label: 'Add Game',
      component: <AddGame />,
    },
    {
      id: 1,
      label: 'Add Player',
      component: <AddPlayer />,
    },
    {
      id: 2,
      label: 'Add Activity',
      component: <AddActivity />,
    },
  ]

  return (
    <Box display='flex'>
      <SettingsDrawer
        subroutes={subroutes}
        index={index}
        onChange={handleChange}
      />
      <Box m={4} flexGrow={1}>
        <Container maxWidth='md'>
          {subroutes.map((route) => (
            <Fragment key={route.id}>
              {route.id === index && route.component}
            </Fragment>
          ))}
        </Container>
      </Box>
    </Box>
  )
}

export default settings
