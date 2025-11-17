import { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import Team from "../components/Team/Team";

const Abouts = () => {

  const [loading, setLoading] = useState(true);

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
    <>
      <section className="bg-gray-900  py-12">
        {/* Container */}
        <div className="container mx-auto px-6 lg:px-16">
          {/* Section Title */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">About Us</h2>
            <p className="text-lg text-white">
              A space where books meet passion and imagination.
            </p>
          </div>

          {/* Store Intro Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image */}
            <div className="flex justify-center lg:justify-start">
              <img
                src="banner.jpg"
                alt="Bookstore Interior"
                className="rounded-lg shadow-lg w-full h-auto object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center">
              <h3 className="text-3xl font-semibold text-white mb-4">
                Who We Are
              </h3>
              <p className="text-gray-600 mb-4">
                Welcome to{" "}
                <span className="font-bold text-blue-500">BookBuy</span>, your
                number one source for a wide range of books from around the
                globe. We’re dedicated to giving you the very best of fiction,
                non-fiction, and childrens books, with a focus on quality,
                customer service, and uniqueness.
              </p>
              <p className="text-gray-600">
                Founded in 2020, our bookstore has come a long way from its
                beginnings in a home office. Now, we serve customers from all
                over the world and are thrilled to be a part of the book-loving
                community.
              </p>
            </div>
          </div>

          {/* Mission Section */}
          <div className="mt-12 text-center">
            <h3 className="text-3xl font-semibold text-white mb-4">
              Our Mission
            </h3>
            <p className="text-white mb-8">
              At BookBuy, our mission is to inspire curiosity, promote
              education, and bring stories to life. We aim to foster a community
              where readers and authors connect, encouraging a lifelong love of
              reading.
            </p>
          </div>

          {/* Team Section */}
          <div className="mt-16">
            <h3 className="text-3xl font-semibold text-white text-center mb-8">
              Meet Our Team
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Team Member 1 */}
              <Team
                img= "human.jpg"
                name="Jane Doe"
                head="Founder & CEO"
                about="Jane has a passion for books and building communities around stories. She started Book Haven with a dream to bring diverse voices to readers everywhere."
              />

              {/* Team Member 2 */}
              <Team
                img= "human2.jpg"
                name="John Smith"
                head="Head of Operations"
                about="John ensures that everything runs smoothly at Book Haven, from
                stock management to customer satisfaction."
              />
              {/* Team Member 3 */}
              <Team
                img= "human3.jpg"
                name="Sarah Lee"
                head="Marketing Director"
                about="Sarah’s creativity and love for storytelling help to bring Book
                Haven’s mission to life across our social media and marketing
                efforts.."
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Abouts;

{
  /* <!-- About Us Section --> */
}
<section className="bg-gray-950 py-16 px-4 md:px-8 lg:px-16">
  <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
    {/* <!-- Image Section --> */}
    <div className="flex justify-center m-auto lg:justify-start h-26 w-[200px]">
      <img
        src="books-stack.png"
        alt="About Us Image"
        className="rounded-lg shadow-lg w-full max-w-sm lg:max-w-md"
      />
    </div>

    {/* <!-- Text Section --> */}
    <div>
      <h2 className="text-4xl font-bold text-white mb-4">About Us</h2>
      <p className="text-gray-600 text-lg mb-6">
        We are a passionate team of professionals, dedicated to providing the
        best services. Our mission is to deliver high-quality solutions tailored
        to our customers needs.
      </p>

      {/* <!-- Key Points/Icons Section --> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex items-center">
          <div className="bg-blue-500 text-white rounded-full p-4 mr-4">
            <svg className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3-8a3 3 0 11-6 0 3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Our Vision</h3>
            <p className="text-gray-600">
              To innovate and inspire through top-notch services.
            </p>
          </div>
        </div>

        <div className="flex items-center">
          <div className="bg-green-500 text-white rounded-full p-4 mr-4">
            <svg className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3-8a3 3 0 11-6 0 3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Our Mission</h3>
            <p className="text-gray-600">
              Delivering tailored solutions for each of our clients.
            </p>
          </div>
        </div>

        <div className="flex items-center">
          <div className="bg-red-500 text-white rounded-full p-4 mr-4">
            <svg className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3-8a3 3 0 11-6 0 3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Our Values</h3>
            <p className="text-gray-600">
              Commitment to quality and continuous improvement.
            </p>
          </div>
        </div>

        <div className="flex items-center">
          <div className="bg-yellow-500 text-white rounded-full p-4 mr-4">
            <svg className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3-8a3 3 0 11-6 0 3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Our Promise</h3>
            <p className="text-gray-600">
              Building long-term partnerships based on trust.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>;
