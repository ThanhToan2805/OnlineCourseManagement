import React from "react";
import Carousel from "./carousel.js";
import Header from "./header.js";
import Content from "./content.js";
import Footer from "./footer.js";
import About from "./about.js";
import Course from "./course.js";
import Teacher from "./teacher.js";
import Contact from "./contact.js";
import Login from "./login.js";
import SignUp from "./signup.js";
import RegisteredCourses from "./registered_courses.js";
import WebDev from "./web_dev.js";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const HomePage = () => {
    return (
        <>
            <Header />
            <Carousel />
            <Content />
            <Footer />
        </>
    );
};

const Home = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<About />} />
                <Route path="/course" element={<Course />}/>
                <Route path="/teacher" element={<Teacher />}/>
                <Route path="/contact" element={<Contact />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/signup" element={<SignUp />}/>
                <Route path="/registered_courses" element={<RegisteredCourses />}/>
                <Route path="/web_dev/:macd" element={<WebDev />}/>
            </Routes>
        </BrowserRouter>
    );
};

export default Home;