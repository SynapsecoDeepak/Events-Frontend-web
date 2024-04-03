// ** React Imports
import { useEffect, useRef, useState  } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Alert from '@mui/material/Alert'
import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import AlertTitle from '@mui/material/AlertTitle'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'

import axios from 'axios'
import { useRouter } from 'next/router'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

const TabAccount = () => {
  
  const router = useRouter()


  
  if (typeof window !== 'undefined') {
    const userLoginToken = sessionStorage.getItem('userToken')

    if (!userLoginToken) {
      router.push('/')
    }
   
  }

  // ** State


  const [imgSrc, setImgSrc] = useState('/images/avatars/1.png')



  const[editableData, setEditableData] = useState({
    fname:'',
    lname:'',
    email:'',
    address:'',
    city:'',
    country:'',
    user_type:'',
  })

  const[validateErrors, setValidateErrors] = useState({
    fname:'',
    lname:'',
    email:'',
    address:'',
    city:'',
    country:'',
    user_type:'',
    profile_pic:[]
  })

  const [newImage, setNewImage] = useState(null);

  if (typeof window !== 'undefined') {

    const user_id = (sessionStorage.getItem("user_id") || '');
    const user_token = (sessionStorage.getItem("userToken")  || '')
   
    console.log('user id :',user_id)
    console.log("user token:",user_token)
   
  }

 useEffect(()=>{

  // if (typeof window !== 'undefined') {

  //   const user_id = (sessionStorage.getItem("user_id") || '');
  //   const user_token = (sessionStorage.getItem("userToken")  || '')
   
  //   console.log('user id :',user_id)
  //   console.log("user token:",user_token)
   
  // }

  const API_URL = `http://104.211.25.86:8073/api/user/${user_id}`


  const fetchUserData = async ()=>{
    try {
      const resp = await axios.get(API_URL,{
        headers:{
          Authorization: `${user_token}`
        }
      });
      const userResData = resp.data.user[0];
      if(userResData){

        sessionStorage.setItem("userWholeData",JSON.stringify(userResData));
         
        setEditableData(userResData)

        if(userResData.profile_pic){
          setImgSrc(userResData.profile_pic)
        }
      }
    } catch (error) {
      console.log('error fetching user data', error)
    }
  }
  fetchUserData();
 },[])



  const onChange = file => {
    const reader = new FileReader()
    const { files } = file.target
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result)
      reader.readAsDataURL(files[0])
      setNewImage(files[0])
    }
  }


  const handleInputChange = (e)=>{
    const {name, value} = e.target;
    let error='';

    if (name === 'email') {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (value.trim() !== '' && !emailRegex.test(value)) {
        error = 'Invalid email format';
      }
    } else {
      
      // Validate non-empty fields
      if (value.trim() === '') {
        error = 'This field cannot be empty';
      }
    }


    setValidateErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));

    setEditableData((prevData)=>({
      ...prevData,
      [name]:value
    }))
  }

  const handleUpdateData =  async ()=>{
    
     try {
      const formData = new FormData();
      formData.append("fname",editableData.fname)
      formData.append("lname",editableData.lname)
      formData.append("email",editableData.email)
      formData.append("address",editableData.address)
      formData.append("city",editableData.city)
      formData.append("country",editableData.country)
      formData.append("user_type",editableData.user_type)

        if(newImage){
          formData.append('profile_pic',newImage);
        }

      const API_URL = `http://104.211.25.86:8073/api/user/${user_id}`;


      const response = await axios.patch(API_URL, formData,
      //   {
      //             fname: editableData.fname,
      //             lname: editableData.lname,
      //             email: editableData.email,
      //             address: editableData.address,
      //             city: editableData.city,
      //             country: editableData.country,
      //             user_type: editableData.user_type,
      // },
      {
        headers: {
          Authorization: `${user_token}`
        },
      }
      );
      console.log("patch response is :" , response)
      if (response.status === 200){
        router.push('/')
      } else{
        console.error("failed to update user data ")
      }
     } catch (error) {
      console.log("error updating user data :",error)
     }
  }

 

  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ImgStyled src={`http://104.211.25.86:8073/${imgSrc}`} alt='Profile Pic' />
              <Box>
                <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                  Upload New Photo
                  <input
                    hidden
                    type='file'
                    onChange={onChange}
                    accept='image/png, image/jpeg'
                    id='account-settings-upload-image'
                  />
                </ButtonStyled>
                <ResetButtonStyled color='error' variant='outlined' onClick={() => setImgSrc('/images/avatars/1.png')}>
                  Reset
                </ResetButtonStyled>
                <Typography variant='body2' sx={{ marginTop: 5 }}>
                  Allowed PNG or JPEG. Max size of 800K.
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}> First Name
            <TextField fullWidth name='fname' error={!!validateErrors.fname}    helperText={validateErrors.fname} onChange={handleInputChange} value={editableData.fname}  />
          </Grid>
          <Grid item xs={12} sm={6}> Last Name
            <TextField fullWidth name='lname'  error={!!validateErrors.lname}    helperText={validateErrors.lname} onChange={handleInputChange} value={editableData.lname}  />
          </Grid>
          <Grid item xs={12} sm={6}> E-mail
            <TextField
              fullWidth
              error={!!validateErrors.email} 
                 helperText={validateErrors.email}
              name='email'
              onChange={handleInputChange}
              type='email'
              value={editableData.email} 
            />
          </Grid>
          <Grid item xs={12} sm={6}>Address
            <TextField
              fullWidth
              error={!!validateErrors.address}    helperText={validateErrors.address}
              name='address'
              onChange={handleInputChange}
              type='text'
              value={editableData.address} 
            />
          </Grid>
          <Grid item xs={12} sm={6}> City
            <TextField
              fullWidth
              error={!!validateErrors.city}    helperText={validateErrors.city}
              name='city'
              onChange={handleInputChange}
              type='text'
         
              value={editableData.city} 
            />
          </Grid>
          <Grid item xs={12} sm={6}> Country
            <TextField
            name='country'
            error={!!validateErrors.country}    helperText={validateErrors.country}
              fullWidth
              onChange={handleInputChange}
              type='text'
         
              value={editableData.country} 
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth> Role
              <TextField name='role' disabled onChange={handleInputChange} value={editableData.user_type} />


            </FormControl>
          </Grid>



          <Grid item xs={12}>
            <Button variant='contained' sx={{ marginRight: 3.5 }} onClick={handleUpdateData}>
              Save Changes
            </Button>

          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabAccount
