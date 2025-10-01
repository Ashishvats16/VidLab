import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Download, Copy, Check, PlayCircle, Search, FileText, Sparkles, Clock, Eye, Loader2 } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const VideoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // State management
  const [copiedSynopsis, setCopiedSynopsis] = useState(false);
  const [downloadingClips, setDownloadingClips] = useState<{ [key: number]: boolean }>({});
  const [captionSearch, setCaptionSearch] = useState("");
  const [generatingSynopsis, setGeneratingSynopsis] = useState(false);
  const [synopsis, setSynopsis] = useState(
    "This video showcases an in-depth exploration of modern artificial intelligence and machine learning techniques. The content covers advanced neural network architectures, real-world applications in computer vision, and practical implementation strategies for developers. Key segments include detailed explanations of transformer models, attention mechanisms, and their applications in natural language processing. The video demonstrates hands-on coding examples and provides insights into industry best practices for ML deployment and optimization."
  );

  // Mock data
  const processingProgress = 75;
  const processingLogs = [
    { time: "00:00", message: "Video upload initiated", status: "success" },
    { time: "00:02", message: "Extracting frames and audio", status: "success" },
    { time: "00:05", message: "Running AI analysis", status: "success" },
    { time: "00:08", message: "Generating clips", status: "processing" },
    { time: "00:10", message: "Creating captions", status: "pending" },
  ];

  const videoInfo = {
    title: "AI & Machine Learning Deep Dive",
    originalDuration: "12:34",
    fileSize: "156 MB",
    resolution: "1920x1080",
    uploadDate: "2024-03-15",
  };

  const clips = [
    {
      id: 1,
      title: "Neural Network Introduction",
      duration: "3:24",
      thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop",
      description: "Introduction to neural networks and their basic architecture",
      views: 1247,
    },
    {
      id: 2,
      title: "Transformer Architecture Deep Dive", 
      duration: "5:45",
      thumbnail: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=300&fit=crop",
      description: "Detailed explanation of transformer models and attention mechanisms",
      views: 892,
    },
    {
      id: 3,
      title: "Practical Implementation Guide",
      duration: "3:25",
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop", 
      description: "Hands-on coding examples and best practices",
      views: 634,
    },
  ];

  const captions = [
    { time: "00:00", text: "Welcome to our comprehensive guide on artificial intelligence and machine learning" },
    { time: "00:15", text: "In this video, we'll explore the fundamentals of neural networks" },
    { time: "00:32", text: "Starting with the basic perceptron model and moving to complex architectures" },
    { time: "01:15", text: "Neural networks consist of interconnected nodes organized in layers" },
    { time: "01:45", text: "Each connection has an associated weight that determines signal strength" },
    { time: "02:20", text: "The activation function introduces non-linearity to the model" },
    { time: "02:55", text: "Backpropagation is the algorithm used to train these networks" },
    { time: "03:24", text: "Now let's dive into transformer architectures" },
    { time: "03:40", text: "Transformers revolutionized natural language processing" },
    { time: "04:15", text: "The attention mechanism allows models to focus on relevant parts" },
    { time: "04:50", text: "Self-attention computes relationships between all positions in a sequence" },
    { time: "05:25", text: "Multi-head attention provides multiple representation subspaces" },
    { time: "06:00", text: "Positional encoding helps the model understand sequence order" },
    { time: "06:30", text: "The encoder-decoder structure processes input and generates output" },
    { time: "07:15", text: "Let's look at some practical implementation examples" },
    { time: "07:45", text: "We'll use PyTorch for our neural network implementations" },
    { time: "08:20", text: "First, let's define our model architecture" },
    { time: "08:55", text: "The forward pass computes predictions from input data" },
    { time: "09:30", text: "Loss functions measure the difference between predictions and targets" },
    { time: "10:05", text: "Optimizers update model parameters to minimize loss" },
    { time: "10:40", text: "Training loops iterate through data to improve model performance" },
    { time: "11:15", text: "Validation helps prevent overfitting during training" },
    { time: "11:50", text: "Model deployment requires consideration of performance and scalability" },
    { time: "12:20", text: "Thank you for watching this deep dive into AI and machine learning" },
  ];

  const handleCopySynopsis = () => {
    navigator.clipboard.writeText(synopsis);
    setCopiedSynopsis(true);
    toast({
      title: "Copied to clipboard",
      description: "Synopsis has been copied",
    });
    setTimeout(() => setCopiedSynopsis(false), 2000);
  };

  const handleDownloadClip = (clipId: number, clipTitle: string) => {
    setDownloadingClips(prev => ({ ...prev, [clipId]: true }));
    
    // Simulate download progress
    setTimeout(() => {
      setDownloadingClips(prev => ({ ...prev, [clipId]: false }));
      toast({
        title: "Download completed",
        description: `${clipTitle} has been downloaded`,
      });
    }, 3000);

    toast({
      title: "Download started", 
      description: `Downloading ${clipTitle}...`,
    });
  };

  const handleGenerateSynopsis = async () => {
    setGeneratingSynopsis(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const aiGeneratedSynopsis = "AI-generated synopsis: This video provides a comprehensive exploration of advanced machine learning concepts, featuring detailed explanations of neural network architectures, transformer models, and practical implementation strategies. The content is structured to guide viewers from fundamental concepts to advanced applications, making it valuable for both beginners and experienced practitioners in the field of artificial intelligence.";
      setSynopsis(aiGeneratedSynopsis);
      setGeneratingSynopsis(false);
      toast({
        title: "Synopsis regenerated",
        description: "AI has generated a new synopsis based on video content",
      });
    }, 2500);
  };

  const handleExportCaptions = (format: 'srt' | 'vtt') => {
    toast({
      title: `Exporting captions`,
      description: `Downloading ${format.toUpperCase()} file...`,
    });
  };

  // Filter captions based on search
  const filteredCaptions = captions.filter(caption =>
    caption.text.toLowerCase().includes(captionSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Header />
      {/* Page Header */}
      <div className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/upload")}
                className="mt-1"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-3xl font-bold mb-2">{videoInfo.title}</h1>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {videoInfo.originalDuration}
                  </span>
                  <span>•</span>
                  <span>{videoInfo.fileSize}</span>
                  <span>•</span>
                  <span>{videoInfo.resolution}</span>
                  <span>•</span>
                  <span>Uploaded {videoInfo.uploadDate}</span>
                </div>
                <div className="mt-2">
                  <Badge variant="secondary" className="text-xs">
                    Processing {processingProgress}% complete
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Button variant="default" size="sm">
                <PlayCircle className="w-4 h-4 mr-2" />
                Play Original
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="status" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="status">Status</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
          </TabsList>

          {/* Status Tab */}
          <TabsContent value="status" className="space-y-6">
            <Card className="p-6 border-border/50">
              <h2 className="text-xl font-semibold mb-4">Processing Status</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{processingProgress}%</span>
                  </div>
                  <Progress value={processingProgress} className="h-3" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Estimated time remaining: ~2 minutes
                </p>
              </div>
            </Card>

            <Card className="p-6 border-border/50">
              <h2 className="text-xl font-semibold mb-4">Processing Logs</h2>
              <div className="space-y-3">
                {processingLogs.map((log, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 text-sm p-3 rounded-lg bg-muted/30"
                  >
                    <span className="text-muted-foreground font-mono shrink-0">
                      {log.time}
                    </span>
                    <span className="flex-1">{log.message}</span>
                    <span
                      className={`
                        shrink-0 px-2 py-0.5 rounded text-xs font-medium
                        ${log.status === "success" ? "bg-success/20 text-success" : ""}
                        ${log.status === "processing" ? "bg-warning/20 text-warning" : ""}
                        ${log.status === "pending" ? "bg-muted text-muted-foreground" : ""}
                      `}
                    >
                      {log.status}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Results Tab */}
          <TabsContent value="results" className="space-y-8">
            {/* Video Preview Section */}
            <Card className="border-border/50">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl flex items-center gap-2">
                  <PlayCircle className="w-5 h-5" />
                  Video Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                  {/* Video thumbnail/preview */}
                  <img
                    src="https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&h=675&fit=crop"
                    alt="Video preview"
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Video overlay controls */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center group hover:bg-black/30 transition-colors">
                    <div className="flex items-center gap-4 text-white">
                      <Button size="lg" className="rounded-full w-16 h-16">
                        <PlayCircle className="w-8 h-8" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Video info overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between text-white">
                      <div>
                        <h3 className="font-semibold">{videoInfo.title}</h3>
                        <p className="text-sm text-white/80">
                          Duration: {videoInfo.originalDuration} • {videoInfo.resolution}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-white/20">
                          <Download className="w-4 h-4 mr-2" />
                          Download Original
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Processing indicator */}
                  {processingProgress < 100 && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-yellow-500/90 text-black">
                        Processing {processingProgress}%
                      </Badge>
                    </div>
                  )}
                </div>
                
                {/* Video stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-4 border-t border-border/50">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">3</div>
                    <div className="text-sm text-muted-foreground">Clips Generated</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{captions.length}</div>
                    <div className="text-sm text-muted-foreground">Captions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{videoInfo.fileSize}</div>
                    <div className="text-sm text-muted-foreground">File Size</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">HD</div>
                    <div className="text-sm text-muted-foreground">Quality</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Clips Section */}
            <Card className="border-border/50">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <PlayCircle className="w-5 h-5" />
                    Generated Clips
                  </CardTitle>
                  <Badge variant="outline">
                    {clips.length} clips
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {clips.map((clip) => (
                    <Card key={clip.id} className="overflow-hidden border-border/50 hover:border-primary/20 transition-all duration-200 hover:shadow-lg group">
                      <div className="relative aspect-video bg-muted overflow-hidden">
                        <img
                          src={clip.thumbnail}
                          alt={clip.title}
                          className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                        <div className="absolute top-2 right-2">
                          <Badge variant="secondary" className="text-xs bg-black/50 text-white border-none">
                            {clip.duration}
                          </Badge>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h3 className="text-white font-semibold text-sm mb-1">{clip.title}</h3>
                          <p className="text-white/80 text-xs line-clamp-2">{clip.description}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-white/60 text-xs flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              {clip.views.toLocaleString()} views
                            </span>
                          </div>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                          <Button size="sm" className="rounded-full">
                            <PlayCircle className="w-4 h-4 mr-2" />
                            Preview
                          </Button>
                        </div>
                      </div>
                      <div className="p-4">
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full"
                          onClick={() => handleDownloadClip(clip.id, clip.title)}
                          disabled={downloadingClips[clip.id]}
                        >
                          {downloadingClips[clip.id] ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Downloading...
                            </>
                          ) : (
                            <>
                              <Download className="w-4 h-4 mr-2" />
                              Download Clip
                            </>
                          )}
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Captions Section */}
            <Card className="border-border/50">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Auto-Generated Captions
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleExportCaptions('srt')}
                    >
                      Export SRT
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleExportCaptions('vtt')}
                    >
                      Export VTT
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-4">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search captions..."
                      value={captionSearch}
                      onChange={(e) => setCaptionSearch(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Badge variant="secondary">
                    {filteredCaptions.length} / {captions.length} captions
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-96 overflow-y-auto border rounded-lg p-4 bg-muted/20">
                  {filteredCaptions.map((caption, index) => (
                    <div
                      key={index}
                      className="flex gap-4 p-3 rounded-lg bg-background/50 hover:bg-background/80 transition-colors cursor-pointer border border-transparent hover:border-border/50"
                    >
                      <span className="text-primary font-mono text-sm shrink-0 bg-primary/10 px-2 py-1 rounded">
                        {caption.time}
                      </span>
                      <span className="text-sm leading-relaxed">{caption.text}</span>
                    </div>
                  ))}
                  {filteredCaptions.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <Search className="w-8 h-8 mx-auto mb-2" />
                      <p>No captions found matching your search.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Synopsis Editor */}
            <Card className="border-border/50">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Video Synopsis
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleGenerateSynopsis}
                      disabled={generatingSynopsis}
                    >
                      {generatingSynopsis ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" />
                          Regenerate with AI
                        </>
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleCopySynopsis}
                    >
                      {copiedSynopsis ? (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-2" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Textarea
                    value={synopsis}
                    onChange={(e) => setSynopsis(e.target.value)}
                    className="min-h-40 resize-none text-sm leading-relaxed"
                    placeholder="Enter video synopsis..."
                  />
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <span>{synopsis.length} characters</span>
                    <span>Last updated: Just now</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default VideoDetail;