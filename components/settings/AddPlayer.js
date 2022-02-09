import { useState, useContext } from 'react'
import { NotificationCtx } from '../../store/notification-ctx'
import FormCard from '../UI/FormCard'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import axios from 'axios'

const AddPlayer = () => {
  const [enteredFirstName, setEnteredFirstName] = useState('')
  const [enteredLastName, setEnteredLastName] = useState('')
  const [enteredUsername, setEnteredUsername] = useState('')
  const ctx = useContext(NotificationCtx)

  const submitForm = (e) => {
    e.preventDefault()
    const formData = {
      firstName: enteredFirstName,
      lastName: enteredLastName,
      username: enteredUsername,
    }
    axios
      .post('http://localhost:3000/api/players', formData)
      .then((res) => {
        if (res.status === 201) {
          ctx.notify('success', "The player's been added successfully.")
          setEnteredFirstName('')
          setEnteredLastName('')
          setEnteredUsername('')
        }
      })
      .catch((e) => {
        ctx.notify('error', e.response.data.error)
      })
  }

  return (
    <FormCard title='Add Player' onSubmit={submitForm}>
      <Grid container rowSpacing={3} columnSpacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id='first-name'
            label='First Name'
            variant='outlined'
            value={enteredFirstName}
            onChange={(e) => setEnteredFirstName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id='last-name'
            label='Last Name'
            variant='outlined'
            value={enteredLastName}
            onChange={(e) => setEnteredLastName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id='username'
            label='Username'
            variant='outlined'
            value={enteredUsername}
            onChange={(e) => setEnteredUsername(e.target.value)}
          />
        </Grid>
      </Grid>
    </FormCard>
  )
}

export default AddPlayer
