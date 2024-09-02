import React, { useState, useEffect } from 'react';
import { MapPin, Train, Users, ChevronUp } from 'lucide-react';
import { useTranslation, initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import './About.css';
import { useFontSize } from './FontSizeContext';
// Initialize i18next
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          "heroTitle": "Welcome to the Railway Navigation System",
          "heroSubtitle": "Your journey made easy with real-time train updates",
          "missionTitle": "Our Mission",
          "missionText": "To provide seamless travel experiences by offering accurate and timely information for your train journeys.",
          "features": {
            "realTimeUpdatesTitle": "Real-Time Updates",
            "realTimeUpdatesDesc": "Get live updates on train schedules, delays, and platform changes.",
            "routePlanningTitle": "Route Planning",
            "routePlanningDesc": "Plan your trip with our easy-to-use route planner and find the best connections.",
            "passengerSupportTitle": "Passenger Support",
            "passengerSupportDesc": "24/7 assistance to ensure a smooth journey for all passengers."
          },
          "impactTitle": "Our Impact",
          "impact": {
            "passengers": "Passengers Served",
            "stations": "Stations Covered",
            "satisfaction": "Customer Satisfaction"
          },
          "testimonial": {
            "quote": "This app has made my daily commute so much easier. The real-time updates are a lifesaver!",
            "author": "Rajesh Sharma"
          },
          "ctaTitle": "Contact Us",
          "ctaText": "Get in touch to learn more about our services and how we can assist you.",
          "contactNumber": "+91-1234567890"
        }
      },
      hi: {
        translation: {
          "heroTitle": "रेलवे नेविगेशन सिस्टम में आपका स्वागत है",
          "heroSubtitle": "यात्रा को आसान बनाएं रियल-टाइम ट्रेन अपडेट के साथ",
          "missionTitle": "हमारा मिशन",
          "missionText": "आपकी यात्रा को सहज बनाने के लिए सटीक और समय पर जानकारी प्रदान करना।",
          "features": {
            "realTimeUpdatesTitle": "रियल-टाइम अपडेट्स",
            "realTimeUpdatesDesc": "ट्रेन शेड्यूल, देरी और प्लेटफार्म परिवर्तन पर लाइव अपडेट प्राप्त करें।",
            "routePlanningTitle": "रूट प्लानिंग",
            "routePlanningDesc": "हमारे आसान रूट प्लानर के साथ अपनी यात्रा की योजना बनाएं और सबसे अच्छे कनेक्शन खोजें।",
            "passengerSupportTitle": "यात्री सहायता",
            "passengerSupportDesc": "सभी यात्रियों की यात्रा को सुचारू बनाने के लिए 24/7 सहायता।"
          },
          "impactTitle": "हमारा प्रभाव",
          "impact": {
            "passengers": "यात्रियों की सेवा",
            "stations": "कवर किए गए स्टेशन",
            "satisfaction": "ग्राहक संतोष"
          },
          "testimonial": {
            "quote": "इस ऐप ने मेरी दैनिक यात्रा को बहुत आसान बना दिया है। रियल-टाइम अपडेट बहुत ही उपयोगी हैं!",
            "author": "राजेश शर्मा"
          },
          "ctaTitle": "हमसे संपर्क करें",
          "ctaText": "हमारी सेवाओं के बारे में अधिक जानने और आपकी सहायता कैसे कर सकते हैं, इसके लिए हमसे संपर्क करें।",
          "contactNumber": "+91-1234567890"
        }
      }
    },
    lng: 'en', // Default language
    fallbackLng: 'en', // Fallback language if the current language doesn't have a translation
    interpolation: {
      escapeValue: false, // React already safes from xss
    },
  });

// AboutCard Component
const AboutCard = ({ icon: Icon, title, description }) => (
  <div className="about-card">
    <div className="about-card-header">
      <Icon className="about-card-icon" />
      <h3 className="about-card-title">{title}</h3>
    </div>
    <p className="about-card-description">{description}</p>
  </div>
);

// CountUp Component
const CountUp = ({ end, duration }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return <span>{count.toLocaleString()}</span>;
};

// About Component
const About = () => {
  const { increaseFontSize, decreaseFontSize, resetFontSize } = useFontSize();
  const [isVisible, setIsVisible] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="about-container">
      {/* Language Selector */}
      <div className="language-selector">
      <div>
             {/* Font size adjustment buttons */}
        <button onClick={increaseFontSize} className='fontsize-buttons'>Increase Font Size</button>
        <button onClick={decreaseFontSize} className='fontsize-buttons'>Decrease Font Size</button>
        <button onClick={resetFontSize} className='fontsize-buttons'>Reset Font Size</button>
      </div>
        <select onChange={(e) => i18n.changeLanguage(e.target.value)} className="language-dropdown">
          <option value="en">English</option>
          <option value="hi">Hindi</option>
        </select>
      </div>

      {/* Hero Section */}
      <div className="hero-section">
      
        <div className="hero-overlay">
          <div className="hero-content">
            <h1 className="hero-title">{t('heroTitle')}</h1>
            <p className="hero-subtitle">{t('heroSubtitle')}</p>
          </div>
        </div>
      </div>

      <div className="content-container">
        {/* Mission Statement */}
        <div className="mission-statement">
          <h2 className="mission-title">{t('missionTitle')}</h2>
          <p className="mission-text">
            {t('missionText')}
          </p>
        </div>

        {/* Features Grid */}
        <div className="features-grid">
          <AboutCard 
            icon={MapPin}
            title={t('features.realTimeUpdatesTitle')}
            description={t('features.realTimeUpdatesDesc')}
          />
          <AboutCard 
            icon={Train}
            title={t('features.routePlanningTitle')}
            description={t('features.routePlanningDesc')}
          />
          <AboutCard 
            icon={Users}
            title={t('features.passengerSupportTitle')}
            description={t('features.passengerSupportDesc')}
          />
        </div>

        {/* Animated Stats Section */}
        <div className="stats-section">
          <h2 className="impact-title">{t('impactTitle')}</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <p className="stat-number"><CountUp end={2000000} duration={2000} />+</p>
              <p className="stat-text">{t('impact.passengers')}</p>
            </div>
            <div className="stat-item">
              <p className="stat-number"><CountUp end={750} duration={2000} />+</p>
              <p className="stat-text">{t('impact.stations')}</p>
            </div>
            <div className="stat-item">
              <p className="stat-number"><CountUp end={95} duration={2000} />%</p>
              <p className="stat-text">{t('impact.satisfaction')}</p>
            </div>
          </div>
        </div>

        {/* Testimonial */}
        <div className="testimonial-section">
          <blockquote className="testimonial-quote">
            "{t('testimonial.quote')}"
          </blockquote>
          <p className="testimonial-author">{t('testimonial.author')}</p>
        </div>

        {/* CTA Section */}
        <div className="cta-section">
          <h2 className="cta-title">{t('ctaTitle')}</h2>
          <p className="cta-text">{t('ctaText')}</p>
          <a href={`tel:${t('contactNumber')}`} className="cta-button">{t('contactNumber')}</a>
        </div>

        {/* Back to Top Button */}
        {isVisible && (
          <button
            onClick={scrollToTop}
            className="scroll-to-top"
          >
            <ChevronUp className="scroll-to-top-icon" />
          </button>
        )}
      </div>
    </div>
  );
};

export default About;
