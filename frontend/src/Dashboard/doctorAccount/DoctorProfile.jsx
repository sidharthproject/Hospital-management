import React, { useState, useEffect } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import uploadImageToCloudinary from '../../utils/uploadCloudinary.js';
import { BASE_URL } from '../../config.js';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

function DoctorProfile({ doctorData }) {
    const token = useSelector((state) => state.auth.token);
    const user = useSelector((state) => state.auth.user);
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        bio: '',
        gender: '',
        specialization: '',
        ticketPrice: 0,
        qualifications: [],
        experiences: [],
        timeSlots: [],
        about: '',
        photo: null,
    });

    useEffect(() => {
        if (doctorData) {
            setFormData({
                name: doctorData.name || '',
                email: doctorData.email || '',
                phone: doctorData.phone || '',
                bio: doctorData.bio || '',
                gender: doctorData.gender || '',
                specialization: doctorData.specialization || '',
                ticketPrice: doctorData.ticketPrice || 0,
                qualifications: doctorData.qualifications || [],
                experiences: doctorData.experiences || [],
                timeSlots: doctorData.timeSlots || [],
                about: doctorData.about || '',
                photo: doctorData.photo || null,
            });
        }
    }, [doctorData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleFileinputChange = async (e) => {
        const file = e.target.files[0];
        const data = await uploadImageToCloudinary(file);
        setFormData((prevFormData) => ({
            ...prevFormData,
            photo: data?.url
        }));
    };

    const updateProfileHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${BASE_URL}/doctors/${doctorData._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });
            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.message);
            }

            toast.success(result.message);
            console.log(result.data);
        } catch (error) {
            console.log(error);
        }
    };

    const addItem = (key, item) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [key]: [...prevFormData[key], item],
        }));
    };

    const handleReusableInputChange = (key, index, event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => {
            const updatedItems = [...prevFormData[key]];
            updatedItems[index][name] = value;
            return {
                ...prevFormData,
                [key]: updatedItems,
            };
        });
    };

    const deleteForm = (key, index) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [key]: prevFormData[key].filter((_, i) => i !== index),
        }));
    };

    // Functions for qualifications
    const addQualification = (e) => {
        e.preventDefault();
        addItem('qualifications', {
            startingDate: '',
            endingDate: '',
            degree: 'PHD',
            university: 'MKCG',
        });
    };

    const handleQualificationChange = (event, index) => {
        handleReusableInputChange('qualifications', index, event);
    };

    const deleteQualification = (e, index) => {
        e.preventDefault();
        deleteForm('qualifications', index);
    };

    // Functions for experiences
    const addExperience = (e) => {
        e.preventDefault();
        addItem('experiences', {
            startingDate: '',
            endingDate: '',
            position: 'Senior Surgeon',
            hospital: 'MKCG',
        });
    };

    const handleExperienceChange = (event, index) => {
        handleReusableInputChange('experiences', index, event);
    };

    const deleteExperience = (e, index) => {
        e.preventDefault();
        deleteForm('experiences', index);
    };

    // Functions for time slots
    const addTimeSlot = (e) => {
        e.preventDefault();
        addItem('timeSlots', {
            day: 'Sunday',
            startingTime: '10:00',
            endingTime: '04:00',
        });
    };

    const handleTimeSlotChange = (event, index) => {
        handleReusableInputChange('timeSlots', index, event);
    };

    const deleteTimeSlot = (e, index) => {
        e.preventDefault();
        deleteForm('timeSlots', index);
    };

    return (
        <div>
            <h2 className="text-headingColor font-bold text-[24px] leading-9 mb-10">Profile Information</h2>

            <form>
                {/* Name */}
                <div className="mb-5">
                    <p className="form__label">Name</p>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder='Full Name'
                        className='form__input'
                    />
                </div>

                {/* Email */}
                <div className="mb-5">
                    <p className="form__label">Email</p>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder='Email'
                        className='form__input'
                    />
                </div>

                {/* Phone */}
                <div className="mb-5">
                    <p className="form__label">Phone</p>
                    <input
                        type="number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder='Phone Number'
                        className='form__input'
                    />
                </div>

                {/* Bio */}
                <div className="mb-5">
                    <p className="form__label">Bio*</p>
                    <input
                        type="text"
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        placeholder='Bio'
                        className='form__input'
                        maxLength={100}
                    />
                </div>

                {/* Gender, Specialization, Ticket Price */}
                <div className="mb-5">
                    <div className="grid grid-cols-3 gap-5 mb-[30px]">
                        <div>
                            <p className='form__label'>Gender*</p>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleInputChange}
                                className='form__input py-3.5'
                            >
                                <option value="">Select</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div>
                            <p className='form__label'>Specialization*</p>
                            <select
                                name="specialization"
                                value={formData.specialization}
                                onChange={handleInputChange}
                                className='form__input py-3.5'
                            >
                                <option value="">Select</option>
                                <option value="surgeon">Surgeon</option>
                                <option value="neurologist">Neurologist</option>
                                <option value="dermatologist">Dermatologist</option>
                            </select>
                        </div>

                        <div>
                            <p className='form__label'>Ticket Price*</p>
                            <input
                                className='form__input'
                                type="number"
                                placeholder='100'
                                name='ticketPrice'
                                onChange={handleInputChange}
                                value={formData.ticketPrice}
                            />
                        </div>
                    </div>
                </div>

                {/* Qualifications */}
                <div className="mb-5">
                    <p className="form__label">Qualifications*</p>
                    {formData.qualifications?.map((item, index) => (
                        <div key={index}>
                            <div>
                                <div className="grid grid-cols-2 gap-5">
                                    <div>
                                        <p className="form__label">Starting Date*</p>
                                        <input
                                            type="date"
                                            name="startingDate"
                                            value={item.startingDate}
                                            onChange={(event) => handleQualificationChange(event, index)}
                                            className="form__input"
                                        />
                                    </div>
                                    <div>
                                        <p className="form__label">Ending Date*</p>
                                        <input
                                            type="date"
                                            name="endingDate"
                                            value={item.endingDate}
                                            onChange={(event) => handleQualificationChange(event, index)}
                                            className="form__input"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-5">
                                    <div>
                                        <p className="form__label">Degree*</p>
                                        <input
                                            type="text"
                                            name="degree"
                                            value={item.degree}
                                            onChange={(event) => handleQualificationChange(event, index)}
                                            className="form__input"
                                            placeholder="Degree"
                                        />
                                    </div>
                                    <div>
                                        <p className="form__label">University*</p>
                                        <input
                                            type="text"
                                            name="university"
                                            value={item.university}
                                            onChange={(event) => handleQualificationChange(event, index)}
                                            className="form__input"
                                            placeholder="University"
                                        />
                                    </div>
                                </div>
                                <button onClick={(e) => deleteQualification(e, index)}>
                                    <AiOutlineDelete size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                    <button onClick={addQualification} className="primary__button">
                        Add Qualification
                    </button>
                </div>

                {/* Experiences */}
                <div className="mb-5">
                    <p className="form__label">Experiences*</p>
                    {formData.experiences?.map((item, index) => (
                        <div key={index}>
                            <div className="grid grid-cols-2 gap-5">
                                <div>
                                    <p className="form__label">Starting Date*</p>
                                    <input
                                        type="date"
                                        name="startingDate"
                                        value={item.startingDate}
                                        onChange={(event) => handleExperienceChange(event, index)}
                                        className="form__input"
                                    />
                                </div>
                                <div>
                                    <p className="form__label">Ending Date*</p>
                                    <input
                                        type="date"
                                        name="endingDate"
                                        value={item.endingDate}
                                        onChange={(event) => handleExperienceChange(event, index)}
                                        className="form__input"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-5">
                                <div>
                                    <p className="form__label">Position*</p>
                                    <input
                                        type="text"
                                        name="position"
                                        value={item.position}
                                        onChange={(event) => handleExperienceChange(event, index)}
                                        className="form__input"
                                        placeholder="Position"
                                    />
                                </div>
                                <div>
                                    <p className="form__label">Hospital*</p>
                                    <input
                                        type="text"
                                        name="hospital"
                                        value={item.hospital}
                                        onChange={(event) => handleExperienceChange(event, index)}
                                        className="form__input"
                                        placeholder="Hospital"
                                    />
                                </div>
                            </div>
                            <button onClick={(e) => deleteExperience(e, index)}>
                                <AiOutlineDelete size={20} />
                            </button>
                        </div>
                    ))}
                    <button onClick={addExperience} className="primary__button">
                        Add Experience
                    </button>
                </div>

                {/* Time Slots */}
                <div className="mb-5">
                    <p className="form__label">Time Slots*</p>
                    {formData.timeSlots?.map((item, index) => (
                        <div key={index}>
                            <div className="grid grid-cols-3 gap-5">
                                <div>
                                    <p className="form__label">Day*</p>
                                    <input
                                        type="text"
                                        name="day"
                                        value={item.day}
                                        onChange={(event) => handleTimeSlotChange(event, index)}
                                        className="form__input"
                                        placeholder="Day"
                                    />
                                </div>
                                <div>
                                    <p className="form__label">Starting Time*</p>
                                    <input
                                        type="time"
                                        name="startingTime"
                                        value={item.startingTime}
                                        onChange={(event) => handleTimeSlotChange(event, index)}
                                        className="form__input"
                                    />
                                </div>
                                <div>
                                    <p className="form__label">Ending Time*</p>
                                    <input
                                        type="time"
                                        name="endingTime"
                                        value={item.endingTime}
                                        onChange={(event) => handleTimeSlotChange(event, index)}
                                        className="form__input"
                                    />
                                </div>
                            </div>
                            <button onClick={(e) => deleteTimeSlot(e, index)}>
                                <AiOutlineDelete size={20} />
                            </button>
                        </div>
                    ))}
                    <button onClick={addTimeSlot} className="primary__button">
                        Add Time Slot
                    </button>
                </div>

                {/* About */}
                <div className="mb-5">
                    <p className="form__label">About*</p>
                    <textarea
                        className="form__input"
                        name="about"
                        onChange={handleInputChange}
                        value={formData.about}
                        cols="30"
                        rows="10"
                    ></textarea>
                </div>

                {/* Photo */}
                <div className="mb-5">
                    <p className="form__label">Photo*</p>
                    <input
                        className="form__input"
                        type="file"
                        accept="image/*"
                        onChange={handleFileinputChange}
                    />
                </div>

                <button
                    className="primary__button"
                    onClick={updateProfileHandler}
                >
                    Update Profile
                </button>
            </form>
        </div>
    );
}

export default DoctorProfile;
