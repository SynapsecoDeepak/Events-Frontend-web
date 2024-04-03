import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import styles from './TabContent.module.css'; // Import your external CSS module
import { Typography } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


export default function TabContent() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };



  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}  sx={{ '& .MuiTabs-indicator': { display: 'none' } }}>
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
          >
            <Tab label="Personal Details" value="1" className={styles.customTabStyle}  sx={{
        '&.Mui-selected': {
          backgroundColor: '#0E436B', // Change this to your desired color
          color: '#fff', // Change this to your desired text color
        },
      }}/>
            <Tab label="Tickets" value="2" className={styles.customTabStyle}  sx={{
        '&.Mui-selected': {
          backgroundColor: '#0E436B', // Change this to your desired color
          color: '#fff', // Change this to your desired text color
        },
      }}/>
            <Tab label="Success" value="3" className={styles.customTabStyle}  sx={{
        '&.Mui-selected': {
          backgroundColor: '#0E436B', // Change this to your desired color
          color: '#fff', // Change this to your desired text color
        },
      }}/>
          </TabList>
        <TabPanel value="1" className={styles.tabList}>
          <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:2}}>
          <div>
            <div>
              <label className={styles.label}>First Name</label>
            </div>
            <input className={styles.input} />
          </div>
          <div>
            <div>
              <label className={styles.label}>Last Name</label>
            </div>
            <input className={styles.input} />
          </div>
          <div>
            <div>
              <label className={styles.label}>Email</label>
            </div>
            <input className={styles.input} />
          </div>
          </Box>
          <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:2}}>
          <div>
            <div>
              <label className={styles.label}>Contact</label>
            </div>
            <input className={styles.input} />
          </div>
          <div>
            <div>
              <label className={styles.label}>Organization</label>
            </div>
            <input className={styles.input} />
          </div>
          <div>
            <div>
              <label className={styles.label}>Designation</label>
            </div>
            <input className={styles.input} />
          </div>
          </Box>
          <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:2}}>
          <div>
            <div>
              <label className={styles.label}>Address</label>
            </div>
            <input className={styles.input} />
          </div>
          <div>
            <div>
              <label className={styles.label}>Country</label>
            </div>
            <input className={styles.input} />
          </div>
          <div>
            <div>
              <label className={styles.label}>State</label>
            </div>
            <input className={styles.input} />
          </div>
          </Box>
          <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:2}}>
          <div>
            <div>
              <label className={styles.label}>City</label>
            </div>
            <input className={styles.input} />
          </div>
          <div>
            <div>
              <label className={styles.label}>Zip Code</label>
            </div>
            <input className={styles.input} />
          </div>
          <div>
            <div>
              <label className={styles.label}>Food Preference</label>
            </div>
            <input className={styles.input} />
          </div>
          </Box>
        </TabPanel>
        <TabPanel value="2" className={styles.tabList}>
          <Box sx={{display:'flex',justifyContent:'space-between'}}>
            <Box sx={{
             
              width: 400,
              height: 400,
              padding:5,
              /* UI Properties */
              background: '#F2F2F2 0% 0% no-repeat padding-box',
              border: '1px solid #DEDEDE',
              borderRadius: 2,
              opacity: 1,
              display:'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'column',
             
            }}>
              <div style={{ display:'flex',
              justifyContent: 'space-between',
              width: '100%',
              alignItems: 'center'}}>
              <label className={styles.label}>Ticket Type</label>
            
            <input className={styles.input2} />
            </div>

            <div style={{ display:'flex',
              justifyContent: 'space-between',
              width: '100%',
              alignItems: 'center'}}>
              <label className={styles.label}>Ticket Price</label>
            
            <input className={styles.input2} />
            </div>
            <div style={{ display:'flex',
              justifyContent: 'space-between',
              width: '100%',
              alignItems: 'center'}}>
              <label className={styles.label}>Number of Persons</label>
            
            <input className={styles.input2} />
            </div>
            <div style={{ display:'flex',
              justifyContent: 'space-between',
              width: '100%',
              alignItems: 'center'}}>
              <label className={styles.label}>Sub Total</label>
            
            <input className={styles.input2} />
            </div>
            <div style={{ display:'flex',
              justifyContent: 'space-between',
              width: '100%',
              alignItems: 'center'}}>
              <label className={styles.label}>Discount</label>
            
            <input className={styles.input2} />
            </div>

            <div style={{ display:'flex',
              justifyContent: 'space-between',
              width: '100%',
              alignItems: 'center'}}>
              <label className={styles.label}>Fees</label>
            
            <input className={styles.input2} />
            </div>
            <div style={{ display:'flex',
              justifyContent: 'space-between',
              width: '100%',
              alignItems: 'center'}}>
              <label className={styles.label}>Tax</label>
            
            <input className={styles.input2} />
            </div>
            
            </Box>


            <Box sx={{
              width: 550,
              height: 199,
              /* UI Properties */
              background: '#F2F2F2 0% 0% no-repeat padding-box',
              border: '1px solid #DEDEDE',
              borderRadius: 2,
              opacity: 1,
              padding:10

            }}>
              <FormControl>
      <FormLabel sx={{fontSize:16,marginBottom:5}}>Payment Method</FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleChange}
        sx={{ fontSize: '16px' }} 
      >
        <FormControlLabel className={styles.customFontSize} value="Credit Card" control={<Radio />} label="Credit Card" sx={{ fontSize: '14px' }} />
        <FormControlLabel  value="Other Payment Method" control={<Radio />} label="Other Payment Method" />
      </RadioGroup>
    </FormControl>
            </Box>
          </Box>
        </TabPanel>
        <TabPanel value="3"  className={styles.tabList}>
        <Box sx={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
            <img src={'/Group_2550.svg'} width={450} height={200} />

            <Typography sx={{color:'#0E436B',fontSize:16,fontWeight:600,marginTop:10}}>You have successfully registered for the event.</Typography>

            <Box sx={{display:'flex',marginTop:10,justifyContent:'space-between',alignItems:'center'}}>
                <Box sx={{display:'flex',alignItems:'center',marginLeft:10}}>
                  <label className={styles.label2}>Category:</label>
                  <input className={styles.input3}/>
                </Box>
                <Box sx={{display:'flex',alignItems:'center',marginLeft:10}}>
                  <label className={styles.label2}>Amount Paid:</label>
                  <input className={styles.input3}/>
                </Box>
                <Box sx={{display:'flex',alignItems:'center',marginLeft:10}}>
                  <label className={styles.label2}>Registration ID:</label>
                  <input className={styles.input3}/>
                </Box>
            </Box>
          </Box>
        </TabPanel>
      </TabContext>
    </Box>
  );
}
