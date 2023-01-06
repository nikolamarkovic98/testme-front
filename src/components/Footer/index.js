import React from "react";
import { Link } from "react-router-dom";

import BgPicture from "./bg.png";
import "./index.css";

const Footer = () => {
    return (
        <footer>
            <div className="one">
                <img src={BgPicture} className="bg" alt="Unable to load" />
                <div className="content-wrap">
                    <div className="footer-box">
                        <h2>Code</h2>
                        <p>
                            testMe is open source, feel free to contribute to
                            project or make your own version!
                        </p>
                        <a
                            href="https://github.com/nikolamarkovic98/testme"
                            rel="noopener noreferrer"
                            target="_blank"
                            className="classic-btn"
                        >
                            testMe on GitHub
                        </a>
                    </div>
                    <div className="footer-box">
                        <h2>Links</h2>
                        <ul>
                            <li>
                                <Link to="/contact">
                                    <span className="span-color">&#8594;</span>{" "}
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <a
                                    href="https://github.com/nikolamarkovic98"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    <span className="span-color">&#8594;</span>{" "}
                                    Creator GitHub
                                </a>
                            </li>
                            <li>
                                <a
                                    href="http://portfolio-nikola.herokuapp.com/"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    <span className="span-color">&#8594;</span>{" "}
                                    Creator Portfolio
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.linkedin.com/in/nikola-markovic-1a6267162"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    <span className="span-color">&#8594;</span>{" "}
                                    Creator Linkedin
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="two">
                <h2 className="logo">
                    <Link to="/">testMe</Link>
                </h2>
                <span>Nikola Markovic © 2020</span>
            </div>
        </footer>
    );
};

export default Footer;
