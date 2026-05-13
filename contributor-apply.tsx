import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { MapPin, ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";
import { Link } from "wouter";

const WHATSAPP_NUMBER = "919352076138";

export default function ContributorApply() {
  const { toast } = useToast();
  const { data: cities } = useGetCities();

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "",
    years_in_city: "",
    expertise: "",
    bio: "",
  });

  function onChange(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  function validate() {
    if (!form.name.trim()) return "Please enter your name";
    if (!form.phone.trim()) return "Please enter your phone number";
    if (!form.city.trim()) return "Please mention your city";
    if (!form.bio.trim() || form.bio.length < 30) return "Please write a bit about yourself (at least 30 characters)";
    return null;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const err = validate();
    if (err) {
      toast({ title: "Please fill in all fields", description: err, variant: "destructive" });
      return;
    }

    setLoading(true);

    try {
      await fetch(`${import.meta.env.VITE_API_URL || "/api-server"}/admin/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, type: "contributor_application" }),
      });
    } catch {}

    setLoading(false);
    setSubmitted(true);

    const message = `Hi! I'd like to become a CityStories contributor.\n\nName: ${form.name}\nPhone: ${form.phone}\nCity: ${form.city}\nYears in city: ${form.years_in_city || "Not specified"}\nExpertise: ${form.expertise}\n\nAbout me:\n${form.bio}`;

    setTimeout(() => {
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
    }, 1200);
  }

  if (submitted) {
    return (
      <div className="min-h-[100dvh] bg-muted/20 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold font-serif mb-4">Application Sent!</h2>
          <p className="text-muted-foreground mb-2">
            We're opening WhatsApp so you can send us your details directly. We review every application personally and will get back to you within 2–3 days.
          </p>
          <p className="text-sm text-muted-foreground mb-8">
            If WhatsApp didn't open automatically,{" "}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi! I'd like to become a CityStories contributor for ${form.city}.\nName: ${form.name}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 font-medium underline"
            >
              click here
            </a>
            .
          </p>
          <Link href="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-muted/20 py-12">
      <div className="container px-4 mx-auto max-w-2xl">
        <Link href="/contributor" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to overview
        </Link>

        <Card className="border-border/50 shadow-md bg-card">
          <CardHeader className="text-center pb-8 border-b border-border/50">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-3xl font-serif">Apply as a Local Guide</CardTitle>
            <CardDescription className="text-base mt-2">
              Tell us about yourself and why you're the right person to represent your city. We'll reach out on WhatsApp.
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-8">
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name *</label>
                  <Input
                    placeholder="Your name"
                    value={form.name}
                    onChange={e => onChange("name", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone / WhatsApp *</label>
                  <Input
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={e => onChange("phone", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Your City *</label>
                  <Input
                    placeholder="e.g. Jaipur, Chandigarh..."
                    list="city-list"
                    value={form.city}
                    onChange={e => onChange("city", e.target.value)}
                  />
                  <datalist id="city-list">
                    {cities?.map(c => <option key={c.id} value={c.name} />)}
                  </datalist>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Years lived there</label>
                  <Input
                    type="number"
                    placeholder="e.g. 10"
                    min="1"
                    value={form.years_in_city}
                    onChange={e => onChange("years_in_city", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Areas of Expertise</label>
                <Input
                  placeholder="e.g. Street Food, Heritage Walks, Hidden Cafes"
                  value={form.expertise}
                  onChange={e => onChange("expertise", e.target.value)}
                />
                <p className="text-xs text-muted-foreground">What kind of spots do you know best?</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Why should you be a CityStories guide? *</label>
                <Textarea
                  placeholder="Tell us about your connection to the city. What hidden spots do you know? What makes your perspective unique? The more honest, the better."
                  className="min-h-[130px] resize-y"
                  value={form.bio}
                  onChange={e => onChange("bio", e.target.value)}
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-base bg-green-600 hover:bg-green-700 text-white"
                disabled={loading}
              >
                {loading ? (
                  <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Sending...</>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Send Application via WhatsApp
                  </>
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                By applying, you agree to our content guidelines. All submissions are reviewed by our curation team before publishing.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
