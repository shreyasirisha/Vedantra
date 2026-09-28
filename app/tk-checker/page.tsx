"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Leaf,
  Sparkles,
} from "lucide-react";

export default function TKCheckerPage() {
  const [product, setProduct] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const savedProduct =
      localStorage.getItem("vedantra_product");

    const savedIngredients =
      localStorage.getItem("vedantra_ingredients");

    if (savedProduct) setProduct(savedProduct);
    if (savedIngredients) setIngredients(savedIngredients);
  }, []);

  const checkTK = () => {
    if (!product.trim() || !ingredients.trim()) return;

    localStorage.setItem(
      "vedantra_tk_analysis",
      JSON.stringify({
        product,
        ingredients,
        status: "Preliminary TK & Biodiversity Review Completed",
        analyzedAt: new Date().toISOString(),
      })
    );

    setChecked(true);
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
              <Leaf size={20} className="text-emerald-600" />
            </div>

            <div>
              <p className="font-bold">Vedantra</p>
              <p className="text-xs text-slate-500">
                TK & Biodiversity Checker
              </p>
            </div>
          </div>
        </div>
      </nav>

      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
            <Leaf size={17} />
            Traditional Knowledge & Biodiversity
          </div>

          <h1 className="text-4xl font-bold">
            Check Traditional Knowledge & Biodiversity
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Review your innovation for preliminary Traditional
            Knowledge and biodiversity considerations.
          </p>
        </div>

        {product ? (
          <>
            <div className="rounded-3xl border bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-start gap-3">
                <CheckCircle2
                  size={22}
                  className="mt-0.5 text-emerald-600"
                />

                <div>
                  <h2 className="font-bold">
                    Innovation Profile Loaded
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Product and ingredient information was
                    automatically loaded from your Vedantra profile.
                  </p>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Product
                  </p>

                  <p className="mt-2 font-semibold">
                    {product}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Ingredients
                  </p>

                  <p className="mt-2 text-sm font-medium">
                    {ingredients}
                  </p>
                </div>
              </div>

              <button
                onClick={checkTK}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700"
              >
                <Sparkles size={18} />
                Check TK & Biodiversity
              </button>
            </div>

            {checked && (
              <div className="mt-8 space-y-6">
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                  <div className="flex items-start gap-3">
                    <CheckCircle2
                      size={22}
                      className="mt-0.5 text-emerald-600"
                    />

                    <div>
                      <h2 className="font-bold text-emerald-900">
                        Preliminary Review Completed
                      </h2>

                      <p className="mt-1 text-sm text-emerald-800">
                        The TK and biodiversity review has been
                        saved to your innovation profile.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-3">
                  <ResultCard
                    title="Traditional Knowledge"
                    value="Review Required"
                  />

                  <ResultCard
                    title="Biodiversity"
                    value="Review Required"
                  />

                  <ResultCard
                    title="ABS"
                    value="Check Applicability"
                  />
                </div>

                <div className="rounded-3xl border bg-white p-6">
                  <h2 className="text-xl font-bold">
                    Recommended Review Areas
                  </h2>

                  <div className="mt-5 space-y-3">
                    <Step text="Check whether the ingredients or formulation are associated with documented Traditional Knowledge." />

                    <Step text="Review whether biological resources and applicable biodiversity requirements are involved." />

                    <Step text="Check whether Access and Benefit Sharing requirements may apply." />

                    <Step text="Maintain evidence of ingredient sources, suppliers and formulation records." />

                    <Step text="Review IP protection carefully where Traditional Knowledge is involved." />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/compliance"
                    className="rounded-2xl bg-slate-900 p-5 text-white transition hover:bg-slate-800"
                  >
                    <p className="font-bold">
                      Continue to Compliance
                    </p>

                    <p className="mt-2 text-sm text-slate-300">
                      Review regulatory and documentation
                      requirements.
                    </p>
                  </Link>

                  <Link
                    href="/gap-finder"
                    className="rounded-2xl bg-slate-900 p-5 text-white transition hover:bg-slate-800"
                  >
                    <p className="font-bold">
                      Innovation Gap Finder
                    </p>

                    <p className="mt-2 text-sm text-slate-300">
                      Explore innovation and IP opportunities.
                    </p>
                  </Link>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6 text-center">
            <p className="font-semibold text-amber-900">
              No innovation profile found.
            </p>

            <p className="mt-2 text-sm text-amber-800">
              Start with the Product & IP Checker.
            </p>

            <Link
              href="/checker"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white"
            >
              Go to Product Checker
            </Link>
          </div>
        )}

        <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <strong>Prototype Disclaimer:</strong> This is a
          preliminary screening workflow. It does not establish
          legal eligibility, TK status or biodiversity/ABS
          obligations. Verification against applicable official
          sources and professional advice may be required.
        </div>
      </section>
    </main>
  );
}

function ResultCard({
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

      <p className="mt-3 font-bold text-emerald-700">
        {value}
      </p>
    </div>
  );
}

function Step({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3 rounded-xl bg-slate-50 p-4">
      <CheckCircle2
        size={18}
        className="mt-0.5 shrink-0 text-emerald-600"
      />

      <p className="text-sm text-slate-700">{text}</p>
    </div>
  );
}
