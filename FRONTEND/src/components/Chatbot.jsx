import React, { useEffect } from 'react';

const ChatBot = () => {
  useEffect(() => {
    window._be = window._be || {};
    window._be.id = "66d3cff43a783300074e8117";

    (function() {
      const be = document.createElement('script'); 
      be.type = 'text/javascript'; 
      be.async = true;
      be.src = (document.location.protocol === 'https:' ? 'https://' : 'http://') + 'cdn.chatbot.com/widget/plugin.js';
      const s = document.getElementsByTagName('script')[0]; 
      s.parentNode.insertBefore(be, s);
    })();
  }, []);

  return (
    <noscript>
      You need to <a href="https://www.chatbot.com/help/chat-widget/enable-javascript-in-your-browser/" rel="noopener nofollow">enable JavaScript</a> in order to use the AI chatbot tool powered by <a href="https://www.chatbot.com/" rel="noopener nofollow" target="_blank">ChatBot</a>
    </noscript>
  );
};

export default ChatBot;
