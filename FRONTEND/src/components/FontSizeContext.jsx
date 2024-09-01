import React, { createContext, useContext, useState } from 'react';

const FontSizeContext = createContext();

export const FontSizeProvider = ({ children }) => {
  const [fontSize, setFontSize] = useState(16);

  const increaseFontSize = () => setFontSize((prevSize) => prevSize + 2);
  const decreaseFontSize = () => setFontSize((prevSize) => prevSize - 2);
  const resetFontSize = () => setFontSize(16);

  return (
    <FontSizeContext.Provider value={{ fontSize, increaseFontSize, decreaseFontSize, resetFontSize }}>
      <div
        style={{
          fontSize: `${fontSize}px`,
          lineHeight: 1.5, // Adjust line-height to scale with font-size
        }}
      >
        <style>
          {`
            /* Ensure all text elements inherit the font size */
            *, *::before, *::after {
              box-sizing: border-box;
            }

            body {
              font-size: inherit;
            }

            h1, h2, h3, h4, h5, h6, p, ul, li, input, a {
              font-size: inherit; /* Inherit font size from parent div */
            }
          `}
        </style>
        {children}
      </div>
    </FontSizeContext.Provider>
  );
};

export const useFontSize = () => useContext(FontSizeContext);
