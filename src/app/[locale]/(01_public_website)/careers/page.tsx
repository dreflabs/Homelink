import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, MapPin, Clock, Briefcase, Sparkles } from "lucide-react";

export const metadata = {
  title: "Careers | HomeLink 2.0",
  description: "Join our team and help reimagine real estate for everyone.",
};

const jobs = [
  {
    id: "eng-01",
    title: "Senior Frontend Engineer",
    department: "Engineering",
    location: "Remote (Global)",
    type: "Full-time",
    isNew: true,
  },
  {
    id: "eng-02",
    title: "Backend Platform Engineer",
    department: "Engineering",
    location: "Jakarta, ID",
    type: "Full-time",
    isNew: false,
  },
  {
    id: "des-01",
    title: "Product Designer",
    department: "Design",
    location: "Remote (APAC)",
    type: "Full-time",
    isNew: true,
  },
  {
    id: "pm-01",
    title: "Senior Product Manager",
    department: "Product",
    location: "Singapore, SG",
    type: "Full-time",
    isNew: false,
  },
  {
    id: "mkt-01",
    title: "Growth Marketing Lead",
    department: "Marketing",
    location: "Remote",
    type: "Full-time",
    isNew: false,
  },
  {
    id: "ops-01",
    title: "Trust & Safety Specialist",
    department: "Operations",
    location: "Jakarta, ID",
    type: "Contract",
    isNew: true,
  }
];

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-background selection:bg-primary/20 pb-32">
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-6 border-b border-border/40">
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
            <Sparkles className="w-3 h-3 mr-2" strokeWidth={1.5} /> We're hiring across all teams
          </div>
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tighter text-slate-900 leading-[1.05]">
            Build the future <br />
            <span className="text-muted-foreground">of real estate.</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl font-medium leading-relaxed">
            Join a passionate team dedicated to creating transparent, seamless, and trust-first property experiences.
          </p>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-24 lg:py-32 px-6 relative">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl font-semibold tracking-tighter leading-[1.05] text-slate-900 mb-2">Open Positions</h2>
              <p className="text-muted-foreground">Find your next role at HomeLink 2.0</p>
            </div>
            
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
              <Button variant="secondary" className="rounded-full">All Roles</Button>
              <Button variant="ghost" className="rounded-full">Engineering</Button>
              <Button variant="ghost" className="rounded-full">Design</Button>
              <Button variant="ghost" className="rounded-full">Product</Button>
            </div>
          </div>

          <div className="grid gap-4">
            {jobs.map((job) => (
              <Card 
                key={job.id} 
                className="group border-border/50 hover:border-primary/30 shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer overflow-hidden relative"
              >
                {/* Subtle gradient hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000 ease-in-out" />
                
                <CardContent className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10 bg-background/50 backdrop-blur-sm">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">{job.title}</h3>
                      {job.isNew && (
                        <Badge variant="default" className="bg-primary/10 text-primary hover:bg-primary/20 border-none">
                          New
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Briefcase className="w-4 h-4" strokeWidth={1.5} /> {job.department}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-5 h-5" strokeWidth={1.5} /> {job.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-5 h-5" strokeWidth={1.5} /> {job.type}
                      </span>
                    </div>
                  </div>

                  <div>
                    <Button variant="ghost" size="icon" className="rounded-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                      <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" strokeWidth={1.5} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="pt-12 text-center bg-muted/30 p-12 rounded-3xl">
            <h3 className="text-xl font-medium mb-3">Don't see a fit?</h3>
            <p className="text-muted-foreground mb-6">We're always looking for talented individuals. Send us your resume.</p>
            <Button className="bg-slate-900 text-white rounded-full px-8 hover:bg-slate-800">
              Send Open Application
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
