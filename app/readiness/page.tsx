"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Globe2,
  Leaf,
  PackageCheck,
  Sparkles,
  Tags,
} from "lucide-react";

type ReadinessItem = {
  title: string;
  description: string;
  status: "Ready" | "Review Required";
};

export default function ReadinessPage() {
  const [product, setProduct] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [country, setCountry] = useState("");
  const [checked, setChecked] = useState(false);

  const [items, setItems] = useState<ReadinessItem[]>([]);

  useEffect(() => {
    setProduct(
      localStorage.getItem("vedantra_product") ||
        "Herbal Anti-Dandruff Hair Oil"
    );

    setIngredients(
      localStorage.getItem("vedantra_ingredients") ||
        "Neem, Amla, Bhringraj, Coconut Oil"
    );

    const market =
      localStorage.getItem("vedantra_market_analysis");

    if (market) {
      try {
        const data = JSON.parse(market);
        setCountry(data.country || "United States");
      } catch {
        setCountry("United States");
      }
    } else {
      setCountry("United States");
    }

    const saved =
      localStorage.getItem("vedantra_readiness");

    if (saved) {
      try {
        const data = JSON.parse(saved);

        setItems(data.items || []);
        setChecked(true);
      } catch {
        setItems([]);
      }
    }
  }, []);

  function checkReadiness() {
    const results: ReadinessItem[] = [
      {
        title: "Product Classification",
        description:
          "Confirm the correct product category and applicable regulatory pathway.",
        status: "Review Required",
      },
      {
        title: "IP Protection",
        description:
          "Review possible patent, trademark, design and other IP protection requirements.",
        status: "Review Required",
      },
      {
        title: "Traditional Knowledge",
        description:
          "Review whether the formulation or ingredients involve relevant Traditional Knowledge.",
        status: "Review Required",
      },
      {
        title: "Biodiversity & ABS",
        description:
          "Check whether biodiversity and Access-and-Benefit-Sharing requirements apply.",
        status: "Review Required",
      },
      {
        title: "Compliance Documentation",
        description:
          "Prepare relevant licences, evidence, labels and supporting documentation.",
        status: "Review Required",
      },
      {
        title: "Target Market",
        description:
          `Preliminary market review selected for ${country}.`,
        status: country ? "Ready" : "Review Required",
      },
    ];

    localStorage.setItem(
      "vedantra_readiness",
      JSON.stringify({
        product,
        ingredients,
        country,
        items: results,
        status: "Innovation Readiness Assessment Completed",
        checkedAt: new Date().toISOString(),
      })
    );

    setItems(results);
    setChecked(true);
  }

  const readyCount = items.filter(
    (item) => item.status === "Ready"
  ).length;

  const reviewCount = items.filter(
    (item) => item.status === "Review Required"
  ).length;

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
            className="flex items-center gap-2 text-xl font-bold text-emerald-600"
          >
            <Sparkles size={20} />
            Vedantra
          </Link>
        </div>
      </nav>

      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-emerald-600">
            <ClipboardCheck size={18} />
            INNOVATION READINESS
          </div>

          <h1 className="text-4xl font-bold">
            Innovation Readiness Dashboard
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600">
            Check whether your innovation has the key IP,
            Traditional Knowledge, compliance and market-entry
            areas reviewed before commercialization.
          </p>
        </div>

        <div className="rounded-3xl bg-slate-900 p-6 text-white">
          <p className="text-sm text-emerald-300">
            CURRENT INNOVATION
          </p>

          <h2 className="mt-2 text-2xl font-bold">
            {product}
          </h2>

          <p className="mt-2 text-sm text-slate-300">
            {ingredients}
          </p>

          <div className="mt-4 flex items-center gap-2 text-sm text-slate-300">
            <Globe2 size={17} />
            Target Market: {country}
          </div>

          <button
            type="button"
            onClick={checkReadiness}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-white hover:bg-emerald-400"
          >
            <ClipboardCheck size={18} />
            Check Innovation Readiness
          </button>
        </div>

        {!checked ? (
          <div className="mt-8 rounded-3xl border border-dashed bg-white p-10 text-center">
            <ClipboardCheck
              size={36}
              className="mx-auto text-slate-400"
            />

            <h2 className="mt-4 text-xl font-bold">
              Readiness assessment not started
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
              Click "Check Innovation Readiness" to generate
              your preliminary readiness assessment.
            </p>
          </div>
        ) : (
          <>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <SummaryCard
                title="Total Areas"
                value={String(items.length)}
              />

              <SummaryCard
                title="Ready"
                value={String(readyCount)}
              />

              <SummaryCard
                title="Review Required"
                value={String(reviewCount)}
              />
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {items.map((item) => (
                <ReadinessCard
                  key={item.title}
                  item={item}
                />
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
              <div className="flex items-center gap-3">
                <CheckCircle2
                  size={22}
                  className="text-emerald-600"
                />

                <div>
                  <p className="font-semibold text-emerald-800">
                    Readiness Assessment Completed
                  </p>

                  <p className="text-sm text-emerald-700">
                    Your readiness assessment has been saved
                    to the Vedantra workspace.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <Link
                href="/compliance"
                className="rounded-2xl border bg-white p-5 shadow-sm transition hover:border-emerald-400"
              >
                <PackageCheck
                  size={22}
                  className="text-emerald-600"
                />

                <h3 className="mt-4 font-bold">
                  Compliance
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Review regulatory requirements.
                </p>

                <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-emerald-600">
                  Open
                  <ArrowRight size={15} />
                </div>
              </Link>

              <Link
                href="/tk-checker"
                className="rounded-2xl border bg-white p-5 shadow-sm transition hover:border-emerald-400"
              >
                <Leaf
                  size={22}
                  className="text-emerald-600"
                />

                <h3 className="mt-4 font-bold">
                  TK & Biodiversity
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Review Traditional Knowledge and biodiversity.
                </p>

                <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-emerald-600">
                  Open
                  <ArrowRight size={15} />
                </div>
              </Link>

              <Link
                href="/roadmap"
                className="rounded-2xl border bg-white p-5 shadow-sm transition hover:border-emerald-400"
              >
                <Tags
                  size={22}
                  className="text-emerald-600"
                />

                <h3 className="mt-4 font-bold">
                  Personalized Roadmap
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Continue your innovation journey.
                </p>

                <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-emerald-600">
                  View Roadmap
                  <ArrowRight size={15} />
                </div>
              </Link>
            </div>
          </>
        )}

        <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <strong>Prototype Disclaimer:</strong> Readiness
          results are preliminary decision-support outputs.
          They do not constitute legal, regulatory or
          professional advice.
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

      <p className="mt-2 text-3xl font-bold text-emerald-600">
        {value}
      </p>
    </div>
  );
}

function ReadinessCard({
  item,
}: {
  item: ReadinessItem;
}) {
  const isReady = item.status === "Ready";

  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="rounded-xl bg-emerald-100 p-3">
          {isReady ? (
            <CheckCircle2
              size={21}
              className="text-emerald-600"
            />
          ) : (
            <ClipboardCheck
              size={21}
              className="text-emerald-600"
            />
          )}
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            isReady
              ? "bg-emerald-100 text-emerald-700"
              : "bg-amber-100 text-amber-700"
          }`}
        >
          {item.status}
        </span>
      </div>

      <h3 className="mt-5 text-lg font-bold">
        {item.title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-600">
        {item.description}
      </p>
    </div>
  );
}
