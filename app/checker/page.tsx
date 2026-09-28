"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Sparkles } from "lucide-react";
import { saveInnovationData } from "@/lib/innovation";

export default function CheckerPage() {
  const [product, setProduct] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [analyzed, setAnalyzed] = useState(false);

  const analyzeProduct = () => {
    if (!product.trim() || !ingredients.trim()) return;

    saveInnovationData(product, ingredients);

    localStorage.setItem(
      "vedantra_analysis",
      JSON.stringify({
        product,
        ingredients,
        analyzedAt: new Date().toISOString(),
        status: "Analyzed",
      })
    );

    setAnalyzed(true);
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
              <Sparkles size={20} className="text-emerald-600" />
            </div>

            <div>
              <p className="font-bold">Vedantra</p>
              <p className="text-xs text-slate-500">
                AI Product & IP Checker
              </p>
            </div>
          </div>
        </div>
      </nav>

      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
            <Sparkles size={17} />
            AI Product & IP Checker
          </div>

          <h1 className="text-4xl font-bold">
            Analyze Your Ayurveda Innovation
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Enter your product and ingredients to create a
            connected Vedantra innovation profile.
          </p>
        </div>

        <div className="rounded-3xl border bg-white p-6 shadow-sm">
          <label className="text-sm font-semibold">
            Product Name
          </label>

          <input
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            placeholder="e.g. Herbal Anti-Dandruff Hair Oil"
            className="mt-2 w-full rounded-xl border px-4 py-3 outline-none focus:border-emerald-500"
          />

          <label className="mt-6 block text-sm font-semibold">
            Ingredients
          </label>

          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="e.g. Neem, Amla, Bhringraj, Coconut Oil"
            rows={5}
            className="mt-2 w-full rounded-xl border px-4 py-3 outline-none focus:border-emerald-500"
          />

          <button
            onClick={analyzeProduct}
            disabled={!product.trim() || !ingredients.trim()}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Sparkles size={18} />
            Analyze Product
          </button>
        </div>

        {analyzed && (
          <div className="mt-8 space-y-6">
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
              <div className="flex items-start gap-3">
                <CheckCircle2
                  size={22}
                  className="mt-0.5 text-emerald-600"
                />

                <div>
                  <h2 className="font-bold text-emerald-900">
                    Innovation Profile Created
                  </h2>

                  <p className="mt-1 text-sm text-emerald-800">
                    Your product and ingredients are now available
                    across the Vedantra platform.
                  </p>

                  <p className="mt-2 text-sm text-emerald-700">
                    Product: {product}
                  </p>

                  <p className="text-sm text-emerald-700">
                    Ingredients: {ingredients}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Link
                href="/classification"
                className="rounded-2xl border bg-white p-5 transition hover:border-emerald-400"
              >
                <h3 className="font-bold">
                  AI Product Classification
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  Identify the likely product category and
                  applicable regulatory pathway.
                </p>
              </Link>

              <Link
                href="/tk-checker"
                className="rounded-2xl border bg-white p-5 transition hover:border-emerald-400"
              >
                <h3 className="font-bold">
                  TK & Biodiversity Checker
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  Review ingredients for traditional knowledge
                  and biodiversity considerations.
                </p>
              </Link>

              <Link
                href="/compliance"
                className="rounded-2xl border bg-white p-5 transition hover:border-emerald-400"
              >
                <h3 className="font-bold">
                  Compliance Checklist
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  Continue with product compliance requirements.
                </p>
              </Link>

              <Link
                href="/roadmap"
                className="rounded-2xl border bg-white p-5 transition hover:border-emerald-400"
              >
                <h3 className="font-bold">
                  Personalized Roadmap
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  Generate the next steps for your innovation.
                </p>
              </Link>
            </div>
          </div>
        )}

        <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <strong>Prototype Disclaimer:</strong> Results shown
          by this prototype are for demonstration and should not
          be treated as legal or regulatory advice.
        </div>
      </section>
    </main>
  );
}
