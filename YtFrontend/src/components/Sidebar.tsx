
import { Button } from "@/components/ui/button";
import { 
  Play, 
  Home, 
  Video, 
  SkipForward, 
  ArrowRight,
  Upload,
  User
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Sidebar = () => {
  const { isLoggedIn } = useAuth();
  
  return (
    <aside className="hidden md:flex flex-col w-16 lg:w-64 h-screen bg-stream-dark border-r border-border fixed top-0 left-0 pt-16 pb-4 overflow-y-auto">
      <div className="flex flex-col gap-1 p-2">
        <Button variant="ghost" className="flex justify-start gap-3 px-3" asChild>
          <Link to="/">
            <Home size={20} />
            <span className="hidden lg:inline">Home</span>
          </Link>
        </Button>
        
        <Button variant="ghost" className="flex justify-start gap-3 px-3">
          <SkipForward size={20} />
          <span className="hidden lg:inline">Shorts</span>
        </Button>
        
        <Button variant="ghost" className="flex justify-start gap-3 px-3">
          <Play size={20} />
          <span className="hidden lg:inline">Subscriptions</span>
        </Button>
      </div>
      
      <div className="border-t border-border mt-3 pt-3 px-2">
        {isLoggedIn && (
          <>
            <Button 
              variant="ghost" 
              className="w-full flex justify-start gap-3 px-3 text-primary hover:bg-primary/10" 
              asChild
            >
              <Link to="/upload">
                <Upload size={20} />
                <span className="hidden lg:inline">Upload Video</span>
              </Link>
            </Button>
            
            <Button variant="ghost" className="w-full flex justify-start gap-3 px-3" asChild>
              <Link to="/my-videos">
                <Video size={20} />
                <span className="hidden lg:inline">Your Videos</span>
              </Link>
            </Button>
            
            <Button variant="ghost" className="w-full flex justify-start gap-3 px-3" asChild>
              <Link to="/profile">
                <User size={20} />
                <span className="hidden lg:inline">Profile</span>
              </Link>
            </Button>
          </>
        )}
        
        <Button variant="ghost" className="w-full flex justify-start gap-3 px-3">
          <ArrowRight size={20} />
          <span className="hidden lg:inline">Library</span>
        </Button>
      </div>
      
      <div className="border-t border-border mt-3 pt-3 px-2">
        <h3 className="text-sm text-muted-foreground mb-2 px-3 hidden lg:block">Subscriptions</h3>
        {Array.from({ length: 5 }).map((_, i) => (
          <Button key={i} variant="ghost" className="w-full flex justify-start gap-3 px-3">
            <div className="w-6 h-6 rounded-full bg-stream-gray flex-shrink-0"></div>
            <span className="hidden lg:inline truncate">Channel {i + 1}</span>
          </Button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;