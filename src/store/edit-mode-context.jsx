import { createContext, useState } from "react";

export const EditModeContext = createContext({
  isEditMode: false,
  toggleEditMode: () => {},
});

export default function EditModeContextProvider({ children }) {
  const [isEditMode, setIsEditMode] = useState(false);

  const toggleEditModeHandler = () => {
    setIsEditMode((prev) => !prev);
  };

  const context = { isEditMode, toggleEditMode: toggleEditModeHandler };

  return (
    <EditModeContext.Provider value={context}>
      {children}
    </EditModeContext.Provider>
  );
}
