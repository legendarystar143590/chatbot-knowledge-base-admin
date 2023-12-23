const Landing = () => {
  return (
    <>
      {/* Header Section with Video Background */}
      <div className="relative w-full min-h-screen overflow-hidden flex items-center justify-center text-center">
        <video className="absolute top-0 left-0 w-full h-full object-cover" autoPlay loop muted playsInline>
          <source src="/video/obsolete-background.mp4" type="video/mp4" />
        </video>
        <div className="absolute w-full h-full bg-indigo-900 bg-opacity-70"></div>
        <div className="relative z-10 p-10 max-w-6xl mx-auto flex flex-col items-center justify-center">
          <h1 className="text-6xl md:text-8xl font-bold mb-4">Obsolete: The AI-Powered Data Assistant</h1>
          <p className="text-xl md:text-2xl mb-4">Chat with your data in real-time, get weather updates, news, and more!</p>
          <a href="#/login" className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-6 px-12 rounded inline-block mt-4 text-2xl">Start Now!</a>
        </div>
      </div>

      {/* Enhanced About Obsolete Section */}
      <div className="relative w-full min-h-screen overflow-hidden flex items-center justify-center text-center">
        <video className="absolute top-0 left-0 w-full h-full object-cover" autoPlay loop muted playsInline>
          <source src="/video/obsolete-s5.mp4" type="video/mp4" />
        </video>
        <div className="absolute w-full h-full bg-indigo-900 bg-opacity-70"></div>
        <div className="relative z-10 p-10 max-w-6xl mx-auto flex flex-col items-center justify-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">Transform Your World with Obsolete</h2>
          <p className="text-lg md:text-xl mb-4">
            Obsolete is not just a data assistant; it's a lifestyle enhancer for both tech enthusiasts and the everyday user. Soon imagine an AI that organizes your schedule, optimizes your business strategies, and even predicts your next favorite movie. That's what Obsolete aims to be – a bridge between you and the digital universe.
          </p>
          <p className="text-lg md:text-xl mb-4">
            With Obsolete, small business owners can analyze market trends and consumer behavior effortlessly. Parents can manage household expenses and schedules with voice commands. Fitness enthusiasts can track their health stats and get personalized workout suggestions. All this, through simple, conversational interactions with our AI.
          </p>
          <p className="text-lg md:text-xl mb-4">
            Our platform uses advanced algorithms to learn and adapt to your preferences, ensuring a customized experience. Whether it's managing emails, setting reminders, or providing real-time news and weather updates, Obsolete is designed to make your life easier and more connected.
          </p>
          <p className="text-lg md:text-xl">
            Discover the ease of managing data with Obsolete. Save time, increase productivity, and enjoy a seamlessly integrated digital experience. Sign up today to see how Obsolete can revolutionize your daily routines and business operations. Let's make the future smarter, together.
          </p>
        </div>
      </div>


      {/* Features Section with Multiple Video Backgrounds */}
      <div className="relative w-full min-h-screen overflow-hidden flex flex-col md:flex-row justify-center text-center">

        {/* Video 1 */}
        <div className="relative w-full md:w-1/3 h-screen flex items-center justify-center">
          <video className="absolute top-0 left-0 w-full h-full object-cover" autoPlay loop muted playsInline>
            <source src="/video/obsolete-s2.mp4" type="video/mp4" />
          </video>
          <div className="absolute w-full h-full bg-indigo-900 bg-opacity-70"></div>
          <div className="relative z-10 p-5">
            <h2 className="text-2xl md:text-4xl font-bold mb-2">Knowledge Base Integration</h2>
            <p className="text-md md:text-lg">Upload and interact with various file formats including words, documents, and PDFs. Enhance your data interaction with Obsolete's advanced AI.</p>
          </div>
        </div>
        <div className="relative w-full md:w-1/3 h-screen flex items-center justify-center">
          <video className="absolute top-0 left-0 w-full h-full object-cover" autoPlay loop muted playsInline>
            <source src="/video/obsolete-s3.mp4" type="video/mp4" />
          </video>
          <div className="absolute w-full h-full bg-indigo-900 bg-opacity-70"></div>
          <div className="relative z-10 p-5">
            <h2 className="text-2xl md:text-4xl font-bold mb-2">API Integration and Expansion</h2>
            <p className="text-md md:text-lg">Request and enable new APIs seamlessly. Expand the capabilities of Obsolete to suit your unique needs in various applications and platforms.</p>
          </div>
        </div>
        <div className="relative w-full md:w-1/3 h-screen flex items-center justify-center">
          <video className="absolute top-0 left-0 w-full h-full object-cover" autoPlay loop muted playsInline>
            <source src="/video/obsolete-s4.mp4" type="video/mp4" />
          </video>
          <div className="absolute w-full h-full bg-indigo-900 bg-opacity-70"></div>
          <div className="relative z-10 p-5">
            <h2 className="text-2xl md:text-4xl font-bold mb-2">Advanced Database Connectivity</h2>
            <p className="text-md md:text-lg">Connect with SQL and third-party vector databases like Pinecone. Integrate Obsolete's API into your UI or platforms like Telegram, Twitter, Instagram, Facebook, Slack, Discord, and more.</p>
          </div>
        </div>
      </div>

      {/* Pricing Section with Video Background */}
      <div className="relative w-full min-h-screen overflow-hidden flex items-center justify-center text-center">
        <video className="absolute top-0 left-0 w-full h-full object-cover" autoPlay loop muted playsInline>
          <source src="/video/obsolete-s7.mp4" type="video/mp4" />
        </video>
        <div className="absolute w-full h-full bg-indigo-900 bg-opacity-70"></div>
        <div className="relative z-10 p-10 max-w-6xl mx-auto flex flex-col items-center justify-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">Pricing Plans</h2>
          <p className="text-lg md:text-xl mb-4">Discover the perfect plan for you and unlock the full potential of Obsolete, your AI-powered data assistant.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Free Plan */}
            <div className="bg-white text-black p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-2">Free Plan</h3>
              <p className="mb-2">Price: $0 3-Day Trial</p>
              <ul className="list-disc pl-5 text-start">
                <li>Basic AI conversations and call functionality.</li>
                <li>Access to real-time data chats.</li>
                <li>Access to Knowledge Base.</li>
                <li>Access to Integrated APIs.</li>
              </ul>
            </div>

            {/* Standard Plan */}
            <div className="bg-white text-black p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-2">Standard Plan</h3>
              <p className="mb-2">Price: $4.99 per month</p>
              <ul className="list-disc pl-5 text-start">
                <li>All features in the Free Plan.</li>
                <li>Advanced AI conversations with improved accuracy.</li>
                <li>Early access to new features.</li>
                <li>Ad-free experience.</li>
                <li>Feature Request Access</li>
              </ul>
            </div>

            {/* Premium Plan */}
            <div className="bg-white text-black p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-2">Premium Plan</h3>
              <p className="mb-2">Price: $19.99 per month</p>
              <ul className="list-disc pl-5 text-start">
                <li>All features in the Standard Plan.</li>
                <li>10x Memory enhancements for personalized interactions.</li>
                <li>API Access</li>
                <li>Feature Request Access.</li>
                <li>Priority customer support.</li>
              </ul>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white text-black p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-2">Enterprise Plan</h3>
              <p className="mb-2">Price: Contact for pricing</p>
              <ul className="list-disc pl-5 text-start">
                <li>Customizable AI solutions tailored to your business needs.</li>
                <li>Dedicated account manager and 24/7 support.</li>
                <li>Advanced data analysis tools.</li>
                <li>API access for integration with your existing systems.</li>
                <li>Enhanced security features.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>


      {/* Testimonials Section with Multiple Vi */}
      <div className="relative w-full min-h-screen overflow-hidden flex flex-col md:flex-row justify-center text-center">

        {/* Video 1 */}
        <div className="relative w-full md:w-1/3 h-screen flex items-center justify-center">
          <video className="absolute top-0 left-0 w-full h-full object-cover" autoPlay loop muted playsInline>
            <source src="/video/obsolete-s8.mp4" type="video/mp4" />
          </video>
          <div className="absolute w-full h-full bg-indigo-900 bg-opacity-70"></div>
          <div className="relative z-10 p-5">
            <h2 className="text-2xl md:text-4xl font-bold mb-2">Peter Snoufax, Lifestyle Blogger and Author at Life Tricks Daily</h2>
            <p className="text-md md:text-lg">"Using Obsolete has been like finding the missing piece in my daily routine. It's simple, intuitive, and surprisingly fun!"</p>
          </div>
        </div>

        {/* Video 2 */}
        <div className="relative w-full md:w-1/3 h-screen flex items-center justify-center">
          <video className="absolute top-0 left-0 w-full h-full object-cover" autoPlay loop muted playsInline>
            <source src="/video/obsolete-s9.mp4" type="video/mp4" />
          </video>
          <div className="absolute w-full h-full bg-indigo-900 bg-opacity-70"></div>
          <div className="relative z-10 p-5">
            <h2 className="text-2xl md:text-4xl font-bold mb-2">Alex Torres, Freelance Graphic Designer & Art Enthusiast</h2>
            <p className="text-md md:text-lg">"I never thought managing my personal projects could be so effortless. Obsolete not only organizes my tasks but also inspires my creativity!"</p>
          </div>
        </div>

        {/* Video 3 */}
        <div className="relative w-full md:w-1/3 h-screen flex items-center justify-center">
          <video className="absolute top-0 left-0 w-full h-full object-cover" autoPlay loop muted playsInline>
            <source src="/video/obsolete-s10.mp4" type="video/mp4" />
          </video>
          <div className="absolute w-full h-full bg-indigo-900 bg-opacity-70"></div>
          <div className="relative z-10 p-5">
            <h2 className="text-2xl md:text-4xl font-bold mb-2">Michelle Lee, Parenting Coach and Founder of Modern Moms Club</h2>
            <p className="text-md md:text-lg">"Obsolete has transformed the way I plan my family activities. From organizing events to tracking expenses, it's been a lifesaver!"</p>
          </div>
        </div>

      </div>

      {/* Call to Action Section */}
      <div className="relative w-full min-h-screen overflow-hidden flex items-center justify-center text-center">
        <video className="absolute top-0 left-0 w-full h-full object-cover" autoPlay loop muted playsInline>
          <source src="/video/obsolete-s11.mp4" type="video/mp4" />
        </video>
        <div className="absolute w-full h-full bg-indigo-900 bg-opacity-70"></div>
        <div className="relative z-10 p-10 max-w-6xl mx-auto flex flex-col items-center justify-center">
          <h1 className="text-6xl md:text-8xl font-bold mb-4">Ready to Experience?</h1>
          <a href="#/login" className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-6 px-12 rounded inline-block mt-4 text-2xl">Join the Revolution</a>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800">
        <div className="container mx-auto px-6 pt-10 pb-6">
          <div className="flex flex-wrap text-gray-300 text-center lg:text-left">
            {/* Contact Information */}
            <div className="w-full lg:w-1/2 px-6">
              <div>
                <h2 className="text-xl font-bold mb-2 text-white">Contact Us</h2>
                <p className="mb-4">Have questions or need support? Reach out to us!</p>
                <ul className="list-none mb-0">
                  <li>
                    <strong>Email:</strong>
                    <a href="mailto:support@obsolete.live" className="text-purple-400 hover:text-purple-300">support@obsolete.live</a>
                  </li>
                </ul>
              </div>
            </div>

            {/* CopyRight Section */}
            <div className="w-full lg:w-1/2 px-6 mt-4 lg:mt-0">
              <p className="text-sm text-gray-300 sm:mb-0">
                © 2023 Obsolete AI. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer >
    </>
  );
};

export default Landing;
