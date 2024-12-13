import React, { Suspense, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import Fox from '../models/Fox'
import { Canvas } from '@react-three/fiber';
import Loader from '../components/Loader';

const Contact = () => {
  const formRef = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState('idle');
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setCurrentAnimation('hit');

    emailjs.send(
      import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
      {
        from_name: form.name,
        to_name: "Phi Vu",
        from_email: form.email,
        to_email: 'vuphilong2605@gmail.com',
        message: form.message,
      },
      import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
    ).then(() => {
      setIsLoading(false);
    }).catch((error) => {
      setCurrentAnimation('idle');
      setIsLoading(false);
    });
  };


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleFocus = (e) => { setCurrentAnimation('walk'); }
  const handleBlur = (e) => { setCurrentAnimation('idle'); }
  return (
    <section className="relative flex lg:flex-grow flex-col max-container">
      <div className="flex-1 min-w-[%50] flex flex-col">
        <h1 className="head-text"> Get in touch</h1>
        <form
          ref={formRef} // Attach the form ref here
          className="w-full flex flex-col gap-7 mt-14"
          onSubmit={handleSubmit} // Attach the onSubmit handler here
        >
          <label className="text-black-500 font-semibold">
            Name
            <input
              type="text"
              name="name" // Add a name attribute for identification
              placeholder="Name"
              className="input"
              required
              value={form.name}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>
          <label className="text-black-500 font-semibold">
            Email
            <input
              type="email"
              name="email" // Add a name attribute for identification
              placeholder="Email"
              className="input"
              required
              value={form.email}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>
          <label className="text-black-500 font-semibold">
            Message
            <textarea
              name="message" // Add a name attribute for identification
              placeholder="Let me know how I can help you"
              rows={4}
              className="textarea"
              required
              value={form.message}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>
          <button
            type="submit"
            className="btn"
            disabled={isLoading}
            onBlur={handleBlur}
            onFocus={handleFocus}
          >
            {isLoading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
      <div className="lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px]">
        <Canvas
          camera={{
            position: [0, 0, 5],
            fov: 75,
            near: 0.1,
            far: 1000,
          }}>
          <directionalLight position={[1, 1, 1]} intensity={2.4}></directionalLight>
          <ambientLight intensity={0.5}></ambientLight>
          <Suspense fallback={<Loader />}>
            <Fox
              currentAnimation={currentAnimation}
              position={[0.5, 0.35, 0]}
              rotation={[12.629, -0.6, 0]}
              scale={[0.5, 0.5, 0.5]}
            />
          </Suspense>

        </Canvas>
      </div>
    </section>
  )
}

export default Contact
