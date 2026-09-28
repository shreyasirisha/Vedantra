"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Leaf,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
  Globe2,
  Brain,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!email || !password) return;

    localStorage.setItem("vedantra_logged_in", "true");

    if (name) {
      localStorage.setItem("vedantra_user", name);
    }

    router.push("/dashboard");
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#07140e] text-white">

      {/* AYURVEDIC VISUAL BACKGROUND */}
      <div className="absolute inset-0">

        {/* Sky */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#17382b] via-[#0d2419] to-[#06100b]" />

        {/* Sun */}
        <div className="absolute right-[15%] top-[12%] h-32 w-32 rounded-full bg-amber-200/20 blur-2xl" />
        <div className="absolute right-[18%] top-[16%] h-16 w-16 rounded-full bg-amber-100/20" />

        {/* Mountains */}
        <div className="absolute bottom-0 left-0 right-0 h-[55%] opacity-70">
          <svg
            viewBox="0 0 1440 500"
            className="absolute bottom-0 h-full w-full"
            preserveAspectRatio="none"
          >
            <path
              d="M0 430 L180 260 L300 360 L500 130 L690 330 L850 180 L1050 350 L1210 210 L1440 380 L1440 500 L0 500 Z"
              fill="#102d20"
            />

            <path
              d="M0 470 L250 340 L430 400 L620 250 L790 390 L980 270 L1170 400 L1320 300 L1440 370 L1440 500 L0 500 Z"
              fill="#0a2117"
            />
          </svg>
        </div>

        {/* Botanical leaves */}
        <div className="absolute left-0 top-0 opacity-50">
          <Leaf className="h-40 w-40 -rotate-45 text-emerald-300/20" />
        </div>

        <div className="absolute right-8 top-8 opacity-40">
          <Leaf className="h-32 w-32 rotate-45 text-emerald-200/20" />
        </div>

        <div className="absolute bottom-10 left-[8%] opacity-40">
          <Leaf className="h-24 w-24 rotate-[25deg] text-emerald-300/30" />
        </div>

        {/* Ayurvedic herbs */}
        <div className="absolute bottom-0 left-0 flex items-end gap-3 opacity-70">

          <div className="h-36 w-5 rotate-[-12deg] rounded-full bg-emerald-500/40" />
          <div className="h-48 w-6 rotate-[10deg] rounded-full bg-emerald-400/35" />
          <div className="h-28 w-4 rotate-[-25deg] rounded-full bg-lime-300/30" />

          <div className="mb-4 h-20 w-20 rounded-full border-8 border-[#352d1d] bg-[#18170f] opacity-80" />

        </div>

        {/* Soft green glow */}
        <div className="absolute left-[30%] top-[35%] h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/45" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-5 py-8">

        <div className="grid w-full max-w-6xl overflow-hidden rounded-[32px] border border-white/10 bg-black/20 shadow-2xl backdrop-blur-sm lg:grid-cols-2">

          {/* LEFT */}
          <section className="hidden min-h-[720px] flex-col justify-between p-12 lg:flex">

            <div>

              {/* BRAND */}
              <div className="flex items-center gap-3">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-300/20 bg-emerald-400/10">
                  <Leaf className="h-7 w-7 text-emerald-300" />
                </div>

                <div>
                  <h1 className="text-2xl font-bold tracking-[0.14em]">
                    VEDANTRA
                  </h1>

                  <p className="text-[10px] tracking-[0.3em] text-emerald-200/70">
                    AI INNOVATION PLATFORM
                  </p>
                </div>

              </div>

              {/* HERO */}
              <div className="mt-24 max-w-xl">

                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-200 backdrop-blur-md">
                  <Sparkles className="h-4 w-4" />
                  AI-Powered Ayurveda Innovation
                </div>

                <h2 className="mt-7 text-5xl font-semibold leading-[1.05] xl:text-6xl">

                  From Traditional

                  <span className="block text-emerald-300">
                    Knowledge
                  </span>

                  to Global Innovation.

                </h2>

                <p className="mt-7 max-w-lg text-base leading-7 text-white/65">
                  Protect your Ayurveda innovation with intelligent
                  guidance across intellectual property, traditional
                  knowledge, biodiversity, compliance and global markets.
                </p>

              </div>

              {/* FEATURE CARDS */}
              <div className="mt-12 grid grid-cols-3 gap-3">

                <Feature
                  icon={<Brain className="h-5 w-5" />}
                  title="AI Guidance"
                />

                <Feature
                  icon={<ShieldCheck className="h-5 w-5" />}
                  title="IP Protection"
                />

                <Feature
                  icon={<Globe2 className="h-5 w-5" />}
                  title="Global Markets"
                />

              </div>

            </div>

            {/* JOURNEY */}
            <div className="text-sm text-white/50">

              <span>Innovation</span>

              <span className="mx-3 text-emerald-300">
                →
              </span>

              <span>Protection</span>

              <span className="mx-3 text-emerald-300">
                →
              </span>

              <span>Compliance</span>

              <span className="mx-3 text-emerald-300">
                →
              </span>

              <span>Commercialization</span>

            </div>

          </section>

          {/* LOGIN */}
          <section className="flex items-center justify-center p-6 sm:p-10 lg:p-12">

            <div className="w-full max-w-md rounded-3xl border border-emerald-200/15 bg-[#07140f]/90 p-7 shadow-2xl backdrop-blur-xl sm:p-9">

              {/* MOBILE LOGO */}
              <div className="mb-8 flex items-center gap-3 lg:hidden">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-400/10">
                  <Leaf className="h-6 w-6 text-emerald-300" />
                </div>

                <div>
                  <h1 className="text-xl font-bold tracking-wider">
                    VEDANTRA
                  </h1>

                  <p className="text-[9px] tracking-widest text-emerald-300/70">
                    AI INNOVATION PLATFORM
                  </p>
                </div>

              </div>

              <div className="mb-8">

                <h2 className="text-3xl font-semibold">
                  {isRegister
                    ? "Create your account"
                    : "Welcome back"}
                </h2>

                <p className="mt-2 text-sm leading-6 text-white/45">
                  {isRegister
                    ? "Begin your journey from traditional knowledge to global innovation."
                    : "Sign in to continue to your Vedantra innovation workspace."}
                </p>

              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                {isRegister && (
                  <div>

                    <label className="mb-2 block text-sm text-white/65">
                      Full Name
                    </label>

                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3.5 text-sm outline-none placeholder:text-white/20 focus:border-emerald-400/50"
                    />

                  </div>
                )}

                <div>

                  <label className="mb-2 block text-sm text-white/65">
                    Email Address
                  </label>

                  <div className="relative">

                    <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/25" />

                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-white/10 bg-white/[0.05] py-3.5 pl-11 pr-4 text-sm outline-none placeholder:text-white/20 focus:border-emerald-400/50"
                    />

                  </div>

                </div>

                <div>

                  <div className="mb-2 flex justify-between">

                    <label className="text-sm text-white/65">
                      Password
                    </label>

                    {!isRegister && (
                      <button
                        type="button"
                        className="text-xs text-emerald-300"
                      >
                        Forgot password?
                      </button>
                    )}

                  </div>

                  <div className="relative">

                    <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/25" />

                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full rounded-xl border border-white/10 bg-white/[0.05] py-3.5 pl-11 pr-12 text-sm outline-none placeholder:text-white/20 focus:border-emerald-400/50"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>

                  </div>

                </div>

                {isRegister && (
                  <label className="flex gap-3 text-xs leading-5 text-white/40">

                    <input
                      type="checkbox"
                      required
                      className="mt-1 accent-emerald-400"
                    />

                    <span>
                      I understand that Vedantra provides
                      preliminary AI guidance and does not replace
                      professional legal advice.
                    </span>

                  </label>
                )}

                <button
                  type="submit"
                  className="group w-full rounded-xl bg-emerald-300 py-3.5 font-semibold text-[#06130d] transition hover:bg-emerald-200 hover:shadow-lg hover:shadow-emerald-400/20"
                >

                  <span className="flex items-center justify-center gap-2">

                    {isRegister
                      ? "Create Account"
                      : "Sign In"}

                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />

                  </span>

                </button>

              </form>

              <div className="my-7 flex items-center gap-4">

                <div className="h-px flex-1 bg-white/10" />

                <span className="text-xs text-white/25">
                  OR
                </span>

                <div className="h-px flex-1 bg-white/10" />

              </div>

              <button
                type="button"
                onClick={() => {
                  setIsRegister(!isRegister);
                  setName("");
                  setEmail("");
                  setPassword("");
                }}
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-3.5 text-sm text-white/65 transition hover:bg-white/[0.07] hover:text-white"
              >
                {isRegister
                  ? "Already have an account? Sign In"
                  : "New to Vedantra? Create an Account"}
              </button>

              <div className="mt-7 flex items-center justify-center gap-2 text-[11px] text-white/25">

                <ShieldCheck className="h-4 w-4 text-emerald-300/60" />

                Secure prototype environment

              </div>

            </div>

          </section>

        </div>

      </div>

    </main>
  );
}

function Feature({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-4 backdrop-blur-md">

      <div className="mb-2 text-emerald-300">
        {icon}
      </div>

      <p className="text-xs text-white/70">
        {title}
      </p>

    </div>
  );
}
