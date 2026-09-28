"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Brain,
  CheckCircle2,
  Loader2,
  ShieldCheck,
  Leaf,
  FileSearch,
  AlertTriangle,
} from "lucide-react";

export default function ClassificationPage() {
  const [product, setProduct] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const savedProduct = localStorage.getItem("vedantra_product");
    const savedIngredients = localStorage.getItem("vedantra_ingredients");

    setProduct(savedProduct || "");
    setIngredients(savedIngredients || "");
  }, []);

  async function classifyProduct() {
    setLoading(true);
    setError("");
    setResult("");

    try {
      const response = await fetch("/api/classification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product,
          ingredients,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "AI classification failed");
      }

      setResult(data.result);

      localStorage.setItem(
        "vedantra_classification",
        JSON.stringify({
          product,
          ingredients,
          result: data.result,
          status: "AI Classification Completed",
          analyzedAt: new Date().toISOString(),
        })
      );
    } catch (err) {
      console.error(err);

      setError(
        "Unable to connect to Vedantra AI. Please check your API key and try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-10">

        <Link
          href="/dashboard"
          className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>

        <div className="mb-10">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-xl bg-violet-500/15 p-3">
              <Brain className="text-violet-400" size={28} />
            </div>

            <div>
              <p className="text-sm font-medium text-violet-400">
                VEDANTRA AI
              </p>

              <h1 className="text-3xl font-bold">
                AI Product Classification
              </h1>
            </div>
          </div>

          <p className="max-w-3xl text-slate-400">
            Analyze your Ayurveda or herbal innovation using Gemini AI to
            identify its likely product category, IP considerations,
            Traditional Knowledge concerns, biodiversity considerations
            and regulatory areas requiring further review.
          </p>
        </div>

        <section className="mb-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">

          <div className="mb-6 flex items-center gap-3">
            <FileSearch className="text-violet-400" size={22} />

            <div>
              <h2 className="font-semibold">
                Innovation Details
              </h2>

              <p className="text-sm text-slate-400">
                Information collected from your Vedantra innovation profile.
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm text-slate-400">
                Product
              </label>

              <input
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                placeholder="Example: Herbal Anti-Dandruff Hair Oil"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-violet-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-400">
                Ingredients
              </label>

              <input
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                placeholder="Example: Neem, Amla, Bhringraj, Coconut Oil"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-violet-500"
              />
            </div>

          </div>

          <button
            type="button"
            onClick={classifyProduct}
            disabled={loading || !product}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 font-semibold transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Vedantra AI is analyzing...
              </>
            ) : (
              <>
                <Brain size={18} />
                Analyze with AI
              </>
            )}
          </button>

        </section>

        {error && (
          <div className="mb-8 flex items-start gap-3 rounded-2xl border border-red-500/30 bg-red-500/10 p-5 text-red-300">
            <AlertTriangle size={20} className="mt-0.5" />

            <div>
              <p className="font-semibold">
                AI Analysis Error
              </p>

              <p className="mt-1 text-sm">
                {error}
              </p>
            </div>
          </div>
        )}

        {result && (
          <section className="mb-8 rounded-2xl border border-violet-500/30 bg-slate-900 p-6">

            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-violet-500/15 p-3">
                <CheckCircle2 className="text-violet-400" size={24} />
              </div>

              <div>
                <h2 className="text-xl font-bold">
                  AI Classification Result
                </h2>

                <p className="text-sm text-slate-400">
                  Generated by Vedantra AI
                </p>
              </div>
            </div>

            <div className="whitespace-pre-wrap rounded-xl border border-slate-800 bg-slate-950 p-6 leading-7 text-slate-200">
              {result}
            </div>

          </section>
        )}

        <section className="grid gap-5 md:grid-cols-3">

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <ShieldCheck className="mb-3 text-emerald-400" size={24} />

            <h3 className="font-semibold">
              IP Review
            </h3>

            <p className="mt-2 text-sm text-slate-400">
              Identifies IP areas that may require further examination.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <Leaf className="mb-3 text-green-400" size={24} />

            <h3 className="font-semibold">
              TK & Biodiversity
            </h3>

            <p className="mt-2 text-sm text-slate-400">
              Highlights Traditional Knowledge and biodiversity-related
              considerations.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <FileSearch className="mb-3 text-blue-400" size={24} />

            <h3 className="font-semibold">
              Regulatory Review
            </h3>

            <p className="mt-2 text-sm text-slate-400">
              Highlights regulatory areas that may need further verification.
            </p>
          </div>

        </section>

        <div className="mt-10 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-sm text-amber-300">
          <strong>Prototype disclaimer:</strong>{" "}
          AI-generated results are preliminary and for demonstration/research
          purposes only. They are not legal, regulatory or medical advice and
          should be verified against applicable official sources and qualified
          experts.
        </div>

      </div>
    </main>
  );
}
