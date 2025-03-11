import React, { useState } from 'react';
import axios from 'axios';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaLocationArrow, FaPhone, FaEnvelope } from 'react-icons/fa'; // Importing specific icons from react-icons

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      setResponseMessage('Please fill all fields');
      return;
    }

    try {
      await axios.post('http://localhost:5050/event/notification/send', {
        name,
        email,
        message,
      });

      setResponseMessage('Message sent successfully!');
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      setResponseMessage('Failed to send message. Please try again later.');
    }
  };

  return (
    <div id="contact" className="container mx-auto p-6 ">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-semibold mb-4">Contact Our Company</h2>
        <p className="text-lg text-gray-700">Feel free to reach out to us through the contact form below.</p>

        <div className="mt-6 bg-white p-6 rounded-lg shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-left">
              <h3 className="font-semibold text-xl"><FaLocationArrow/></h3>
              <p className="text-gray-600">123 Event St, Event City, 12345</p>
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-xl"><FaEnvelope/></h3>
              <p className="text-blue-500">
                <a href="mailto:info@eventcompany.com">info@eventcompany.com</a>
              </p>
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-xl"><FaPhone/></h3>
              <p className="text-gray-600">(123) 456-7890</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center space-x-6">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800"
          >
            <FaFacebookF className="text-2xl" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-600"
          >
            <FaTwitter className="text-2xl" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-500 hover:text-pink-700"
          >
            <FaInstagram className="text-2xl" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 hover:text-blue-900"
          >
            <FaLinkedinIn className="text-2xl" />
          </a>
        </div>
      </div>

      <h2 className="text-3xl font-semibold mb-4 text-center">Contact Us</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Message</label>
          <textarea
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            rows="4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
        </div>

        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md"
          >
            Send Message
          </button>
        </div>
      </form>

      {responseMessage && (
        <div className="mt-4 text-center">
          <p className="text-lg text-gray-700">{responseMessage}</p>
        </div>
      )}
    </div>
  );
};

export default ContactForm;
