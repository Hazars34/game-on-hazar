import { useEffect, useState, useContext } from "react"
import DeleteIcon from "@mui/icons-material/Delete"
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid"
import axios from "axios"
import { NotificationCtx } from "../store/notification-ctx"
import TableContainer from "../components/UI/TableContainer"

const Games = () => {
  const alert = useContext(NotificationCtx)
  const [games, setGames] = useState([])
  useEffect(() => {
    axios.get("http://localhost:4001/api/games").then((res) => {
      setGames(res.data)
    })
  }, [])

  const handleDelete = (id) => {
    axios.delete(`http://localhost:4001/api/games/${id}`).then((res) => {
      if (res.status === 204) {
        setGames(games.filter((game) => game.id !== id))
        alert.notify("success", "The game is deleted")
      } else {
        alert.notify("error", "Error occured.")
      }
    })
  }
  const columns = [
    {
      field: "col1",
      headerName: "Game Title",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      flex: 0.3,
      getActions: (params) => [
        <GridActionsCellItem
          onClick={() => handleDelete(params.id)}
          icon={<DeleteIcon />}
          label="Delete"
        />,
      ],
    },
  ]

  const rows = games.map((game) => {
    return {
      id: game.id,
      col1: game.title,
    }
  })

  return (
    <TableContainer pageTitle="Games">
      <DataGrid rows={rows} columns={columns} />
    </TableContainer>
  )
}

export default Games
