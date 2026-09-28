"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  ClipboardCheck,
  Sparkles,
} from "lucide-react";

export default function CompliancePage() {
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

  const runChecklist = () => {
    if (!product.trim()) return;

    localStorage.setItem(
      "vedantra_compliance",
      JSON.stringify({
        product,
        ingredients,
        status: "Preliminary Compliance Review Completed",
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
              <ClipboardCheck
                size={20}
                className="text-emerald-600"
              />
            </div>

            <div>
              <p className="font-bold">Vedantra</p>
              <p className="text-xs text-slate-500">
                Compliance Checklist
              </p>
            </div>
          </div>
        </div>
      </nav>

      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
            <ClipboardCheck size={17} />
            Compliance Checklist
          </div>

          <h1 className="text-4xl font-bold">
            Review Your Compliance Requirements
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Use your innovation profile to organize the
            preliminary IP, regulatory, biodiversity and
            commercialization checks.
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
                    Information was automatically loaded from
                    your Vedantra innovation profile.
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
                    {ingredients || "Not provided"}
                  </p>
                </div>
              </div>

              <button
                onClick={runChecklist}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700"
              >
                <Sparkles size={18} />
                Generate Compliance Checklist
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
                        Preliminary Checklist Generated
                      </h2>

                      <p className="mt-1 text-sm text-emerald-800">
                        Your compliance review has been saved to
                        the Vedantra innovation profile.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <ChecklistCard
                    title="Product Classification"
                    description="Verify the applicable product category and regulatory pathway."
                  />

                  <ChecklistCard
                    title="IP Protection"
                    description="Review patents, trademarks, designs, copyright and other applicable IP requirements."
                  />

                  <ChecklistCard
                    title="Traditional Knowledge"
                    description="Review whether Traditional Knowledge considerations may apply to ingredients or formulations."
                  />

                  <ChecklistCard
                    title="Biodiversity & ABS"
                    description="Check whether biological resources and Access and Benefit Sharing requirements may apply."
                  />

                  <ChecklistCard
                    title="Labelling & Claims"
                    description="Review product labels, ingredients, claims, warnings and advertising information."
                  />

                  <ChecklistCard
                    title="Documentation"
                    description="Maintain formulation, ownership, supplier, testing and supporting records."
                  />
                </div>

                <div className="rounded-3xl border bg-white p-6">
                  <h2 className="text-xl font-bold">
                    Compliance Action Plan
                  </h2>

                  <div className="mt-5 space-y-3">
                    <ActionItem text="Confirm the product classification." />
                    <ActionItem text="Identify relevant IP protection opportunities." />
                    <ActionItem text="Review Traditional Knowledge and biodiversity considerations." />
                    <ActionItem text="Check applicable approvals, licences and documentation." />
                    <ActionItem text="Review product labels and marketing claims." />
                    <ActionItem text="Prepare supporting documents for commercialization." />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/market"
                    className="rounded-2xl bg-slate-900 p-5 text-white transition hover:bg-slate-800"
                  >
                    <p className="font-bold">
                      Global Market Checker
                    </p>

                    <p className="mt-2 text-sm text-slate-300">
                      Check requirements for an international
                      market.
                    </p>
                  </Link>

                  <Link
                    href="/roadmap"
                    className="rounded-2xl bg-slate-900 p-5 text-white transition hover:bg-slate-800"
                  >
                    <p className="font-bold">
                      Personalized Roadmap
                    </p>

                    <p className="mt-2 text-sm text-slate-300">
                      Turn your checks into a step-by-step
                      innovation roadmap.
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
          <strong>Prototype Disclaimer:</strong> This checklist
          is a preliminary organizational tool and does not
          constitute legal or regulatory advice. Requirements
          should be verified against applicable official sources.
        </div>
      </section>
    </main>
  );
}

function ChecklistCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
        <ClipboardCheck size={21} />
      </div>

      <h3 className="font-bold">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-slate-600">
        {description}
      </p>
    </div>
  );
}

function ActionItem({ text }: { text: string }) {
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
