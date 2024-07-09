import React, { useEffect, useState, useCallback, memo } from 'react';
import Navbar from '../Navbar/Navbar';
import Loading from '../Loading/Loading';
import { useAuth } from '../../Context/Context';
import axios from 'axios';
import { deleteratingsapi, getallratingsapi } from '../../Apis/Apirouter';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteIcon from '../Icons/DeleteIcon';

const AdminReviews = () => {
    const [auth] = useAuth();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);

    const GetAllReviews = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.get(getallratingsapi);
            if (response && response.data.success) {
                setReviews(response.data.reviews);
            } else {
                setReviews([]);
            }
        } catch (error) {
            console.log(error);
            setReviews([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (auth && auth?.user) {
            GetAllReviews();
        }
    }, [auth, GetAllReviews]);

    const DeleteReview = useCallback(async (reviewid, ratings, foodid) => {
        try {
            const formData = new FormData();
            formData.append('id', reviewid);
            formData.append('ratings', ratings);
            formData.append('foodid', foodid);
            const response = await toast.promise(
                axios.post(deleteratingsapi, formData, {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }),
                {
                    pending: "Processing",
                    error: "Something went wrong"
                }
            );
            if (response && response.data.success) {
                setReviews(prevReviews => prevReviews.filter(review => review._id !== reviewid));
            } else {
                setReviews([]);
            }
        } catch (error) {
            console.log(error);
        }
    }, []);

    const ReviewRow = memo(({ review, index, onDelete }) => (
        <tr key={review._id}>
            <td>{index + 1}</td>
            <td>{review?.ratings}</td>
            <td>{review?.reviews}</td>
            <td>
                <div className="icon" onClick={() => onDelete(review?._id, review?.ratings, review?.menuid?._id)}>
                    <DeleteIcon />
                </div>
            </td>
        </tr>
    ));

    return (
        <>
            <Navbar />
            {!auth || !auth?.user ? (
                <Loading />
            ) : (
                <section className="table-section" style={{ paddingTop: "70px" }}>
                    <h3 className="table-header">Reviews And Ratings</h3>
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Ratings</th>
                                    <th>Reviews</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reviews.length > 0 ? reviews.map((review, index) => (
                                    <ReviewRow key={review._id} review={review} index={index} onDelete={DeleteReview} />
                                )) : (
                                    <tr>
                                        <td colSpan="4">No reviews found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <ToastContainer />
                </section>
            )}
        </>
    );
};

export default AdminReviews;
