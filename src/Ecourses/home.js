import React from "react";
import Carousel from "./carousel.js";
import Header from "./header.js";
import Content from "./content.js";
import Footer from "./footer.js";
import About from "./about.js";
import Course from "./course.js";
import Teacher from "./teacher.js";
import Contact from "./contact.js";
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
            </Routes>
        </BrowserRouter>
    );
};

export default Home;