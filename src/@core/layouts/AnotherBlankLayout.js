// ** MUI Imports
import Box from '@mui/material/Box'
import Footer from './Footer'
import DrawerAppBar from './Header'


const BlankLayout2 = ({ children }) => {
  return (
    <>
    <DrawerAppBar/>
        <div style={{backgroundColor:"white !important", minHeight:'85vh'}}>{children}</div>
    <Footer/>
    </>
  )
}

export default BlankLayout2
