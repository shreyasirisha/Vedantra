"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import {
  ArrowLeft,
  Send,
  Sparkles,
  Globe,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";

type Source = {
  title: string;
  category: string;
  jurisdiction: string;
  source: string;
};

type Message = {
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
};

const languages = [
  "English",
  "Hindi",
  "Bengali",
  "Telugu",
  "Tamil",
  "Kannada",
  "Malayalam",
];

export default function ChatPage() {
  const [product, setProduct] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [language, setLanguage] = useState("English");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I’m Vedantra AI. Ask me anything about intellectual property, Traditional Knowledge, biodiversity, regulatory requirements, or international market entry for your innovation.",
    },
  ]);

  useEffect(() => {
    const savedProduct = localStorage.getItem("vedantra_product");
    const savedIngredients = localStorage.getItem(
      "vedantra_ingredients"
    );

    if (savedProduct) {
      setProduct(savedProduct);
    }

    if (savedIngredients) {
      setIngredients(savedIngredients);
    }
  }, []);

  const suggestedQuestions = [
    "What IP protection does my product need?",
    "What should I check for Traditional Knowledge?",
    "What biodiversity requirements should I consider?",
    "How can I prepare my product for international markets?",
  ];

  const sendMessage = async (question?: string) => {
    const userMessage = (question || input).trim();

    if (!userMessage || loading) return;

    setInput("");

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: userMessage,
      },
    ]);

    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          product,
          ingredients,
          language,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: data.response,
            sources: data.sources || [],
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              data.response ||
              "Sorry, I could not process your question.",
          },
        ]);
      }
    } catch (error) {
      console.error("Chat error:", error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Navbar */}
      <nav className="border-b border-white/10 bg-slate-950/90">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold"
          >
            <Sparkles className="text-emerald-400" size={24} />
            Vedantra
          </Link>

          <Link
            href="/dashboard"
            className="flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm text-slate-300 hover:bg-white/5"
          >
            <ArrowLeft size={16} />
            Dashboard
          </Link>
        </div>
      </nav>

      <div className="mx-auto max-w-5xl px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-2 text-emerald-400">
            <Sparkles size={20} />
            <span className="text-sm font-semibold">
              Vedantra AI
            </span>
          </div>

          <h1 className="text-3xl font-bold md:text-4xl">
            Multilingual AI Assistant
          </h1>

          <p className="mt-3 max-w-3xl text-slate-400">
            Ask questions about Ayurveda IP, Traditional Knowledge,
            biodiversity, regulations and global market requirements.
          </p>
        </div>

        {/* Current Innovation */}
        <div className="mb-8 rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-5">
          <div className="mb-4 flex items-center gap-2">
            <ShieldCheck
              size={20}
              className="text-emerald-400"
            />

            <h2 className="font-semibold">
              Current Innovation
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Product
              </p>

              <p className="mt-1 text-slate-200">
                {product || "Not provided"}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Ingredients
              </p>

              <p className="mt-1 text-slate-200">
                {ingredients || "Not provided"}
              </p>
            </div>
          </div>
        </div>

        {/* Language */}
        <div className="mb-6 flex items-center gap-3">
          <Globe
            size={19}
            className="text-emerald-400"
          />

          <label
            htmlFor="language"
            className="text-sm text-slate-300"
          >
            Response Language
          </label>

          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-emerald-400"
          >
            {languages.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* Suggested Questions */}
        <div className="mb-8">
          <p className="mb-3 text-sm font-medium text-slate-300">
            Suggested questions
          </p>

          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((question) => (
              <button
                key={question}
                type="button"
                onClick={() => sendMessage(question)}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 transition hover:border-emerald-400/40 hover:bg-emerald-400/10 hover:text-white"
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Messages */}
        <div className="space-y-5">
          {messages.map((message, index) => (
            <div
              key={index}
              className={
                message.role === "user"
                  ? "ml-auto max-w-3xl rounded-2xl bg-emerald-500 p-5 text-sm leading-7 text-slate-950"
                  : "max-w-4xl rounded-2xl border border-white/10 bg-slate-900 p-6"
              }
            >
              {/* Message Label */}
              <div className="mb-3 text-xs font-semibold uppercase tracking-wide opacity-60">
                {message.role === "user"
                  ? "You"
                  : "Vedantra AI"}
              </div>

              {/* User Message */}
              {message.role === "user" ? (
                <div className="whitespace-pre-wrap text-sm leading-7">
                  {message.content}
                </div>
              ) : (
                /* AI Markdown Response */
                <div className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-slate-300 prose-strong:text-white prose-li:text-slate-300 prose-a:text-emerald-400">
                  <ReactMarkdown
                    components={{
                      h1: ({ children }) => (
                        <h1 className="mb-4 mt-2 text-2xl font-bold text-white">
                          {children}
                        </h1>
                      ),

                      h2: ({ children }) => (
                        <h2 className="mb-4 mt-6 text-xl font-bold text-white">
                          {children}
                        </h2>
                      ),

                      h3: ({ children }) => (
                        <h3 className="mb-3 mt-5 text-lg font-semibold text-emerald-300">
                          {children}
                        </h3>
                      ),

                      p: ({ children }) => (
                        <p className="mb-4 text-sm leading-7 text-slate-300">
                          {children}
                        </p>
                      ),

                      strong: ({ children }) => (
                        <strong className="font-semibold text-white">
                          {children}
                        </strong>
                      ),

                      ul: ({ children }) => (
                        <ul className="mb-5 ml-5 list-disc space-y-2 text-sm text-slate-300">
                          {children}
                        </ul>
                      ),

                      ol: ({ children }) => (
                        <ol className="mb-5 ml-5 list-decimal space-y-2 text-sm text-slate-300">
                          {children}
                        </ol>
                      ),

                      li: ({ children }) => (
                        <li className="pl-1 leading-6">
                          {children}
                        </li>
                      ),

                      hr: () => (
                        <hr className="my-6 border-white/10" />
                      ),

                      a: ({ href, children }) => (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-400 underline underline-offset-2 hover:text-emerald-300"
                        >
                          {children}
                        </a>
                      ),
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                </div>
              )}

              {/* Verified Sources */}
              {message.role === "assistant" &&
                message.sources &&
                message.sources.length > 0 && (
                  <div className="mt-6 border-t border-white/10 pt-5">
                    <div className="mb-4 flex items-center gap-2">
                      <ShieldCheck
                        size={18}
                        className="text-emerald-400"
                      />

                      <h3 className="text-sm font-semibold text-white">
                        Verified Sources
                      </h3>
                    </div>

                    <div className="space-y-3">
                      {message.sources.map(
                        (source, sourceIndex) => (
                          <a
                            key={`${source.title}-${sourceIndex}`}
                            href={source.source}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block rounded-xl border border-white/10 bg-white/5 p-4 transition hover:border-emerald-400/40 hover:bg-white/10"
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <p className="font-medium text-white">
                                  {source.title}
                                </p>

                                <p className="mt-1 text-xs text-slate-400">
                                  {source.category} •{" "}
                                  {source.jurisdiction}
                                </p>
                              </div>

                              <ExternalLink
                                size={16}
                                className="shrink-0 text-emerald-400"
                              />
                            </div>
                          </a>
                        )
                      )}
                    </div>
                  </div>
                )}
            </div>
          ))}

          {/* Loading */}
          {loading && (
            <div className="max-w-4xl rounded-2xl border border-white/10 bg-slate-900 p-6">
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                Vedantra AI is thinking...
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="sticky bottom-4 mt-8">
          <div className="flex items-end gap-3 rounded-2xl border border-white/10 bg-slate-900 p-3 shadow-2xl">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (
                  e.key === "Enter" &&
                  !e.shiftKey
                ) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              placeholder="Ask Vedantra AI..."
              rows={2}
              className="min-h-[52px] flex-1 resize-none bg-transparent px-3 py-2 text-sm text-white outline-none placeholder:text-slate-500"
            />

            <button
              type="button"
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500 text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Send message"
            >
              <Send size={19} />
            </button>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 rounded-xl border border-amber-400/20 bg-amber-400/5 p-4 text-xs leading-6 text-slate-400">
          <strong className="text-amber-300">
            Prototype Disclaimer:
          </strong>{" "}
          Vedantra AI provides experimental informational
          guidance and does not constitute legal or regulatory
          advice. Always verify requirements with relevant
          official authorities or qualified professionals.
        </div>
      </div>
    </main>
  );
}