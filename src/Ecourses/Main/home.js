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
import WebDev from "../Subjects/web_dev.js";
import SWEngineering from "../Subjects/sw_eng.js";
import DataSci from "../Subjects/data_sci.js";
import SEO from "../Subjects/seo.js";
import CompSci from "../Subjects/comp_sci.js";
import InfoSec from "../Subjects/info_sec.js";
import CloudComp from "../Subjects/cloud_comp.js";
import CompNet from "../Subjects/comp_net.js";
import LTW from "../Course_Detail/ltw.js";
import AdminIndex from "../Admin/adminIndex.js";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

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
                <Route path="/web_dev" element={<WebDev />}/>
                <Route path="/sw_eng" element={<SWEngineering />}/>
                <Route path="/data_sci" element={<DataSci />}/>
                <Route path="/seo" element={<SEO />}/>
                <Route path="/comp_sci" element={<CompSci />}/>
                <Route path="/info_sec" element={<InfoSec />}/>
                <Route path="/cloud_comp" element={<CloudComp />}/>
                <Route path="/comp_net" element={<CompNet />}/>
                <Route path="/ltw" element={<LTW />}/>
                <Route path="/admin/*" element={<AdminIndex />}/>
                
            </Routes>
        </BrowserRouter>
    );
};

export default Home;