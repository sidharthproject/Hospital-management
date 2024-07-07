import React from 'react'
import { useSelector } from 'react-redux';
import { BiMenu } from 'react-icons/bi'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { logout } from '../../store/authSlice.js';

function Tabs({tab, setTab}) {

  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch()
  const navigate = useNavigate()
 
  
  const logOutHandler = async () => {
    try {
      const response = await fetch('https://hospital-management-y4tp.onrender.com/api/v1/auth/logout', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        dispatch(logout());
        navigate('/login');
        toast.success(result.message);
      } else {
        const result = await response.json();
        toast.error(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    
    <div >
        <span className='lg:hidden'>
          <BiMenu className='w-6 h-6 cursor-pointer'/>
          </span>
         <div className='hidden lg:flex flex-col p-[30px] bg-white shadow-panelShadow items-center h-max rounded-md'>
          <button 
          onClick={()=>setTab('overview')} 
            className={` 
            ${tab === 'overview' 
            ? 'bg-indigo-100 text-primaryColor' 
            : 'bg-transparent   text-headingColor'} 
            w-full btn mt-0 rounded-md `}>OverView</button>
          <button  
            onClick={()=>setTab('appointment')} 
            className={` 
            ${tab === 'appointment' 
            ? 'bg-indigo-100 text-primaryColor' 
            : 'bg-transparent   text-headingColor'} 
            w-full btn mt-0 rounded-md `}>Appointments</button>
          <button 
          onClick={()=>setTab('settings')} 
            className={
              
            `          
            ${tab === 'settings' 
            ? 'bg-indigo-100 text-primaryColor' 
            : 'bg-transparent   text-headingColor'} 
            w-full btn mt-0 rounded-md `}>Profile</button>

           <div className="mt-[100px] md:mt-[50px]">
                <button onClick={logOutHandler} className='w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white'>Logout</button>
                <button className='w-full bg-red-600 mt-4 p-3 text-[16px] leading-7 rounded-md text-white'>Delete Account</button>
              </div>
         </div>

    </div>
  )
}

export default Tabs