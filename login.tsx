import { useState } from "react";
import { useLocation } from "wouter";
import { useSendOtp, useVerifyOtp } from "@workspace/api-client-react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Map, ArrowRight, Loader2 } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const phoneSchema = z.object({
  phone: z.string().min(10, "Phone number must be at least 10 digits").regex(/^\+?[0-9]+$/, "Invalid phone number format"),
});

const otpSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
});

export default function Login() {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [, setLocation] = useLocation();
  const { login } = useAuth();
  const { toast } = useToast();
  
  const sendOtp = useSendOtp();
  const verifyOtp = useVerifyOtp();

  const phoneForm = useForm<z.infer<typeof phoneSchema>>({
    resolver: zodResolver(phoneSchema),
    defaultValues: { phone: "" },
  });

  const otpForm = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  const onPhoneSubmit = (data: z.infer<typeof phoneSchema>) => {
    setPhoneNumber(data.phone);
    sendOtp.mutate(
      { data: { phone: data.phone } },
      {
        onSuccess: (res) => {
          toast({
            title: "OTP Sent",
            description: `We've sent a code to ${data.phone}`,
          });
          if (res.otp) {
            // For development only
            toast({
              title: "Dev Mode OTP",
              description: `Your code is ${res.otp}`,
              duration: 10000,
            });
          }
          setStep("otp");
        },
        onError: () => {
          toast({
            title: "Error",
            description: "Failed to send OTP. Please try again.",
            variant: "destructive"
          });
        }
      }
    );
  };

  const onOtpSubmit = (data: z.infer<typeof otpSchema>) => {
    verifyOtp.mutate(
      { data: { phone: phoneNumber, otp_code: data.otp } },
      {
        onSuccess: (res) => {
          if (res.success) {
            login(res.user, res.token);
            toast({
              title: "Welcome back!",
              description: "Successfully logged in.",
            });
            // Search params hack for wouter since it doesn't support useSearchParams directly
            const params = new URLSearchParams(window.location.search);
            const redirect = params.get("redirect") || "/";
            setLocation(redirect);
          }
        },
        onError: () => {
          toast({
            title: "Invalid OTP",
            description: "The code you entered is incorrect.",
            variant: "destructive"
          });
        }
      }
    );
  };

  return (
    <div className="min-h-[100dvh] flex flex-col md:flex-row">
      {/* Visual Section */}
      <div className="hidden md:flex flex-1 relative bg-primary/10 items-center justify-center p-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da" 
            alt="Indian Cityscape" 
            className="w-full h-full object-cover opacity-20 mix-blend-multiply"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40 mix-blend-multiply" />
        </div>
        <div className="relative z-10 max-w-lg text-primary-foreground">
          <Map className="h-16 w-16 mb-8 text-primary-foreground/90" />
          <h1 className="text-5xl font-bold font-serif mb-6 leading-tight">
            Your key to the real India.
          </h1>
          <p className="text-xl text-primary-foreground/80 leading-relaxed">
            Sign in to save places, access premium hidden gems, and curate your own authentic travel experience.
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="flex-1 flex items-center justify-center p-6 bg-background">
        <div className="w-full max-w-md">
          <div className="md:hidden flex justify-center mb-8">
            <Map className="h-12 w-12 text-primary" />
          </div>
          
          <Card className="border-none shadow-none md:border md:shadow-sm md:border-border/50 bg-transparent md:bg-card">
            <CardHeader className="text-center space-y-2">
              <CardTitle className="text-3xl font-serif">
                {step === "phone" ? "Welcome" : "Verify Number"}
              </CardTitle>
              <CardDescription className="text-base">
                {step === "phone" 
                  ? "Enter your phone number to sign in or create an account." 
                  : `Enter the 6-digit code sent to ${phoneNumber}`}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pt-6">
              {step === "phone" ? (
                <Form {...phoneForm}>
                  <form onSubmit={phoneForm.handleSubmit(onPhoneSubmit)} className="space-y-6">
                    <FormField
                      control={phoneForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="+91 98765 43210" 
                              type="tel"
                              className="h-12 text-lg px-4" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      className="w-full h-12 text-base" 
                      disabled={sendOtp.isPending}
                    >
                      {sendOtp.isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : "Continue"}
                    </Button>
                  </form>
                </Form>
              ) : (
                <Form {...otpForm}>
                  <form onSubmit={otpForm.handleSubmit(onOtpSubmit)} className="space-y-8 flex flex-col items-center">
                    <FormField
                      control={otpForm.control}
                      name="otp"
                      render={({ field }) => (
                        <FormItem className="flex flex-col items-center">
                          <FormControl>
                            <InputOTP maxLength={6} {...field}>
                              <InputOTPGroup>
                                <InputOTPSlot index={0} className="w-12 h-14 text-xl" />
                                <InputOTPSlot index={1} className="w-12 h-14 text-xl" />
                                <InputOTPSlot index={2} className="w-12 h-14 text-xl" />
                                <InputOTPSlot index={3} className="w-12 h-14 text-xl" />
                                <InputOTPSlot index={4} className="w-12 h-14 text-xl" />
                                <InputOTPSlot index={5} className="w-12 h-14 text-xl" />
                              </InputOTPGroup>
                            </InputOTP>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="w-full space-y-4">
                      <Button 
                        type="submit" 
                        className="w-full h-12 text-base" 
                        disabled={verifyOtp.isPending}
                      >
                        {verifyOtp.isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : "Verify & Sign In"}
                      </Button>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        className="w-full text-muted-foreground"
                        onClick={() => setStep("phone")}
                        disabled={verifyOtp.isPending}
                      >
                        Change phone number
                      </Button>
                    </div>
                  </form>
                </Form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}