import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, MapPin, IndianRupee, Sunrise, Sun } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { resolveImage } from "@/lib/local-images";
import { useSeo } from "@/hooks/use-seo";

export default function Cities() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  useSeo({
    title: "Explore destinations across India",
    description:
      "Browse curated tier-2 and tier-3 Indian cities — Jaipur, Udaipur, Varanasi, Rishikesh, Manali, Chandigarh and more. Filter by spiritual, food, cafes and heritage.",
  });
  
  const cities = [];
const isLoading = false;

  const tabs = [
    { id: "all", label: "All Cities" },
    { id: "spiritual", label: "Spiritual" },
    { id: "food", label: "Food Trails" },
    { id: "cafes", label: "Cafes & Art" },
    { id: "heritage", label: "Heritage" }
  ];

  const filteredCities = cities?.filter(city => {
    // Search filter
    if (searchQuery && !city.name.toLowerCase().includes(searchQuery.toLowerCase()) && !city.state.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Tab filter
    if (activeTab === "spiritual" && !city.spiritual) return false;
    if (activeTab === "food" && !city.tags.includes("food")) return false;
    if (activeTab === "cafes" && !city.tags.includes("cafes")) return false;
    if (activeTab === "heritage" && !city.tags.includes("heritage")) return false;
    
    return true;
  });

  return (
    <div className="flex flex-col min-h-[100dvh] bg-background">
      {/* Header */}
      <section className="bg-primary/5 py-16 md:py-24 border-b border-border/50">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">Explore Destinations</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Discover the soul of India through its tier-2 and tier-3 cities. Curated by locals who know the streets like the back of their hand.
            </p>
            
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="Search cities or states..." 
                className="pl-10 h-12 bg-background border-border/50 focus-visible:ring-primary/50 text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-md border-b border-border/50">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="flex overflow-x-auto py-4 hide-scrollbar gap-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.id 
                    ? "bg-primary text-primary-foreground shadow-sm" 
                    : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="py-12 flex-1">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex flex-col space-y-3">
                  <Skeleton className="h-64 w-full rounded-xl" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))
            ) : filteredCities?.length ? (
              filteredCities.map((city, index) => (
                <motion.div
                  key={city.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Link href={`/city/${city.id}`}>
                    <Card className="overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-300 group cursor-pointer shadow-sm hover:shadow-md h-full flex flex-col bg-card/50">
                      <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                        <img 
                          src={resolveImage(city.image_url)} 
                          alt={city.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
                        <div className="absolute bottom-4 left-4 z-20">
                          <h2 className="text-2xl font-bold font-serif text-white mb-1 flex items-center gap-2">
                            {city.name}
                            {city.spiritual && <Sun className="h-5 w-5 text-accent" />}
                          </h2>
                          <div className="flex items-center text-white/90 text-sm font-medium">
                            <MapPin className="h-4 w-4 mr-1" />
                            {city.state}
                          </div>
                        </div>
                      </div>
                      
                      <CardContent className="p-6 flex-1 flex flex-col">
                        <p className="text-muted-foreground text-sm line-clamp-2 mb-6">
                          {city.description}
                        </p>
                        
                        <div className="grid grid-cols-2 gap-4 mt-auto">
                          <div className="flex flex-col gap-1">
                            <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Best Time</span>
                            <span className="text-sm font-medium flex items-center gap-1.5">
                              <Sunrise className="h-4 w-4 text-primary" />
                              {city.best_time || "Oct - Mar"}
                            </span>
                          </div>
                          <div className="flex flex-col gap-1">
                            <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Daily Budget</span>
                            <span className="text-sm font-medium flex items-center gap-1.5">
                              <IndianRupee className="h-4 w-4 text-primary" />
                              {city.budget?.min} - {city.budget?.max}
                            </span>
                          </div>
                        </div>
                        
                        <div className="mt-6 pt-6 border-t border-border/50 flex flex-wrap gap-2">
                          {city.tags?.slice(0, 3).map(tag => (
                            <Badge key={tag} variant="secondary" className="bg-secondary/5 text-secondary-foreground/80 hover:bg-secondary/10">
                              {tag}
                            </Badge>
                          ))}
                          <span className="text-xs text-muted-foreground ml-auto flex items-center">
                            {city.places_count || 0} spots
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-24 text-muted-foreground bg-muted/30 rounded-xl border border-dashed border-border/50">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-muted-foreground/50" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">No cities found</h3>
                <p>We couldn't find any cities matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
