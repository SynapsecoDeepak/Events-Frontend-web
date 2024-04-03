import React from 'react'
import BlankLayout2 from 'src/@core/layouts/AnotherBlankLayout';

const index = () => {
  return (
    <div>attendess Register</div>
  )
}

EventPage.getLayout = (page) => <BlankLayout2>{page}</BlankLayout2>;


export default index