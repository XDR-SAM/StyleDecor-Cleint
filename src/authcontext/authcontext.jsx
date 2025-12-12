import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../util/api';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext(null);

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen to Firebase auth state changes
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      try {
        if (firebaseUser) {
          // User is signed in with Firebase (Google login)
          const token = localStorage.getItem('token');

          if (token) {
            // Verify existing token is still valid
            try {
              const res = await authAPI.getMe();
              setUser(res.data);
              localStorage.setItem('user', JSON.stringify(res.data));
            } catch (error) {
              // Token expired or invalid, get fresh token from Firebase
              console.log('Token expired, refreshing with Firebase...');
              const idToken = await firebaseUser.getIdToken(true); // Force refresh

              // Re-authenticate with backend using Firebase token
              try {
                const response = await authAPI.login({
                  email: firebaseUser.email,
                  firebaseToken: idToken,
                  displayName: firebaseUser.displayName,
                  profileImage: firebaseUser.photoURL
                });

                const { token: newToken, user: userData } = response.data;
                localStorage.setItem('token', newToken);
                localStorage.setItem('user', JSON.stringify(userData));
                setUser(userData);
              } catch (loginError) {
                console.error('Failed to refresh token:', loginError);
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                setUser(null);
              }
            }
          } else {
            // No token but Firebase user exists, get new token
            const idToken = await firebaseUser.getIdToken();

            try {
              const response = await authAPI.login({
                email: firebaseUser.email,
                firebaseToken: idToken,
                displayName: firebaseUser.displayName,
                profileImage: firebaseUser.photoURL
              });

              const { token: newToken, user: userData } = response.data;
              localStorage.setItem('token', newToken);
              localStorage.setItem('user', JSON.stringify(userData));
              setUser(userData);
            } catch (loginError) {
              console.error('Failed to get token:', loginError);
              setUser(null);
            }
          }
        } else {
          // User is signed out from Firebase
          const token = localStorage.getItem('token');
          const storedUser = localStorage.getItem('user');

          if (token && storedUser) {
            // Check if this is a regular email/password user (not Google)
            try {
              const res = await authAPI.getMe();
              setUser(res.data);
              localStorage.setItem('user', JSON.stringify(res.data));
            } catch (error) {
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              setUser(null);
            }
          } else {
            setUser(null);
          }
        }
      } catch (error) {
        console.error('Auth state change error:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authAPI.login({ email, password });
      const { token, user: userData } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed'
      };
    }
  };

  const register = async (email, password, displayName, profileImage) => {
    try {
      const response = await authAPI.register({
        email,
        password,
        displayName,
        profileImage
      });
      const { token, user: userData } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed'
      };
    }
  };

  const socialLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();

      // Send token to backend for verification
      // Backend should handle Firebase token verification
      const response = await authAPI.login({
        email: result.user.email,
        firebaseToken: idToken
      });

      const { token, user: userData } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Social login failed'
      };
    }
  };

  const logout = async () => {
    try {
      // Sign out from Firebase if user was logged in with Google
      await auth.signOut();
    } catch (error) {
      console.error('Firebase signout error:', error);
    }
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      register,
      logout,
      socialLogin,
      updateUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

