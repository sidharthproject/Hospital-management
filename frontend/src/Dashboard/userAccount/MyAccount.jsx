import React, { useState } from 'react';
import userImg from '../../assets/images/doctor-img01.png';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/authSlice.js';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import MyBooking from './MyBooking.jsx';
import Profile from './Profile.jsx';
import UseFetchData from '../../hooks/UseFetchData.jsx';
import { BASE_URL } from '../../config.js';
import Loader from '../../Loader/Loader.jsx';
import Error from '../../Error/Error.jsx';

function MyAccount() {
  const [tab, setTab] = useState('bookings');
  const { data, loading, error } = UseFetchData(`${BASE_URL}/users/profile/me`);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOutHandler = async () => {
    try {
      const response = await fetch('http://localhost:9000/api/v1/auth/logout', {
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
      toast.error('An error occurred while logging out');
    }
  };

  return (
    <section>
      <div className='max-w-[1170px] px-5 mx-auto'>
        {loading && !error && <Loader />}
        {error && <Error errMessage={error} />}
        {!loading && !error && (
          <div className='grid md:grid-cols-3 gap-10'>
            <div className="pb-[50px] px-[30px] rounded-md">
              <div className="flex items-center justify-center">
                <figure className="w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor">
                  <img src={data.photo} className='w-full h-full rounded-full' alt="" />
                </figure>
              </div>

              <div className="text-center mt-4">
                <h3 className="text-[18px] leading-[30px] text-headingColor font-bold">{data.name}</h3>
                <p className="text-textColor text-[15px] leading-6 font-medium">{data.email}</p>
                <p className="text-textColor text-[15px] leading-6 font-medium">
                 Blood Type :<span className='ml-2 text-headingColor text-[22px] leading-8'>{data.bloodType}</span>
                </p>
              </div>

              <div className="mt-[100px] md:mt-[50px]">
                <button onClick={logOutHandler} className='w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white'>Logout</button>
                <button className='w-full bg-red-600 mt-4 p-3 text-[16px] leading-7 rounded-md text-white'>Delete Account</button>
              </div>
            </div>

            <div className="md:col-span-2 md:px-[30px]">
              <div className="">
                <button onClick={() => setTab('bookings')} className={`${tab === 'bookings' && 'bg-primaryColor text-white font-normal'} p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}>My Bookings</button>
                <button onClick={() => setTab('settings')} className={`${tab === 'settings' && 'bg-primaryColor text-white font-normal'} p-2 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}>Profile Settings</button>
              </div>
              {tab === 'bookings' && <MyBooking />}
              {tab === 'settings' && <Profile user={data} />}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default MyAccount;