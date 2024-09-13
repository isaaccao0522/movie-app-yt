import { createContext,useState, useEffect } from "react";
import PropTypes from "prop-types";
//// Firebase
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
//// Others
import { auth } from "../server/firbase";



const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<object>(null);
  const [isLoading, setIsLoading] = useState(true);

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, signInWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthContext, AuthProvider };
