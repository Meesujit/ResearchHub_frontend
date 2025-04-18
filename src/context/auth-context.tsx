import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define the User Type
interface User {
    token: string;
    _id: string;
    username: string;
    email: string;
    role: "admin" | "user";
}

// Define the Context Type
interface AuthContextType {
  user?: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

// Create Auth Context with null default value
const AuthContext = createContext<AuthContextType | null>(null);

// Define Props for AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

// Provider to wrap the app
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // ✅ Add loading state

  // Check localStorage for user data on app load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false); // ✅ Set loading to false after checking storage
  }, []);

  // ✅ Login Function (Store user data)
  const login = (userData: User) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  // Logout Function (Remove user data)
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  // ✅ Prevent children from rendering until auth state is loaded
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use Auth
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
