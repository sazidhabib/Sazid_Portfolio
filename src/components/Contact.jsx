import { useState } from 'react';
import { motion } from 'framer-motion';

import { styles } from '../styles';
import { EarthCanvas } from './canvas';
import { SectionWrapper } from '../hoc';
import { slideIn } from '../utils/motion';
import LoadingSpinner from './LoadingSpinner';

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
        setError('Please fill in all fields');
        setLoading(false);
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email)) {
        setError('Please enter a valid email address');
        setLoading(false);
        return;
      }

      const formAction = 'https://formsubmit.co/mahabubsazid88@gmail.com';
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('email', form.email);
      formData.append('message', form.message);

      const response = await fetch(formAction, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setSubmitted(true);
        setForm({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setError('Failed to send message. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden">
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] glass-card rounded-2xl p-8"
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-accent/10 border border-accent/20 rounded-lg text-accent text-sm"
          >
            Message sent successfully! I&apos;ll get back to you soon.
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-6">
          <label className="flex flex-col">
            <span className="text-white font-medium mb-2 text-sm">Your Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="What's your good name?"
              className="bg-white/5 border border-white/10 py-3 px-5 placeholder:text-slate-500 text-white rounded-lg outline-none focus:border-accent/40 transition-colors font-medium text-sm disabled:opacity-50"
              required
              disabled={loading}
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-2 text-sm">Your Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="What's your email address?"
              className="bg-white/5 border border-white/10 py-3 px-5 placeholder:text-slate-500 text-white rounded-lg outline-none focus:border-accent/40 transition-colors font-medium text-sm disabled:opacity-50"
              required
              disabled={loading}
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-2 text-sm">Your Message</span>
            <textarea
              rows={5}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="What do you want to say?"
              className="bg-white/5 border border-white/10 py-3 px-5 placeholder:text-slate-500 text-white rounded-lg outline-none focus:border-accent/40 transition-colors font-medium text-sm resize-none disabled:opacity-50"
              required
              disabled={loading}
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="bg-accent hover:bg-accent-dark text-white py-3 px-8 rounded-lg outline-none w-fit font-medium text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 active:scale-[0.97]"
          >
            {loading ? (
              <>
                <LoadingSpinner size="sm" />
                Sending...
              </>
            ) : (
              'Send Message'
            )}
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
