import React, { useRef } from "react";
import { Carousel, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import "./MyCarousel.css";

const MyCarousel = () => {
  const carouselRef = useRef(null);

  const handleImageClick = () => {
    if (carouselRef.current) {
      carouselRef.current.next();
    }
  };

  return (
    <div className="carousel-container">
        
      <Carousel fade interval={2000} indicators={false} controls={false} ref={carouselRef}>
        {[ 
          {
            src: "https://eventsmanagementkerala.com/wp-content/uploads/2023/05/blue-white-wedding-aisle-beach-surrounded-by-palms-with-sea-background.webp",
            alt: "Wedding 1",
            title: "Best Wedding Venues",
            description: "Find the perfect location for your dream wedding in Kerala.",
            link: "/venues"
          },
          {
            src: "https://eventsmanagementkerala.com/wp-content/uploads/2022/09/WhatsApp-Image-2022-08-26-at-7.53.33-PM.webp",
            alt: "Wedding 2",
            title: "Luxury & Traditional Weddings",
            description: "From resorts to local mandapas, we have it all!",
            link: "/weddings"
          },
          {
            src: "https://eventsmanagementkerala.com/wp-content/uploads/2023/05/beautiful-photozone-with-big-wreath-decorated-with-greenery-roses-centerpiece-candles-sides-garland-hanged-trees.webp",
            alt: "Wedding 3",
            title: "Memorable Events",
            description: "Let us help you create an unforgettable experience.",
            link: "/events"
          }
        ].map((item, index) => (
          <Carousel.Item key={index}>
            <img className="carousel-image" src={item.src} alt={item.alt} onClick={handleImageClick} />
            <Carousel.Caption className="carousel-caption">
              <div className="carousel-content">
                <Link to={item.link} className="carousel-title">
                  <h1>{item.title}</h1>
                </Link>
                <p>{item.description}</p>
                <div className="social-icons">
                  <Link to="https://facebook.com" target="_blank"><FaFacebookF size={30} className="social-icon" /></Link>
                  <Link to="https://instagram.com" target="_blank"><FaInstagram size={30} className="social-icon" /></Link>
                  <Link to="https://twitter.com" target="_blank"><FaTwitter size={30} className="social-icon" /></Link>
                  <Link to="https://linkedin.com" target="_blank"><FaLinkedin size={30} className="social-icon" /></Link>
                </div>
                <Button variant="light" className="contact-button" as={Link} to="/contact">
                  Contact Us
                </Button>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default MyCarousel;
