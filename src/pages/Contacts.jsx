import  { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";

const Contacts = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple form validation
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.message) newErrors.message = "Message is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Handle successful submission
    setSubmitted(true);
    alert("Form submitted successfully!");

    // Reset form fields
    setFormData({ name: "", email: "", message: "" });
    setErrors({});
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  
  
    useEffect(() => {
      const hasVisited = sessionStorage.getItem("visited");
  
      if (hasVisited) {
        // Already visited → no loader
        setLoading(false);
      } else {
        // First time visit → show loader
        sessionStorage.setItem("visited", "true");
        setTimeout(() => setLoading(false), 2000); // loader runs for 2 sec
      }
    }, []);

    if (loading) return <Loader />;

  return (
    <div className="bg-gray-900  py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-white text-center mb-8">
          Contact Us
        </h2>

        {submitted && (
          <div className="mb-4 text-green-500 font-semibold text-center">
            Thank you for your message! We  will get back to you soon.

          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-lg font-semibold text-white">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-2 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Your Name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-2">{errors.name}</p>
            )}
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-lg font-semibold text-white">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-2 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Your Email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-2">{errors.email}</p>
            )}
          </div>

          {/* Message Textarea */}
          <div>
            <label htmlFor="message" className="block text-lg font-semibold text-white">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="6"
              value={formData.message}
              onChange={handleChange}
              className="mt-2 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Your Message"
            ></textarea>
            {errors.message && (
              <p className="text-red-500 text-sm mt-2">{errors.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-md shadow-lg focus:ring-4 focus:ring-blue-400 focus:outline-none transition duration-300"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
      <div className=" my-10 border-t-2 border-gray-300/50"></div>
    </div>
  );
};

export default Contacts;

