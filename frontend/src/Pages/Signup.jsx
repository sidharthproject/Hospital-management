import React,{useState} from 'react'
import signupImg from '../assets/images/signup.gif'
import toast from "react-hot-toast";
import { Link,useNavigate } from 'react-router-dom'
import { BASE_URL } from '../config.js'
import uploadImageToCloudinary from '../utils/uploadCloudinary.js'

import HashLoader from 'react-spinners/HashLoader'
function Signup() {
  const [selectedFile,setSelectedFile] =useState(null)
  const [previewURL,setPreviewURL] =useState('')
  const [loading,setLoading] = useState(false)
  const[formData,setFormData] =useState({
    name:'',
    email:'',
    password:'',
    photo:selectedFile,
    gender:'',
    role:''
  })

  const navigate = useNavigate()
  const handleInputChange = (e) => {
    
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
   
  };
 const handleFileinputChange= async(e)=>{
  const file = e.target.files[0]
  const data = await uploadImageToCloudinary(file)
  setPreviewURL(data.url)
  setSelectedFile(data.url)
  setFormData({...formData, photo:data.url})
 }
 const submitHandler = async (event) => {
  event.preventDefault();
  setLoading(true);
  try {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const data = await res.json(); // Parse the JSON response

    // Check if the response is not ok
    if (!res.ok) {
      throw new Error(data.message); // Throw an error with the message from the response data
    }

    setLoading(false);
    toast.success(data.message); // Display success message
    navigate('/login');
  } catch (error) {
    toast.error(error.message); // Display error message
    setLoading(false);
  }
};

 
  return (
    <section className='px-5 xl:px-0'>
      <div className="max-w-[1170px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="hidden lg:block bg-primaryColor rounded-l-lg">
            <figure className="rounded-l-lg">
              <img src={signupImg} alt="" />
            </figure>
          </div>
          <div className="rounded-l-lg lg:pl-16 py-10">
            <h3 className="text-headingColor text-[22px] leading-9">Create  an <span className="text-primaryColor">account</span> </h3>
            <form onSubmit={submitHandler} action="">
            <div className="mb-5">
            <input 
            type="text" 
            placeholder='Full Name' 
            name='name'
            value={formData.name}
            onChange={handleInputChange}
            className='w-full pr-4 py-3 border-b border-b-sollid  border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px]  leading-7 text-headingColor  placeholder:text-textColor rounded-md cursor-pointer'
            required
            />
          </div>
          <div className="mb-5">
          <input 
           type="email" 
           placeholder='Enter Your Email' 
           name='email'
           value={formData.email}  // Make sure this is formData.email
           onChange={handleInputChange}  // Correctly updating the state
           className='w-full pr-4 py-3 border-b border-b-sollid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer'
           required
/>
          </div>
          <div className="mb-5">
          <input 
              type="password" 
              placeholder='Enter Your Password' 
              name='password'
              value={formData.password}  // Make sure this is formData.password
              onChange={handleInputChange}  // Correctly updating the state
              className='w-full pr-4 py-3 border-b border-b-sollid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer'
              required
/>
          </div>
          <div className="mb-5 flex items-center justify-between ">
            <label htmlFor="" className='text-headingColor font-bold text-[16px] leading-7'>Are you a:
            <select 
            name="role" 
            id="" 
            className='text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none'
            value={formData.role}
            onChange={handleInputChange}>
               <option value="">Select Role</option>
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
              </select>
              </label>
            <label htmlFor="" className='text-headingColor font-bold text-[16px] leading-7'>Gender:
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
           { selectedFile && <figure className='w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center'>

                  <img src={previewURL} alt="" className='w-full rounded-full' />
                </figure> }
                <div className="relative w-[130px] h-[50px]">
                  <input 
                  type="file" 
                  name="photo" 
                  id="customFile" 
                  accept='.jpg ,.png' 
                  onChange={handleFileinputChange}
                  className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer' />
                  <label htmlFor="customFile" className='absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer'>Upload Photo</label>
                </div>
              </div>
              <div className='mt-7'>
              <button 
              disabled={loading}
              type="submit" 
              className='w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg'>{loading ? <HashLoader size={35} color='#ffffff'/>:'Sign up' }</button>
             </div>
             <p className='mt-5 text-textColor text-center'>Already have an account ?  <Link className='text-primaryColor font-medium ml-1' to={'/login'}>Login</Link></p>
            </form>
          </div>
        </div>
      </div>

    </section>
  )
}

export default Signup