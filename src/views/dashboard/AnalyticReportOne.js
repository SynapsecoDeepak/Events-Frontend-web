// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import Poll from 'mdi-material-ui/Poll'
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'
import LinearProgress from '@mui/material/LinearProgress'

const data = [
  {
    sales: 'Day',
    trendDir: 'up',
    subtitle: 'USA',
    title: '$8,656k',
    avatarText: 'US',
    trendNumber: '25.8%',
    avatarColor: 'success',
    trend: <ChevronUp sx={{ color: 'success.main', fontWeight: 600 }} />
  },
  {
    sales: 'Week',
    subtitle: 'UK',
    trendDir: 'down',
    title: '$2,415k',
    avatarText: 'UK',
    trendNumber: '6.2%',
    avatarColor: 'error',
    trend: <ChevronDown sx={{ color: 'error.main', fontWeight: 600 }} />
  },
  {
    sales: 'Month',
    title: '$865k',
    trendDir: 'up',
    avatarText: 'IN',
    subtitle: 'India',
    trendNumber: '12.4%',
    avatarColor: 'warning',
    trend: <ChevronUp sx={{ color: 'success.main', fontWeight: 600 }} />
  },
  {
    sales: 'Year',
    title: '$745k',
    trendDir: 'down',
    avatarText: 'JA',
    subtitle: 'Japan',
    trendNumber: '11.9%',
    avatarColor: 'secondary',
    trend: <ChevronDown sx={{ color: 'error.main', fontWeight: 600 }} />
  },
  {
    sales: '42k',
    title: '$45k',
    trendDir: 'up',
    avatarText: 'KO',
    subtitle: 'Korea',
    trendNumber: '16.2%',
    avatarColor: 'error',
    trend: <ChevronUp sx={{ color: 'success.main', fontWeight: 600 }} />
  }
]

const AnalyticReportOne = () => {
  return (
    <Card>
      <CardHeader
        title='Analytic Report 1'
        titleTypographyProps={{ sx: { lineHeight: '1.2 !important', letterSpacing: '0.31px !important' } }}
        action={
          <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
            <DotsVertical />
          </IconButton>
        }
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(2)} !important` }}>
        {data.map((item, index) => {
          return (
            <Box
              key={item.title}
              sx={{
                display: 'flex',
                alignItems: 'center',
                ...(index !== data.length - 1 ? { mb: 5.875 } : {})
              }}
            >
              <Box sx={{ display: 'flex', textAlign: 'start', flexDirection: 'column' }}>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.875rem', lineHeight: 1.72, letterSpacing: '0.22px' }}>
                    {item.sales}
                  </Typography>
                  <Typography variant='caption' sx={{ lineHeight: 1.5 }}>
                    Analytics
                  </Typography>
                </Box>
                <div>
                <LinearProgress color={'info'} value={200} variant='determinate' />
             </div>
                <Box>
                <LinearProgress color={'info'} value={200} variant='determinate' />

                {/* <Avatar sx={{ boxShadow: 3, marginRight: 4, color: 'common.white', backgroundColor: `grey` }}>
                  <Poll/>
                </Avatar> */}
                
              </Box>
              <LinearProgress color={'info'} value={200} variant='determinate' />
              <LinearProgress color={'info'} value={200} variant='determinate' />
              <LinearProgress color={'info'} value={200} variant='determinate' />

              {/* <Avatar
                sx={{
                  width: 38,
                  height: 38,
                  marginRight: 3,
                  fontSize: '1rem',
                  color: 'common.white',
                  backgroundColor: `${item.avatarColor}.main`
                }}
              >
                {item.avatarText}
              </Avatar> */}

            </Box>
          )
        })}
      </CardContent>
    </Card>
  )
}

export default AnalyticReportOne
