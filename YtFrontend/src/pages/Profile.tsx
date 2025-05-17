
import { useEffect } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { User } from "lucide-react";

const Profile = () => {
  const { isLoggedIn, userId } = useAuth();
  
  useEffect(() => {
    document.title = "Profile - StreamTube";
  }, []);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen bg-stream-dark">
      <Sidebar />
      
      <div className="flex-1 ml-0 md:ml-16 lg:ml-64">
        <Header />
        
        <main className="pt-6 px-4 mt-16">
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <div className="bg-muted rounded-full p-4">
                <User className="h-12 w-12" />
              </div>
              <div>
                <CardTitle className="text-2xl">My Profile</CardTitle>
                <CardDescription>Manage your account details and preferences</CardDescription>
              </div>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">User ID</h3>
                  <p className="text-muted-foreground">{userId}</p>
                </div>
                <Separator />
                <div>
                  <h3 className="font-medium">Account Settings</h3>
                  <ul className="mt-2 space-y-2">
                    <li>
                      <a href="/settings" className="text-primary hover:underline">
                        Edit Profile Settings
                      </a>
                    </li>
                    <li>
                      <a href="/settings/preferences" className="text-primary hover:underline">
                        Notification Preferences
                      </a>
                    </li>
                  </ul>
                </div>
                <Separator />
                <div>
                  <h3 className="font-medium">My Content</h3>
                  <ul className="mt-2 space-y-2">
                    <li>
                      <a href="/my-videos" className="text-primary hover:underline">
                        My Videos
                      </a>
                    </li>
                    <li>
                      <a href="/upload" className="text-primary hover:underline">
                        Upload New Video
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Profile;