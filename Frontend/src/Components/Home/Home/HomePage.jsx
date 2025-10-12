// src/components/HeroSection.jsx
import React, { useState, useEffect } from "react";
import { GiBowlOfRice } from "react-icons/gi";
import { FaLeaf, FaUtensils, FaUsers, FaChartLine, FaAppleAlt, FaDrumstickBite } from "react-icons/fa";
import { FaBowlFood } from "react-icons/fa6";
import { IoIosStats } from "react-icons/io";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const features = [
    {
      title: "Healthy Tracking",
      description: "Log your meals with ease and keep your nutrition in balance every day.",
      icon: "🥗",
    },
    {
      title: "Smart Nutrition",
      description: "Get insights into your food choices to help you stay energized and focused.",
      icon: "📊",
    },
    {
      title: "Personalized Plans",
      description: "Set your dietary goals and stay motivated as you nourish your body.",
      icon: "🎯",
    },
    {
      title: "Organized Meals",
      description: "Keep all your meals neatly categorized so you always know what's in your bowl.",
      icon: "🍲",
    },
  ];

  const howItWorks = [
    {
      step: 1,
      title: "Sign Up",
      description: "Create your account and set your personalized health goals.",
      icon: <FaUtensils className="text-4xl text-[#7B8B2F]" />,
    },
    {
      step: 2,
      title: "Log Meals",
      description: "Easily track your daily meals with our intuitive form.",
      icon: <GiBowlOfRice className="text-4xl text-[#7B8B2F]" />,
    },
    {
      step: 3,
      title: "Monitor Progress",
      description: "View detailed charts and insights to stay motivated.",
      icon: <IoIosStats className="text-4xl text-[#7B8B2F]" />,
    },
  ];

  const [typedText, setTypedText] = useState("");
  const fullText = "Nourish Your Life with VitalBowl 🥗";

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setTypedText(fullText.slice(0, i + 1));
      i++;
      if (i === fullText.length) clearInterval(timer);
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* Animations */}
      <style>
        {`
          @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-15px); } }
          .float-animation { animation: float 4s ease-in-out infinite; }
          @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
          .animate-fadeIn { animation: fadeIn 0.8s ease-out; }
          @keyframes slideInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
          .animate-slideInUp { animation: slideInUp 0.6s ease-out; }
          @keyframes bounceIn { 0% { transform: scale(0.3); opacity: 0; } 50% { transform: scale(1.05); } 70% { transform: scale(0.9); } 100% { transform: scale(1); opacity: 1; } }
          .animate-bounceIn { animation: bounceIn 0.8s ease-out; }
        `}
      </style>

      {/* Hero Section */}
      <div className="relative py-20 px-4 overflow-hidden bg-[#D9E6C2] text-[#3B2F2F] animate-fadeIn">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20px_20px,#E9F0D7_20%,transparent_21%)] [background-size:40px_40px] opacity-10"></div>

        {/* Floating elements */}
        <FaLeaf className="absolute top-16 left-16 text-[#A3C15D] opacity-30 float-animation" />
        <FaAppleAlt className="absolute top-32 right-20 text-[#7B8B2F] opacity-20 float-animation" />
        <FaUtensils className="absolute bottom-20 left-20 text-[#7B8B2F] opacity-25 float-animation" />
        <FaBowlFood className="absolute bottom-32 right-24 text-[#7B8B2F] opacity-25 float-animation" />
        <FaDrumstickBite className="absolute top-48 left-32 text-[#A3C15D] opacity-20 float-animation" />

        <div className="relative max-w-7xl mx-auto flex flex-col lg:flex-row items-center lg:items-start">
          {/* Left Content */}
          <div className="flex-1 text-left animate-slideInUp">
            <h1 className="text-6xl font-extrabold text-[#3B2F2F] drop-shadow-lg">{typedText}</h1>
            <p className="mt-4 text-xl text-[#7B8B2F] font-medium">
              Fresh insights and healthy habits with{" "}
              <span className="font-extrabold text-[#3B2F2F]">VitalBowl</span>
            </p>

            {/* Feature Icons */}
            <div className="flex space-x-8 mt-10">
              <div className="flex flex-col items-center hover:scale-110 transform transition duration-300">
                <GiBowlOfRice className="text-4xl text-[#7B8B2F]" />
                <p className="mt-2 text-[#3B2F2F]">Meal Logging</p>
              </div>
              <div className="flex flex-col items-center hover:scale-110 transform transition duration-300">
                <FaLeaf className="text-4xl text-[#7B8B2F]" />
                <p className="mt-2 text-[#3B2F2F]">Wholesome Choices</p>
              </div>
              <div className="flex flex-col items-center hover:scale-110 transform transition duration-300">
                <IoIosStats className="text-4xl text-[#7B8B2F]" />
                <p className="mt-2 text-[#3B2F2F]">Smart Insights</p>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8">
              <Link to="/register">
                <button className="px-10 py-4 bg-[#7B8B2F] text-[#3B2F2F] font-bold rounded-full shadow-lg hover:bg-[#A3C15D] hover:text-white transition-all duration-300">
                  Join VitalBowl 🥗
                </button>
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex-1 mt-10 lg:mt-0 lg:ml-12 flex justify-center lg:items-center animate-slideInUp">
            <img src="VitalBowl.png" alt="VitalBowl Illustration" className="w-full max-w-md drop-shadow-lg float-animation" />
          </div>
        </div>
      </div>

      {/* How It Works */}
      <section className="relative bg-[#E9F0D7] py-20 animate-fadeIn">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold text-[#3B2F2F]">How <span className="text-[#7B8B2F]">VitalBowl</span> Works</h2>
          <p className="mt-3 text-lg text-[#7B8B2F]">Get started in just 3 simple steps. 🥗</p>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {howItWorks.map((item, idx) => (
              <div key={idx} className="relative rounded-2xl bg-[#D9E6C2] border-2 border-[#A3C15D] p-6 shadow-md hover:shadow-[#A3C15D]/20 transition-all duration-300 transform hover:-translate-y-1 animate-slideInUp" style={{ animationDelay: `${0.2 * idx}s` }}>
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#7B8B2F] text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">
                  {item.step}
                </div>
                <div className="flex justify-center items-center mt-6 mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-[#3B2F2F]">{item.title}</h3>
                <p className="mt-2 text-[#7B8B2F] text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section className="relative bg-[#D9E6C2] py-20 animate-fadeIn">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold text-[#3B2F2F]">Why <span className="text-[#7B8B2F]">VitalBowl</span>?</h2>
          <p className="mt-3 text-lg text-[#7B8B2F]">Fresh, simple, and nourishing — here's why you'll love it. 🥗</p>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, idx) => (
              <div key={idx} className="rounded-2xl bg-[#F0F3E8]/90 backdrop-blur-sm border-2 border-[#A3C15D] p-6 shadow-md hover:shadow-[#A3C15D]/20 transition-all duration-300 transform hover:-translate-y-1 animate-bounceIn" style={{ animationDelay: `${0.2 * idx}s` }}>
                <div className="flex justify-center items-center text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-[#3B2F2F]">{feature.title}</h3>
                <p className="mt-2 text-[#7B8B2F] text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="relative bg-[#E9F0D7] py-16 animate-fadeIn">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="rounded-2xl bg-[#D9E6C2] border-2 border-[#A3C15D] p-8 shadow-md">
            <FaBowlFood className="text-6xl text-[#7B8B2F] mx-auto mb-4" />
            <blockquote className="text-2xl font-semibold text-[#3B2F2F] italic">
              "Empowering healthier lives, one meal at a time."
            </blockquote>
            <p className="mt-4 text-[#7B8B2F]">Join VitalBowl and transform your nutrition journey today.</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <div className="bg-[#7B8B2F] text-[#3B2F2F] py-20 px-4 animate-fadeIn">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold drop-shadow-md animate-slideInUp">
            Take Charge of Your <span className="text-[#D9E6C2]">Health</span> 🥗
          </h2>
          <p className="mt-4 animate-slideInUp" style={{ animationDelay: '0.2s' }}>
            Join Us Now – Eat Smart, Live Fresh, Stay Vital!
          </p>
          <Link to="/register">
            <button className="mt-8 px-10 py-4 bg-[#D9E6C2] text-[#7B8B2F] font-bold rounded-full shadow-lg hover:bg-[#E9F0D7] hover:text-[#3B2F2F] transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 animate-pulse">
              Get Started Free! 🥗
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
