import React from 'react'
import Drawer from '@mui/material/Drawer'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Toolbar from '@mui/material/Toolbar'

const SettingsDrawer = ({ subroutes, index, onChange }) => {
  return (
    <Drawer
      sx={{
        display: 'flex',
        width: 180,
        boxSizing: 'border-box',
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 180,
          boxSizing: 'border-box',
        },
      }}
      ModalProps={{
        keepMounted: true,
      }}
      anchor='left'
      variant='permanent'
      open={true}
    >
      <Toolbar />
      <Tabs
        orientation='vertical'
        value={index}
        onChange={onChange}
        aria-label='Vertical tabs example'
        sx={{ borderRight: 1, borderColor: 'divider', my: 4 }}
      >
        {subroutes.map((route) => (
          <Tab
            sx={{ fontSize: '1.125rem' }}
            key={route.id}
            label={route.label}
            value={route.id}
          />
        ))}
      </Tabs>
    </Drawer>
  )
}

export default SettingsDrawer
