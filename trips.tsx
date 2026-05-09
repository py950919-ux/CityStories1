import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Plane, Calendar, MapPin, Plus } from "lucide-react";

export default function Trips() {
  return (
    <div className="min-h-[100dvh] bg-background py-12 flex flex-col">
      <div className="container px-4 mx-auto max-w-7xl flex-1">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-secondary/10 rounded-full">
              <Plane className="h-6 w-6 text-secondary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold font-serif">My Trips</h1>
              <p className="text-muted-foreground">Manage your upcoming itineraries.</p>
            </div>
          </div>
          
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Plan New Trip
          </Button>
        </div>

        {/* Empty State for Demo */}
        <div className="text-center py-32 bg-card rounded-2xl border border-dashed border-border/50">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <Calendar className="h-8 w-8 text-muted-foreground/50" />
          </div>
          <h3 className="text-xl font-bold font-serif mb-2">No upcoming trips</h3>
          <p className="text-muted-foreground max-w-md mx-auto mb-8">
            Create an itinerary for your next adventure. Group your saved places by day and route.
          </p>
          <Link href="/cities">
            <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary/10">
              <MapPin className="mr-2 h-4 w-4" />
              Find Destinations
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}