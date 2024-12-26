import React from "react";
import Header from "./header.js";
import Footer from "./footer.js";

const Head = () => {
    return(
        <div className="container-fluid page-header" style={{marginBottom: "90px"}}>
        <div className="container">
            <div className="d-flex flex-column justify-content-center" style={{minHeight: "300px"}}>
                <h3 className="display-4 text-white text-uppercase">Liên hệ</h3>
                <div className="d-inline-flex text-white">
                    <p className="m-0 text-uppercase"><a className="text-white" href="/">Trang chủ</a></p>
                    <i className="fa fa-angle-double-right pt-1 px-3"></i>
                    <p className="m-0 text-uppercase">Liên hệ</p>
                </div>
            </div>
        </div>
    </div>
    );
};

const Contact = () => {
    return(
        <>
            <Header />
            <Head />
            <div className="container-fluid py-5">
                <div className="container py-5">
                    <div className="text-center mb-5">
                        <h5
                            className="text-primary text-uppercase mb-3"
                            style={{ letterSpacing: 5 }}
                        >
                            Liên hệ
                        </h5>
                        <h1>Liên hệ để được hỗ trợ</h1>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="contact-form bg-secondary rounded p-5">
                            <div id="success" />
                                <form name="sentMessage" id="contactForm" noValidate="novalidate">
                                    <div className="control-group">
                                        <input
                                            type="text"
                                            className="form-control border-0 p-4"
                                            id="name"
                                            placeholder="Họ"
                                            required="required"
                                            data-validation-required-message="Please enter your name"
                                        />
                                        <p className="help-block text-danger" />
                                    </div>
                                    <div className="control-group">
                                        <input
                                            type="text"
                                            className="form-control border-0 p-4"
                                            id="name"
                                            placeholder="Tên"
                                            required="required"
                                            data-validation-required-message="Please enter your name"
                                        />
                                        <p className="help-block text-danger" />
                                    </div>
                                    <div className="control-group">
                                        <input
                                            type="email"
                                            className="form-control border-0 p-4"
                                            id="email"
                                            placeholder="Email"
                                            required="required"
                                            data-validation-required-message="Please enter your email"
                                        />
                                        <p className="help-block text-danger" />
                                    </div>
                                    <div className="control-group">
                                        <input
                                            type="text"
                                            className="form-control border-0 p-4"
                                            id="subject"
                                            placeholder="Tiêu đề"
                                            required="required"
                                            data-validation-required-message="Please enter a subject"
                                        />
                                        <p className="help-block text-danger" />
                                    </div>
                                    <div className="control-group">
                                        <textarea
                                            className="form-control border-0 py-3 px-4"
                                            rows={5}
                                            id="message"
                                            placeholder="Lời nhắn"
                                            required="required"
                                            data-validation-required-message="Please enter your message"
                                            defaultValue={""}
                                        />
                                        <p className="help-block text-danger" />
                                    </div>
                                    <div className="text-center">
                                        <button
                                            className="btn btn-primary py-3 px-5"
                                            type="submit"
                                            id="sendMessageButton"
                                        >
                                            Gửi
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Contact;