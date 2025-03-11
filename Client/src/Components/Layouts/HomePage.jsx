import React from "react";
import MyNavbar from "./NavBar"
import { Container } from "react-bootstrap";
import MyCarousel from "./carousel";
import EventDescription from "./story";
import ContactForm from "./contact";


const HomePage = () => {
  return (
    <>
      <MyNavbar/>
      <Container fluid className="p-0 mt-5">
        <MyCarousel />
      </Container>
      <EventDescription/>
      <ContactForm/>
    </>
  );
};

export default HomePage;
