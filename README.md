# Tract and Teast Application

## Overview

Tract and Teast is a MERN stack application that allows users to explore, buy, and review a variety of foods. Admins can manage categories and foods, while users can add items to their cart, make payments using Razorpay, and leave ratings and reviews. The application leverages Redis caching to improve performance by caching foods, categories, and top-rated foods.

## Features

- **Admin Panel**: Admins can add multiple categories and foods associated with each category.
- **User Shopping**: Users can add foods to their cart and purchase them using Razorpay payment integration.
- **Cart Management**: Users can add and remove foods from their cart.
- **Reviews and Ratings**: Users can give ratings and reviews to each food item and delete their reviews.
- **Top Rated Foods**: A section that displays top-rated foods based on user ratings.
- **Contact Us**: Users can contact the admin by filling out a contact us form.
- **Password Management**: Forgot password and reset password functionality using SMTP protocol.
- **Performance**: Utilizes Redis cache to improve performance by fetching foods, categories, and top-rated foods from the cache if available.

## Key Technologies Used

- **Frontend**: React
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Caching**: Redis
- **Payment Integration**: Razorpay
- **Authentication**: JWT, bcrypt for password hashing
- **Email**: SMTP protocol for forgot and reset password functionality

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-repository.git
    ```
2. Navigate to the project directory:
    ```bash
    cd tract-and-teast
    ```
3. Install server dependencies:
    ```bash
    cd backend
    npm install
    ```
4. Install client dependencies:
    ```bash
    cd ../frontend
    npm install
    ```
5. Set up environment variables:
    - Create a `.env` file in the `backend` directory and add the following variables:
      ```
      MONGO_URI=your_mongodb_uri
      JWT_SECRET=your_jwt_secret
      RAZORPAY_KEY=your_razorpay_key
      RAZORPAY_SECRET=your_razorpay_secret
      SMTP_HOST=your_smtp_host
      SMTP_PORT=your_smtp_port
      SMTP_USER=your_smtp_user
      SMTP_PASS=your_smtp_password
      REDIS_HOST=your_redis_host
      REDIS_PORT=your_redis_port
      REDIS_PASSWORD=your_redis_password
      ```

## Running the Application

1. Start the backend server:
    ```bash
    cd backend
    npm start
    ```
2. Start the frontend server:
    ```bash
    cd ../frontend
    npm start
    ```

## Usage

- **Admin**: 
  - Log in to the admin panel to manage categories and foods.
  - View and manage user contact messages.
- **User**:
  - Browse through categories and add foods to the cart.
  - Purchase foods using Razorpay.
  - Add and remove items from the cart.
  - Rate and review food items.
  - Use the contact form to send messages to the admin.
  - Reset password via email if forgotten.

## Contact

For any issues or inquiries, please contact [your-email@example.com].

---

This README provides a brief overview of the Tract and Teast application, its features, and setup instructions. For more detailed information, please refer to the project documentation.

## Admin Panel View


<img width="948" alt="pic12" src="https://github.com/user-attachments/assets/293c99a5-b53c-4260-8836-72c8fff8ec1d"><img width="939" alt="pic14" src="https://github.com/user-attachments/assets/f759e37a-827f-4e88-9309-97d8ae81236f">
<img width="940" alt="pic13" src="https://github.com/user-attachments/assets/68c2c1f1-c8ac-4e87-8289-6e016ad2482d">
<img width="816" alt="pic15" src="https://github.com/user-attachments/assets/c80b4a7e-1ad5-41d4-862f-df18f3c2a647">


