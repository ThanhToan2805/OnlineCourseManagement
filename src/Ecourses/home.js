import React from "react";
import Carousel from "./carousel";
import Header from "./header";
import Content from "./content";
import Footer from "./footer";
import About from "./about";
import Course from "./course";
import Teacher from "./teacher";
import Contact from "./contact";
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