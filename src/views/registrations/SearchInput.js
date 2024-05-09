// ** MUI Imports
import Box from '@mui/material/Box'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux';
import { updateFilteredDataRegis, updateSearchQuery } from 'src/store/slice/eventSlice';




const SearchInput = () => {
    const router = useRouter()
    const dispatch = useDispatch();

    const registrationData = useSelector((state) => state.event?.registrationData?.data);
  
    const handleInputChange = (event) => {
      const query = event.target.value;
      dispatch(updateSearchQuery(query));
      filterData(query);
    };
   
    const filterData = (query) => {
      const filteredData = registrationData.filter((registration) =>
        registration?.user_id?.name.toLowerCase().includes(query.toLowerCase())
      //  ||
      //   speaker.organization.toLowerCase().includes(query.toLowerCase())
      );
      dispatch(updateFilteredDataRegis(filteredData));
    };

  return (
    <Box sx={{display:'flex',alignItems:'center',justifyContent:'space-between',width:'100%'}}>
    <Box sx={{display:'flex',alignItems:'center',width:400,height:40,borderRadius:40,marginLeft:20, paddingLeft:4,paddingRight:4, background:'#fff'}}>
    <img width={20} height={20} style={{marginRight:10}} alt='paypal' src='/search_icon.svg' />
      <input onChange={handleInputChange} style={{border:'none',width:'100%'}} type="text" placeholder='Search speaker name and organization'/>
    </Box>
    <Box  sx={{display:'flex',alignItems:'center'}}>
    <img width={20} height={20} style={{marginRight:10}} alt='paypal' src='/page_one.svg' />
    <img width={20} height={20} style={{marginRight:10}} alt='paypal' src='/page_two.svg' />
    </Box>
    </Box>
  )
}

export default SearchInput
