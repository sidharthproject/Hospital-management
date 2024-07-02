import React from 'react'
import UseFetchData from '../../hooks/UseFetchData'
import { BASE_URL } from '../../config.js'
import DoctorCard from '../../Components/Doctors/DoctorCard.jsx'
import Loader from '../../Loader/Loader.jsx'
import Error from '../../Error/Error.jsx'
function MyBooking() {
  const{data:appointments,loading,error} = UseFetchData(`${BASE_URL}/users/appointments/my-appoinment`)
 
  return (
    <div>
      {loading&& !error && <Loader/>}
        {error&& loading && <Error errMessage={error}/>}
        {!loading && !error && (<div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
          {
            appointments.map(doctor => (<DoctorCard doctor={doctor} key={doctor._id}/>  ))
         }
        </div> 
      )} 
     
       {!loading && !error && appointments.length == 0 && (<h2 className='mt-5 text-center text-primaryColor leading-7 text-[20px] font-semibold'>You did not book any doctor yet !</h2> )}
       
    </div>
  )
}

export default MyBooking