import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Upload as UploadIcon, FileVideo, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";

type UploadState = "idle" | "uploading" | "completed" | "error";

const Upload = () => {
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    const videoFile = files.find(file => file.type.startsWith("video/"));
    
    if (videoFile) {
      setSelectedFile(videoFile);
      setUploadState("idle");
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a video file",
        variant: "destructive",
      });
    }
  }, [toast]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("video/")) {
      setSelectedFile(file);
      setUploadState("idle");
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a video file",
        variant: "destructive",
      });
    }
  }, [toast]);

  const simulateUpload = useCallback(() => {
    setUploadState("uploading");
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadState("completed");
          
          setTimeout(() => {
            toast({
              title: "Upload completed!",
              description: "Your video is being processed",
            });
            navigate("/video/mock-id-123");
          }, 1000);
          
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  }, [navigate, toast]);

  const handleUpload = () => {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select a video file first",
        variant: "destructive",
      });
      return;
    }

    // Random chance of error for demo
    if (Math.random() < 0.1) {
      setUploadState("error");
      toast({
        title: "Upload failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      return;
    }

    simulateUpload();
  };

  const resetUpload = () => {
    setUploadState("idle");
    setUploadProgress(0);
    setSelectedFile(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Header />
      <div className="flex items-center justify-center p-6 min-h-[calc(100vh-80px)]">
        <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Upload Your Video
          </h1>
          <p className="text-muted-foreground text-lg">
            Process and enhance your videos with AI
          </p>
        </div>

        <Card className="p-8 border-border/50 gradient-card">
          {/* File Drop Zone */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`
              relative border-2 border-dashed rounded-xl p-12 mb-6 transition-all
              ${isDragging ? "border-primary bg-primary/10 scale-[1.02]" : "border-border"}
              ${uploadState === "idle" || uploadState === "error" ? "cursor-pointer hover:border-primary/50 hover:bg-primary/5" : ""}
            `}
          >
            <input
              type="file"
              accept="video/*"
              onChange={handleFileSelect}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={uploadState === "uploading" || uploadState === "completed"}
            />

            <div className="flex flex-col items-center justify-center text-center">
              {uploadState === "idle" && !selectedFile && (
                <>
                  <UploadIcon className="w-16 h-16 text-primary mb-4" />
                  <p className="text-lg font-medium mb-2">Drop your video here or click to browse</p>
                  <p className="text-sm text-muted-foreground">Supports MP4, MOV, AVI and more</p>
                </>
              )}

              {uploadState === "idle" && selectedFile && (
                <>
                  <FileVideo className="w-16 h-16 text-primary mb-4" />
                  <p className="text-lg font-medium mb-2">{selectedFile.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </>
              )}

              {uploadState === "uploading" && (
                <>
                  <Loader2 className="w-16 h-16 text-primary mb-4 animate-spin" />
                  <p className="text-lg font-medium mb-4">Uploading your video...</p>
                  <Progress value={uploadProgress} className="w-full max-w-md" />
                  <p className="text-sm text-muted-foreground mt-2">{uploadProgress}%</p>
                </>
              )}

              {uploadState === "completed" && (
                <>
                  <CheckCircle2 className="w-16 h-16 text-success mb-4" />
                  <p className="text-lg font-medium mb-2">Upload completed!</p>
                  <p className="text-sm text-muted-foreground">Redirecting to video details...</p>
                </>
              )}

              {uploadState === "error" && (
                <>
                  <AlertCircle className="w-16 h-16 text-destructive mb-4" />
                  <p className="text-lg font-medium mb-2">Upload failed</p>
                  <p className="text-sm text-muted-foreground">Please try again</p>
                </>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            {(uploadState === "idle" || uploadState === "error") && (
              <>
                <Button
                  onClick={handleUpload}
                  disabled={!selectedFile}
                  className="flex-1 h-12 text-base font-medium gradient-primary hover:opacity-90 transition-opacity"
                >
                  <UploadIcon className="w-5 h-5 mr-2" />
                  Upload Video
                </Button>
                {selectedFile && (
                  <Button
                    onClick={resetUpload}
                    variant="outline"
                    className="h-12 px-6"
                  >
                    Clear
                  </Button>
                )}
              </>
            )}
          </div>
        </Card>

        {/* Info Cards */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <Card className="p-4 text-center border-border/50">
            <p className="text-2xl font-bold text-primary">AI</p>
            <p className="text-xs text-muted-foreground mt-1">Powered</p>
          </Card>
          <Card className="p-4 text-center border-border/50">
            <p className="text-2xl font-bold text-secondary">Fast</p>
            <p className="text-xs text-muted-foreground mt-1">Processing</p>
          </Card>
          <Card className="p-4 text-center border-border/50">
            <p className="text-2xl font-bold text-success">Secure</p>
            <p className="text-xs text-muted-foreground mt-1">& Private</p>
          </Card>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Upload;