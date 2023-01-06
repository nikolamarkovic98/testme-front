import "./index.css";
import React, { useState } from "react";
import { sendHTTP } from "../../requests";

const ContactPage = () => {
    const [emailData, setEmailData] = useState({
        email: "",
        subject: "",
        text: "",
    });
    const [message, setMessage] = useState("");

    const sendEmail = async (e) => {
        e.preventDefault();

        if (
            !emailData.email.trim() ||
            !emailData.subject.trim() ||
            !emailData.text.trim()
        ) {
            printMessage("Please enter required information");
            return;
        }

        const query = {
            query: `query{sendEmail(from:"${emailData.email}",subject:"${emailData.subject}",text:"${emailData.text}")}`,
        };

        try {
            const res = await sendHTTP(query);
            console.log(res);
            if (res.data.sendEmail) {
                if (res.data.sendEmail === "Success") {
                    printMessage(res.data.sendEmail);
                } else {
                    printMessage("An error occurred while sending email");
                }
            }
        } catch (err) {
            printMessage(err);
        }
    };

    const handleInput = (e) => {
        setEmailData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const printMessage = (msg) => {
        setMessage(msg);
        setTimeout(() => setMessage(""), 4000);
    };

    return (
        <div className="contact-wrapper">
            <div className="contact">
                <h1>
                    Contact <span>me! :)</span>
                </h1>
                <form onSubmit={sendEmail}>
                    <div className="form-box">
                        <input
                            type="text"
                            name="email"
                            autoComplete="off"
                            placeholder="Your email"
                            onChange={handleInput}
                            value={emailData.email}
                        />
                    </div>
                    <div className="form-box">
                        <input
                            type="text"
                            name="subject"
                            autoComplete="off"
                            placeholder="Subject"
                            onChange={handleInput}
                            value={emailData.subject}
                        />
                    </div>
                    <div className="form-box">
                        <textarea
                            placeholder="Message"
                            name="text"
                            onChange={handleInput}
                            value={emailData.text}
                        ></textarea>
                    </div>
                    <button type="submit" className="classic-btn">
                        Send email
                    </button>
                </form>
                <p className="msg">{message}</p>
            </div>
        </div>
    );
};

export default ContactPage;
