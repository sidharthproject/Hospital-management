import React ,{useState}from 'react'
import {AiFillStar} from 'react-icons/ai'
import { BASE_URL } from '../../config.js'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import HashLoader from 'react-spinners/HashLoader.js'
function FeedBackForm() {
    const token = useSelector(state=>state.auth.token)
    const [rating,setRating] = useState(0)
    const [hover,setHover] = useState(0)
    const [reviewText,setReviewText] = useState("")
    const [loading,setLoading] = useState(false)

    const {id} =  useParams()
    const handleSubmitReview = async e =>{
      e.preventDefault()
      setLoading(true)
      try {
        if(!rating || !reviewText){
          setLoading(false)
          toast.error("Rating & ReviewText Fields are required")
}
          const res = await fetch(`${BASE_URL}/review/${id}/reviews`,{
            method:"post",
            headers:{
              'Content-Type':'application/json',
              Authorization: `Bearer ${token}`
            },
            body:JSON.stringify({rating,reviewText})
          })

          const result =  await res.json()

          if(!res.ok){
            throw new Error(result.message)
          }
          setLoading(false)
          toast.success(result.message)
        
      } catch (error) {
        setLoading(false)
        toast.error(error.message)
      }
    }
  return (
    <form>
        <div>
            <h3 className='text-headingColor text-[16px] leading-6  font-semibold mb-4 mt-0'>How would you rate the overall experience ?</h3>
        <div>
        {[...Array(5).keys()].map((_,index)=>{
            index += 1;
            return (
            <button 
            key={index} 
            type='button' 
            className={`${index <= ((rating && hover) || hover )? "text-yellowColor":"text-gray-400"} bg-transparent border-none outline-none text-[22px] cursor-pointer`}
            onMouseEnter={()=>setHover(index)}
            onMouseLeave={()=>setHover(rating)}
            onDoubleClick={()=>{setHover(0); setRating(0);}}
            onClick={()=>setRating(index)}> <span><AiFillStar/></span></button>
       ) })}
        </div>
        </div>


        <div className="mt-[30px]">
            <h3 className="text-headingColor text-[16px] leading-6 font-semibold mb-4 mt-0">Share your feedback or suggestions*</h3>
        
        <textarea 
        className=" border border-solid border-[#0066ff34] focus:outline outline-primaryColor w-full px-4 py-3 rounded-md " 
        onChange={ e =>setReviewText(e.target.value)} 
        placeholder ='Write your message'  
       rows="5" >

       </textarea>
        </div>
    <button  type='submit' onClick={handleSubmitReview} className='btn'>{loading?<HashLoader size={25} color='#fff'/>:"Submit Feedback" }</button>
    </form>
  )
}

export default FeedBackForm