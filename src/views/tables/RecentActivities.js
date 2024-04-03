// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'

const createData = (amPm, time, events) => {
  return { amPm, time, events }
}

const rows = [
  createData('PM', '12:50', 'Sam added a speaker for ABC Events'),
  createData('PM', '12:50', 'Sam added a speaker for ABC Events'),
  createData('PM', '12:50', 'Sam added a speaker for ABC Events'),
  createData('PM', '12:50', 'Sam added a speaker for ABC Events'),
  createData('PM', '12:50', 'Sam added a speaker for ABC Events'),
]

const RecentActivities = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{  }} aria-label='simple table'>
        <TableHead>
          
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow
              key={row.name}
              sx={{
                '&:last-of-type td, &:last-of-type th': {
                  border: 0
                }
              }}
            >
              <TableCell align='left' style={{width:'10%'}}>
                <div className='borderAMPM'>
              <span className='primary-dash-title'>{row.amPm}</span>
              <br/>
               <span className='dashboard-title' style={{fontSize: '15px !important'}} >{row.time}</span>
               </div>
              </TableCell>
              <TableCell align='left' style={{width:'90%'}} className='sub-title'>{row.events}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default RecentActivities
