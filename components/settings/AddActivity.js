import { useState, useEffect, useContext } from "react"
import TextField from "@mui/material/TextField"
import Stack from "@mui/material/Stack"
import DateTimePicker from "@mui/lab/DateTimePicker"
import MenuItem from "@mui/material/MenuItem"
import FormCard from "../UI/FormCard"
import axios from "axios"
import { NotificationCtx } from "../../store/notification-ctx"

const AddActivity = () => {
  const [gameList, setGameList] = useState([])
  const [playerList, setPlayerList] = useState([])

  const [game, setGame] = useState("")
  const [player, setPlayer] = useState("")

  const [dateTime, setDateTime] = useState(Date.now())
  const alert = useContext(NotificationCtx)

  useEffect(() => {
    axios.get(`${process.env.URL}/api/games`).then((res) => {
      setGameList(res.data)
    })
    axios.get(`${process.env.URL}/api/players`).then((res) => {
      setPlayerList(res.data)
    })
  }, [])

  const submitForm = (e) => {
    e.preventDefault()
    const formData = {
      player: player,
      game: game,
      dateTime: dateTime,
    }
    axios
      .post(`${process.env.URL}/api/schedules`, formData)
      .then((res) => {
        alert.notify("success", "The activity's been added successfully")
      })
      .catch((e) => {
        alert.notify("error", e.response.data.error)
      })
  }
  return (
    <FormCard title="Add Activity" onSubmit={submitForm}>
      <Stack spacing={3}>
        <TextField
          fullWidth
          id="select-player"
          select
          label="Player"
          value={player}
          onChange={(e) => setPlayer(e.target.value)}
        >
          {playerList.map((player) => (
            <MenuItem key={player.id} value={player.id}>
              {`${player.firstName} ${player.lastName}`}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          fullWidth
          id="select-game"
          select
          label="Game"
          value={game}
          onChange={(e) => setGame(e.target.value)}
        >
          {gameList.map((game) => (
            <MenuItem key={game.id} value={game.id}>
              {game.title}
            </MenuItem>
          ))}
        </TextField>
        <DateTimePicker
          label="Date&Time picker"
          value={dateTime}
          ampm={false}
          ampmInClock={false}
          views={["day", "hours", "minutes"]}
          minutesStep={5}
          onChange={(newValue) => setDateTime(newValue)}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </FormCard>
  )
}

export default AddActivity
