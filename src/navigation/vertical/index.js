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
      sectionTitle: 'Create Event page'
    },
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/'
    },
    {
      title: 'Event Page',
      icon: HomeOutline,
      path: '/createevent'
    },
    {
      sectionTitle: 'List'
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

    // {
    //   title: 'Analytics',
    //   icon: AccountCogOutline,
    //   path: '/analytics'
    // },
    // {
    //   title: 'Home',
    //   icon: AccountCogOutline,
    //   path: '/Home'
    // },
    // {
    //   title: 'My Profile',
    //   icon: AccountCogOutline,
    //   path: '/MyProfile'
    // },
    // {
    //   title: 'speakersessions',
    //   icon: AccountCogOutline,
    //   path: '/speakerSession'
    // },
    // {
    //   title: 'Tasks',
    //   icon: AccountCogOutline,
    //   path: '/task'
    // },
    // {
    //   title: 'Co-speaker',
    //   icon: AccountCogOutline,
    //   path: '/co-speaker'
    // },
    // Other navigation items
  ].filter(item => item.show !== false)
}

export default navigation
