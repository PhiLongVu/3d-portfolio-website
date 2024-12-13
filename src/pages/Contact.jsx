import React, { useRef, useState } from 'react'
import emailjs from 'emailjs-com'

const Contact = () => {
  formRef = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
   }
   const handleSubmit = (e) => {
      e.preventDefault();
      setIsLoading(true);

      emailks.sendform(
        'service_1s59md1',
        'template_rxblx35'
      )
   }
  const handleFocus = (e) => { }
  const handleBlur = (e) => { }
  return (
    <section className="relative flex lg:flex-grow flex-col max-container">
      <div className="flex-1 min-w-[%50] flex flex-col">
        <h1 className="head-text"> Get in touch</h1>
        <form className="w-full flex flex-col gap-7 mt-14">
        <label className="text-black-500 font-semibold">Name
          <input type="text" placeholder="Name" className="input" required value={form.name} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} />
          </label>
          <label className="text-black-500 font-semibold">Email
          <input type="email" placeholder="Email" className="input" required value={form.email} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur}/>
          </label>
          <label className="text-black-500 font-semibold">Message
          <textarea placeholder="Let me know how I can help you" rows={4} className="textarea" required value={form.message} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur}/>
          </label>
          <button  type="submit" className="btn" disabled={isLoading} onBlur={handleBlur} onFocus={handleFocus}>
            {isLoading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  )
}

export default Contact