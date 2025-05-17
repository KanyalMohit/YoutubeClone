
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Navigate } from "react-router-dom";
import { Upload as UploadIcon, Video } from "lucide-react";
import { API_BASE_URL } from "@/lib/api-client";

const Upload = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Upload Video - StreamTube";
  }, []);

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      const objectUrl = URL.createObjectURL(file);
      setVideoPreview(objectUrl);
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
      const objectUrl = URL.createObjectURL(file);
      setThumbnailPreview(objectUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!videoFile) {
      toast.error("Please select a video file to upload");
      return;
    }

    if (!title.trim()) {
      toast.error("Please provide a title for your video");
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("video", videoFile);
      formData.append("title", title);
      
      if (description.trim()) {
        formData.append("description", description);
      }
      
      if (thumbnailFile) {
        formData.append("thumbnail", thumbnailFile);
      }

      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("Authentication token not found");
      }

      const response = await fetch(`${API_BASE_URL}/video/upload`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to upload video");
      }

      const data = await response.json();
      toast.success("Video uploaded successfully!");
      navigate(`/video/${data.id}`);
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(error instanceof Error ? error.message : "An unknown error occurred");
    } finally {
      setIsUploading(false);
    }
  };

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen bg-stream-dark">
      <Sidebar />
      
      <div className="flex-1 ml-0 md:ml-16 lg:ml-64">
        <Header />
        
        <main className="pt-6 px-4 mt-16 pb-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Upload Video</h1>
            
            <Card>
              <CardHeader>
                <CardTitle>Upload a new video</CardTitle>
                <CardDescription>Share your video with the StreamTube community</CardDescription>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="video">Video File</Label>
                    <div className="border-2 border-dashed border-border rounded-md p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors" onClick={() => document.getElementById('video')?.click()}>
                      {videoPreview ? (
                        <div className="space-y-2">
                          <video 
                            src={videoPreview} 
                            controls 
                            className="max-h-60 mx-auto"
                          />
                          <p className="text-sm text-muted-foreground">{videoFile?.name}</p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Video className="h-12 w-12 mx-auto text-muted-foreground" />
                          <p>Click to select a video file or drag and drop it here</p>
                          <p className="text-xs text-muted-foreground">Supported formats: MP4, MOV, AVI, etc.</p>
                        </div>
                      )}
                      <Input 
                        id="video" 
                        type="file" 
                        accept="video/*" 
                        className="hidden" 
                        onChange={handleVideoChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="thumbnail">Thumbnail (Optional)</Label>
                    <div className="border-2 border-dashed border-border rounded-md p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors" onClick={() => document.getElementById('thumbnail')?.click()}>
                      {thumbnailPreview ? (
                        <div className="space-y-2">
                          <img 
                            src={thumbnailPreview} 
                            alt="Video thumbnail preview" 
                            className="max-h-40 mx-auto object-contain" 
                          />
                          <p className="text-sm text-muted-foreground">{thumbnailFile?.name}</p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <UploadIcon className="h-12 w-12 mx-auto text-muted-foreground" />
                          <p>Click to select a thumbnail image</p>
                          <p className="text-xs text-muted-foreground">Recommended: 1280×720 (16:9)</p>
                        </div>
                      )}
                      <Input 
                        id="thumbnail" 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handleThumbnailChange}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      placeholder="Video title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description (Optional)</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your video..."
                      rows={4}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={isUploading || !videoFile}>
                    {isUploading ? "Uploading..." : "Upload Video"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Upload;