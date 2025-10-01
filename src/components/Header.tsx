import { useNavigate, useLocation } from "react-router-dom";
import { Video, Upload, CreditCard, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate("/auth");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-card/95 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 group"
          >
            <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
              <Video className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              VidLab
            </span>
          </button>

          {/* Navigation */}
          <nav className="flex items-center gap-2">
            <Button
              variant={isActive("/") ? "default" : "ghost"}
              onClick={() => navigate("/")}
            >
              Home
            </Button>
            <Button
              variant={isActive("/upload") ? "default" : "ghost"}
              onClick={() => navigate("/upload")}
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload
            </Button>
            <Button
              variant={isActive("/billing") ? "default" : "ghost"}
              onClick={() => navigate("/billing")}
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Billing
            </Button>
            <Button
              variant={isActive("/settings") ? "default" : "ghost"}
              onClick={() => navigate("/settings")}
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button
              variant="ghost"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
