import { useNavigate } from "react-router-dom";
import { Video, Upload, Sparkles, Zap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Header />
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-secondary mb-6 glow-effect">
            <Video className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            AI-Powered Video Processing
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Transform your videos with cutting-edge AI technology. Upload, process, and enhance your content in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="text-lg px-8 gradient-primary hover:opacity-90 glow-effect"
              onClick={() => navigate("/auth")}
            >
              Get Started
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8"
              onClick={() => navigate("/billing")}
            >
              View Pricing
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card className="p-6 border-border/50 hover:border-primary/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <Upload className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Easy Upload</h3>
            <p className="text-muted-foreground">
              Drag and drop your videos or click to browse. Support for all major video formats.
            </p>
          </Card>

          <Card className="p-6 border-border/50 hover:border-primary/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">AI Processing</h3>
            <p className="text-muted-foreground">
              Advanced AI analyzes your content and generates intelligent clips with captions.
            </p>
          </Card>

          <Card className="p-6 border-border/50 hover:border-primary/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-success" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
            <p className="text-muted-foreground">
              Process videos in minutes with our optimized cloud infrastructure.
            </p>
          </Card>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">10K+</div>
            <div className="text-sm text-muted-foreground">Videos Processed</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-secondary mb-2">99.9%</div>
            <div className="text-sm text-muted-foreground">Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-success mb-2">24/7</div>
            <div className="text-sm text-muted-foreground">Support</div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <Card className="p-12 border-border/50 max-w-3xl mx-auto gradient-card">
            <Shield className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Videos?</h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Join thousands of creators using AI to enhance their content
            </p>
            <Button
              size="lg"
              className="text-lg px-10 gradient-primary hover:opacity-90"
              onClick={() => navigate("/auth")}
            >
              Start Free Trial
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
