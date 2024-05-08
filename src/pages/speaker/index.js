import Grid from '@mui/material/Grid'
import Table from 'src/views/speaker/Table'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Typography from '@mui/material/Typography'
import SearchInput from 'src/views/speaker/SearchInput'
import { useSelector } from 'react-redux'

const Speaker = () => {
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
          <Typography variant='h5'  className='primary-dash-title' >
          Speaker
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

export default Speaker
