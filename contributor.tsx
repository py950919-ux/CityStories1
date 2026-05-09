import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PenTool, HeartHandshake, Zap, ArrowRight, ShieldCheck, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function Contributor() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 to-transparent opacity-50" />
        <div className="container px-4 mx-auto max-w-7xl relative z-10">
          <div className="max-w-3xl">
            <Badge variant="outline" className="mb-6 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 px-4 py-1">
              Join the Community
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold font-serif tracking-tight mb-6 leading-tight">
              Share your city's secrets.
            </h1>
            <p className="text-xl text-primary-foreground/80 mb-10 leading-relaxed max-w-2xl">
              Become a verified local guide for CityStories. Share your favorite chai stall, hidden temples, and weekend spots. Help travelers experience your home authentically.
            </p>
            <Link href="/contributor/apply">
              <Button size="lg" variant="secondary" className="rounded-full px-8 h-14 text-lg bg-background text-foreground hover:bg-background/90">
                Apply to be a Guide
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-background">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">Why become a contributor?</h2>
            <p className="text-lg text-muted-foreground">We value local knowledge, and we believe it shouldn't be given away for free.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-card border-border/50 shadow-sm">
              <CardContent className="p-8">
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-6">
                  <Zap className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-xl font-bold mb-3 font-serif">Earn from your knowledge</h3>
                <p className="text-muted-foreground">
                  Get a share of the subscription revenue based on how many travelers view and save your premium recommendations.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-border/50 shadow-sm">
              <CardContent className="p-8">
                <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center mb-6">
                  <HeartHandshake className="h-6 w-6 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-3 font-serif">Support local business</h3>
                <p className="text-muted-foreground">
                  Direct conscious travelers to deserving small businesses, heritage spots, and local artisans who don't have marketing budgets.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-border/50 shadow-sm">
              <CardContent className="p-8">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3 font-serif">Verified status</h3>
                <p className="text-muted-foreground">
                  Your profile gets a verified local badge. Build a reputation as the ultimate authority on your city.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-muted/30 border-t border-border/50">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold font-serif mb-8">How it works</h2>
              
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold font-serif shrink-0">1</div>
                    <div className="w-px h-full bg-border my-2" />
                  </div>
                  <div className="pb-8">
                    <h4 className="text-xl font-bold mb-2">Apply</h4>
                    <p className="text-muted-foreground">Tell us about your city, how long you've lived there, and what makes your perspective unique.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold font-serif shrink-0">2</div>
                    <div className="w-px h-full bg-border my-2" />
                  </div>
                  <div className="pb-8">
                    <h4 className="text-xl font-bold mb-2">Get Approved</h4>
                    <p className="text-muted-foreground">Our team reviews every application to ensure we only have genuine locals contributing to the platform.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold font-serif shrink-0">3</div>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Submit Places</h4>
                    <p className="text-muted-foreground">Add places via our contributor portal. Include photos, honest descriptions, and practical tips.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex-1 bg-card border border-border/50 rounded-2xl p-8 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-bl-full -z-10" />
              <PenTool className="h-10 w-10 text-primary mb-6" />
              <h3 className="text-2xl font-bold font-serif mb-4">What makes a good spot?</h3>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2"><Check className="h-5 w-5 text-green-500" /> Hard to find on Google Maps</li>
                <li className="flex items-center gap-2"><Check className="h-5 w-5 text-green-500" /> Run by passionate locals</li>
                <li className="flex items-center gap-2"><Check className="h-5 w-5 text-green-500" /> Culturally significant or historically rich</li>
                <li className="flex items-center gap-2"><Check className="h-5 w-5 text-green-500" /> Simply the best food in the neighborhood</li>
              </ul>
              
              <Link href="/contributor/apply">
                <Button className="w-full">Start Application</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-background text-center">
        <div className="container px-4 mx-auto max-w-3xl">
          <Users className="h-12 w-12 text-muted-foreground mx-auto mb-6" />
          <h2 className="text-3xl font-bold font-serif mb-6">Ready to represent your city?</h2>
          <p className="text-lg text-muted-foreground mb-8">Join hundreds of other locals making travel more authentic across India.</p>
          <Link href="/contributor/apply">
            <Button size="lg" className="rounded-full px-8 text-lg">
              Apply Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

function Check({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinelinejoin="round" className={className}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}