"use client";
// @flow strict
import { isValidEmail } from '@/utils/check-email';
import emailjs from '@emailjs/browser'; // Update import
import { useState } from 'react';
import { BsArrowRightShort } from "react-icons/bs"; // Update icon import
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRef } from 'react';
import styled from 'styled-components';

function ContactForm() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_4h4sako', // Corrected environment variable usage
        'template_o6sym37', // Corrected environment variable usage
        form.current,
        '1up9aB2deQPU1J8wG', // Corrected environment variable usage
      ).then(
        () => {
          console.log('SUCCESS!');
          toast.success('Email sent Successfully!');
        },
        (error) => {
          console.log('FAILED...', error.text);
          toast.error('Failed to send email!');
        },
      );
  };
  const [input, setInput] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [error, setError] = useState({
    email: false,
    required: false,
  });

  const checkRequired = () => {
    if (input.email && input.message && input.name) {
      setError({ ...error, required: false });
    }
  };

  const handleSendMail = async (e) => {
    e.preventDefault();
    if (!input.email || !input.message || !input.name) {
      setError({ ...error, required: true });
      return;
    } else if (error.email) {
      return;
    } else {
      setError({ ...error, required: false });
    };

    const serviceID = "service_4h4sako"; // Replace with your service ID
    const templateID = "template_o6sym37"; // Replace with your template ID
    const userID = "1up9aB2deQPU1J8wG"; // Replace with your user ID (public key)

    try {
      const res = await emailjs.send(serviceID, templateID, input, userID); // Pass user ID directly

      if (res.status === 200) {
        toast.success('Message sent successfully!');
        setInput({
          name: '',
          email: '',
          message: '',
        });
      };
    } catch (error) {
      toast.error(error?.text || error);
    };
  };

  const handleChange = (e) => {
    const {name, value} = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  return (
    <div className="w-full h-auto flex flex-col">
     <p className="font-medium mb-5 text-[#16f2b3] text-xl uppercase">
        Contact with me
      </p>
      <div className="max-w-3xl text-white rounded-lg border border-[#464c6a] p-3 lg:p-5">
        <p className="text-sm text-[#d3d8e8]">
          {"If you have any questions or concerns, please don't hesitate to contact me. I am open to any work opportunities that align with my skills and interests."}
        </p>
       <Container>
        <StyledContactForm>
          <form ref={form} onSubmit={sendEmail}>
            <label>Name</label>
            <input type="text" name="user_name"  onChange={handleChange} />
            <label>Email</label>
            <input type="email" name="user_email"  onChange={handleChange}/>
            <label>Message</label>
            <textarea name="message" onChange={handleChange} />
            <input type="submit" value="Send" />
          </form>
        </StyledContactForm>
      </Container>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 87.3vh;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const StyledContactForm = styled.div`
  width: 400px;
  background-color: white;
  padding: 20px;
  border-radius: 15px;

  form {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
    font-size: 16px;

    input,
    textarea {
      width: 100%;
      padding: 7px;
      margin-bottom: 10px;
      outline: none;
      border-radius: 5px;
      border: 1px solid rgb(220, 220, 220);
      color:black;

      &:focus {
        border: 2px solid rgba(0, 206, 158, 1);
      }
    }

    textarea {
      min-height: 100px;
      max-height: 100px;
    }

    label {
      margin-top: 1rem;
      color:black;
    }

    input[type='submit'] {
      margin-top: 2rem;
      cursor: pointer;
      background: rgb(249, 105, 14);
      color: black;
      border: none;

    }
  }
`;
export default ContactForm;