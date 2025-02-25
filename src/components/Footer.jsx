import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">Real Estate Co.</h3>
          <p className="text-gray-400">
          Your Reliable Companion in Discovering Your Dream Home.
          </p>
        </div>


        <div>
          <h4 className="font-bold mb-4">Contact Info</h4>
          <ul className="space-y-2 text-gray-400">
            <li>56/31,Puliyankulam , Trincomalee</li>
            <li>Srilanka</li>
            <li>contact@realestate.com</li>
            <li>+94763555537</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4">Follow Us</h4>

          <div className="flex space-x-4">
            <a href="https://www.facebook.com/">
              <FaFacebook className="text-gray-400 hover:text-white transition-colors duration-200 text-2xl cursor-pointer" />
            </a>

            <a href="https://www.instagram.com/">
              <FaInstagram className="text-gray-400 hover:text-white transition-colors duration-200 text-2xl cursor-pointer" />
            </a>

            <a href="https://www.linkedin.com/">
              <FaLinkedin className="text-gray-400 hover:text-white transition-colors duration-200 text-2xl cursor-pointer" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
