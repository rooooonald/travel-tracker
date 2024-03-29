import { createContext, useState } from "react";

export const EditModeContext = createContext({
  isEditMode: false,
  toggleEditMode: () => {},
  resetEditMode: () => {},
});

export default function EditModeContextProvider({ children }) {
  const [isEditMode, setIsEditMode] = useState(false);

  const toggleEditModeHandler = () => {
    setIsEditMode((prev) => !prev);
  };

  const resetEditModeHandler = () => {
    setIsEditMode(false);
  };

  const context = {
    isEditMode,
    toggleEditMode: toggleEditModeHandler,
    resetEditMode: resetEditModeHandler,
  };

  return (
    <EditModeContext.Provider value={context}>
      {children}
    </EditModeContext.Provider>
  );
}
