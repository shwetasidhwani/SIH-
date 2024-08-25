import React, { useEffect } from "react";
import useVoiceAssistant from "../hooks/useVoiceAssistant";

function Chatbot() {
  const { listen, stop, response } = useVoiceAssistant();

  useEffect(() => {
    listen();
    return () => stop();
  }, [listen, stop]);

  return (
    <div>
      <h2>Chatbot</h2>
      <p>{response}</p>
    </div>
  );
}

export default Chatbot;
