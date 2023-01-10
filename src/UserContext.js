import React from "react";
const UserContext = React.createContext({
  loading: true,
  user: null,
  setUser: () => {},
});
export const UserProvider = UserContext.Provider;
export const UserConsumer = UserContext.Consumer;
export default UserContext;
