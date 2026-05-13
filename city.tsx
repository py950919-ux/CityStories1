import { useState } from "react";
import { useRoute } from "wouter";
import { useGetCity, getGetCityQueryKey, useGetPlaces }
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, Lock, Info, Coffee, Utensils, ExternalLink, Sunrise, ShieldCheck, IndianRupee, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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

  const { data: city, isLoading: loadingCity } = useGetCity(cityId, {
    query: { enabled: !!cityId, queryKey: getGetCityQueryKey(cityId) }
  });

  const { data: places, isLoading: loadingPlaces } = useGetPlaces({ city_id: cityId });

  useSeo({
    title: city ? `${city.name}, ${city.state} — Local guide` : "City guide",
    description: city
      ? `${city.description} Local-curated places to eat, see and slow down in ${city.name}.`
      : undefined,
    image: city ? resolveImage(city.image_url) : undefined,
    type: "place",
  });

  const categories = [
    { id: "all", label: "All Spots" },
    { id: "food", label: "Food & Drinks" },
    { id: "place", label: "Sights & Places" },
    { id: "cafe", label: "Cafes" },
    { id: "hidden_gem", label: "Hidden Gems" },
    { id: "restaurant", label: "Restaurants" },
  ];

  const filteredPlaces = places?.filter(place => {
    if (activeCategory === "all") return true;
    if (activeCategory === "food") return ["restaurant", "cafe", "street_food"].includes(place.type);
    if (activeCategory === "hidden_gem") return place.category?.toLowerCase().includes("hidden");
    return place.type === activeCategory || place.category?.toLowerCase() === activeCategory;
  }) || [];

  const unlockedCount = places?.filter(p => !p.is_premium).length ?? 0;
  const lockedCount = places?.filter(p => p.is_premium).length ?? 0;

  if (loadingCity) {
    return (
      <div className="flex flex-col min-h-screen">
        <Skeleton className="h-[40vh] w-full rounded-none" />
        <div className="container px-4 mx-auto max-w-7xl py-12">
          <Skeleton className="h-10 w-1/3 mb-4" />
          <Skeleton className="h-6 w-1/2 mb-8" />
          <div className="grid md:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-64 w-full rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!city) {
    return <div className="p-12 text-center">City not found</div>;
  }

  return (
    <div className="flex flex-col min-h-[100dvh] bg-background">
      {/* Hero Header */}
      <section className="relative h-[42vh] min-h-[320px] flex items-end">
        <div className="absolute inset-0 z-0">
          <img
            src={resolveImage(city.image_url)}
            alt={city.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>

        <div className="container px-4 mx-auto max-w-7xl relative z-10 pb-12">
          <Badge className="bg-primary text-primary-foreground hover:bg-primary border-none mb-4 uppercase tracking-wider font-semibold text-xs">
            {city.state}
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold font-serif text-foreground mb-4 drop-shadow-md">
            {city.name}
          </h1>
          <p className="text-lg md:text-xl text-foreground/90 max-w-3xl drop-shadow">
            {city.description}
          </p>

          <div className="flex flex-wrap gap-4 mt-6">
            <div className="flex items-center gap-2 bg-background/80 backdrop-blur-md px-4 py-2 rounded-lg border border-border/50 shadow-sm text-sm font-medium">
              <Sunrise className="h-4 w-4 text-primary" />
              <span>Best time: {city.best_time}</span>
            </div>
            <div className="flex items-center gap-2 bg-background/80 backdrop-blur-md px-4 py-2 rounded-lg border border-border/50 shadow-sm text-sm font-medium">
              <IndianRupee className="h-4 w-4 text-primary" />
              <span>Budget: ₹{city.budget?.min}–₹{city.budget?.max}/day</span>
            </div>
          </div>
        </div>
      </section>

      {/* Unlock Banner */}
      {lockedCount > 0 && (
        <div className="bg-primary/5 border-y border-primary/20 py-4">
          <div className="container px-4 mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Lock className="h-5 w-5 text-primary shrink-0" />
              <p className="text-sm text-foreground/80">
                <span className="font-semibold text-foreground">{lockedCount} hidden spots</span> in {city.name} — curated by locals, not on Google.
              </p>
            </div>
            <Button
              size="sm"
              className="rounded-full px-6 shrink-0 bg-green-600 hover:bg-green-700 text-white border-none"
              onClick={() => openWhatsApp(`Hi! I want to unlock the ${lockedCount} hidden places in ${city.name} on CityStories.in`)}
            >
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Unlock on WhatsApp
            </Button>
          </div>
        </div>
      )}

      {/* Category Tabs */}
      <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-md border-b border-border/50">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="flex overflow-x-auto py-4 hide-scrollbar gap-2">
            {categories.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeCategory === tab.id
                    ? "bg-secondary text-secondary-foreground shadow-sm"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Places Grid */}
      <section className="py-12 flex-1 bg-muted/10">
        <div className="container px-4 mx-auto max-w-7xl">
          {/* Must Try header */}
          {activeCategory === "all" && unlockedCount > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold font-serif mb-1">Must Try</h2>
              <p className="text-muted-foreground text-sm">Curated by locals — visible to all</p>
            </div>
          )}

          {loadingPlaces ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-80 w-full rounded-xl" />
              ))}
            </div>
          ) : filteredPlaces.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredPlaces.map((place, index) => {
                  const isLocked = place.is_premium;

                  return (
                    <motion.div
                      key={place.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3, delay: index * 0.04 }}
                    >
                      {isLocked ? (
                        <LockedPlaceCard place={place} cityName={city.name} />
                      ) : (
                        <UnlockedPlaceCard place={place} />
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          ) : (
            <div className="text-center py-24 text-muted-foreground bg-background rounded-xl border border-dashed border-border/50 shadow-sm">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-muted-foreground/50" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">No spots found</h3>
              <p>We don't have any places matching this category yet.</p>
              <Button variant="outline" className="mt-6" onClick={() => setActiveCategory("all")}>
                View all spots
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function UnlockedPlaceCard({ place }: { place: ReturnType<typeof useGetPlaces>["data"] extends Array<infer T> | undefined ? T : never }) {
  return (
    <Card className="overflow-hidden border-border/50 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col bg-card group">
      <div className="aspect-[4/3] bg-muted relative overflow-hidden">
        <img
          src={resolveImage(place.image_url)}
          alt={place.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <Badge className="absolute top-3 left-3 bg-green-600 text-white border-none font-semibold shadow-sm text-xs">
          Must Try
        </Badge>
        {place.budget && (
          <div className="absolute top-3 right-3">
            <Badge variant="outline" className="bg-background/90 backdrop-blur-sm border-none shadow-sm text-xs">
              {place.budget}
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-6 flex-1 flex flex-col">
        <div className="flex items-center gap-2 text-xs text-primary mb-3 uppercase tracking-wider font-bold">
          {place.type === 'cafe' && <Coffee className="h-3.5 w-3.5" />}
          {place.type === 'restaurant' && <Utensils className="h-3.5 w-3.5" />}
          {place.type !== 'cafe' && place.type !== 'restaurant' && <MapPin className="h-3.5 w-3.5" />}
          <span>{place.category}</span>
          {place.sub_category && <span className="text-muted-foreground">• {place.sub_category}</span>}
        </div>

        <h3 className="text-xl font-bold font-serif mb-1">{place.name}</h3>
        <div className="flex items-center text-sm text-muted-foreground mb-4">
          <MapPin className="h-3.5 w-3.5 mr-1 shrink-0" />
          {place.area}
        </div>

        <p className="text-muted-foreground text-sm line-clamp-3 mb-5 flex-1">
          {place.description}
        </p>

        <div className="mt-auto pt-4 border-t border-border/50 space-y-3">
          {place.timing && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5 shrink-0" />
              {place.timing}
            </div>
          )}
          {place.verified_by && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5 text-green-600 shrink-0" />
              <span>Verified by {place.verified_by}</span>
            </div>
          )}
          <div className="flex gap-2 pt-1">
            {place.map_link && (
              <a href={place.map_link} target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button variant="outline" className="w-full text-xs" size="sm">
                  <ExternalLink className="mr-2 h-3.5 w-3.5" />
                  Maps
                </Button>
              </a>
            )}
            <Button variant="default" className="flex-1 text-xs" size="sm">
              <Info className="mr-2 h-3.5 w-3.5" />
              Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function LockedPlaceCard({ place, cityName }: {
  place: ReturnType<typeof useGetPlaces>["data"] extends Array<infer T> | undefined ? T : never;
  cityName: string;
}) {
  return (
    <Card className="overflow-hidden border-border/40 shadow-sm h-full flex flex-col bg-card relative group">
      {/* Blurred image */}
      <div className="aspect-[4/3] bg-muted relative overflow-hidden">
        <img
          src={resolveImage(place.image_url)}
          alt="Locked place"
          className="w-full h-full object-cover blur-md scale-110 opacity-60"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-background/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-background/90 flex items-center justify-center shadow-lg">
            <Lock className="h-7 w-7 text-primary" />
          </div>
        </div>
      </div>

      {/* Blurred content + unlock overlay */}
      <CardContent className="p-6 flex-1 flex flex-col relative">
        {/* Blurred text underneath */}
        <div className="blur-sm select-none pointer-events-none mb-4">
          <div className="text-xs text-primary uppercase tracking-wider font-bold mb-3">
            {place.category} • {place.sub_category}
          </div>
          <div className="h-6 bg-foreground/10 rounded w-3/4 mb-2" />
          <div className="h-4 bg-foreground/10 rounded w-1/2 mb-4" />
          <div className="space-y-1">
            <div className="h-3 bg-foreground/10 rounded w-full" />
            <div className="h-3 bg-foreground/10 rounded w-5/6" />
            <div className="h-3 bg-foreground/10 rounded w-4/5" />
          </div>
        </div>

        {/* Unlock prompt */}
        <div className="flex flex-col items-center text-center pt-2 border-t border-border/50">
          <p className="text-sm text-muted-foreground mb-4">
            Local secret — hidden from regular travel guides.
          </p>
          <Button
            className="w-full rounded-full bg-green-600 hover:bg-green-700 text-white border-none"
            size="sm"
            onClick={() => openWhatsApp(`Hi! I want to unlock hidden places in ${cityName} on CityStories.in`)}
          >
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Unlock via WhatsApp
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
