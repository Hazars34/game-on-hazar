import { useEffect, useState, useContext } from "react"
import DeleteIcon from "@mui/icons-material/Delete"
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid"
import axios from "axios"
import { NotificationCtx } from "../store/notification-ctx"
import Box from "@mui/material/Box"
import TableContainer from "../components/UI/TableContainer"

const Players = () => {
  const alert = useContext(NotificationCtx)
  const [players, setPlayers] = useState([])
  useEffect(() => {
    axios.get("http://localhost:4001/api/players").then((res) => {
      setPlayers(res.data)
    })
  }, [])

  const handleDelete = (id) => {
    axios.delete(`http://localhost:4001/api/players/${id}`).then((res) => {
      if (res.status === 204) {
        setPlayers(players.filter((player) => player.id !== id))
        alert.notify("success", "The player is deleted")
      } else {
        alert.notify("error", "Error occured.")
      }
    })
  }
  const columns = [
    {
      field: "col1",
      headerName: "First Name",
      flex: 1,
    },
    {
      field: "col2",
      headerName: "Last Name",
      flex: 1,
    },
    {
      field: "col3",
      headerName: "Username",
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

  const rows = players.map((player) => {
    return {
      id: player.id,
      col1: player.firstName,
      col2: player.lastName,
      col3: player.username,
    }
  })

  return (
    <TableContainer pageTitle="Players">
      <DataGrid rows={rows} columns={columns} />
    </TableContainer>
  )
}

export default Players
