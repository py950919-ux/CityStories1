import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Plus, Lock, Unlock, RefreshCw, Shield, MapPin, Building } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_URL || "/api-server";

async function adminFetch(path: string, options: RequestInit = {}, password: string) {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "x-admin-password": password,
      ...options.headers,
    },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Request failed" }));
    throw new Error(err.error || "Request failed");
  }
  return res.json();
}

export default function Admin() {
  const [password, setPassword] = useState(() => localStorage.getItem("admin_pw") || "");
  const [authed, setAuthed] = useState(false);
  const [cities, setCities] = useState<any[]>([]);
  const [places, setPlaces] = useState<any[]>([]);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [view, setView] = useState<"cities" | "places">("cities");
  const [loading, setLoading] = useState(false);
  const [showAddCity, setShowAddCity] = useState(false);
  const [showAddPlace, setShowAddPlace] = useState(false);
  const { toast } = useToast();

  const [newCity, setNewCity] = useState({ name: "", state: "", description: "", icon: "📍", best_time: "Oct–Mar", image_url: "", budget_min: 500, budget_max: 3000 });
  const [newPlace, setNewPlace] = useState({ name: "", city_id: "", city_name: "", type: "restaurant", category: "Food", sub_category: "", area: "", description: "", image_url: "", budget: "₹200–600", timing: "", is_premium: true });

  async function login() {
    try {
      await adminFetch("/admin/cities", {}, password);
      localStorage.setItem("admin_pw", password);
      setAuthed(true);
      loadCities();
    } catch {
      toast({ title: "Wrong password", variant: "destructive" });
    }
  }

  async function loadCities() {
    setLoading(true);
    try {
      const data = await adminFetch("/admin/cities", {}, password);
      setCities(data);
    } catch (e: any) {
      toast({ title: "Error loading cities", description: e.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }

  async function loadPlaces(cityId: string) {
    setLoading(true);
    try {
      const data = await adminFetch(`/admin/places?city_id=${cityId}`, {}, password);
      setPlaces(data);
    } catch (e: any) {
      toast({ title: "Error loading places", description: e.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }

  async function deleteCity(id: string) {
    if (!confirm("Delete this city and ALL its places? This cannot be undone.")) return;
    try {
      await adminFetch(`/admin/cities/${id}`, { method: "DELETE" }, password);
      toast({ title: "City deleted" });
      loadCities();
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    }
  }

  async function deletePlace(id: string) {
    if (!confirm("Delete this place?")) return;
    try {
      await adminFetch(`/admin/places/${id}`, { method: "DELETE" }, password);
      toast({ title: "Place deleted" });
      if (selectedCity) loadPlaces(selectedCity);
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    }
  }

  async function togglePremium(place: any) {
    try {
      await adminFetch(`/admin/places/${place.id}`, {
        method: "PUT",
        body: JSON.stringify({ ...place, is_premium: !place.isPremium }),
      }, password);
      toast({ title: `Place ${place.isPremium ? "unlocked" : "locked"}` });
      if (selectedCity) loadPlaces(selectedCity);
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    }
  }

  async function addCity() {
    try {
      await adminFetch("/admin/cities", { method: "POST", body: JSON.stringify(newCity) }, password);
      toast({ title: "City added!" });
      setShowAddCity(false);
      setNewCity({ name: "", state: "", description: "", icon: "📍", best_time: "Oct–Mar", image_url: "", budget_min: 500, budget_max: 3000 });
      loadCities();
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    }
  }

  async function addPlace() {
    try {
      const cityObj = cities.find(c => c.id === newPlace.city_id);
      await adminFetch("/admin/places", { method: "POST", body: JSON.stringify({ ...newPlace, city_name: cityObj?.name || newPlace.city_id }) }, password);
      toast({ title: "Place added!" });
      setShowAddPlace(false);
      setNewPlace({ name: "", city_id: selectedCity || "", city_name: "", type: "restaurant", category: "Food", sub_category: "", area: "", description: "", image_url: "", budget: "₹200–600", timing: "", is_premium: true });
      if (selectedCity) loadPlaces(selectedCity);
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    }
  }

  if (!authed) {
    return (
      <div className="min-h-[100dvh] bg-muted/20 flex items-center justify-center p-4">
        <Card className="w-full max-w-sm">
          <CardHeader className="text-center">
            <Shield className="h-10 w-10 text-primary mx-auto mb-2" />
            <CardTitle className="font-serif text-2xl">Admin Panel</CardTitle>
            <p className="text-sm text-muted-foreground">CityStories.in — Owner Access</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="password"
              placeholder="Admin password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === "Enter" && login()}
            />
            <Button className="w-full" onClick={login}>Enter Admin Panel</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-muted/10 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold font-serif">Admin Panel</h1>
            <p className="text-muted-foreground text-sm">Manage cities and places on CityStories.in</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => { localStorage.removeItem("admin_pw"); setAuthed(false); }}>
            Logout
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4">
            <p className="text-sm text-muted-foreground">Cities</p>
            <p className="text-2xl font-bold font-serif">{cities.length}</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-muted-foreground">Total Places</p>
            <p className="text-2xl font-bold font-serif">{places.length || "—"}</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-muted-foreground">Unlocked</p>
            <p className="text-2xl font-bold font-serif text-green-600">{places.filter(p => !p.isPremium).length || "—"}</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-muted-foreground">Locked</p>
            <p className="text-2xl font-bold font-serif text-primary">{places.filter(p => p.isPremium).length || "—"}</p>
          </Card>
        </div>

        {/* Tab Nav */}
        <div className="flex gap-2 mb-6">
          <Button variant={view === "cities" ? "default" : "outline"} size="sm" onClick={() => setView("cities")}>
            <Building className="mr-2 h-4 w-4" /> Cities
          </Button>
          <Button variant={view === "places" ? "default" : "outline"} size="sm" onClick={() => setView("places")} disabled={!selectedCity}>
            <MapPin className="mr-2 h-4 w-4" /> Places {selectedCity && `(${cities.find(c => c.id === selectedCity)?.name})`}
          </Button>
          <Button variant="ghost" size="sm" onClick={() => view === "cities" ? loadCities() : selectedCity && loadPlaces(selectedCity)} className="ml-auto">
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </Button>
        </div>

        {/* Cities View */}
        {view === "cities" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold font-serif">All Cities</h2>
              <Button size="sm" onClick={() => setShowAddCity(!showAddCity)}>
                <Plus className="mr-2 h-4 w-4" /> Add City
              </Button>
            </div>

            {showAddCity && (
              <Card className="border-2 border-primary/30">
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-semibold">Add New City</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input placeholder="City name" value={newCity.name} onChange={e => setNewCity(p => ({ ...p, name: e.target.value }))} />
                    <Input placeholder="State" value={newCity.state} onChange={e => setNewCity(p => ({ ...p, state: e.target.value }))} />
                    <Input placeholder="Icon emoji (e.g. 🏯)" value={newCity.icon} onChange={e => setNewCity(p => ({ ...p, icon: e.target.value }))} />
                    <Input placeholder="Best time (e.g. Oct–Mar)" value={newCity.best_time} onChange={e => setNewCity(p => ({ ...p, best_time: e.target.value }))} />
                    <Input placeholder="Min budget/day (₹)" type="number" value={newCity.budget_min} onChange={e => setNewCity(p => ({ ...p, budget_min: Number(e.target.value) }))} />
                    <Input placeholder="Max budget/day (₹)" type="number" value={newCity.budget_max} onChange={e => setNewCity(p => ({ ...p, budget_max: Number(e.target.value) }))} />
                  </div>
                  <Input placeholder="Cover image URL" value={newCity.image_url} onChange={e => setNewCity(p => ({ ...p, image_url: e.target.value }))} />
                  <Textarea placeholder="City description" value={newCity.description} onChange={e => setNewCity(p => ({ ...p, description: e.target.value }))} className="min-h-[80px]" />
                  <div className="flex gap-2">
                    <Button onClick={addCity}>Save City</Button>
                    <Button variant="outline" onClick={() => setShowAddCity(false)}>Cancel</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cities.map(city => (
                <Card key={city.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{city.icon}</span>
                        <div>
                          <h3 className="font-bold font-serif">{city.name}</h3>
                          <p className="text-xs text-muted-foreground">{city.state}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => deleteCity(city.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{city.description}</p>
                    <div className="flex gap-2">
                      <Badge variant="outline" className="text-xs">Best: {city.bestTime}</Badge>
                      <Badge variant="outline" className="text-xs">{city.tier}</Badge>
                    </div>
                    <Button
                      className="w-full mt-3"
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedCity(city.id);
                        setView("places");
                        loadPlaces(city.id);
                      }}
                    >
                      <MapPin className="mr-2 h-3.5 w-3.5" />
                      Manage Places
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Places View */}
        {view === "places" && selectedCity && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold font-serif">
                Places in {cities.find(c => c.id === selectedCity)?.name}
              </h2>
              <Button size="sm" onClick={() => { setShowAddPlace(!showAddPlace); setNewPlace(p => ({ ...p, city_id: selectedCity })); }}>
                <Plus className="mr-2 h-4 w-4" /> Add Place
              </Button>
            </div>

            {showAddPlace && (
              <Card className="border-2 border-primary/30">
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-semibold">Add New Place</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input placeholder="Place name" value={newPlace.name} onChange={e => setNewPlace(p => ({ ...p, name: e.target.value }))} />
                    <Input placeholder="Area / Neighbourhood" value={newPlace.area} onChange={e => setNewPlace(p => ({ ...p, area: e.target.value }))} />
                    <Input placeholder="Type (restaurant/cafe/place)" value={newPlace.type} onChange={e => setNewPlace(p => ({ ...p, type: e.target.value }))} />
                    <Input placeholder="Category (Food/Heritage/etc)" value={newPlace.category} onChange={e => setNewPlace(p => ({ ...p, category: e.target.value }))} />
                    <Input placeholder="Sub-category" value={newPlace.sub_category} onChange={e => setNewPlace(p => ({ ...p, sub_category: e.target.value }))} />
                    <Input placeholder="Budget (e.g. ₹200–600)" value={newPlace.budget} onChange={e => setNewPlace(p => ({ ...p, budget: e.target.value }))} />
                    <Input placeholder="Timing (e.g. 8am–10pm)" value={newPlace.timing} onChange={e => setNewPlace(p => ({ ...p, timing: e.target.value }))} />
                    <div className="flex items-center gap-3">
                      <input type="checkbox" id="isPremium" checked={newPlace.is_premium} onChange={e => setNewPlace(p => ({ ...p, is_premium: e.target.checked }))} />
                      <label htmlFor="isPremium" className="text-sm">Locked (premium)</label>
                    </div>
                  </div>
                  <Input placeholder="Image URL (or local:key)" value={newPlace.image_url} onChange={e => setNewPlace(p => ({ ...p, image_url: e.target.value }))} />
                  <Textarea placeholder="Description (write like a local!)" value={newPlace.description} onChange={e => setNewPlace(p => ({ ...p, description: e.target.value }))} className="min-h-[100px]" />
                  <div className="flex gap-2">
                    <Button onClick={addPlace}>Save Place</Button>
                    <Button variant="outline" onClick={() => setShowAddPlace(false)}>Cancel</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {loading ? (
              <p className="text-muted-foreground text-sm">Loading places...</p>
            ) : places.length === 0 ? (
              <p className="text-muted-foreground text-sm py-8 text-center">No places yet. Add the first one!</p>
            ) : (
              <div className="space-y-3">
                {places.map(place => (
                  <Card key={place.id} className="hover:shadow-sm transition-shadow">
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted shrink-0">
                        {place.imageUrl ? (
                          <img src={place.imageUrl.startsWith("local:") ? "" : place.imageUrl} alt={place.name} className="w-full h-full object-cover" onError={e => (e.currentTarget.src = "")} />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">No img</div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold truncate">{place.name}</h3>
                          <Badge variant={place.isPremium ? "default" : "outline"} className={`text-xs shrink-0 ${!place.isPremium ? "border-green-500 text-green-700" : ""}`}>
                            {place.isPremium ? "Locked" : "Must Try"}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">{place.area} • {place.category} • {place.type}</p>
                        {place.timing && <p className="text-xs text-muted-foreground">{place.timing}</p>}
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          title={place.isPremium ? "Make visible (unlock)" : "Lock this place"}
                          onClick={() => togglePremium(place)}
                        >
                          {place.isPremium ? <Unlock className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          onClick={() => deletePlace(place.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
