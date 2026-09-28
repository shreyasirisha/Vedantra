import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function generateWithRetry(
  model: string,
  prompt: string,
  retries = 2
) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await ai.models.generateContent({
        model,
        contents: prompt,
      });
    } catch (error: any) {
      const status = error?.status;

      if (status !== 503 || attempt === retries) {
        throw error;
      }

      const delay = 2000 * Math.pow(2, attempt);

      console.log(
        `Gemini ${model} is busy. Retrying in ${delay}ms...`
      );

      await new Promise((resolve) =>
        setTimeout(resolve, delay)
      );
    }
  }

  throw new Error("Gemini request failed.");
}

export async function POST(request: Request) {
  try {
    const { product, ingredients } = await request.json();

    if (!product) {
      return NextResponse.json(
        { error: "Product name is required" },
        { status: 400 }
      );
    }

    const prompt = `
You are Vedantra, an AI assistant for Ayurveda intellectual
property and regulatory guidance.

Analyze the following innovation at a preliminary level.

Product:
${product}

Ingredients:
${ingredients || "Not provided"}

Provide the following:

1. Likely product category
2. Reason for the classification
3. IP areas that may require review
4. Traditional Knowledge considerations
5. Biodiversity and ABS considerations
6. Regulatory areas requiring further verification
7. Possible documentation requirements
8. Important uncertainties

Important instructions:

- Give clear and simple explanations.
- Do not invent laws, regulations, approvals or government requirements.
- Clearly distinguish assumptions from known information.
- This is preliminary AI guidance and not legal advice.
`;

    let response;

    try {
      console.log("Trying Gemini 3.8 Flash...");

      response = await generateWithRetry(
        "gemini-3.8-flash",
        prompt,
        2
      );

    } catch (primaryError: any) {
      console.log(
        "Gemini 3.8 Flash unavailable. Trying Gemini 3.7 Flash..."
      );

      response = await generateWithRetry(
        "gemini-3.7-flash",
        prompt,
        1
      );
    }

    return NextResponse.json({
      result: response.text,
      model:
        response.candidates?.[0]?.content
          ? "Gemini"
          : "Gemini AI",
    });

  } catch (error: any) {
    console.error(
      "Gemini classification error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Gemini AI is temporarily unavailable. Please try again in a moment.",
      },
      { status: 503 }
    );
  }
}
