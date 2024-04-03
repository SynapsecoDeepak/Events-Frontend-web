import HomeOutline from 'mdi-material-ui/HomeOutline'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import ListIcon from '@mui/icons-material/List'
import InventoryIcon from '@mui/icons-material/Inventory';
import { useEffect, useState } from 'react'

const navigation = () => {

  const [userType,setUserType] = useState(null);

  // Retrieve user role from session


  useEffect(()=>{
    const userType = sessionStorage.getItem('userType')
      setUserType(userType)
  },[])

  const isAdmin = userType === 'admin'


  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/'
    },
    {
      title: 'Speaker',
      icon: AccountCogOutline,
      path: '/speaker'
    },
    {
      title: 'Sponsors',
      icon: AccountCogOutline,
      path: '/sponsors'
    },
    {
      title: 'Attendees',
      icon: AccountCogOutline,
      path: '/attendees'
    },
    {
      title: 'Registrations',
      icon: AccountCogOutline,
      path: '/registrations'
    },
    {
      title: 'Reports',
      icon: AccountCogOutline,
      path: '/reports'
    },
    {
      title: 'Analytics',
      icon: AccountCogOutline,
      path: '/analytics'
    },
    // Other navigation items
  ].filter(item => item.show !== false)
}

export default navigation
