import { Button } from "@mui/material";
//import { Link } from "react-router-dom";

//Create a hero component with background image, h1, p, and get started button
// Path: client/src/component/Hero.jsx

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-content">
        <h1>Christmas Event Management Made Easy</h1>
        <p>
          Organize your event calendar with ease. Create, edit, and delete
          calendars with just a click.
        </p>
        <a href="/register">
          <Button variant="contained">Get Started</Button>
        </a>
      </div>
    </div>
  );
};

export default Hero;
