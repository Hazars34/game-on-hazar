import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'

const FormCard = ({ title, onSubmit, children }) => {
  return (
    <Card sx={{ p: 4 }} variant='outlined'>
      <form onSubmit={onSubmit}>
        <CardHeader title={title} titleTypographyProps={{ variant: 'h2' }} />
        <CardContent>{children}</CardContent>
        <CardActions>
          <Button type='submit' sx={{ marginLeft: 'auto' }} variant='contained'>
            Save Changes
          </Button>
        </CardActions>
      </form>
    </Card>
  )
}

export default FormCard
