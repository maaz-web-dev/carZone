# CarZone API and Frontend

CarZone is a MERN (MongoDB, Express, React, Node.js) stack project that provides APIs and a frontend interface for managing user registration, login, categories, and cars. The system includes CRUD operations for categories and cars, JWT-based authentication, XSS protection, and email integration for user registration.

---

## Features

### User Registration and Login
- Users can sign up with their name and email.
- A welcome email is sent with a randomly generated password.
- Users can log in using their email and password.
- Passwords can be updated after login.

### Dashboard
- Displays the total number of registered categories and cars.
- Shows recent activity logs.

### CRUD Operations
- **Categories**:
  - Add, view, update, and delete categories (e.g., Sedan, SUV, Hatchback).
  - Supports pagination and sorting.
- **Cars**:
  - Add, view, update, and delete cars.
  - Attributes include category, color, model, make, registration number, price, fuel type, mileage, and year.
  - Supports pagination and sorting.

### Security
- JWT-based authentication for route protection.
- XSS protection through input validation.
- Client-side and server-side validation.

### Frontend
- Uses **Material UI (MUI)** for UI components.
- Responsive sign-in and sign-up pages.
- Dashboard for managing cars and categories.
- Data tables with sorting and pagination.

---

## Technology Stack

### Backend:
- **Node.js**
- **Express.js**
- **MongoDB (Mongoose)**
- **JWT (jsonwebtoken)**
- **Nodemailer** for email integration

### Frontend:
- **React.js**
- **Material UI (MUI)**

---

## Installation and Setup

### Prerequisites
1. Install [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/).
2. Install [MongoDB](https://www.mongodb.com/) and ensure it is running locally or use a cloud-based MongoDB service (e.g., MongoDB Atlas).

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/carzone-api.git
   cd carzone-api
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/carzone
   JWT_SECRET=your_jwt_secret
   EMAIL_USER=your_email@example.com
   EMAIL_PASS=your_email_password
   ```
4. Start the server:
   ```bash
   npm run dev
   ```
   The server will run at `http://localhost:5000`.

### Frontend Setup
1. Clone the frontend repository:
   ```bash
   git clone https://github.com/your-repo/carzone-frontend.git
   cd carzone
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend:
   ```bash
   npm run dev
   ```
   The frontend will run at `http://localhost:3000`.

Both the backend and frontend can be run using `npm run dev` in their respective directories.

---

## API Documentation

### Authentication

#### Register User
- **Endpoint**: `POST /api/users/register`
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john.doe@example.com"
  }
  ```
- **Response**:
  ```json
  {
    "message": "User registered successfully"
  }
  ```

#### Login User
- **Endpoint**: `POST /api/users/login`
- **Request Body**:
  ```json
  {
    "email": "test@example.com",
    "password": "randomGeneratedPassword"
  }
  ```
- **Response**:
  ```json
  {
    "token": "your_jwt_token",
    "message": "Login successful"
  }
  ```

### Categories

#### Create Category
- **Endpoint**: `POST /api/categories`
- **Request Body**:
  ```json
  {
    "name": "Sedan",
    "description": "A small passenger car"
  }
  ```

#### Get All Categories
- **Endpoint**: `GET /api/categories?page=1&limit=10&sort=name`

#### Update Category
- **Endpoint**: `PUT /api/categories/:id`
- **Request Body**:
  ```json
  {
    "name": "Luxury Sedan",
    "description": "A premium passenger car"
  }
  ```

#### Delete Category
- **Endpoint**: `DELETE /api/categories/:id`

### Cars

#### Create Car
- **Endpoint**: `POST /api/cars`
- **Request Body**:
  ```json
  {
    "category": "category_id",
    "color": "Red",
    "model": "2023",
    "make": "Toyota",
    "registrationNo": "ABC-100",
    "price": 25000,
    "fuelType": "Petrol",
    "mileage": 15.5,
    "year": 2001
  }
  ```

#### Get All Cars
- **Endpoint**: `GET /api/cars?page=1&limit=10&sort=price`

#### Update Car
- **Endpoint**: `PUT /api/cars/:id`
- **Request Body**:
  ```json
  {
    "category": "category_id",
    "color": "Red",
    "model": "2023",
    "make": "Toyota",
    "registrationNo": "ABC-123",
    "price": 25000,
    "fuelType": "Petrol",
    "mileage": 15.5,
    "year": "2023"
  }
  ```

#### Delete Car
- **Endpoint**: `DELETE /api/cars/:id`

#### Get Car Count
- **Endpoint**: `GET /api/cars/count`

---

## Additional Information

- **XSS Protection**: Input validation is implemented to prevent XSS attacks.
- **JWT Implementation**: Protected routes require a valid JWT token in the `Authorization` header.

---

## Contributing

If you’d like to contribute, feel free to submit a pull request. For major changes, please open an issue first to discuss what you’d like to change.

---

## License

This project is licensed under the MIT License.

---

## Walkthrough Video

A Loom video walkthrough of the project has been recorded and is available at:
_To be added_

---

## Contact

For any questions, reach out to:
- **Email**: maazkhaansofteng@gmail.com
