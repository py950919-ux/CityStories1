import { useGetPlaces } from "@workspace/api-client-react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Bookmark, MapPin, Coffee, Utensils, ArrowRight } from "lucide-react";

export default function SavedPlaces() {
  // In a real app, this would fetch the user's specific saved places
  // For this demo, we'll just fetch featured places to simulate saved ones
  const { data: places, isLoading } = useGetFeaturedPlaces({ limit: 4 });

  return (
    <div className="min-h-[100dvh] bg-background py-12 flex flex-col">
      <div className="container px-4 mx-auto max-w-7xl flex-1">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-primary/10 rounded-full">
            <Bookmark className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold font-serif">Saved Places</h1>
            <p className="text-muted-foreground">Your curated list of spots to visit.</p>
          </div>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-80 w-full rounded-xl" />
            ))}
          </div>
        ) : places && places.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {places.map((place) => (
              <Link key={place.id} href={`/city/${place.city_id}`}>
                <Card className="overflow-hidden border-border/50 hover:border-primary/30 transition-colors group cursor-pointer shadow-sm hover:shadow-md h-full flex flex-col relative">
                  <div className="absolute top-3 right-3 z-20">
                    <div className="bg-background/90 backdrop-blur-sm p-2 rounded-full text-primary shadow-sm hover:bg-background">
                      <Bookmark className="h-4 w-4 fill-current" />
                    </div>
                  </div>
                  
                  <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                    <img 
                      src={place.image_url || "https://images.unsplash.com/photo-1514222134-b57cbb8ce073"} 
                      alt={place.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <Badge className="bg-background/90 text-foreground backdrop-blur-sm border-none shadow-sm font-medium">
                        {place.city_name}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 text-xs text-primary mb-3 uppercase tracking-wider font-bold">
                      {place.type === 'cafe' && <Coffee className="h-3.5 w-3.5" />}
                      {place.type === 'restaurant' && <Utensils className="h-3.5 w-3.5" />}
                      {place.type === 'temple' && <MapPin className="h-3.5 w-3.5" />}
                      <span>{place.category}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold font-serif mb-2 group-hover:text-primary transition-colors">{place.name}</h3>
                    <div className="flex items-center text-sm text-muted-foreground mb-4">
                      <MapPin className="h-3.5 w-3.5 mr-1" />
                      {place.area}
                    </div>
                    
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                      {place.description}
                    </p>
                    
                    <div className="mt-auto flex items-center gap-2 pt-4 border-t border-border/50">
                      <Badge variant="outline" className="border-border">
                        {place.budget}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-card rounded-2xl border border-dashed border-border/50">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Bookmark className="h-8 w-8 text-muted-foreground/50" />
            </div>
            <h3 className="text-xl font-bold font-serif mb-2">No saved places yet</h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-8">
              Explore cities and click the bookmark icon on places you want to visit later.
            </p>
            <Link href="/cities">
              <Button>Explore Cities</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

// Temporary hook for demo purposes since we don't have a specific saved places endpoint
import { useGetFeaturedPlaces } from "@workspace/api-client-react";