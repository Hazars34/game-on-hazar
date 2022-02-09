import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'

const TableContainer = ({ children, pageTitle }) => {
  return (
    <Stack spacing={2} p={4}>
      <Typography variant='h2'>{pageTitle}</Typography>
      <Box sx={{ height: '70vh', width: '100%' }}>{children}</Box>
    </Stack>
  )
}

export default TableContainer
