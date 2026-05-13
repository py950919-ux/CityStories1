import { useState } from "react";
import { useRoute } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, Lock } from "lucide-react";
import { resolveImage } from "@/lib/local-images";
import { useSeo } from "@/hooks/use-seo";

const WHATSAPP_NUMBER = "919352076138";

function openWhatsApp(message?: string) {
  const text = message || "Hi! I'd like to unlock the hidden places on CityStories.in";
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank");
}

export default function City() {
  const [, params] = useRoute("/city/:id");
  const cityId = params?.id || "";
  const [activeCategory, setActiveCategory] = useState("all");

  // ✅ STATIC DATA (NO BACKEND)
  const loadingCity = false;
  const loadingPlaces = false;

  const city = {
    name: "Sample City",
    state: "India",
    description: "Local curated experiences coming soon",
    image_url: "",
    best_time: "Oct - March",
    budget: { min: 1000, max: 3000 }
  };

  const places: any[] = [];

  useSeo({
    title: `${city.name} — Local guide`,
    description: city.description,
  });

  if (loadingCity) {
    return <Skeleton className="h-40 w-full" />;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2">{city.name}</h1>
      <p className="text-muted-foreground mb-6">{city.description}</p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {places.length === 0 ? (
          <div className="text-center col-span-full text-muted-foreground">
            No places yet
          </div>
        ) : (
          places.map((place, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <h3>{place.name}</h3>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <div className="mt-8 text-center">
        <Button onClick={() => openWhatsApp()}>
          Unlock via WhatsApp
        </Button>
      </div>
    </div>
  );
}
