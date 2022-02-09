import { useEffect, useState, useContext } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'
import axios from 'axios'
import { NotificationCtx } from '../store/notification-ctx'
import TableContainer from '../components/UI/TableContainer'

const Schedule = () => {
  const alert = useContext(NotificationCtx)
  const [schedules, setSchedules] = useState([])
  useEffect(() => {
    axios.get('http://localhost:3000/api/schedules').then((res) => {
      setSchedules(res.data)
    })
  }, [])

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/api/schedules/${id}`).then((res) => {
      if (res.status === 204) {
        setSchedules(schedules.filter((schedule) => schedule.id !== id))
        alert.notify('success', 'The activity is deleted')
      } else {
        alert.notify('error', 'Error occured.')
      }
    })
  }
  const columns = [
    {
      field: 'col1',
      headerName: 'Date & Time',
      type: 'dateTime',
      valueGetter: ({ value }) => value && new Date(value),
      flex: 1,
    },
    { field: 'col2', headerName: 'Player', flex: 0.7 },
    { field: 'col3', headerName: 'Game', flex: 0.7 },
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      flex: 0.3,
      getActions: (params) => [
        <GridActionsCellItem
          onClick={() => handleDelete(params.id)}
          icon={<DeleteIcon />}
          label='Delete'
        />,
      ],
    },
  ]
  const rows = schedules.map((schedule) => {
    return {
      id: schedule.id,
      col1: schedule.dateTime,
      col2: schedule.player.username,
      col3: schedule.game.title,
    }
  })

  return (
    <TableContainer pageTitle='Schedules'>
      <DataGrid rows={rows} columns={columns} />
    </TableContainer>
  )
}

export default Schedule
