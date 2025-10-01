import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, ArrowLeft, Zap, Crown, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";

const Billing = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const plans = [
    {
      id: "starter",
      name: "Starter",
      icon: Zap,
      price: "$9",
      period: "/month",
      features: [
        "Up to 10 videos per month",
        "720p processing",
        "Basic AI analysis",
        "Email support",
        "5GB storage",
      ],
    },
    {
      id: "pro",
      name: "Pro",
      icon: Crown,
      price: "$29",
      period: "/month",
      popular: true,
      features: [
        "Unlimited videos",
        "4K processing",
        "Advanced AI analysis",
        "Priority support",
        "50GB storage",
        "Custom branding",
      ],
    },
    {
      id: "enterprise",
      name: "Enterprise",
      icon: Rocket,
      price: "$99",
      period: "/month",
      features: [
        "Everything in Pro",
        "8K processing",
        "API access",
        "Dedicated support",
        "500GB storage",
        "Custom integrations",
        "Team collaboration",
      ],
    },
  ];

  const handleCheckout = () => {
    if (!selectedPlan) {
      toast({
        title: "No plan selected",
        description: "Please select a plan to continue",
        variant: "destructive",
      });
      return;
    }

    // Mock checkout
    toast({
      title: "Mock Checkout",
      description: `Processing payment for ${plans.find(p => p.id === selectedPlan)?.name} plan...`,
    });

    setTimeout(() => {
      toast({
        title: "Payment successful! 🎉",
        description: "Your account has been upgraded",
      });
      navigate("/upload");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Header />
      <div className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/upload")}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Choose Your Plan</h1>
              <p className="text-sm text-muted-foreground">Select the perfect plan for your needs</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const isSelected = selectedPlan === plan.id;

            return (
              <Card
                key={plan.id}
                className={`
                  relative p-6 cursor-pointer transition-all border-2
                  ${isSelected ? "border-primary glow-effect" : "border-border/50"}
                  ${plan.popular ? "md:scale-105" : ""}
                  hover:border-primary/50
                `}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-1 text-xs font-semibold rounded-full gradient-primary text-white">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-3">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`
                    w-full
                    ${isSelected ? "gradient-primary text-white" : ""}
                  `}
                  variant={isSelected ? "default" : "outline"}
                >
                  {isSelected ? "Selected" : "Select Plan"}
                </Button>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Button
            size="lg"
            onClick={handleCheckout}
            disabled={!selectedPlan}
            className="px-8 gradient-primary hover:opacity-90"
          >
            Continue to Checkout
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            All plans include a 14-day money-back guarantee
          </p>
        </div>
      </div>
    </div>
  );
};

export default Billing;