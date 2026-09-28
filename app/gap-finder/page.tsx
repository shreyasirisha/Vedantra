"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Lightbulb,
  Sparkles,
} from "lucide-react";

export default function GapFinderPage() {
  const [product, setProduct] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [analyzed, setAnalyzed] = useState(false);

  useEffect(() => {
    setProduct(
      localStorage.getItem("vedantra_product") ||
        "Herbal Anti-Dandruff Hair Oil"
    );

    setIngredients(
      localStorage.getItem("vedantra_ingredients") ||
        "Neem, Amla, Bhringraj, Coconut Oil"
    );

    if (localStorage.getItem("vedantra_gap_analysis")) {
      setAnalyzed(true);
    }
  }, []);

  function analyzeGap() {
    localStorage.setItem(
      "vedantra_gap_analysis",
      JSON.stringify({
        product,
        ingredients,
        status: "Innovation Gap Analysis Completed",
        analyzedAt: new Date().toISOString(),
        findings: [
          "Market differentiation review required",
          "Existing solution comparison required",
          "Potential IP opportunity identified",
        ],
      })
    );

    setAnalyzed(true);
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <nav className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-emerald-600"
          >
            <ArrowLeft size={17} />
            Dashboard
          </Link>

          <Link
            href="/"
            className="text-xl font-bold text-emerald-600"
          >
            Vedantra
          </Link>
        </div>
      </nav>

      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-emerald-600">
            <Lightbulb size={18} />
            INNOVATION INTELLIGENCE
          </div>

          <h1 className="text-4xl font-bold">
            Innovation Gap Finder
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600">
            Identify potential differentiation areas,
            existing-solution gaps and possible IP opportunities
            for your Ayurveda innovation.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-emerald-100 p-3">
                <Sparkles
                  size={22}
                  className="text-emerald-600"
                />
              </div>

              <div>
                <h2 className="font-bold">
                  Innovation Profile
                </h2>

                <p className="text-sm text-slate-500">
                  Loaded from your Vedantra innovation
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="text-sm font-semibold">
                  Product
                </label>

                <div className="mt-2 rounded-xl bg-slate-50 p-4 text-sm">
                  {product}
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold">
                  Ingredients
                </label>

                <div className="mt-2 rounded-xl bg-slate-50 p-4 text-sm leading-6">
                  {ingredients}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={analyzeGap}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700"
            >
              <Lightbulb size={18} />
              Analyze Innovation Gap
            </button>
          </div>

          <div className="rounded-3xl border bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold">
              Gap Analysis
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Preliminary innovation opportunity review
            </p>

            {!analyzed ? (
              <div className="mt-8 rounded-2xl border border-dashed p-8 text-center">
                <Lightbulb
                  size={32}
                  className="mx-auto text-slate-400"
                />

                <p className="mt-3 text-sm text-slate-500">
                  Click "Analyze Innovation Gap" to generate
                  the preliminary analysis.
                </p>
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                <ResultCard
                  title="Market Differentiation"
                  text="Review how the innovation can be differentiated from existing products."
                />

                <ResultCard
                  title="Existing Solution Comparison"
                  text="Compare product features, formulation and intended use with existing solutions."
                />

                <ResultCard
                  title="Potential IP Opportunity"
                  text="Identify areas that may require further patent, trademark, design or other IP review."
                />

                <div className="rounded-2xl bg-emerald-50 p-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2
                      size={19}
                      className="text-emerald-600"
                    />

                    <p className="font-semibold text-emerald-800">
                      Gap Analysis Completed
                    </p>
                  </div>

                  <p className="mt-2 text-sm text-emerald-700">
                    Your analysis has been saved to the Vedantra
                    innovation workspace.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {analyzed && (
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <Link
              href="/compliance"
              className="rounded-2xl border bg-white p-5 shadow-sm transition hover:border-emerald-400"
            >
              <h3 className="font-bold">
                Continue to Compliance
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Review regulatory and documentation requirements.
              </p>

              <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-emerald-600">
                Continue
                <ArrowRight size={15} />
              </div>
            </Link>

            <Link
              href="/roadmap"
              className="rounded-2xl border bg-white p-5 shadow-sm transition hover:border-emerald-400"
            >
              <h3 className="font-bold">
                Personalized Roadmap
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                See the next steps for your innovation.
              </p>

              <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-emerald-600">
                View Roadmap
                <ArrowRight size={15} />
              </div>
            </Link>

            <Link
              href="/dashboard"
              className="rounded-2xl border bg-white p-5 shadow-sm transition hover:border-emerald-400"
            >
              <h3 className="font-bold">
                Innovation Dashboard
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Return to your complete Vedantra workspace.
              </p>

              <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-emerald-600">
                Dashboard
                <ArrowRight size={15} />
              </div>
            </Link>
          </div>
        )}

        <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <strong>Prototype Disclaimer:</strong> Gap Finder
          results are preliminary decision-support outputs and
          should not be treated as a legal opinion or proof of
          patentability.
        </div>
      </section>
    </main>
  );
}

function ResultCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border bg-slate-50 p-4">
      <div className="flex items-center gap-2">
        <CheckCircle2
          size={18}
          className="text-emerald-600"
        />

        <h3 className="font-semibold">{title}</h3>
      </div>

      <p className="mt-2 text-sm leading-6 text-slate-600">
        {text}
      </p>
    </div>
  );
}
