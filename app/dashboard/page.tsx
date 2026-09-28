"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Bell,
  CheckCircle2,
  FileSearch,
  Globe2,
  Leaf,
  Map,
  PackageCheck,
  Sparkles,
  Tags,
} from "lucide-react";

type Innovation = {
  product: string;
  ingredients: string;
  country: string;
};

export default function DashboardPage() {
  const [innovation, setInnovation] = useState<Innovation>({
    product: "",
    ingredients: "",
    country: "",
  });

  useEffect(() => {
    const product =
      localStorage.getItem("vedantra_product") || "";

    const ingredients =
      localStorage.getItem("vedantra_ingredients") || "";

    let country = "";

    const market =
      localStorage.getItem("vedantra_market_analysis");

    if (market) {
      try {
        const data = JSON.parse(market);
        country = data.country || "";
      } catch {
        country = "";
      }
    }

    setInnovation({
      product:
        product || "Herbal Anti-Dandruff Hair Oil",
      ingredients:
        ingredients ||
        "Neem, Amla, Bhringraj, Coconut Oil",
      country: country || "Not selected",
    });
  }, []);

  const tools = [
    {
      title: "AI Product & IP Checker",
      description: "Analyze your innovation.",
      href: "/checker",
      icon: Sparkles,
    },
    {
      title: "AI Product Classification",
      description: "Classify your product.",
      href: "/classification",
      icon: Tags,
    },
    {
      title: "AI Document Scanner",
      description: "Review innovation documents.",
      href: "/documents",
      icon: FileSearch,
    },
    {
      title: "TK & Biodiversity Checker",
      description: "Review TK and biodiversity.",
      href: "/tk-checker",
      icon: Leaf,
    },
    {
      title: "Compliance Checklist",
      description: "Review compliance areas.",
      href: "/compliance",
      icon: PackageCheck,
    },
    {
      title: "Global Market Checker",
      description: "Explore target markets.",
      href: "/market",
      icon: Globe2,
    },
    {
      title: "Export Roadmap",
      description: "Plan India ? global entry.",
      href: "/export-roadmap",
      icon: Globe2,
    },
    {
      title: "Personalized Roadmap",
      description: "View your innovation journey.",
      href: "/roadmap",
      icon: Map,
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <nav className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="flex items-center gap-2"
          >
            <div className="rounded-xl bg-emerald-100 p-2">
              <Sparkles
                size={21}
                className="text-emerald-600"
              />
            </div>

            <div>
              <p className="font-bold">Vedantra</p>

              <p className="text-xs text-slate-500">
                Innovation Intelligence Platform
              </p>
            </div>
          </Link>

          <Link
            href="/alerts"
            className="rounded-xl p-2 text-slate-600 hover:bg-slate-100"
            title="Regulation Alerts"
          >
            <Bell size={20} />
          </Link>
        </div>
      </nav>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <p className="text-sm font-semibold text-emerald-600">
            INNOVATION WORKSPACE
          </p>

          <h1 className="mt-2 text-4xl font-bold">
            Your Vedantra Dashboard
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600">
            One connected workspace for IP protection,
            Traditional Knowledge, compliance and global
            commercialization.
          </p>
        </div>

        <div className="rounded-3xl bg-slate-900 p-6 text-white">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <p className="text-sm text-emerald-300">
                CURRENT INNOVATION
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                {innovation.product}
              </h2>

              <p className="mt-2 text-sm text-slate-300">
                {innovation.ingredients}
              </p>
            </div>

            <Link
              href="/checker"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-white hover:bg-emerald-400"
            >
              Update Innovation
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <SummaryCard
            title="Product"
            value={innovation.product}
          />

          <SummaryCard
            title="Ingredients"
            value={innovation.ingredients}
          />

          <SummaryCard
            title="Target Market"
            value={innovation.country}
          />
        </div>

        <div className="mt-10">
          <div className="mb-5">
            <h2 className="text-2xl font-bold">
              Innovation Journey
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Move from innovation to global commercialization.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <JourneyCard
              number="01"
              title="Innovation"
              description="Product & IP analysis"
              href="/checker"
              icon={Sparkles}
            />

            <JourneyCard
              number="02"
              title="Protection"
              description="IP & TK review"
              href="/tk-checker"
              icon={Leaf}
            />

            <JourneyCard
              number="03"
              title="Compliance"
              description="Regulatory checklist"
              href="/compliance"
              icon={PackageCheck}
            />

            <JourneyCard
              number="04"
              title="Globalization"
              description="Market & export roadmap"
              href="/market"
              icon={Globe2}
            />
          </div>
        </div>

        <div className="mt-10">
          <div className="mb-5">
            <h2 className="text-2xl font-bold">
              Vedantra Intelligence Tools
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Connected tools for your innovation lifecycle.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {tools.map((tool) => (
              <ToolCard
                key={tool.title}
                title={tool.title}
                description={tool.description}
                href={tool.href}
                icon={tool.icon}
              />
            ))}
          </div>
        </div>

        <div className="mt-10 rounded-3xl border bg-white p-6">
          <div className="flex items-start gap-3">
            <CheckCircle2
              size={22}
              className="mt-0.5 text-emerald-600"
            />

            <div>
              <h2 className="text-xl font-bold">
                Innovation Progress
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Your connected Vedantra workflow.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-4">
            <StatusCard
              title="Product Analysis"
              status="Available"
            />

            <StatusCard
              title="TK Review"
              status="Available"
            />

            <StatusCard
              title="Compliance"
              status="Available"
            />

            <StatusCard
              title="Global Market"
              status={
                innovation.country !== "Not selected"
                  ? "Selected"
                  : "Not selected"
              }
            />
          </div>
        </div>

        <div className="mt-10 rounded-3xl bg-emerald-50 p-6">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <div>
              <h2 className="text-xl font-bold">
                Continue Your Innovation Journey
              </h2>

              <p className="mt-1 text-sm text-slate-600">
                Review your personalized roadmap and prepare
                your innovation for commercialization.
              </p>
            </div>

            <Link
              href="/roadmap"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700"
            >
              View Roadmap
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <strong>Prototype Disclaimer:</strong> Vedantra is a
          decision-support prototype. Information shown should
          be verified against current official sources and does
          not constitute legal or regulatory advice.
        </div>
      </section>
    </main>
  );
}

function SummaryCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {title}
      </p>

      <p className="mt-2 text-sm font-semibold leading-6">
        {value}
      </p>
    </div>
  );
}

