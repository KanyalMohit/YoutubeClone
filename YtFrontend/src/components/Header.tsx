
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, Search, Video, Bell } from "lucide-react";
import { Link } from "react-router-dom";
import AuthLinks from "./AuthLinks";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-stream-dark border-b border-border z-30">
      <div className="flex items-center justify-between h-full px-4 md:px-6">
        {/* Left: Menu Button and Logo */}
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu />
          </Button>
          <Link to="/" className="flex items-center">
            <Video className="h-6 w-6 text-primary mr-2" />
            <span className="font-bold text-lg hidden sm:inline">StreamTube</span>
          </Link>
        </div>

        {/* Center: Search Bar */}
        <div className="hidden sm:flex flex-1 mx-4 md:mx-8 lg:mx-16 relative max-w-2xl">
          <Input 
            type="search" 
            placeholder="Search videos" 
            className="w-full pr-10"
          />
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-0 top-0 h-full"
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>

        {/* Right: User Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="sm:hidden">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <AuthLinks />
        </div>
      </div>
    </header>
  );
};

export default Header;