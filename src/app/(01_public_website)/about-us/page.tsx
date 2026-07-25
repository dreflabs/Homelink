import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Users, Target, Shield, Heart } from "lucide-react";

export const metadata = {
  title: "About Us | HomeLink 2.0",
  description: "Learn more about our mission, vision, and the team behind HomeLink 2.0.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background selection:bg-primary/20">
      {/* Hero Section - Apple Style (Clean, Large Typography, Spaced out) */}
      <section className="relative overflow-hidden pt-32 pb-24 md:pt-48 md:pb-32 px-6">
        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-both">
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-foreground leading-[1.1]">
            Reimagining <br className="hidden md:block" />
            <span className="text-muted-foreground">Real Estate for Everyone.</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed">
            We're building the foundation for trust, transparency, and seamless experiences in the property market.
          </p>
          <div className="pt-8">
            <Button size="lg" className="rounded-full px-8 py-6 text-base font-medium shadow-sm hover:scale-105 transition-transform duration-300">
              Join Our Journey <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
      </section>

      {/* Vision & Mission - Minimalist Bento Grid Style */}
      <section className="py-24 bg-muted/30 px-6">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">Our Core Pillars</h2>
            <p className="text-lg text-muted-foreground">
              Everything we do is guided by these fundamental principles. We don't just build software; we build trust.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: "Unshakable Trust", desc: "Security and transparency are built into every transaction, ensuring peace of mind." },
              { icon: Target, title: "Absolute Accuracy", desc: "Verified properties only. We eliminate the noise so you can find what's real." },
              { icon: Heart, title: "Human Centric", desc: "Technology should serve people, not the other way around. Empathy drives our design." }
            ].map((pillar, i) => (
              <Card key={i} className="border-none bg-background/60 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 group">
                <CardContent className="p-10 flex flex-col items-center text-center space-y-6">
                  <div className="p-4 bg-primary/10 rounded-2xl group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-500">
                    <pillar.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold">{pillar.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{pillar.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Mockup Section - Premium Aesthetic */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="flex-1 space-y-8">
              <h2 className="text-4xl md:text-6xl font-semibold tracking-tight leading-tight">
                Meet the minds <br />
                <span className="text-muted-foreground">behind the magic.</span>
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                A diverse group of engineers, designers, and real estate experts united by a single goal: making property transactions effortless.
              </p>
              <Button variant="outline" size="lg" className="rounded-full px-8 py-6 text-base">
                View Open Roles
              </Button>
            </div>
            
            <div className="flex-1 w-full grid grid-cols-2 gap-4">
              {/* Aesthetic Mockup Grid */}
              <div className="space-y-4 translate-y-12">
                <div className="aspect-[4/5] rounded-3xl bg-muted/40 overflow-hidden relative group">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div>
                      <p className="text-white font-medium">Sarah Chen</p>
                      <p className="text-white/70 text-sm">Head of Design</p>
                    </div>
                  </div>
                  <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center mix-blend-luminosity hover:mix-blend-normal transition-all duration-700" />
                </div>
                <div className="aspect-square rounded-3xl bg-muted/40 overflow-hidden relative group">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div>
                      <p className="text-white font-medium">Marcus Kim</p>
                      <p className="text-white/70 text-sm">Lead Engineer</p>
                    </div>
                  </div>
                  <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center mix-blend-luminosity hover:mix-blend-normal transition-all duration-700" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="aspect-square rounded-3xl bg-muted/40 overflow-hidden relative group">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div>
                      <p className="text-white font-medium">Elena Rodriguez</p>
                      <p className="text-white/70 text-sm">CEO</p>
                    </div>
                  </div>
                  <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center mix-blend-luminosity hover:mix-blend-normal transition-all duration-700" />
                </div>
                <div className="aspect-[4/5] rounded-3xl bg-muted/40 overflow-hidden relative group">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div>
                      <p className="text-white font-medium">David Park</p>
                      <p className="text-white/70 text-sm">Product Manager</p>
                    </div>
                  </div>
                  <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center mix-blend-luminosity hover:mix-blend-normal transition-all duration-700" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
