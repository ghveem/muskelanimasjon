import React, { createContext, useState } from 'react';

const languageContext = createContext();

const LanguageProvider = ({ children }) => {
  const [newNorwegianLanguage, setNewNorwegianLanguage] = useState(false);

  const value = {
    setNewNorwegianLanguage,
    newNorwegianLanguage,
  };

  return (
    <languageContext.Provider value={value}>
      {children}
    </languageContext.Provider>
  );
};

export { LanguageProvider, languageContext };
