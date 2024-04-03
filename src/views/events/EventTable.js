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
// import { Chip } from '@mui/material-next'
// import { Chip } from '@mui/material-next'

const rows = [
 
 
  {
    date:"15 Jan 2024",
    name: 'Task name here',
    time: '10.00 AM',
   
  },
  {
    date: "15 Jan 2024",
    name: 'Task name here',
    time: '12.00 PM',
   
  },
  
]

const statusObj = {
  Active: { color: 'success'},
  Inactive: { color: '#E2B675' },

}

const EventTable = () => {
  return (
    <Card sx={{marginTop:10,padding:2 }}>
        <Typography variant="h6" className="primary-dash-title" style={{margin:10,fontSize:20}}>
        Pending Task
        </Typography>
      <TableContainer>
        <Table sx={{ minWidth: 690}} aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              <TableCell style={{color:'#000000',fontWeight:'bold'}}>Task Name</TableCell>
              <TableCell style={{color:'#000000',fontWeight:'bold'}}>Time</TableCell>
              <TableCell style={{color:'#000000',fontWeight:'bold'}}>Date</TableCell>
             
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow hover key={row.name} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                
                <TableCell  style={{color:'#6A6A6A'}}>{row.name}</TableCell>
                <TableCell style={{color:'#2BACE2'}}>
                  {row.time}
                  {/* <Chip
                    label={row.status}
                    color={statusObj[row.status].color}
                    sx={{
                      height: 24,
                      fontSize: '0.75rem',
                      textTransform: 'capitalize',
                      '& .MuiChip-label': { fontWeight: 500 }
                    }}
                  /> */}
                  {/* <Chip label={row.status} color={statusObj[row.status].color}/> */}
                </TableCell>
                <TableCell  style={{color:'#6A6A6A'}}>{row.date}</TableCell>
               
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default EventTable
