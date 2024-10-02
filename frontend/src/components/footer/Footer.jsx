import {Link} from 'react-router-dom'
import { MyMap } from "../Map/Map"

export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-200 py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Medicare</h2>
            <p className="mb-4">
              We are dedicated to providing the best healthcare services to ensure a healthy life for all.
            </p>
           
          </div>
          
  
          <div>
            <h2 className="text-xl font-semibold mb-4">Quick Links</h2>

            <div>
            <Link to="/doctors">
                            <p className=" hover:text-white">
                                Doctors
                            </p>
                        </Link>

                        <Link to="/services">
                        <p className=" hover:text-white">
                                Services
                            </p>
                        </Link>

                        <Link to="/departments">
                        <p className=" hover:text-white">
                                Departments
                            </p>
                        </Link>

                        <Link to="/about">
                        <p className=" hover:text-white  ">
                                About
                            </p>
                        </Link>
                        <Link to="/register">
                        <p className=" hover:text-white  ">
                               Sign Up
                            </p>
                        </Link>
            </div>

          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
            <p>123 Healthcare Street</p>
            <p>City, State, 12345</p>
            <p>Email: info@medicare.com</p>
            <p>Phone: +1 (123) 456-7890</p>
          </div>
          <div >
            <h2 className="text-xl text-center font-semibold mb-4">Location on Map</h2>
            <MyMap/>
          </div>
        </div>
      </div>
      <div className="mx-4 mt-3">
      <p>© 2024 Medicare. All Rights Reserved.</p>
      </div>
    </footer>
  );
};
