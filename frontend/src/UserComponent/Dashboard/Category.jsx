import React, { useEffect, useState } from 'react';
import { useStorage } from '../../Context/StorageContext';
import { useAuth } from '../../Context/Context';
import '../../Css/Category.css';
import FoodList from './FoodList';
import axios from 'axios'
import { getallcategoryapi } from '../../Apis/Apirouter';

const Category = () => {
    const [id,setId] = useState("");
    const [category, setCategory] = useState([]);
    const [activeCategory, setActiveCategory] = useState(null);
    const [auth,setAuth] = useAuth();

    const fetchCategoryList = async () => {
        try {
            const response = await axios.get(getallcategoryapi);
            if (response && response.data.success) {
                return response.data.getallcategory;
            } else {
                return [];
            }
        } catch (error) {
            console.log(error);
            return [];
        }
    };

    useEffect(() => {
        const getCategories = async () => {
            const fetchedCategories = await fetchCategoryList();
            setCategory(fetchedCategories);
        };

        if (auth && auth.user) {
            getCategories();
        }
    }, [auth?.user]);

    const handleCategoryClick = (cat) => {
        setActiveCategory(cat);
        console.log(activeCategory);
        setId(cat?._id);
    };

    return (
        <>
            <div className="category-list">
                <h1>Explore Our Category</h1>
                <p className="category-explore">Choose from a diverse list of Categories</p>
                <div className="explore-category">
                    {category.map((cat, index) => (
                        <div
                            key={index}
                            className={`category-button ${activeCategory === cat ? 'active' : 'notactive'}`}
                            onClick={() => handleCategoryClick(cat)}
                        >
                            {cat?.name}
                        </div>
                    ))}
                </div>
            </div>
            <div className = "FoodList">
                <FoodList element ={id}/>
            </div>
        </>
    );
};

export default Category;
