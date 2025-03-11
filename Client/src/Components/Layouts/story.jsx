// src/AboutEvent.js
import React from "react";

const AboutEvent = () => {
  return (
    <div id="story" className="py-12 bg-gray-100">
      {/* Title Section */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-semibold text-green-600 mb-4">
          About Our Event Management System
        </h2>
        <p className="text-xl text-gray-700">
          We streamline event planning to create a seamless experience for event organizers and attendees.
        </p>
      </div>

      {/* Description and Image Section */}
      <div className="container mx-auto px-4 lg:px-16 flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0 gap-10">
        {/* Left Description */}
        <div className="lg:w-1/2 space-y-6 text-gray-700">
          <p className="text-lg">
            Our Event Management System is designed to simplify the entire process of event planning, from initial setup to managing the event day. 
            With a user-friendly interface, organizers can easily create events, track attendee registrations, and communicate updates with attendees in real-time.
          </p>
          <p className="text-lg">
            Whether it's a small meetup or a large conference, our platform ensures every detail is covered, allowing organizers to focus on creating memorable experiences.
          </p>
        </div>

        {/* Right Image */}
        <div className="lg:w-1/2 flex justify-center">
          <img
            src="https://th.bing.com/th/id/R.e3b28ba80ced3a531302cfcbeeddf24b?rik=uCdNtqmgqQZhqw&riu=http%3a%2f%2fwww.walkereventmanagement.com%2fwp-content%2fuploads%2f2017%2f10%2fevent-banner-1030x542.jpg&ehk=rf6jQg43%2fbbi2fXEl41%2f6PgiYewquOQCzzX3y3rBYms%3d&risl=&pid=ImgRaw&r=0"
            alt="Event Management"
            className="w-full h-auto rounded-lg shadow-md object-cover"
          />
        </div>
      </div>

      {/* Key Features Section */}
      <div className="text-center mt-12">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Key Features:</h3>

        {/* Features List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="flex items-start space-x-3">
            <span className="text-green-600">•</span>
            <p className="text-lg text-gray-600">Efficient event creation and management</p>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600">•</span>
            <p className="text-lg text-gray-600">Real-time attendee tracking and updates</p>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600">•</span>
            <p className="text-lg text-gray-600">Comprehensive event scheduling tools</p>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600">•</span>
            <p className="text-lg text-gray-600">User-friendly interface for both organizers and attendees</p>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600">•</span>
            <p className="text-lg text-gray-600">Powerful event performance reporting</p>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-600">•</span>
            <p className="text-lg text-gray-600">Seamless integration with social media platforms</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutEvent;
