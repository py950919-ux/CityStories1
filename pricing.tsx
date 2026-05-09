import { useState } from "react";
import { useCreateSubscription } from "@workspace/api-client-react";
import { useAuth } from "@/lib/auth";
import { Link, useLocation } from "wouter";
import { Check, X, Map, Compass, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useSeo } from "@/hooks/use-seo";

const WHATSAPP_NUMBER = "919352076138";

function openWhatsApp(message: string) {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

export default function Pricing() {
  const [currency, setCurrency] = useState<"INR" | "USD">("INR");
  const { isAuthenticated, isPremium } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  useSeo({
    title: "Pricing — Unlock every hidden gem",
    description:
      "Pick a plan to unlock every locally curated hidden gem on CityStories.in. Subscribe in seconds via WhatsApp.",
  });

  const createSubscription = useCreateSubscription();

  const handleSubscribe = (plan: "explorer" | "premium") => {
    if (!isAuthenticated) {
      setLocation("/login?redirect=/pricing");
      return;
    }

    const planLabel = plan === "premium" ? "Premium" : "Explorer";
    const priceLabel =
      currency === "INR"
        ? `₹${plan === "premium" ? 499 : 99}/mo`
        : `$${plan === "premium" ? 19 : 4}/mo`;
    const message = `Hi! I'd like to subscribe to the CityStories ${planLabel} plan (${priceLabel}). Please help me complete the payment.`;

    createSubscription.mutate(
      { data: { plan, currency } },
      {
        onSuccess: () => {
          toast({
            title: "Opening WhatsApp…",
            description: "Send the pre-filled message to complete your subscription.",
          });
          openWhatsApp(message);
        },
        onError: () => {
          toast({
            title: "We'll handle this on WhatsApp",
            description: "Continuing your request directly with our team.",
          });
          openWhatsApp(message);
        },
      }
    );
  };

  const prices = {
    INR: { explorer: 99, premium: 499 },
    USD: { explorer: 4, premium: 19 }
  };

  return (
    <div className="min-h-[100dvh] bg-background flex flex-col">
      <section className="py-24 bg-primary/5 relative overflow-hidden">
        <div className="container px-4 mx-auto max-w-7xl relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-serif mb-6 text-foreground">
              Invest in your travel.
            </h1>
            <p className="text-xl text-muted-foreground mb-12">
              Get access to premium hidden gems, curated itineraries, and support the local guides who share their knowledge.
            </p>

            <div className="flex items-center justify-center gap-4 mb-12 bg-background p-2 rounded-full w-fit mx-auto border border-border shadow-sm">
              <Label htmlFor="currency-toggle" className={`cursor-pointer px-4 py-2 rounded-full text-sm font-medium transition-colors ${currency === "INR" ? "text-foreground" : "text-muted-foreground"}`}>
                INR (₹)
              </Label>
              <Switch 
                id="currency-toggle" 
                checked={currency === "USD"}
                onCheckedChange={(c) => setCurrency(c ? "USD" : "INR")}
                className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-primary"
              />
              <Label htmlFor="currency-toggle" className={`cursor-pointer px-4 py-2 rounded-full text-sm font-medium transition-colors ${currency === "USD" ? "text-foreground" : "text-muted-foreground"}`}>
                USD ($)
              </Label>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 -mt-24 relative z-20">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            
            {/* Free Plan */}
            <Card className="bg-background border-border/50 shadow-sm flex flex-col mt-8">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                  <Map className="h-6 w-6 text-muted-foreground" />
                </div>
                <CardTitle className="text-2xl font-serif">Basic</CardTitle>
                <CardDescription>Get a taste of the city.</CardDescription>
                <div className="mt-6 flex items-baseline text-4xl font-bold">
                  {currency === "INR" ? "₹0" : "$0"}
                  <span className="text-sm text-muted-foreground font-normal ml-1">/mo</span>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-500 shrink-0" />
                    <span className="text-sm">Access to standard places</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-500 shrink-0" />
                    <span className="text-sm">Save up to 10 places</span>
                  </li>
                  <li className="flex items-start gap-3 text-muted-foreground">
                    <X className="h-5 w-5 shrink-0" />
                    <span className="text-sm">Premium hidden gems locked</span>
                  </li>
                  <li className="flex items-start gap-3 text-muted-foreground">
                    <X className="h-5 w-5 shrink-0" />
                    <span className="text-sm">No curated itineraries</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link href={isAuthenticated ? "/cities" : "/login"}>
                  <Button variant="outline" className="w-full">
                    {isAuthenticated ? "Keep Exploring" : "Sign Up Free"}
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Explorer Plan - Highlighted */}
            <Card className="bg-card border-primary/40 shadow-lg relative flex flex-col transform md:-translate-y-4">
              <div className="absolute top-0 inset-x-0 h-1.5 bg-primary rounded-t-xl" />
              <div className="absolute -top-4 inset-x-0 flex justify-center">
                <span className="bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full">
                  Most Popular
                </span>
              </div>
              <CardHeader className="pt-8">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Compass className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-2xl font-serif">Explorer</CardTitle>
                <CardDescription>For the curious traveler.</CardDescription>
                <div className="mt-6 flex items-baseline text-5xl font-bold text-primary">
                  {currency === "INR" ? `₹${prices.INR.explorer}` : `$${prices.USD.explorer}`}
                  <span className="text-sm text-muted-foreground font-normal ml-1">/mo</span>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary shrink-0" />
                    <span className="text-sm font-medium">Unlock all premium hidden gems</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary shrink-0" />
                    <span className="text-sm font-medium">Unlimited saved places</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary shrink-0" />
                    <span className="text-sm font-medium">Access 3-day city itineraries</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary shrink-0" />
                    <span className="text-sm font-medium">Direct WhatsApp tips line</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full text-base h-12" 
                  onClick={() => handleSubscribe("explorer")}
                  disabled={isPremium || createSubscription.isPending}
                >
                  {isPremium ? "Current Plan" : createSubscription.isPending ? "Processing..." : "Subscribe via WhatsApp"}
                </Button>
              </CardFooter>
            </Card>

            {/* Premium Plan */}
            <Card className="bg-background border-border/50 shadow-sm flex flex-col mt-8">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                  <Crown className="h-6 w-6 text-accent-foreground" />
                </div>
                <CardTitle className="text-2xl font-serif">Premium</CardTitle>
                <CardDescription>The ultimate local experience.</CardDescription>
                <div className="mt-6 flex items-baseline text-4xl font-bold">
                  {currency === "INR" ? `₹${prices.INR.premium}` : `$${prices.USD.premium}`}
                  <span className="text-sm text-muted-foreground font-normal ml-1">/mo</span>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-accent-foreground shrink-0" />
                    <span className="text-sm">Everything in Explorer</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-accent-foreground shrink-0" />
                    <span className="text-sm">Custom itinerary planning</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-accent-foreground shrink-0" />
                    <span className="text-sm">1-on-1 call with local guide</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-accent-foreground shrink-0" />
                    <span className="text-sm">Priority reservation assistance</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full hover:bg-accent/10 hover:text-accent-foreground hover:border-accent"
                  onClick={() => handleSubscribe("premium")}
                  disabled={createSubscription.isPending}
                >
                  {createSubscription.isPending ? "Processing..." : "Get Premium"}
                </Button>
              </CardFooter>
            </Card>

          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container px-4 mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold font-serif mb-6">Why charge for recommendations?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Quality takes time. We pay our local contributors for their knowledge to ensure you get authentic, up-to-date, and honest recommendations — not SEO spam or sponsored placements. By subscribing, you're directly supporting the local community.
          </p>
        </div>
      </section>
    </div>
  );
}