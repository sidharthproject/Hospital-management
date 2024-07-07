import React from 'react';
import convertTime from '../../utils/convertTime.js';
import { BASE_URL } from '../../config.js';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

function Panel({ ticketPrice, doctorId, timeSlots }) {
    const token = useSelector(state => state.auth.token);
    const user = useSelector(state => state.auth.user);
    console.log(user.role);

    const bookingHandler = async () => {
        try {
            const res = await fetch(`${BASE_URL}/booking/checkoutsession/${doctorId}`, {
                method: 'post',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message + "Please try again");
            }
            if (data.session.url) {
                window.location.href = data.session.url;
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div>
            {user.role === "doctor" ? " " : 
                <div className="shadow-panelShadow p-3 lg:p-5 rounded-md">
                    <div className="flex items-center justify-between">
                        <p className="text_para mt-0 font-semibold">Ticket Price</p>
                        <span className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold">{ticketPrice} INR</span>
                    </div>
                    <div className="mt-[30px]">
                        <p className="text__para font-semibold mt-0 text-headingColor">Available TimeSlots</p>
                        <ul className='mt-3'>
                            {timeSlots?.map((item, index) => (
                                <li key={index} className="flex item-center justify-between mb-2">
                                    <p className='text-[15px] leading-6 text-headingColor font-semibold'>{item.day.charAt(0).toUpperCase() + item.day.slice(1)}</p>
                                    <p className='text-[15px] leading-6 text-headingColor font-semibold'>{convertTime(item.startingTime)} - {convertTime(item.endingTime)}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <button onClick={bookingHandler} className='btn px-2 w-full rounded-sm'> Book Appointment</button>
                </div>
            }
        </div>
    );
}

export default Panel;