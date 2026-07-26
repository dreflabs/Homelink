import Image from "next/image";
import { ShieldCheck, Star, TrendingUp } from "lucide-react";

interface AuthShowcaseProps {
  quote?: string;
  author?: string;
  role?: string;
  imageSrc?: string;
}

const STATS = [
  { value: "10.000+", label: "Properti Terverifikasi" },
  { value: "98%", label: "Kepuasan Pengguna" },
  { value: "0", label: "Ghost Listing" },
];

const TRUST_BADGES = [
  { icon: ShieldCheck, label: "100% Terverifikasi", color: "text-emerald-400" },
  { icon: TrendingUp, label: "Harga Terbaik", color: "text-blue-400" },
  { icon: Star, label: "Top Rated", color: "text-amber-400" },
];

export function AuthShowcase({
  quote = "Menemukan rumah impian adalah sebuah seni. Di HomeLink, kami membuatnya tanpa cela.",
  author = "Sophia Chen",
  role = "Verified Client",
  imageSrc = "/auth-showcase.jpg",
}: AuthShowcaseProps) {
  return (
    <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-slate-900">
      {/* AI-Generated Property Image */}
      <Image
        src={imageSrc}
        alt="Luxury Property by HomeLink"
        fill
        className="object-cover"
        priority
      />

      {/* Gradient overlay — strong at bottom, subtle at top */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-900/50 to-slate-900/20" />

      {/* Subtle vignette on sides */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/30 via-transparent to-transparent" />

      {/* Top-right badge */}
      <div className="absolute top-8 right-8 z-20">
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white/90 text-sm font-medium">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
          Over 10,000 Verified Properties
        </div>
      </div>

      {/* Stats — centered vertically */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pb-48">
        <div className="grid grid-cols-3 gap-8 px-10">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl font-bold text-white mb-1 tracking-tight">{stat.value}</div>
              <div className="text-xs text-white/60 font-medium leading-tight">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom content */}
      <div className="relative z-10 mt-auto p-10 w-full">
        {/* Trust badges */}
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          {TRUST_BADGES.map(({ icon: Icon, label, color }) => (
            <div
              key={label}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-sm border border-white/15 text-white/80 text-xs font-medium"
            >
              <Icon className={`w-3.5 h-3.5 ${color}`} />
              {label}
            </div>
          ))}
        </div>

        {/* Quote */}
        <blockquote className="space-y-4">
          <p className="text-xl font-medium leading-relaxed tracking-tight text-white/90">
            &ldquo;{quote}&rdquo;
          </p>
          <footer className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-700 flex items-center justify-center shrink-0 ring-2 ring-white/20">
              <span className="font-bold text-sm text-white">{author.charAt(0)}</span>
            </div>
            <div>
              <div className="font-semibold text-white text-sm tracking-tight">{author}</div>
              <div className="text-xs text-white/50">{role}</div>
            </div>
          </footer>
        </blockquote>
      </div>
    </div>
  );
}
