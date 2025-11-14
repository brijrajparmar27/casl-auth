import { createContext, useState } from 'react';

export const NotesContext = createContext();

// eslint-disable-next-line react/prop-types
export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  return (
    <NotesContext.Provider value={{ notes, setNotes }}>
      {children}
    </NotesContext.Provider>
  );
};
