import React, { useState } from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import { BASE_URL } from '../config.js'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '../store/authSlice.js'
import HashLoader from 'react-spinners/HashLoader'
function Login() {
  const[formData,setFormData] =useState({
    email:'',
    password:''
  })
  const dispatch = useDispatch()
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()
 const handleInputChange = (e)=>{
     setFormData({...formData,[e.target.name]:e.target.value})
  }
  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      const result = await res.json(); // Parse the JSON response
         console.log("result",result);
      // Check if the response is not ok
      if (!res.ok) {
        throw new Error(result.message); // Throw an error with the message from the response data
      }
      dispatch(loginSuccess({
        user: result.data,
        token: result.token,
        role: result.role
      }));
      console.log(result,"login data");
      setLoading(false);
      toast.success(result.message); // Display success message
      navigate('/');
    } catch (error) {
      toast.error(error.message); // Display error message
      setLoading(false);
    }
  };
  return (
    <section className='px-5 lg:px-0'>
      <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10">
        <h3 className='text-headingColor text-[22px] leading-9 font-bolod mb-10'>Hello! <span className='text-primaryColor'>Welcome</span> Back</h3>
        <form action="" className='py-4 md:py-0' onSubmit={submitHandler}>
          <div className="mb-5">
            <input 
            type="email" 
            placeholder='Enter Your Email' 
            name='email' value={formData.email} 
            onChange={handleInputChange}
            className='w-full px-4 py-3 border-b border-b-sollid  border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px]  leading-7 text-headingColor  placeholder:text-textColor rounded-md cursor-pointer'
            required
            />
          </div>
          <div className="mb-5">
            <input 
            type="passowrd" 
            placeholder='Enter Your Password' 
            name='password' 
            value={formData.password} 
            onChange={handleInputChange}
            className='w-full px-4 py-3 border-b border-b-sollid  border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px]  leading-7 text-headingColor  placeholder:text-textColor rounded-md cursor-pointer'
            required
            />
          </div>
             <div className='mt-7'>
              <button type="submit" className='w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg'>{loading ? <HashLoader size={25} color="#fff"/>:'Login'}</button>
             </div>
             <p className='mt-5 text-textColor text-center'>Don't have an account ?  <Link className='text-primaryColor font-medium ml-1' to={'/signup'}>SignUp</Link></p>
        </form>
      </div>

    </section>
  )
}

export default Login