import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Map, MapPin, Coffee, Utensils, ShieldCheck, ArrowRight, Compass } from "lucide-react";
import { useGetCitiesStats, useGetFeaturedPlaces } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { useSeo } from "@/hooks/use-seo";

export default function Home() {
  useSeo({
    title: "Real stories from real people in every city",
    description:
      "India's first local-knowledge travel guide. Curated by locals — food, hidden temples, cafes and slow mornings in tier-2 and tier-3 cities.",
  });
  const { data: stats } = useGetCitiesStats();
  const { data: featuredPlaces, isLoading: loadingFeatured } = useGetFeaturedPlaces({ limit: 3 });

  return (
    <div className="flex flex-col min-h-[100dvh]">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-primary/5">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90 z-10" />
        </div>
        
        <div className="container px-4 mx-auto max-w-7xl relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="outline" className="mb-6 border-primary/20 bg-primary/10 text-primary hover:bg-primary/10 px-4 py-1 text-sm font-medium">
                Real stories from real people in every city
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-6 leading-[1.1]">
                Discover the <span className="text-primary italic">real</span> India.
              </h1>
              <p className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto">
                Ditch the tourist brochures. Get insider recommendations for authentic food, hidden temples, and slow mornings in tier-2 and tier-3 cities, curated by the locals who live there.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/cities">
                  <Button size="lg" className="rounded-full px-8 w-full sm:w-auto h-14 text-lg">
                    Explore Destinations
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/contributor">
                  <Button size="lg" variant="outline" className="rounded-full px-8 w-full sm:w-auto h-14 text-lg border-primary/20 hover:bg-primary/5">
                    Become a Local Guide
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-background border-y border-border/50">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-border/50">
            <div className="text-center px-4">
              <div className="text-4xl font-bold text-primary mb-2 font-serif">{stats?.total_cities || "50+"}</div>
              <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Cities</div>
            </div>
            <div className="text-center px-4">
              <div className="text-4xl font-bold text-secondary mb-2 font-serif">{stats?.total_places || "2,000+"}</div>
              <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Local Spots</div>
            </div>
            <div className="text-center px-4">
              <div className="text-4xl font-bold text-accent mb-2 font-serif">{stats?.total_contributors || "500+"}</div>
              <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Local Guides</div>
            </div>
            <div className="text-center px-4">
              <div className="text-4xl font-bold text-primary mb-2 font-serif">{stats?.total_users || "10k+"}</div>
              <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Travelers</div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 bg-card/50">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why CityStories is different</h2>
            <p className="text-lg text-muted-foreground">We believe the best way to experience a city is through the eyes of someone who calls it home.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-background border-border/50 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <ShieldCheck className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3 font-serif">Curated by Locals</h3>
                <p className="text-muted-foreground">No algorithms, no fake reviews. Every spot is submitted by a verified local who knows the city inside out.</p>
              </CardContent>
            </Card>
            <Card className="bg-background border-border/50 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-6">
                  <MapPin className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-xl font-bold mb-3 font-serif">Beyond the Tourist Trail</h3>
                <p className="text-muted-foreground">Discover the neighborhood chai stall, the quiet temple, and the hidden cafes that don't make it to standard travel blogs.</p>
              </CardContent>
            </Card>
            <Card className="bg-background border-border/50 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
                  <Compass className="h-8 w-8 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-3 font-serif">Organized & Honest</h3>
                <p className="text-muted-foreground">Clear categories, budget estimates, and best times to visit. We tell you exactly what to expect before you go.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Places */}
      <section className="py-24 bg-background">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="flex items-end justify-between mb-12">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif">Featured Discoveries</h2>
              <p className="text-lg text-muted-foreground">A taste of the authentic spots our locals have shared recently.</p>
            </div>
            <Link href="/cities">
              <Button variant="ghost" className="hidden md:flex text-primary hover:text-primary hover:bg-primary/10">
                View all cities <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {loadingFeatured ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex flex-col space-y-3">
                  <Skeleton className="h-48 w-full rounded-xl" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))
            ) : featuredPlaces?.length ? (
              featuredPlaces.map((place) => (
                <Link key={place.id} href={`/city/${place.city_id}`}>
                  <Card className="overflow-hidden border-border/50 hover:border-primary/30 transition-colors group cursor-pointer shadow-sm hover:shadow-md h-full flex flex-col">
                    <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                      <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors z-10" />
                      <div className="absolute top-4 left-4 z-20 flex gap-2">
                        <Badge className="bg-background/90 text-foreground backdrop-blur-sm border-none shadow-sm font-medium">
                          {place.city_name}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3 uppercase tracking-wider font-semibold">
                        {place.type === 'cafe' && <Coffee className="h-3.5 w-3.5" />}
                        {place.type === 'restaurant' && <Utensils className="h-3.5 w-3.5" />}
                        {place.type === 'street_food' && <Utensils className="h-3.5 w-3.5" />}
                        {place.type === 'temple' && <MapPin className="h-3.5 w-3.5" />}
                        <span>{place.category}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2 font-serif group-hover:text-primary transition-colors">{place.name}</h3>
                      <p className="text-muted-foreground text-sm line-clamp-2 mb-4">{place.description}</p>
                      <div className="mt-auto flex items-center gap-2">
                        <Badge variant="secondary" className="bg-secondary/10 text-secondary border-none">
                          {place.budget}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))
            ) : (
              <div className="col-span-3 text-center py-12 text-muted-foreground bg-muted/30 rounded-xl border border-dashed">
                No featured places available right now.
              </div>
            )}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Link href="/cities">
              <Button variant="outline" className="w-full">
                View all cities <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Teaser */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent" />
        <div className="container px-4 mx-auto max-w-7xl relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 font-serif">Unlock the full map.</h2>
          <p className="text-primary-foreground/80 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Get access to all premium hidden gems, custom itineraries, and direct tips from our verified local guides for less than the price of a coffee.
          </p>
          <Link href="/pricing">
            <Button size="lg" variant="secondary" className="rounded-full px-8 h-14 text-lg bg-background text-foreground hover:bg-background/90">
              View Pricing Plans
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}