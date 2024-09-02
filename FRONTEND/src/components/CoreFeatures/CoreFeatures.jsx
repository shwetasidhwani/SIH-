import React, { useState, useEffect, useRef } from 'react';
import './CoreFeatures.css';
import voiceAssistance from '../../assets/voice_assistance.jpg';
import threeDModeling from '../../assets/3d_modeling.jpg';
import virtualChatroom from '../../assets/virtual_chatroom.jpg';
import realtimeInfo from '../../assets/realtime_info.jpg';
import platformNavigation from '../../assets/platform_navigation.jpg';

const CoreFeatures = () => {
  const [currentIndex, setCurrentIndex] = useState(1); // Start from 1 to show the first card correctly
  const sliderRef = useRef(null);
  const [transitioning, setTransitioning] = useState(false);

  const features = [
    { img: voiceAssistance, title: 'Voice Assistance', desc: 'Experience hands-free navigation with our smart voice assistance.' },
    { img: threeDModeling, title: '3-D Modeling', desc: 'Explore detailed 3D models of station layouts for better understanding.' },
    { img: virtualChatroom, title: 'Virtual Chatroom', desc: 'Engage in real-time conversations and get instant assistance.' },
    { img: realtimeInfo, title: 'Realtime Info', desc: 'Stay updated with live information about station facilities and services.' },
    { img: platformNavigation, title: 'Platform Navigation', desc: 'Navigate through platforms with ease using our intuitive maps.' }
  ];

  // Create duplicate cards to enable seamless looping
  const extendedFeatures = [features[features.length - 1], ...features, features[0]];

  const totalCards = extendedFeatures.length;
  const visibleCards = 3;
  const slideWidth = 340; // Card width + margin

  const handlePrev = () => {
    if (transitioning) return;
    setTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex === 1 ? totalCards - visibleCards - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    if (transitioning) return;
    setTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex === totalCards - visibleCards ? 1 : prevIndex + 1));
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.style.transition = 'transform 0.5s ease-in-out'; // Ensure transition is enabled
      slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

      // Reset the transition after loop ends
      if (currentIndex === 0 || currentIndex === totalCards - visibleCards) {
        setTimeout(() => {
          slider.style.transition = 'none'; // Disable transition for instant reset
          setCurrentIndex(currentIndex === 0 ? totalCards - visibleCards : 1);
          setTimeout(() => {
            slider.style.transition = 'transform 0.5s ease-in-out'; // Re-enable transition
            setTransitioning(false); // Allow further transitions
          }, 50); // Short delay to ensure the reset happens smoothly
        }, 500); // Match this duration with your CSS transition duration
      } else {
        setTransitioning(false); // Allow further transitions
      }
    }
  }, [currentIndex]);

  return (
    <div className="core-feature">
      <div className="core-feature-header">
        <h2>Our Core Features</h2>
        <p>Experience seamless services with our diverse offerings designed to cater to your needs efficiently.</p>
      </div>
      <div className="feature-slider">
        <div className="feature-slider-inner" ref={sliderRef}>
          {extendedFeatures.map((feature, index) => (
            <div className="feature-card" key={index}>
              <img src={feature.img} alt={feature.title} />
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>
        <div className="slider-nav">
          <button onClick={handlePrev} className='slider-nav_btn'>‹</button>
          <button onClick={handleNext} className='slider-nav_btn'>›</button>
        </div>
      </div>
    </div>
  );
};

export default CoreFeatures;
