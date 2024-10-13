
 MediCare - Healthy Life

MediCare is a healthcare management system designed to provide efficient medical services and facilitate easy communication between patients, doctors, and hospital administration. With an emphasis on smooth management of appointments, staff, and medical records, MediCare aims to make the healthcare experience more accessible and user-friendly.

 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Database Models](#database-models)
- [Contributing](#contributing)
- [License](#license)

 Features

- User Registration and Login: Patients can register, log in, and manage their profiles.
- Admin Dashboard: Admins can manage users, doctors, staff, and appointments.
- Doctor Management: Doctors' information such as specialization, qualifications, and consultation fees are available for easy access.
- Appointment Booking: Patients can schedule appointments with doctors.
- Staff Management: Admins can add, edit, and delete staff records.
- Mobile Banking Integration: Integration with bKash and Rocket for secure payments.

 Tech Stack

- Frontend: React.js, Tailwind CSS
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT (JSON Web Tokens)
- Payment: bKash, Rocket, and other mobile banking systems
- Version Control: Git and GitHub

 Installation

 Prerequisites

- Node.js and npm installed
- MongoDB instance running locally or on a cloud service like MongoDB Atlas

 Steps

1. Clone the repository:

   bash
   git clone https://github.com/your-username/MediCare.git
   

2. Navigate to the project directory:

   cd MediCare

3. Install dependencies:

   npm install

4. Set up environment variables:

   Create a `.env` file in the root directory and add the following variables:

   DB_SECRET=<your MongoDB connection string>
   JWT_SECRET=<your JWT secret>
   HASH_SALT=<your hash salt value>
   SESSION_SECRET=<your session secret>
   STORE_ID=<your bKash store ID>
   STORE_PASSWORD=<your bKash store password>
   

5. Start the server:

   npm start
   

6. Access the application:

   Visit `http://localhost:3000` in your browser to access the application.

 Usage

For Patients:

- Register and log in.
- Book appointments with doctors.
- View and update your profile information.

 For Admins:

- Manage staff, doctors, and patients.
- View and manage appointments.
- Update your profile and change passwords securely.

 Payment Integration:

- Make payments for appointments via bKash or Rocket.

 API Endpoints

 User Routes

- `POST /api/user/register` - Register a new user
- `POST /api/user/login` - Log in as a user

 Admin Routes

- `GET /api/admin/staffs` - View staff records
- `POST /api/admin/staffs` - Add new staff
- `PUT /api/admin/staffs/:id` - Update staff information
- `DELETE /api/admin/staffs/:id` - Delete staff

 Appointment Routes

- `POST /api/appointments` - Book an appointment
- `GET /api/appointments` - Get all appointments

 Doctor Routes

- `GET /api/doctors` - Fetch doctor information

 Database Models

 User

- `fname`, `lname`, `email`, `password`, `phone`, `role`, `department`

 Doctor

- `fname`, `lname`, `email`, `phone`, `specialization`, `license_number`, `years_of_experience`, `qualifications`, `consultation_fee`, `department`, `employee_id`, `url`

 Appointment

- `transId`, `d_id` (doctor ID), `c_id` (customer ID), `payment_status`

 Staff

- `fname`, `lname`, `email`, `phone`, `gender`, `role`, `joining_date`, `employee_id`, `department`, `address`

 Contributing

We welcome contributions to MediCare! If you have any suggestions or improvements, feel free to open an issue or submit a pull request.

 Steps to Contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request.

 License

MediCare is licensed under the MIT License.
