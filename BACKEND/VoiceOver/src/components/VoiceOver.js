import React from 'react';

const VoiceOver = ({ text }) => {
    const speak = () => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 1;
            utterance.pitch = 1;
            utterance.volume = 1;
            utterance.lang = 'en-US';
            window.speechSynthesis.speak(utterance);
        } else {
            alert('Sorry, your browser does not support speech synthesis.');
        }
    };

    return (
        <div>
            <button onClick={speak}>
                Play Voice Over
            </button>
        </div>
    );
};

export default VoiceOver;
