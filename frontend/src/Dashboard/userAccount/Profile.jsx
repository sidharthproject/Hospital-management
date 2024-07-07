import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import uploadImageToCloudinary from '../../utils/uploadCloudinary';
import { BASE_URL } from '../../config';
import toast from 'react-hot-toast';
import HashLoader from 'react-spinners/HashLoader';
import { useSelector } from 'react-redux';

function Profile({ user }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const token = useSelector((state) => state.auth.token);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    photo: null,
    gender: '',
    bloodType: '',
  });
   console.log(formData);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        password: user.password || '', // Assuming you don't want to preload the password
        photo: user.photo || null,
        gender: user.gender || '',
        bloodType: user.bloodType || '',
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileinputChange = async (e) => {
    const file = e.target.files[0];
    const data = await uploadImageToCloudinary(file);

    setSelectedFile(data.url);
    setFormData((prevFormData) => ({
      ...prevFormData,
      photo: data.url,
    }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/users/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json(); // Parse the JSON response

      if (!res.ok) {
        throw new Error(data.message); // Throw an error with the message from the response data
      }

      setLoading(false);
      toast.success(data.message); // Display success message
      navigate('/users/profile/me');
    } catch (error) {
      toast.error(error.message); // Display error message
      setLoading(false);
    }
  };

  return (
    <div className='mt-10'>
      <form onSubmit={submitHandler} action="">
        <div className="mb-5">
          <input
            type="text"
            placeholder='Full Name'
            name='name'
            value={formData.name}
            onChange={handleInputChange}
            className='w-full pr-4 py-3 border-b border-b-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer'
            required
          />
        </div>
        <div className="mb-5">
          <input
            type="email"
            placeholder='Enter Your Email'
            name='email'
            value={formData.email}
            onChange={handleInputChange}
            className='w-full pr-4 py-3 border-b border-b-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer'
            aria-readonly
            readOnly
          />
        </div>
        <div className="mb-5">
          <input
            type="password"
            placeholder='Enter Your Password'
            name='password'
            value={formData.password}
            onChange={handleInputChange}
            className='w-full pr-4 py-3 border-b border-b-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer'
          />
        </div>
        <div className="mb-5">
          <input
            type="text"
            placeholder='Blood Type :'
            name='bloodType'
            value={formData.bloodType}
            onChange={handleInputChange}
            className='w-full pr-4 py-3 border-b border-b-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer'
            required
          />
        </div>
        <div className="mb-5 flex items-center justify-between ">
          <label htmlFor="" className='text-headingColor font-bold text-[16px] leading-7'>
            Gender:
            <select
              name="gender"
              id=""
              value={formData.gender}
              onChange={handleInputChange}
              className='text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none'>
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </label>
        </div>
        <div className="mb-5 flex items-center gap-3">
          {formData.photo && (
            <figure className='w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center'>
              <img src={formData.photo} alt="" className='w-full rounded-full' />
            </figure>
          )}
          <div className="relative w-[130px] h-[50px]">
            <input
              type="file"
              name="photo"
              id="customFile"
              accept='.jpg, .png'
              onChange={handleFileinputChange}
              className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'
            />
            <label
              htmlFor="customFile"
              className='absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer'>
            {selectedFile ? selectedFile.name : 'upload photo'}
            </label>
          </div>
        </div>
        <div className='mt-7'>
          <button
            disabled={loading}
            type="submit"
            className='w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg'>
            {loading ? <HashLoader size={25} color='#ffffff' /> : 'Update'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Profile;