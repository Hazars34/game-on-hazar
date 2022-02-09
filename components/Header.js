import { useState, Fragment, useEffect } from 'react'
import Link from 'next/link'
import MenuIcon from '@mui/icons-material/Menu'
import { useTheme } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'

const Header = () => {
  const [index, setIndex] = useState(2)
  const [openDrawer, setOpenDrawer] = useState(false)

  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'))
  const iOS =
    typeof navigator !== 'undefined' &&
    /iPad|iPhone|iPod/.test(navigator.userAgent)

  const indexChange = (newValue) => {
    setIndex(newValue)
  }
  const routes = [
    {
      name: 'Schedules',
      link: '/',
      activeIndex: 0,
    },
    { name: 'Players', link: '/players', activeIndex: 1 },
    {
      name: 'Games',
      link: '/games',
      activeIndex: 2,
    },
    {
      name: 'Add Data',
      link: '/add-data',
      activeIndex: 3,
    },
  ]

  const desktop = (
    <Stack direction='row' spacing={2} marginLeft='auto'>
      {routes.map((route) => (
        <Link href={route.link} key={route.activeIndex} passHref>
          <Button>{route.name}</Button>
        </Link>
      ))}
    </Stack>
  )

  const mobile = (
    <Fragment>
      <SwipeableDrawer
        onOpen={() => setOpenDrawer(true)}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
      >
        <Toolbar />
        <List disablePadding sx={{ color: 'secondary.main', fontWeight: 600 }}>
          {routes.map((route) => (
            <Link href={route.link} key={route.activeIndex} passHref>
              <ListItemButton
                onClick={() => {
                  indexChange(route.activeIndex)
                  setOpenDrawer(false)
                }}
                divider
                selected={index === route.activeIndex}
              >
                <ListItemText disableTypography>{route.name}</ListItemText>
              </ListItemButton>
            </Link>
          ))}
        </List>
      </SwipeableDrawer>
      <IconButton
        sx={{ marginLeft: 'auto' }}
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple
      >
        <MenuIcon sx={{ height: '40px', width: '40px' }} />
      </IconButton>
    </Fragment>
  )
  return (
    <AppBar
      position='sticky'
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <Typography variant='h3' color='primary'>
          GAME ON!
        </Typography>
        {matches ? mobile : desktop}
      </Toolbar>
    </AppBar>
  )
}

export default Header
