"use client";

import Link from "next/link";
import { useState } from "react";
import ReactCountryFlag from "react-country-flag";

function App() {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState({
    code: "EN",
    name: "English",
    countryCode: "GB",
  });

  const languages = [
    { code: "IT", name: "Italiano", countryCode: "IT" },
    { code: "EN", name: "English", countryCode: "GB" },
    { code: "ES", name: "Español", countryCode: "ES" },
    { code: "FR", name: "Français", countryCode: "FR" },
    { code: "DE", name: "Deutsch", countryCode: "DE" },
    { code: "NL", name: "Nederlands", countryCode: "NL" },
    { code: "SE", name: "Svenska", countryCode: "SE" },
    { code: "FI", name: "Suomalainen", countryCode: "FI" },
    { code: "AR", name: "عربي", countryCode: "SA" },
    { code: "ZH", name: "中文 (简体)", countryCode: "CN" },
    { code: "JA", name: "日本語", countryCode: "JP" },
    { code: "KO", name: "한국어", countryCode: "KR" },
  ];

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
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="min-h-screen bg-white">
      {" "}
      {/* Changed from gradient to white */}
      {/* Sticky Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center">
            {/* Logo with space from left */}
            <span className="text-2xl font-bold text-blue-600 mr-16 ml-16">ELEZEA</span>
            {/* Spacer to push links to the right */}
            <div className="flex-1"></div>
            {/* Navigation Links + Language Selector */}
            <div className="flex items-center space-x-8 mr-16">
              <a href="#" className="text-gray-700 hover:text-blue-600">
                Home
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600">
                Learning
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600">
                Signup
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600">
                Login
              </a>

              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                  className="flex items-center space-x-2 border border-gray-200 px-4 py-2 rounded-full bg-white shadow-sm hover:bg-gray-50 transition"
                >
                  <ReactCountryFlag
                    countryCode={currentLanguage.countryCode}
                    svg
                    style={{
                      width: "1.2em",
                      height: "1.2em",
                    }}
                    className="!rounded-sm"
                  />
                  <span className="text-gray-700 font-medium">{currentLanguage.name}</span>
                  <svg
                    className={`w-4 h-4 text-gray-500 transition-transform ${
                      isLanguageOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Language Dropdown */}
                {isLanguageOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-50">
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        onClick={() => {
                          setCurrentLanguage(language);
                          setIsLanguageOpen(false);
                        }}
                        className={`flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left ${
                          currentLanguage.code === language.code ? "bg-blue-50" : ""
                        }`}
                      >
                        <ReactCountryFlag
                          countryCode={language.countryCode}
                          svg
                          style={{
                            width: "1.2em",
                            height: "1.2em",
                            marginRight: "8px",
                          }}
                          className="!rounded-sm"
                        />
                        {language.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
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
      {/* Language Selection Section */}
      <section className="bg-gray-50 py-16">
        <div className="w-full px-4 mx-auto">
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <span className="bg-blue-100 text-blue-700 font-semibold px-6 py-2 rounded-full text-lg shadow-sm">
              ✨ 20+ LANGUAGES
            </span>
          </div>
          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Describe the world in..
          </h2>
          {/* Language Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-8 gap-4 justify-items-center">
            {/* Example language cards */}
            {[
              { name: "English", flag: "GB" },
              { name: "German", flag: "DE" },
              { name: "French", flag: "FR" },
              { name: "Spanish", flag: "ES" },
              { name: "Italian", flag: "IT" },
              { name: "Japanese", flag: "JP" },
              { name: "Chinese", flag: "CN" },
              { name: "Korean", flag: "KR" },
              { name: "Arabic", flag: "AE" },
              { name: "Dutch", flag: "NL" },
              { name: "Portuguese", flag: "PT" },
              { name: "Swedish", flag: "SE" },
              { name: "Greek", flag: "GR" },
              { name: "Finnish", flag: "FI" },
              { name: "Norwegian", flag: "NO" },
              { name: "+ 20 More", flag: null, more: true },
            ].map((lang) => (
              <div
                key={lang.name}
                className="bg-white rounded-2xl shadow p-6 flex flex-col items-center w-40 h-40 justify-center hover:shadow-lg transition"
              >
                {lang.more ? (
                  <span className="text-blue-700 text-lg font-bold">{lang.name}</span>
                ) : (
                  <>
                    {lang.flag && (
                      <ReactCountryFlag
                        countryCode={lang.flag}
                        svg
                        style={{
                          width: "3em",
                          height: "3em",
                          borderRadius: "50%",
                          marginBottom: "0.5em",
                        }}
                      />
                    )}
                    <span className="mt-2 text-gray-700 font-medium text-lg">{lang.name}</span>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
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
          <div className="flex justify-center gap-6">
            {/* Instagram */}
            <a
              href="#"
              className="bg-black rounded-full w-14 h-14 flex items-center justify-center hover:bg-gray-800 transition"
              aria-label="Instagram"
            >
              <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm5.13.62a1.13 1.13 0 1 1-2.25 0 1.13 1.13 0 0 1 2.25 0z" />
              </svg>
            </a>
            {/* TikTok */}
            <a
              href="#"
              className="bg-black rounded-full w-14 h-14 flex items-center justify-center hover:bg-gray-800 transition"
              aria-label="TikTok"
            >
              <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.25 2a.75.75 0 0 1 .75.75v2.5a3.75 3.75 0 0 0 3.75 3.75h.25a.75.75 0 0 1 0 1.5h-.25A5.25 5.25 0 0 1 16.5 4.25V2.75a.75.75 0 0 1 .75-.75zm-4.5 4.5a.75.75 0 0 1 .75.75v9a2.75 2.75 0 1 1-1.5-2.45.75.75 0 0 1 1.5 0A4.25 4.25 0 1 0 15 16.25v-9a.75.75 0 0 1 .75-.75z" />
              </svg>
            </a>
            {/* YouTube */}
            <a
              href="#"
              className="bg-black rounded-full w-14 h-14 flex items-center justify-center hover:bg-gray-800 transition"
              aria-label="YouTube"
            >
              <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21.8 7.2a2.75 2.75 0 0 0-1.93-1.94C18.07 5 12 5 12 5s-6.07 0-7.87.26A2.75 2.75 0 0 0 2.2 7.2C2 8.93 2 12 2 12s0 3.07.2 4.8a2.75 2.75 0 0 0 1.93 1.94C5.93 19 12 19 12 19s6.07 0 7.87-.26a2.75 2.75 0 0 0 1.93-1.94C22 15.07 22 12 22 12s0-3.07-.2-4.8zM10 15.5v-7l6 3.5-6 3.5z" />
              </svg>
            </a>
            {/* Facebook */}
            <a
              href="#"
              className="bg-black rounded-full w-14 h-14 flex items-center justify-center hover:bg-gray-800 transition"
              aria-label="Facebook"
            >
              <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17 2H7a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h5v-7H9v-3h3V9.5A3.5 3.5 0 0 1 15.5 6H18v3h-2.5A1.5 1.5 0 0 0 14 10.5V12h4l-1 3h-3v7h3a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5z" />
              </svg>
            </a>
            {/* LinkedIn */}
            <a
              href="#"
              className="bg-black rounded-full w-14 h-14 flex items-center justify-center hover:bg-gray-800 transition"
              aria-label="LinkedIn"
            >
              <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm15.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47s-1.73 1.17-1.73 2.38v4.59h-3v-9h2.88v1.23h.04c.4-.76 1.37-1.56 2.82-1.56 3.01 0 3.57 1.98 3.57 4.56v4.77z" />
              </svg>
            </a>
            {/* X (Twitter) */}
            <a
              href="#"
              className="bg-black rounded-full w-14 h-14 flex items-center justify-center hover:bg-gray-800 transition"
              aria-label="X"
            >
              <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.53 2H6.47A4.47 4.47 0 0 0 2 6.47v11.06A4.47 4.47 0 0 0 6.47 22h11.06A4.47 4.47 0 0 0 22 17.53V6.47A4.47 4.47 0 0 0 17.53 2zm-2.13 13.47-2.13-2.13-2.13 2.13a.75.75 0 1 1-1.06-1.06l2.13-2.13-2.13-2.13a.75.75 0 1 1 1.06-1.06l2.13 2.13 2.13-2.13a.75.75 0 1 1 1.06 1.06l-2.13 2.13 2.13 2.13a.75.75 0 1 1-1.06 1.06z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
