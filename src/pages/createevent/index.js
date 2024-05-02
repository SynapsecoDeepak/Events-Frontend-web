// ** MUI Imports
import Grid from '@mui/material/Grid'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Typography from '@mui/material/Typography'
import { useSelector } from 'react-redux'
import SearchInput from 'src/views/eventCreate/SearchInput'
import Table from 'src/views/eventCreate/Table'

const Event = () => {
  const router = useRouter()
  const state_token = useSelector((state) => state.auth.user?.userData?.token);


  useEffect(()=>{
    if (!state_token) {
      router.push("/login");
    }
  },[])

 
  
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid sx={{display:'flex'}} item xs={12} md={12}>
          <Typography variant='h6'  className='primary-dash-title' >
          Events
          </Typography>

         <SearchInput />
        </Grid>
        
        <Grid item xs={12}>
          <Table />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default Event
