"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Bell,
  CheckCircle2,
  Clock,
  ShieldAlert,
  Sparkles,
} from "lucide-react";

type AlertItem = {
  title: string;
  description: string;
  priority: "High" | "Medium" | "Low";
};

export default function AlertsPage() {
  const [product, setProduct] = useState("");
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const savedProduct =
      localStorage.getItem("vedantra_product") ||
      "Herbal Anti-Dandruff Hair Oil";

    setProduct(savedProduct);

    const savedAlerts =
      localStorage.getItem("vedantra_regulation_alerts");

    if (savedAlerts) {
      try {
        const data = JSON.parse(savedAlerts);

        setAlerts(data.alerts || []);
        setChecked(true);
      } catch {
        setAlerts([]);
      }
    }
  }, []);

  function checkRegulations() {
    const generatedAlerts: AlertItem[] = [
      {
        title: "Product Classification Review",
        description:
          "Confirm the applicable product category and regulatory pathway before commercialization.",
        priority: "High",
      },
      {
        title: "Traditional Knowledge Review",
        description:
          "Check whether ingredients or formulations involve relevant traditional knowledge considerations.",
        priority: "Medium",
      },
      {
        title: "Biodiversity & ABS Review",
        description:
          "Determine whether biodiversity and Access-and-Benefit-Sharing requirements may apply.",
        priority: "Medium",
      },
      {
        title: "Labelling & Claims Review",
        description:
          "Review product labels, advertising language and health-related claims against applicable requirements.",
        priority: "Low",
      },
    ];

    localStorage.setItem(
      "vedantra_regulation_alerts",
      JSON.stringify({
        product,
        alerts: generatedAlerts,
        status: "Regulation Monitoring Completed",
        checkedAt: new Date().toISOString(),
      })
    );

    setAlerts(generatedAlerts);
    setChecked(true);
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
            <Bell size={18} />
            REGULATORY INTELLIGENCE
          </div>

          <h1 className="text-4xl font-bold">
            Smart Regulation Alerts
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600">
            Monitor important IP, Traditional Knowledge,
            biodiversity and compliance areas related to your
            innovation.
          </p>
        </div>

        <div className="rounded-3xl bg-slate-900 p-6 text-white">
          <p className="text-sm text-emerald-300">
            MONITORING INNOVATION
          </p>

          <h2 className="mt-2 text-2xl font-bold">
            {product}
          </h2>

          <p className="mt-2 text-sm text-slate-300">
            Vedantra will identify preliminary areas that may
            require regulatory attention.
          </p>

          <button
            type="button"
            onClick={checkRegulations}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-white hover:bg-emerald-400"
          >
            <Bell size={18} />
            Check Regulation Alerts
          </button>
        </div>

        {!checked ? (
          <div className="mt-8 rounded-3xl border border-dashed bg-white p-10 text-center">
            <Clock
              size={36}
              className="mx-auto text-slate-400"
            />

            <h2 className="mt-4 text-xl font-bold">
              Monitoring not started
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
              Click "Check Regulation Alerts" to generate a
              preliminary monitoring result.
            </p>
          </div>
        ) : (
          <>
            <div className="mt-8 flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
              <CheckCircle2
                size={22}
                className="text-emerald-600"
              />

              <div>
                <p className="font-semibold text-emerald-800">
                  Regulation Monitoring Completed
                </p>

                <p className="text-sm text-emerald-700">
                  Alert information has been saved to your
                  Vedantra workspace.
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {alerts.map((alert) => (
                <AlertCard
                  key={alert.title}
                  alert={alert}
                />
              ))}
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <Link
                href="/compliance"
                className="rounded-2xl border bg-white p-5 shadow-sm transition hover:border-emerald-400"
              >
                <ShieldAlert
                  size={22}
                  className="text-emerald-600"
                />

                <h3 className="mt-4 font-bold">
                  Review Compliance
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Check the main compliance requirements.
                </p>

                <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-emerald-600">
                  Open Compliance
                  <ArrowRight size={15} />
                </div>
              </Link>

              <Link
                href="/roadmap"
                className="rounded-2xl border bg-white p-5 shadow-sm transition hover:border-emerald-400"
              >
                <Sparkles
                  size={22}
                  className="text-emerald-600"
                />

                <h3 className="mt-4 font-bold">
                  Personalized Roadmap
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Follow the recommended innovation journey.
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
                <Bell
                  size={22}
                  className="text-emerald-600"
                />

                <h3 className="mt-4 font-bold">
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
          </>
        )}

        <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <strong>Prototype Disclaimer:</strong> Regulation
          alerts shown here are preliminary decision-support
          outputs. They are not a substitute for current
          official regulations or professional legal advice.
        </div>
      </section>
    </main>
  );
}

function AlertCard({
  alert,
}: {
  alert: AlertItem;
}) {
  const priorityClass =
    alert.priority === "High"
      ? "bg-red-100 text-red-700"
      : alert.priority === "Medium"
      ? "bg-amber-100 text-amber-700"
      : "bg-slate-100 text-slate-700";

  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="rounded-xl bg-amber-100 p-3">
          <AlertTriangle
            size={21}
            className="text-amber-600"
          />
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${priorityClass}`}
        >
          {alert.priority} Priority
        </span>
      </div>

      <h3 className="mt-5 text-lg font-bold">
        {alert.title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-600">
        {alert.description}
      </p>
    </div>
  );
}
