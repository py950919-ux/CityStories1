import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Map } from "lucide-react";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [, setLocation] = useLocation();

  const handleLogin = () => {
    alert("Login coming soon 🚀");
    setLocation("/");
  };

  return (
    <div className="min-h-[100dvh] flex flex-col md:flex-row">
      <div className="flex-1 flex items-center justify-center p-6 bg-background">
        <div className="w-full max-w-md">
          
          <div className="flex justify-center mb-8">
            <Map className="h-12 w-12 text-primary" />
          </div>

          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-3xl">Welcome</CardTitle>
              <CardDescription>
                Enter your phone number (Demo version)
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <Input
                placeholder="+91 9876543210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />

              <Button onClick={handleLogin} className="w-full">
                Continue
              </Button>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
