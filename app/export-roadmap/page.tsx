"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Globe2,
  Map,
  Sparkles,
} from "lucide-react";

export default function ExportRoadmapPage() {
  const [product, setProduct] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [country, setCountry] = useState("");
  const [generated, setGenerated] = useState(false);

  useEffect(() => {
    const savedProduct =
      localStorage.getItem("vedantra_product");

    const savedIngredients =
      localStorage.getItem("vedantra_ingredients");

    const savedMarket =
      localStorage.getItem("vedantra_market_analysis");

    if (savedProduct) {
      setProduct(savedProduct);
    }

    if (savedIngredients) {
      setIngredients(savedIngredients);
    }

    if (savedMarket) {
      try {
        const marketData = JSON.parse(savedMarket);

        if (marketData.country) {
          setCountry(marketData.country);
        }
      } catch {
        setCountry("");
      }
    }
  }, []);

  const generateRoadmap = () => {
    if (!product.trim() || !country.trim()) return;

    localStorage.setItem(
      "vedantra_export_roadmap",
      JSON.stringify({
        product,
        ingredients,
        country,
        generatedAt: new Date().toISOString(),
        status: "Preliminary Export Roadmap Generated",
      })
    );

    setGenerated(true);
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <nav className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft size={18} />
            Back to Dashboard
          </Link>

          <div className="flex items-center gap-2">
            <div className="rounded-xl bg-emerald-100 p-2">
              <Globe2 size={20} className="text-emerald-600" />
            </div>

            <div>
              <p className="font-bold">Vedantra</p>
              <p className="text-xs text-slate-500">
                India ? Global Export Roadmap
              </p>
            </div>
          </div>
        </div>
      </nav>

      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
            <Map size={17} />
            India ? Global Export Roadmap
          </div>

          <h1 className="text-4xl font-bold">
            Build Your Global Export Path
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Turn your innovation analysis into a structured
            India-to-global commercialization pathway.
          </p>
        </div>

        {product && country ? (
          <>
            <div className="rounded-3xl border bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-start gap-3">
                <CheckCircle2
                  size={22}
                  className="mt-0.5 text-emerald-600"
                />

                <div>
                  <h2 className="font-bold">
                    Innovation & Market Profile Loaded
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Your product and selected international
                    market were automatically loaded.
                  </p>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-3">
                <InfoCard
                  label="Product"
                  value={product}
                />

                <InfoCard
                  label="Target Market"
                  value={country}
                />

                <InfoCard
                  label="Ingredients"
                  value={ingredients || "Not provided"}
                />
              </div>

              <button
                onClick={generateRoadmap}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700"
              >
                <Sparkles size={18} />
                Generate Export Roadmap
              </button>
            </div>

            {generated && (
              <div className="mt-8 space-y-6">
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                  <div className="flex items-start gap-3">
                    <CheckCircle2
                      size={22}
                      className="mt-0.5 text-emerald-600"
                    />

                    <div>
                      <h2 className="font-bold text-emerald-900">
                        Export Roadmap Generated
                      </h2>

                      <p className="mt-1 text-sm text-emerald-800">
                        Preliminary pathway for {product} from
                        India to {country}.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border bg-white p-6">
                  <h2 className="text-xl font-bold">
                    India ? {country}
                  </h2>

                  <div className="mt-6 space-y-4">
                    <RoadmapStep
                      number="01"
                      title="Innovation Preparation"
                      description="Finalize product details, formulation records, ownership information and supporting evidence."
                    />

                    <RoadmapStep
                      number="02"
                      title="IP Protection"
                      description="Review appropriate IP protection in India and consider protection in the target market."
                    />

                    <RoadmapStep
                      number="03"
                      title="Indian Compliance"
                      description="Verify applicable Indian product, labelling, documentation and biodiversity requirements."
                    />

                    <RoadmapStep
                      number="04"
                      title="Target Market Review"
                      description={`Check the classification, regulatory pathway, labelling and market-entry requirements for ${country}.`}
                    />

                    <RoadmapStep
                      number="05"
                      title="Export Documentation"
                      description="Prepare applicable certificates, registrations, product documents and supporting export records."
                    />

                    <RoadmapStep
                      number="06"
                      title="Market Entry"
                      description="Complete required registrations and documentation before commercial launch in the target market."
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/roadmap"
                    className="flex items-center justify-between rounded-2xl bg-slate-900 p-5 text-white transition hover:bg-slate-800"
                  >
                    <div>
                      <p className="font-bold">
                        Personalized IP Roadmap
                      </p>

                      <p className="mt-2 text-sm text-slate-300">
                        Continue with your complete innovation
                        roadmap.
                      </p>
                    </div>

                    <ArrowRight size={20} />
                  </Link>

                  <Link
                    href="/dashboard"
                    className="flex items-center justify-between rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 transition hover:ring-emerald-400"
                  >
                    <div>
                      <p className="font-bold">
                        Innovation Dashboard
                      </p>

                      <p className="mt-2 text-sm text-slate-500">
                        Return to your complete Vedantra
                        workspace.
                      </p>
                    </div>

                    <ArrowRight size={20} />
                  </Link>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6 text-center">
            <p className="font-semibold text-amber-900">
              Innovation or market information is missing.
            </p>

            <p className="mt-2 text-sm text-amber-800">
              First analyze your product and select a target
              market in the Global Market Checker.
            </p>

            <Link
              href="/market"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white"
            >
              Go to Global Market Checker
            </Link>
          </div>
        )}

        <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <strong>Prototype Disclaimer:</strong> This roadmap is
          a planning prototype. Actual export, IP and regulatory
          requirements must be verified against current official
          sources and applicable professional guidance.
        </div>
      </section>
    </main>
  );
}

function InfoCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-slate-50 p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-sm font-semibold">
        {value}
      </p>
    </div>
  );
}

function RoadmapStep({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4 rounded-2xl bg-slate-50 p-5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">
        {number}
      </div>

      <div>
        <h3 className="font-bold">{title}</h3>

        <p className="mt-1 text-sm leading-6 text-slate-600">
          {description}
        </p>
      </div>
    </div>
  );
}
