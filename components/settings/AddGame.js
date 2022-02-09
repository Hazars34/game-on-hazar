import { useState, useContext } from 'react'
import axios from 'axios'
import TextField from '@mui/material/TextField'
import FormCard from '../UI/FormCard'
import { NotificationCtx } from '../../store/notification-ctx'

const AddGame = () => {
  const [title, setTitle] = useState('')
  const ctx = useContext(NotificationCtx)

  const submitForm = (event) => {
    event.preventDefault()
    const gameData = { title: title }
    axios
      .post('http://localhost:3000/api/games', gameData)
      .then((res) => {
        if (res.status === 201) {
          ctx.notify('success', "The game's been added successfully.")
          setTitle('')
        }
      })
      .catch((e) => {
        ctx.notify('error', e.response.data.error)
      })
  }
  return (
    <FormCard title='Add Game' onSubmit={submitForm}>
      <TextField
        onChange={(event) => setTitle(event.target.value)}
        value={title}
        id='game-title'
        label='Title'
        fullWidth
        variant='outlined'
      />
    </FormCard>
  )
}

export default AddGame
