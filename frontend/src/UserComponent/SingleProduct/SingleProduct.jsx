import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt, faStar as farStar } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { deleteratingsapi, getratingsapi, SingleFoodapi } from '../../Apis/Apirouter';
import { useAuth } from '../../Context/Context';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import DeleteIcon from '../../AdminComponent/Icons/DeleteIcon';

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null); // Initialize as null to handle loading state
  const [auth] = useAuth();
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  const fetchFoodDetails = async (id) => {
    try {
      const url = `${SingleFoodapi}${id}`;
      const response = await axios.get(url);
      if (response && response.data.success) {
        setProduct(response.data.Food);
      } else {
        setProduct(null);
      }
    } catch (error) {
      console.log(error);
      setProduct(null);
    }
  };

  const GetReviews = async (id) => {
    try {
      const formData = new FormData();
      formData.append('id', id);
      const response = await axios.post(getratingsapi, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      if (response && response.data.success) {
        setReviews(response.data.reviews);
        console.log(response.data.reviews);
      } else {
        setReviews([]);
      }
    } catch (error) {
      console.log(error);
      setReviews([]);
    }
  }

  useEffect(() => {
    if (auth && auth?.user) {
      fetchFoodDetails(id);
      GetReviews(id);
      console.log(auth?.user)
    }
  }, [auth, id]);

  //for starts ratings portion
  const renderStars = (rating) => {
    // Validate and sanitize the rating input
    if (typeof rating !== 'number' || isNaN(rating) || rating < 0) {
      rating = 0; // Default to 0 if invalid
    }
    
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  
    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <FontAwesomeIcon key={`full-${i}`} icon={faStar} className="text-yellow-500" />
        ))}
        {halfStar && <FontAwesomeIcon icon={faStarHalfAlt} className="text-yellow-500" />}
        {[...Array(emptyStars)].map((_, i) => (
          <FontAwesomeIcon key={`empty-${i}`} icon={farStar} className="text-gray-300" />
        ))}
      </>
    );
  };
  

  const handleDelete = async(reviewid,rating, id)=>{
    try{
      const formData = new FormData();
      formData.append('id',reviewid);
      formData.append('ratings',rating);
      formData.append('foodid',id);
      const response = await toast.promise(
        axios.post(deleteratingsapi, formData, {
          withCredentials : true,
          headers : {
            "Content-Type" : "multipart/form-data"
          }
        }),{
          pending : "Processing",
          error : "Something went wrong"
        }
      );
      if(response && response.data.success){
        toast.success(response.data.message,{autoClose : 400});
        const updatedreviews = reviews.filter((review)=>review._id !== reviewid);
        setReviews(updatedreviews);
      }else{
        setReviews([]);
      }
    }catch(error){
      console.log(error);
      toast.error("Server side error");
    }
  }

  const handleClick = () => {
    navigate(`/ratings/${id}`);
  }

  if (!product) {
    return <div className = "min-h-screen flex justify-center items-center p-2 font-semibold text-center">Loading...</div>;
  }
  let averageRating = 0;
  if(product?.ratings && product?.count){
    averageRating = (product.ratings / product.count)
  }

  return (
    <div className="single-product w-full min-h-screen py-14 px-12">
      <div className="grid grid-cols-1 md:grid-cols-2 w-3/4 mx-auto">
        <div className="image-class">
          <img src={product.image?.url || 'images/background.jpeg'} alt={product?.name || 'image'} className="rounded-2xl" />
        </div>
        <div className="about-product px-10 flex justify-center items-center flex-col gap-y-5 py-3">
          <div className="category text-purple-500">Category : <span className="text-black ml-2">{product?.category?.name}</span></div>
          <div className="description text-purple-500">Description : <span className="text-black ml-2">{product?.description}</span></div>
          <div className="price text-purple-500">Price : <span className="text-black ml-2">{product?.price}</span></div>
          <div className="size text-purple-500">Size : <span className="text-black ml-2">{product?.size}</span></div>
          <div className="rating text-purple-500">Rating : <span className="text-black ml-2">{renderStars(averageRating)}</span></div>
        </div>
      </div>
      <div className="w-3/4 mx-auto py-10 flex justify-center items-center">
        <button className="bg-purple-500 py-3 text-center text-white font-semibold w-1/2 rounded-lg shadow-md hover:bg-purple-600" onClick={handleClick}>Rate Here</button>
      </div>

      <div className="reviews-container w-full mb-2 border-b border-gray-400 border-t border-gray-400 py-10 flex flex-col gap-y-8">
        {(reviews && reviews.length > 0) ? (
          reviews.map((review, index) => (
            <div className="review lg:w-3/4 sm:4/5 mx-auto py-6 px-8 border rounded-lg shadow-sm bg-white" key={index}>
              <div className="flex items-center mb-2 gap-x-10">
                <div className="name-class text-lg font-semibold text-gray-800">{review?.userid?.firstname} {review?.userid?.lastname}</div>
                <div className = {review?.userid?._id === auth?.user?._id ? "" : "hidden"} onClick={()=>handleDelete(review?._id, review?.ratings ,id)}><DeleteIcon/></div>
              </div>
              <div className="rating text-purple-500">Rating : <span className="text-black ml-2">{renderStars(review?.ratings)}</span></div>
              <div className="review-text text-gray-600 ml-10 mt-3">{review?.reviews}</div>
            </div>
          ))
        ) : (
          <div className="w-3/4 mx-auto text-center text-gray-500">No reviews yet.</div>
        )}
      </div>
      <ToastContainer/>
    </div>
  );
};

export default SingleProduct;
