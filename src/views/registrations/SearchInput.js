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
import { useRouter } from 'next/router'
// import { Chip } from '@mui/material-next'
// import { Chip } from '@mui/material-next'




const SearchInput = () => {
    const router = useRouter()
  return (
    <Box sx={{display:'flex',alignItems:'center',justifyContent:'space-between',width:'100%'}}>
    <Box sx={{display:'flex',alignItems:'center',width:400,height:40,borderRadius:40,marginLeft:20, paddingLeft:4,paddingRight:4, background:'#fff'}}>
    <img width={20} height={20} style={{marginRight:10}} alt='paypal' src='/search_icon.svg' />
      <input style={{border:'none',width:'100%'}} type="text" placeholder='Search speaker name and organization'/>
    </Box>
    <Box  sx={{display:'flex',alignItems:'center'}}>
    <img width={20} height={20} style={{marginRight:10}} alt='paypal' src='/page_one.svg' />
    <img width={20} height={20} style={{marginRight:10}} alt='paypal' src='/page_two.svg' />
    </Box>
    </Box>
  )
}

export default SearchInput