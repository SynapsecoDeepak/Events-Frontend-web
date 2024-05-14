// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const createData = (amPm, time, events) => {
  return { amPm, time, events }
}





const rows = [
  createData('PM', '12:50', 'Sam added a speaker for ABC Events'),
  createData('PM', '12:50', 'Sam added a speaker for ABC Events'),
  createData('PM', '12:50', 'Sam added a speaker for ABC Events'),
  createData('PM', '12:50', 'Sam added a speaker for ABC Events'),
]

const RecentActivities = () => {

  const recentActivities = useSelector((state) => state?.event?.recentActivities?.data);

  console.log('rescent activ',recentActivities)

  
  // const formatTimestamp = (timestamp) => {
  //   const date = new Date(timestamp);
  //   return date.toLocaleString(); // Adjust the locale based on your requirements
  // };


  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const formattedDate = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
    // const formattedTime = `${date.getHours()}:${('0' + date.getMinutes()).slice(-2)}`;
    return `${formattedDate}`;
  };

  return (
    <TableContainer style={{ height: 460, overflowY: 'auto' }}  component={Paper}>
      <Table sx={{  }} aria-label='simple table'>
        <TableHead>
          
        </TableHead>
        <TableBody>
          {recentActivities?.map(row => (
            <TableRow
              key={row?.activity_description}
              sx={{
                '&:last-of-type td, &:last-of-type th': {
                  border: 0
                }
              }}
            >
              <TableCell align='left' style={{width:'90%'}}>
                <div className='borderAMPM'>
              {/* <span className='primary-dash-title'>{formatTimestamp(row?.created_on)}</span> */}
              <br/>
               <span className='dashboard-title' style={{fontSize: '10px !important'}} >{formatTimestamp(row?.updated_on)}</span>
               </div>
              </TableCell>
              <TableCell align='left' style={{width:'10%'}} className='sub-title'>{row?.activity_description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default RecentActivities
