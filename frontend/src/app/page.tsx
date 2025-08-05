"use client";

import Link from "next/link";
import { useState } from "react";
import ReactCountryFlag from "react-country-flag";

function App() {
  const [openFaq, setOpenFaq] = useState(0);

  // Add this FAQ data and state inside your App component
  const faqData = [
    {
      question: "How is ELEZEA different from other language apps?",
      answer:
        "ELEZEA specializes in improving descriptive writing skills through AI-powered feedback on image-based prompts, offering detailed corrections on grammar, vocabulary and style rather than just conversational practice.",
    },
    {
      question: "How does the AI feedback system work?",
      answer:
        "Our Gemini AI analyzes your writing across three key areas: grammar/spelling accuracy, vocabulary richness, and stylistic elements, providing specific suggestions for improvement.",
    },
    {
      question: "Is ELEZEA suitable for beginner language learners?",
      answer:
        "Absolutely! Our adaptive system tailors prompts to your selected level (A1-C2) - beginners get simpler images and basic vocabulary feedback, while advanced learners receive complex storytelling challenges with nuanced style corrections.",
    },
    {
      question: "How can I get additional support?",
      answer:
        "Our support team is available 24/7 at support@elezea.ai for any questions or technical assistance you may require.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center">
            {/* Logo with space from left */}
            <span className="text-2xl font-bold text-blue-600 mr-16 ml-16">ELEZEA</span>
            {/* Spacer to push links to the right */}
            <div className="flex-1"></div>
            {/* Navigation Links */}
            <div className="flex items-center space-x-8 mr-16">
              <a href="#" className="text-gray-700 hover:text-blue-600">
                Home
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600">
                Learning
              </a>
              {/* Removed Signup and Login buttons */}
              {/* <a href="#" className="text-gray-700 hover:text-blue-600">
                Signup
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600">
                Login
              </a> */}
              {/* Displaying just "English" as a label */}
              <span className="text-gray-700 font-medium">English</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-12 py-20">
        <div className="flex flex-col md:flex-row md:items-center">
          {/* Left: Text Content */}
          <div className="w-full md:w-1/2 md:pr-4 text-left max-w-xl md:ml-24 md:self-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 leading-tight">
              THE MOST EFFICIENT WAY TO
              <br />
              LEARN A LANGUAGE
            </h1>
            <p className="text-base md:text-lg text-gray-600 mb-10">
              ELEZEA is an AI-powered language coach that sharpens your writing fluency through
              visual storytelling. Describe images, get instant feedback, and learn to think
              creatively in your target language.
            </p>
            <Link href="/practice">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transition transform hover:scale-105">
                Get Started
              </button>
            </Link>
          </div>
          {/* Right: Image */}
          <div className="w-full md:w-1/2 flex justify-center md:-mt-8 md:ml-32">
            <div className="w-[500px] h-[500px] bg-gray-100 rounded-2xl flex items-center justify-center">
              <img
                src="/images/hero-image.jpg"
                alt="App preview"
                className="w-full h-full object-contain rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <div className="text-center max-w-3xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Ready to <span className="text-blue-600">transform</span> your language skills?
        </h1>

        <div className="grid md:grid-cols-3 gap-8 mt-10">
          {/* Step 1 */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="text-blue-600 text-2xl font-bold mb-3">1</div>
            <h3 className="text-xl font-semibold mb-3">Discover</h3>
            <p className="text-gray-600">
              Get inspired by AI-generated or curated images perfect for language practice
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="text-blue-600 text-2xl font-bold mb-3">2</div>
            <h3 className="text-xl font-semibold mb-3">Create</h3>
            <p className="text-gray-600">
              Write descriptions, stories, or dialogues - whatever sparks your creativity
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="text-blue-600 text-2xl font-bold mb-3">3</div>
            <h3 className="text-xl font-semibold mb-3">Perfect</h3>
            <p className="text-gray-600">
              Receive instant AI feedback on grammar, vocabulary, and natural expression
            </p>
          </div>
        </div>

        <button className="mt-12 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-all transform hover:scale-105">
          Start Learning Now →
        </button>
      </div>

      {/* TalkPal Difference Section */}
      <section className="bg-white-50 py-16">
        <h2 className="text-4xl font-bold text-center mb-14">THE ELEZEA DIFFERENCE</h2>
        <div className="container mx-auto grid md:grid-cols-3 gap-10 px-4">
          {/* Card 1 */}
          <div className="bg-white rounded-3xl shadow-lg p-10 flex flex-col items-center">
            <div className="bg-white-200 rounded-2xl mb-8 flex items-center justify-center w-full h-64">
              <img
                src="/images/visual.jpg"
                alt="Immersive conversations"
                className="h-full object-contain"
              />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-left w-full">Visual Storytelling</h3>
            <p className="text-gray-600 text-lg text-left w-full">
              Describe captivating images in your target language, train your brain to think
              fluently, not just memorize.
            </p>
          </div>
          {/* Card 2 */}
          <div className="bg-white rounded-3xl shadow-lg p-10 flex flex-col items-center">
            <div className="bg-white-200 rounded-2xl mb-8 flex items-center justify-center w-full h-64">
              <img
                src="/images/rating.jpg"
                alt="AI-powered writing feedback"
                className="h-full object-contain"
              />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-left w-full">
              AI-Powered Writing Feedback
            </h3>
            <p className="text-gray-600 text-lg text-left w-full">
              Get instant scores and corrections on grammar, vocabulary, and style from Gemini
              AI—like a tutor in your pocket.
            </p>
          </div>
          {/* Card 3 */}
          <div className="bg-white rounded-3xl shadow-lg p-10 flex flex-col items-center">
            <div className="bg-white-300 rounded-2xl mb-8 flex items-center justify-center w-full h-64">
              <img
                src="/images/improve.jpg"
                alt="Personalization"
                className="h-full object-contain"
              />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-left w-full">
              Progress Through Creativity
            </h3>
            <p className="text-gray-600 text-lg text-left w-full">
              No drills. Just real-world practice: write descriptions, short stories, or even poetry
              based on visual prompts.
            </p>
          </div>
        </div>
        <div className="flex justify-center mt-12">
          <button className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-4 px-16 rounded-2xl text-xl shadow-lg transition">
            Get Started
          </button>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-16">
        <div className="flex justify-center mb-6">
          <span className="bg-blue-100 text-blue-700 font-semibold px-6 py-2 rounded-full text-lg shadow-sm">
            ✨ HELP CENTER
          </span>
        </div>
        <h2 className="text-4xl font-bold text-center mb-14">FREQUENTLY ASKED QUESTIONS</h2>
        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow p-8">
          {faqData.map((faq, idx) => (
            <div key={faq.question} className="mb-6">
              <button
                className="w-full flex justify-between items-center text-left text-2xl font-semibold py-4 focus:outline-none"
                onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
              >
                <span>{faq.question}</span>
                <span className="text-3xl">{openFaq === idx ? "−" : "+"}</span>
              </button>
              {openFaq === idx && faq.answer && (
                <div className="text-gray-600 text-lg pb-4 pl-2 pr-8">{faq.answer}</div>
              )}
              <hr className="my-2 border-gray-200" />
            </div>
          ))}
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-white-50 py-16 mt-20">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">GET IN TOUCH WITH US</h3>
          <p className="text-gray-600 text-lg mb-8">
            ELEZEA is your AI writing coach that transforms how you learn languages through visual
            storytelling. Describe, create, and perfect your skills with real-time feedback -
            fluency has never felt this natural.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
