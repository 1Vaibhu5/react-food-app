import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./Contact.css";

const Contact = () => {
  const formRef = useRef();
  const [status, setStatus] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus("sending");

    emailjs
      .sendForm(
        "service_vaibhavi15",
        "template_rocnlia",
        formRef.current,
        "e9fgqcIyDlU0_bBkF"
      )
      .then(
        () => {
          setStatus("success");
          formRef.current.reset();
        },
        () => {
          setStatus("error");
        }
      );
  };

  return (
    <div className="contact-page">
      <div className="contact-card">
        <h2>Contact Us</h2>

        <form ref={formRef} onSubmit={sendEmail}>
          <input type="text" name="from_name" placeholder="Enter Name" required />
          <input type="email" name="from_email" placeholder="Enter Email" required />
          <textarea name="message" placeholder="Enter Message" required />

          <button type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Sending..." : "Send Message"}
          </button>

          {status === "success" && <p className="success">✅ Message Sent Successfully</p>}
          {status === "error" && <p className="error">❌ Failed to Send Message</p>}
        </form>
      </div>
    </div>
  );
};

export default Contact;
