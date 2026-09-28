import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const message = body.message || "";
    const product = body.product || "";
    const ingredients = body.ingredients || "";
    const language = body.language || "English";

    if (!message.trim()) {
      return NextResponse.json({
        success: false,
        response: "Please enter a question.",
        sources: [],
      });
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        {
          success: false,
          response: "Gemini API key is missing.",
          sources: [],
        },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const prompt = `
You are Vedantra AI.

You are an assistant specifically designed for Ayurveda innovation, intellectual property, Traditional Knowledge, biodiversity, regulatory compliance and international market guidance.

PRODUCT:
${product || "Not provided"}

INGREDIENTS:
${ingredients || "Not provided"}

USER QUESTION:
${message}

LANGUAGE:
${language}

Answer the user's exact question.

Use the product and ingredients when they are available.

If the question is about intellectual property, discuss relevant areas such as:
- Patent
- Trademark
- Copyright
- Design
- Trade secret
- Geographical indication

If the question is about ingredients, discuss:
- Traditional Knowledge
- Biodiversity
- Access and Benefit Sharing
- Need for verification

If the question is about regulations:
- Explain the likely regulatory area.
- Do not invent laws, sections, licences or approvals.

If the question is about international markets:
- Separate Indian requirements from destination-country requirements.
- Mention IP, regulatory, documentation and labelling considerations.

Important:
- Do not invent legal requirements.
- Do not pretend uncertain information is confirmed.
- Clearly say "Requires verification" where appropriate.
- This is preliminary information and not legal advice.
- Keep the answer simple and practical.
- Use headings and bullet points.
- Answer in the selected language.

Finish with:

Recommended Next Step

Give 1 to 3 practical next actions.
`;

    console.log("Sending request to Gemini...");

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
    });

    const answer =
      response.text ||
      "I could not generate an answer. Please try again.";

    console.log("Gemini response received.");

    return NextResponse.json({
      success: true,
      response: answer,
      sources: [],
    });
  } catch (error: any) {
    console.error("CHAT API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        response:
          "Gemini AI could not process the request. Please try again.",
        sources: [],
        error: error?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
