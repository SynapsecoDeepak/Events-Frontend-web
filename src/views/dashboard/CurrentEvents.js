// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'

const rows = [
  {
   title: 'Climate Change Conference',
   schedule: '21 Dec - 31 Dec 2003',
   attendeed: 500
  },
  {
    title: 'Climate Change Conference',
    schedule: '21 Dec - 31 Dec 2003',
    attendeed: 500
   },
  {
    title: 'Climate Change Conference',
    schedule: '21 Dec - 31 Dec 2003',
    attendeed: 500
   },
  {
    title: 'Climate Change Conference',
    schedule: '21 Dec - 31 Dec 2003',
    attendeed: 500
   },
]

const statusObj = {
  applied: { color: 'info' },
  rejected: { color: 'error' },
  current: { color: 'primary' },
  resigned: { color: 'warning' },
  professional: { color: 'success' }
}

const CurrentEvents = () => {
  return (
    <Card>
      <TableContainer>
      {/* <Typography variant='h6' className='dahboard-title'>Current Events</Typography> */}
        <Table sx={{ }} aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              <TableCell>Event Title</TableCell>
              <TableCell>Schedule</TableCell>
              <TableCell>Attendees</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow hover key={row.name} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{row.title}</Typography>
                  </Box>
                </TableCell>
                <TableCell className='dashboard-title' style={{fontSize: '13px !important'}}>{row.schedule}</TableCell>
                <TableCell>{row.attendeed}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default CurrentEvents
