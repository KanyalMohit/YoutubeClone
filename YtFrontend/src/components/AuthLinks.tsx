
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { LogIn, User, LogOut } from "lucide-react";

const AuthLinks = () => {
  const { isLoggedIn, logout } = useAuth();

  return (
    <div className="flex items-center gap-2">
      {isLoggedIn ? (
        <>
          <Button 
            variant="ghost" 
            size="sm" 
            className="hidden md:flex items-center gap-2"
            onClick={logout}
          >
            <LogOut size={16} />
            <span>Logout</span>
          </Button>
          <Button asChild variant="default" size="sm">
            <Link to="/profile" className="flex items-center gap-2">
              <User size={16} />
              <span className="hidden md:inline">Profile</span>
            </Link>
          </Button>
        </>
      ) : (
        <>
          <Button asChild variant="ghost" size="sm" className="hidden md:flex items-center gap-2">
            <Link to="/signup">
              <User size={16} />
              <span>Sign Up</span>
            </Link>
          </Button>
          <Button asChild variant="default" size="sm">
            <Link to="/login" className="flex items-center gap-2">
              <LogIn size={16} />
              <span className="hidden md:inline">Login</span>
            </Link>
          </Button>
        </>
      )}
    </div>
  );
};

export default AuthLinks;