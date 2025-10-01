import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Settings as SettingsIcon, CreditCard, Info, Mail, Calendar, Shield, Crown, Zap, Rocket, Video, Play, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";

interface UserProfile {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string;
  provider?: string;
}

interface CurrentPlan {
  id: string;
  name: string;
  price: string;
  icon: any;
  features: string[];
  isActive: boolean;
}

const Settings = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [currentPlan, setCurrentPlan] = useState<CurrentPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock current plan - in a real app, this would come from your billing system
  const mockCurrentPlan = {
    id: "pro",
    name: "Pro",
    price: "$29/month",
    icon: Crown,
    features: [
      "Unlimited videos",
      "4K processing",
      "Advanced AI analysis",
      "Priority support",
      "50GB storage",
      "Custom branding",
    ],
    isActive: true,
  };

  const plans = [
    {
      id: "starter",
      name: "Starter",
      icon: Zap,
      price: "$9/month",
      features: ["Up to 10 videos per month", "720p processing", "Basic AI analysis"],
    },
    {
      id: "pro",
      name: "Pro",
      icon: Crown,
      price: "$29/month",
      features: ["Unlimited videos", "4K processing", "Advanced AI analysis"],
    },
    {
      id: "enterprise",
      name: "Enterprise",
      icon: Rocket,
      price: "$99/month",
      features: ["Everything in Pro", "8K processing", "API access"],
    },
  ];

  // Mock user videos - in a real app, this would come from your video storage
  const userVideos = [
    {
      id: "video-001",
      title: "Product Demo Video",
      duration: "2:45",
      status: "completed",
      uploadDate: "2024-09-28",
      thumbnail: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&h=300&fit=crop",
      processingProgress: 100,
    },
    {
      id: "video-002",
      title: "Team Meeting Recording",
      duration: "45:12",
      status: "processing",
      uploadDate: "2024-09-30",
      thumbnail: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=400&h=300&fit=crop",
      processingProgress: 75,
    },
    {
      id: "video-003",
      title: "Tutorial Walkthrough",
      duration: "12:30",
      status: "completed",
      uploadDate: "2024-09-25",
      thumbnail: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=300&fit=crop",
      processingProgress: 100,
    },
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Error fetching session:", error);
          navigate("/auth");
          return;
        }

        if (!session) {
          navigate("/auth");
          return;
        }

        const user = session.user;
        setUserProfile({
          id: user.id,
          email: user.email || "",
          created_at: user.created_at,
          last_sign_in_at: user.last_sign_in_at || "",
          provider: user.app_metadata?.provider,
        });

        // Set mock current plan
        setCurrentPlan(mockCurrentPlan);
      } catch (error) {
        console.error("Error:", error);
        toast({
          title: "Error",
          description: "Failed to load user data",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate, toast]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handlePlanChange = () => {
    navigate("/billing");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        <Header />
        <div className="container mx-auto px-6 py-12">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Header />
      
      {/* Page Header */}
      <div className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <SettingsIcon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Settings</h1>
              <p className="text-muted-foreground">Manage your account and preferences</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Account Information */}
          <Card className="p-8 border-border/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Account Information</h2>
                <p className="text-muted-foreground">Your basic account details</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="user-id">User ID</Label>
                <Input
                  id="user-id"
                  value={userProfile?.id || ""}
                  readOnly
                  className="bg-muted"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="flex gap-2">
                  <Input
                    id="email"
                    value={userProfile?.email || ""}
                    readOnly
                    className="bg-muted"
                  />
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Mail className="w-3 h-3" />
                    Verified
                  </Badge>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="created">Account Created</Label>
                <div className="flex gap-2">
                  <Input
                    id="created"
                    value={userProfile?.created_at ? formatDate(userProfile.created_at) : ""}
                    readOnly
                    className="bg-muted"
                  />
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Member
                  </Badge>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="last-login">Last Sign In</Label>
                <Input
                  id="last-login"
                  value={userProfile?.last_sign_in_at ? formatDate(userProfile.last_sign_in_at) : ""}
                  readOnly
                  className="bg-muted"
                />
              </div>
            </div>
          </Card>

          {/* Current Plan */}
          <Card className="p-8 border-border/50">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Current Plan</h2>
                  <p className="text-muted-foreground">Your active subscription plan</p>
                </div>
              </div>
              <Button onClick={handlePlanChange} variant="outline">
                Change Plan
              </Button>
            </div>
            
            {currentPlan && (
              <div className="border border-primary/20 rounded-lg p-6 bg-gradient-to-r from-primary/5 to-secondary/5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <currentPlan.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{currentPlan.name}</h3>
                      <p className="text-muted-foreground">{currentPlan.price}</p>
                    </div>
                  </div>
                  <Badge className="gradient-primary text-white">
                    <Shield className="w-3 h-3 mr-1" />
                    Active
                  </Badge>
                </div>
                
                <Separator className="my-4" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentPlan.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>

          {/* My Videos */}
          <Card className="p-8 border-border/50">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-info/10 flex items-center justify-center">
                  <Video className="w-5 h-5 text-info" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">My Videos</h2>
                  <p className="text-muted-foreground">Your uploaded and processed videos</p>
                </div>
              </div>
              <Button onClick={() => navigate("/upload")} variant="outline">
                Upload New
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userVideos.map((video) => (
                <Card key={video.id} className="p-4 border-border/50 hover:border-primary/50 transition-all">
                  <div className="relative aspect-video mb-4 rounded-lg overflow-hidden bg-muted">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-2 left-2 right-2 flex items-end justify-between">
                      <div>
                        <p className="text-white font-medium text-sm truncate">{video.title}</p>
                        <div className="flex items-center gap-2 text-white/80 text-xs">
                          <Clock className="w-3 h-3" />
                          {video.duration}
                        </div>
                      </div>
                      <Badge 
                        variant={video.status === "completed" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {video.status === "completed" ? "Ready" : "Processing"}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Uploaded: {new Date(video.uploadDate).toLocaleDateString()}</span>
                      {video.status === "processing" && (
                        <span>{video.processingProgress}%</span>
                      )}
                    </div>
                    
                    <Button
                      onClick={() => navigate(`/video/${video.id}`)}
                      className="w-full"
                      variant={video.status === "completed" ? "default" : "outline"}
                      disabled={video.status !== "completed"}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      {video.status === "completed" ? "View Details" : "Processing..."}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
            
            {userVideos.length === 0 && (
              <div className="text-center py-12">
                <Video className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No videos yet</h3>
                <p className="text-muted-foreground mb-4">Upload your first video to get started</p>
                <Button onClick={() => navigate("/upload")}>
                  Upload Video
                </Button>
              </div>
            )}
          </Card>

          {/* Available Plans */}
          <Card className="p-8 border-border/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <Info className="w-5 h-5 text-success" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Available Plans</h2>
                <p className="text-muted-foreground">Compare all available plans</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {plans.map((plan) => {
                const Icon = plan.icon;
                const isCurrentPlan = currentPlan?.id === plan.id;
                
                return (
                  <div
                    key={plan.id}
                    className={`
                      p-4 rounded-lg border transition-all
                      ${isCurrentPlan 
                        ? "border-primary bg-primary/5" 
                        : "border-border/50 hover:border-primary/50"
                      }
                    `}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{plan.name}</h3>
                        <p className="text-sm text-muted-foreground">{plan.price}</p>
                      </div>
                      {isCurrentPlan && (
                        <Badge className="ml-auto text-xs">Current</Badge>
                      )}
                    </div>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {plan.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-muted-foreground"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* App Information */}
          <Card className="p-8 border-border/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-lg bg-info/10 flex items-center justify-center">
                <Info className="w-5 h-5 text-info" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">About VidLab</h2>
                <p className="text-muted-foreground">Application information and features</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Platform Features</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      AI-powered video processing
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      Multiple video format support
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      Cloud-based infrastructure
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      Real-time processing updates
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg mb-2">Security & Privacy</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-success" />
                      End-to-end encryption
                    </li>
                    <li className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-success" />
                      GDPR compliant
                    </li>
                    <li className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-success" />
                      Secure cloud storage
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Support</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>📧 Email: support@vidlab.ai</li>
                    <li>💬 Live chat: Available 24/7</li>
                    <li>📚 Documentation: Complete guides</li>
                    <li>🎓 Video tutorials: Step-by-step</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg mb-2">Version Info</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>App Version: 2.1.0</li>
                    <li>API Version: v3</li>
                    <li>Last Updated: October 2024</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
