import React from 'react'
import BlankLayout2 from 'src/@core/layouts/AnotherBlankLayout';
import AttendeeRegi from 'src/components/AttendeeRegi';
import AttendeeRegistration from 'src/components/AttendeeRegistration';

const index = () => {
  return (
    <div className='attendeeRegistatin' style={{background:'white !important'}}>
        <h1 className='attendeeheading'>Attendee Registration</h1>
        {/* <AttendeeRegistration/> */}
        <AttendeeRegi/>
    </div>
  )
}

index.getLayout = (page) => <BlankLayout2>{page}</BlankLayout2>;


export default index