// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import TrendingUp from 'mdi-material-ui/TrendingUp'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import CellphoneLink from 'mdi-material-ui/CellphoneLink'
import AccountOutline from 'mdi-material-ui/AccountOutline'

const salesData = [
  {
    stats: '4',
    title: 'Events',
    icon: <img src={'/flag.svg'}/>
  },
  {
    stats: '500',
    title: 'Attendees',
    icon: <img src={'/teams.svg'}/>
  },
  {
    stats: '480',
    title: 'Check-ins',
    icon: <img src={'/checkins.svg'}/>
  },
  {
    stats: '10',
    title: 'Exhibitors',
    icon: <img src={'/circus.svg'}/>
  },
  {
    stats: '5',
    title: 'Speakers',
    icon: <img src={'/spaeker.svg'}/>
  },
  {
    stats: '3',
    title: 'Sponsors',
    icon: <img src={'/sponsar.svg'}/>
  },
]

const renderStats = () => {
  return salesData.map((item, index) => (
    <Grid item xs={12} sm={3} key={index} sx={{minWidth: '50px', textAlign: 'center'}}>
      <Box key={index} sx={{ display: 'block', alignItems: 'center' }}>
          {item.icon}
          <Typography variant='body2' className='dashboard-title'>
            {item.stats}
          </Typography>
          <Typography variant='body2'>
            {item.title}
          </Typography>
      </Box>
    </Grid>
  ))
}

const StatisticsCard = () => {
  return (
    <Card>
      <CardContent sx={{ width: '100% !important', display: 'flex' }}>
        {/* <Grid container sx={{width: '100%'}} > */}
          {renderStats()}
        {/* </Grid> */}
      </CardContent>
    </Card>
  )
}

export default StatisticsCard
