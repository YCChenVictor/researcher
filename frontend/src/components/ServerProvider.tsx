import React, { createContext, useContext, useState } from "react";

interface ServerContextType {
  serverOn: boolean;
  setServerOn: React.Dispatch<React.SetStateAction<boolean>>;
}

const ServerContext = createContext<ServerContextType>({
  serverOn: false,
  setServerOn: () => {
    // no-op default
  },
});

export const useServer = () => useContext(ServerContext);

export const ServerProvider: React.FC<React.PropsWithChildren<object>> = ({
  children,
}) => {
  const [serverOn, setServerOn] = useState(false);

  return (
    <ServerContext.Provider value={{ serverOn, setServerOn }}>
      {children}
    </ServerContext.Provider>
  );
};
