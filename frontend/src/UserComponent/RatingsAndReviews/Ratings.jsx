import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa6';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { postratingsapi } from '../../Apis/Apirouter';

const Ratings = () => {
    const [hover, setHover] = useState(null);
    const [ratings, setRatings] = useState(0);
    const [reviews, setReviews] = useState('');
    const [starSize, setStarSize] = useState(60); // Default size
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        const handleResize = ()=>{
            if(window.innerWidth <= 500){
                setStarSize(40)
            }else{
                setStarSize(60)
            }
        };

        window.addEventListener('resize',handleResize);
        handleResize();

        return ()=>{
            window.removeEventListener('resize', handleResize);
        }
    },[])

    const AddRatings = async () => {
        try {
            const formData = new FormData();
            formData.append('ratings', ratings);
            formData.append('reviews', reviews);
            const url = postratingsapi + id;
            const response = await toast.promise(
                axios.post(url, formData, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }),
                {
                    pending: 'Reviews Processing',
                    error: 'Review cannot be added',
                }
            );
            if (response && response.data.success) {
                toast.success('Review Added Successfully', { autoClose: 2000 });
                setTimeout(() => {
                    navigate('/dashboard');
                }, 2000);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong on the server');
        }
    };

    return (
        <div className="ratings-section min-h-screen flex justify-center items-center py-10 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-4xl flex flex-col justify-center items-center border border-purple-400 rounded-lg p-6 shadow-md bg-gray-50">
                <div className="ratings flex flex-wrap justify-center items-center gap-4 mb-10">
                    {[...Array(5)].map((star, index) => {
                        const currentRating = index + 1;
                        return (
                            <label key={index}>
                                <input
                                    className="hidden"
                                    type="radio"
                                    name="ratings"
                                    value={currentRating}
                                    onClick={() => setRatings(currentRating)}
                                />
                                <FaStar
                                    className="star cursor-pointer"
                                    size={starSize}
                                    color={currentRating <= (hover || ratings) ? '#ffc107' : '#e4e5e9'}
                                    onMouseEnter={() => setHover(currentRating)}
                                    onMouseLeave={() => setHover(null)}
                                />
                            </label>
                        );
                    })}
                </div>
                <div className="reviews w-full mb-6 flex justify-center items-center">
                    <textarea
                        className="lg:w-3/5 sm:w-full p-3 border border-gray-400 rounded-lg focus:outline-none hover:border-purple-300 focus:ring-4 focus:ring-purple-300"
                        placeholder="Enter Your Reviews"
                        rows="8"
                        value={reviews}
                        onChange={(e) => setReviews(e.target.value)}
                    />
                </div>
                <button
                    className="w-3/5 sm:w-1/2 lg:w-1/4 bg-purple-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-purple-600 focus:outline-none focus:ring-4 focus:ring-purple-300"
                    onClick={AddRatings}
                >
                    Save
                </button>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Ratings;