function JourneyCard({
  number,
  title,
  description,
  href,
  icon: Icon,
}: {
  number: string;
  title: string;
  description: string;
  href: string;
  icon: React.ElementType;
}) {
  return (
    <Link
      href={href}
      className="rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-emerald-400"
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-emerald-600">
          {number}
        </span>

        <Icon
          size={20}
          className="text-emerald-600"
        />
      </div>

      <h3 className="mt-5 font-bold">{title}</h3>

      <p className="mt-2 text-sm text-slate-500">
        {description}
      </p>

      <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-emerald-600">
        Open
        <ArrowRight size={15} />
      </div>
    </Link>
  );
}

function ToolCard({
  title,
  description,
  href,
  icon: Icon,
}: {
  title: string;
  description: string;
  href: string;
  icon: React.ElementType;
}) {
  return (
    <Link
      href={href}
      className="rounded-2xl border bg-white p-5 shadow-sm transition hover:border-emerald-400"
    >
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
        <Icon size={21} />
      </div>

      <h3 className="font-bold">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        {description}
      </p>

      <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-emerald-600">
        Open Tool
        <ArrowRight size={15} />
      </div>
    </Link>
  );
}

function StatusCard({
  title,
  status,
}: {
  title: string;
  status: string;
}) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <div className="flex items-center gap-2">
        <CheckCircle2
          size={18}
          className="text-emerald-600"
        />

        <p className="text-sm font-semibold">
          {title}
        </p>
      </div>

      <p className="mt-2 text-xs text-slate-500">
        {status}
      </p>
    </div>
  );
}
