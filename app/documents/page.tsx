"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FileSearch,
  FileText,
  Sparkles,
  Upload,
} from "lucide-react";

export default function DocumentsPage() {
  const [product, setProduct] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [fileName, setFileName] = useState("");
  const [analyzed, setAnalyzed] = useState(false);

  useEffect(() => {
    const savedProduct =
      localStorage.getItem("vedantra_product");

    const savedIngredients =
      localStorage.getItem("vedantra_ingredients");

    if (savedProduct) {
      setProduct(savedProduct);
    }

    if (savedIngredients) {
      setIngredients(savedIngredients);
    }
  }, []);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      setFileName(file.name);
      setAnalyzed(false);
    }
  };

  const analyzeDocument = () => {
    if (!fileName) return;

    localStorage.setItem(
      "vedantra_document_analysis",
      JSON.stringify({
        product,
        ingredients,
        fileName,
        analyzedAt: new Date().toISOString(),
        status: "Preliminary Analysis Completed",
      })
    );

    setAnalyzed(true);
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Navbar */}
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
              <Sparkles
                size={20}
                className="text-emerald-600"
              />
            </div>

            <div>
              <p className="font-bold">Vedantra</p>
              <p className="text-xs text-slate-500">
                AI Document Scanner
              </p>
            </div>
          </div>
        </div>
      </nav>

      {/* Main */}
      <section className="mx-auto max-w-5xl px-6 pb-12 pt-10">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
            <FileSearch size={17} />
            AI Document Scanner
          </div>

          <h1 className="text-4xl font-bold tracking-tight">
            Scan Your Innovation Documents
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Upload a patent draft, product label, licence or
            regulatory document to identify preliminary
            information gaps and review points.
          </p>
        </div>

        {/* Connected Innovation */}
        {product && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
            <CheckCircle2
              size={20}
              className="mt-0.5 shrink-0 text-emerald-600"
            />

            <div>
              <p className="font-semibold text-emerald-900">
                Innovation details loaded
              </p>

              <p className="mt-1 text-sm text-emerald-800">
                Product and ingredient information has been
                automatically loaded from your Vedantra innovation
                profile.
              </p>

              <p className="mt-2 text-xs text-emerald-700">
                Product: {product}
              </p>
            </div>
          </div>
        )}

        {/* Upload Card */}
        <div className="rounded-3xl border bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-bold">
              Upload Document
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Supported prototype formats: PDF, DOCX and images.
            </p>
          </div>

          <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center transition hover:border-emerald-400 hover:bg-emerald-50">
            <div className="mb-4 rounded-2xl bg-emerald-100 p-4 text-emerald-600">
              <Upload size={28} />
            </div>

            <p className="font-semibold">
              Choose a document
            </p>

            <p className="mt-1 text-sm text-slate-500">
              PDF, DOCX, PNG or JPG
            </p>

            <input
              type="file"
              accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          {/* Selected File */}
          {fileName && (
            <div className="mt-5 flex items-center gap-3 rounded-xl border bg-slate-50 p-4">
              <div className="rounded-lg bg-white p-2">
                <FileText
                  size={20}
                  className="text-emerald-600"
                />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">
                  Selected Document
                </p>

                <p className="truncate text-sm text-slate-500">
                  {fileName}
                </p>
              </div>

              <CheckCircle2
                size={20}
                className="shrink-0 text-emerald-600"
              />
            </div>
          )}

          <button
            onClick={analyzeDocument}
            disabled={!fileName}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Sparkles size={18} />
            Analyze Document
          </button>
        </div>

        {/* Results */}
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
                    Preliminary Document Analysis Completed
                  </h2>

                  <p className="mt-1 text-sm text-emerald-800">
                    The document-analysis status has been saved
                    to your Vedantra innovation profile.
                  </p>
                </div>
              </div>
            </div>

            {/* Analysis Cards */}
            <div className="grid gap-5 md:grid-cols-2">
              <AnalysisCard
                title="Product Information"
                description="Check whether the document clearly identifies the product, ingredients, intended use and relevant formulation details."
              />

              <AnalysisCard
                title="IP Information"
                description="Review whether important innovation, ownership, inventorship or IP-related information may be missing."
              />

              <AnalysisCard
                title="Regulatory Information"
                description="Review labels, claims, approvals, licences and other information relevant to regulatory assessment."
              />

              <AnalysisCard
                title="Supporting Documents"
                description="Identify supporting records that may be useful for compliance, commercialization or market entry."
              />
            </div>

            {/* Recommended Actions */}
            <div className="rounded-3xl border bg-white p-6">
              <h2 className="text-xl font-bold">
                Recommended Actions
              </h2>

              <div className="mt-5 space-y-3">
                <ActionItem text="Verify that the product name and formulation details are consistent." />

                <ActionItem text="Check whether ownership and IP information is documented." />

                <ActionItem text="Review product claims and label information." />

                <ActionItem text="Keep supporting ingredient, supplier and formulation records." />

                <ActionItem text="Verify applicable regulatory requirements before commercialization." />
              </div>
            </div>

            {/* Continue */}
            <div className="rounded-3xl bg-slate-900 p-6 text-white">
              <h2 className="text-xl font-bold">
                Continue Your Innovation Journey
              </h2>

              <p className="mt-2 text-sm text-slate-300">
                Use the information from this document review with
                the other Vedantra modules.
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <NextLink
                  href="/gap-finder"
                  title="Innovation Gap Finder"
                />

                <NextLink
                  href="/compliance"
                  title="Compliance Checklist"
                />

                <NextLink
                  href="/roadmap"
                  title="Personalized Roadmap"
                />

                <NextLink
                  href="/market"
                  title="Global Market Checker"
                />
              </div>
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <strong>Prototype Disclaimer:</strong> This prototype
          demonstrates document-review workflow only. It does not
          currently perform full legal document interpretation,
          OCR validation or regulatory certification. Professional
          review may be required.
        </div>
      </section>
    </main>
  );
}

function AnalysisCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
        <FileSearch size={21} />
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

function NextLink({
  href,
  title,
}: {
  href: string;
  title: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold transition hover:bg-white/20"
    >
      {title}

      <ArrowRight size={17} />
    </Link>
  );
}