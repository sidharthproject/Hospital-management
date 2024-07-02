import React from 'react'
import { doctors } from '../../assets/data/doctors'
import DoctorCard from './DoctorCard'
import { BASE_URL } from '../../config.js'
import UseFetchData from '../../hooks/UseFetchData.jsx'
import Loader from '../../Loader/Loader.jsx'
import Error from '../../Error/Error.jsx'
function DoctorList() {

  const { data:doctors, loading, error } = UseFetchData(`${BASE_URL}/doctors`);

  return (
  
  <>
  {loading && <Loader/>}
  {error && <Error/>}
    {!loading && !error && <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]'>{doctors.map((doctor)=><DoctorCard key={doctor._id} doctor={doctor}/>)}
    </div>}
    </>
  )
}

export default DoctorList