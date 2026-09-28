"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import {
  ArrowLeft,
  Send,
  Sparkles,
  Globe,
  ShieldCheck,
  ExternalLink,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
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

const languageOptions = [
  { name: "English", code: "en-IN" },
  { name: "Hindi", code: "hi-IN" },
  { name: "Bengali", code: "bn-IN" },
  { name: "Telugu", code: "te-IN" },
  { name: "Tamil", code: "ta-IN" },
  { name: "Kannada", code: "kn-IN" },
  { name: "Malayalam", code: "ml-IN" },
];

export default function ChatPage() {
  const [product, setProduct] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [language, setLanguage] = useState("English");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  const recognitionRef = useRef<any>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I’m Vedantra AI. Ask me anything about intellectual property, Traditional Knowledge, biodiversity, regulatory requirements, or international market entry for your innovation.",
    },
  ]);

  useEffect(() => {
    const savedProduct = localStorage.getItem("vedantra_product");
    const savedIngredients = localStorage.getItem("vedantra_ingredients");

    if (savedProduct) setProduct(savedProduct);
    if (savedIngredients) setIngredients(savedIngredients);

    return () => {
      recognitionRef.current?.stop();
      window.speechSynthesis?.cancel();
    };
  }, []);

  const suggestedQuestions = [
    "What IP protection does my product need?",
    "What should I check for Traditional Knowledge?",
    "What biodiversity requirements should I consider?",
    "How can I prepare my product for international markets?",
  ];

  const speakResponse = (text: string) => {
    if (!voiceEnabled || typeof window === "undefined") return;

    if (!("speechSynthesis" in window)) {
      console.log("Speech synthesis is not supported.");
      return;
    }

    window.speechSynthesis.cancel();

    const cleanText = text
      .replace(/[#*_`]/g, "")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/https?:\/\/\S+/g, "")
      .replace(/\n+/g, " ")
      .trim();

    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);

    const selectedLanguage = languageOptions.find(
      (item) => item.name === language
    );

    utterance.lang = selectedLanguage?.code || "en-IN";
    utterance.rate = 0.95;
    utterance.pitch = 1;

    const voices = window.speechSynthesis.getVoices();

    const matchingVoice = voices.find(
      (voice) =>
        voice.lang.toLowerCase() === utterance.lang.toLowerCase()
    );

    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
  };

  const startListening = () => {
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        "Voice input is not supported in this browser. Please use Google Chrome or Microsoft Edge."
      );
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang =
      languageOptions.find((item) => item.name === language)?.code ||
      "en-IN";

    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      let finalTranscript = "";
      let interimTranscript = "";

      for (
        let i = event.resultIndex;
        i < event.results.length;
        i++
      ) {
        const transcript = event.results[i][0]?.transcript || "";

        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      const transcript = finalTranscript || interimTranscript;

      if (transcript.trim()) {
        setInput(transcript.trim());
      }

      if (finalTranscript.trim()) {
        setTimeout(() => {
          sendMessage(finalTranscript.trim());
        }, 300);
      }
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);

      setIsListening(false);

      if (event.error === "not-allowed") {
        alert(
          "Microphone permission was denied. Please allow microphone access for localhost."
        );
      } else if (event.error === "no-speech") {
        console.log("No speech detected.");
      } else if (event.error === "network") {
        alert(
          "Speech recognition needs an internet connection. Please check your connection."
        );
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    try {
      recognition.start();
    } catch (error) {
      console.error("Could not start speech recognition:", error);
      setIsListening(false);
    }
  };

  const sendMessage = async (question?: string) => {
    const userMessage = (question || input).trim();

    if (!userMessage || loading) return;

    setInput("");
    stopSpeaking();

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

      if (!response.ok) {
        throw new Error(
          data?.error ||
            data?.response ||
            "Chat API request failed"
        );
      }

      if (data.success) {
        const assistantMessage = data.response;

        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: assistantMessage,
            sources: data.sources || [],
          },
        ]);

        if (voiceEnabled) {
          setTimeout(() => {
            speakResponse(assistantMessage);
          }, 300);
        }
      } else {
        const errorMessage =
          data.response ||
          "Sorry, I could not process your question.";

        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: errorMessage,
          },
        ]);

        if (voiceEnabled) {
          setTimeout(() => {
            speakResponse(errorMessage);
          }, 300);
        }
      }
    } catch (error) {
      console.error("Chat error:", error);

      const errorMessage =
        "Sorry, I could not process this sentence. Please try again.";

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: errorMessage,
        },
      ]);

      if (voiceEnabled) {
        setTimeout(() => {
          speakResponse(errorMessage);
        }, 300);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
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

        <div className="mb-6 flex flex-wrap items-center gap-3">
          <Globe size={19} className="text-emerald-400" />

          <label
            htmlFor="language"
            className="text-sm text-slate-300"
          >
            Response Language
          </label>

          <select
            id="language"
            value={language}
            onChange={(e) => {
              setLanguage(e.target.value);
              stopSpeaking();
            }}
            className="rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-emerald-400"
          >
            {languageOptions.map((item) => (
              <option key={item.name} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={() => {
              if (voiceEnabled) stopSpeaking();
              setVoiceEnabled(!voiceEnabled);
            }}
            className="flex items-center gap-2 rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-sm text-slate-300 hover:bg-white/5"
          >
            {voiceEnabled ? (
              <>
                <Volume2
                  size={17}
                  className="text-emerald-400"
                />
                Voice Answer: ON
              </>
            ) : (
              <>
                <VolumeX size={17} />
                Voice Answer: OFF
              </>
            )}
          </button>
        </div>

        {isListening && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-400/20 bg-red-400/5 p-4 text-sm text-slate-300">
            <span className="flex h-3 w-3 animate-pulse rounded-full bg-red-400" />
            Listening... Speak your question now.
          </div>
        )}

        {isSpeaking && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-400/20 bg-emerald-400/5 p-4 text-sm text-slate-300">
            <Volume2
              size={18}
              className="text-emerald-400"
            />
            Vedantra AI is speaking...

            <button
              type="button"
              onClick={stopSpeaking}
              className="ml-auto rounded-lg border border-white/10 px-3 py-1.5 text-xs hover:bg-white/5"
            >
              Stop
            </button>
          </div>
        )}

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
              <div className="mb-3 flex items-center justify-between text-xs font-semibold uppercase tracking-wide opacity-60">
                <span>
                  {message.role === "user"
                    ? "You"
                    : "Vedantra AI"}
                </span>

                {message.role === "assistant" && (
                  <button
                    type="button"
                    onClick={() =>
                      isSpeaking
                        ? stopSpeaking()
                        : speakResponse(message.content)
                    }
                    className="flex items-center gap-1 rounded-lg px-2 py-1 text-slate-300 hover:bg-white/5"
                  >
                    {isSpeaking ? (
                      <VolumeX size={15} />
                    ) : (
                      <Volume2 size={15} />
                    )}

                    {isSpeaking ? "Stop" : "Listen"}
                  </button>
                )}
              </div>

              {message.role === "user" ? (
                <div className="whitespace-pre-wrap text-sm leading-7">
                  {message.content}
                </div>
              ) : (
                <div className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-slate-300 prose-strong:text-white prose-li:text-slate-300 prose-a:text-emerald-400">
                  <ReactMarkdown>
                    {message.content}
                  </ReactMarkdown>
                </div>
              )}

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

          {loading && (
            <div className="max-w-4xl rounded-2xl border border-white/10 bg-slate-900 p-6">
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                Vedantra AI is thinking...
              </div>
            </div>
          )}
        </div>

        <div className="sticky bottom-4 mt-8">
          <div className="flex items-end gap-3 rounded-2xl border border-white/10 bg-slate-900 p-3 shadow-2xl">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              placeholder={
                isListening
                  ? "Listening..."
                  : "Ask Vedantra AI..."
              }
              rows={2}
              className="min-h-[52px] flex-1 resize-none bg-transparent px-3 py-2 text-sm text-white outline-none placeholder:text-slate-500"
            />

            <button
              type="button"
              onClick={startListening}
              disabled={loading}
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition ${
                isListening
                  ? "bg-red-500 text-white"
                  : "border border-white/10 bg-white/5 text-white hover:bg-white/10"
              } disabled:cursor-not-allowed disabled:opacity-40`}
            >
              {isListening ? (
                <MicOff size={19} />
              ) : (
                <Mic size={19} />
              )}
            </button>

            <button
              type="button"
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500 text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Send size={19} />
            </button>
          </div>
        </div>

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
