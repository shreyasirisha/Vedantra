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
      if (error?.status !== 503 || attempt === retries) {
        throw error;
      }

      const delay = 2000 * Math.pow(2, attempt);

      console.log(
        `Gemini ${model} busy. Retrying in ${delay}ms...`
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
You are Vedantra, an AI-powered assistant for Ayurveda
intellectual property, traditional knowledge, biodiversity
and regulatory research.

Analyze this innovation at a PRELIMINARY screening level.

PRODUCT:
${product}

INGREDIENTS:
${ingredients || "Not provided"}

Return a clear structured analysis with these sections:

1. PRODUCT CATEGORY
Identify the likely broad category of the product.
Explain that classification may require verification.

2. IP PROTECTION
Discuss potentially relevant areas such as:
- Patent
- Trademark
- Copyright
- Design
- Trade secret
Only identify areas that could reasonably be relevant.
Do not claim that protection definitely applies.

3. TRADITIONAL KNOWLEDGE
Identify whether the ingredients or formulation may raise
Traditional Knowledge considerations.
Explain what should be verified.

4. BIODIVERSITY & ABS
Identify whether biological resources may require
biodiversity or Access-and-Benefit-Sharing review.
Do not make a definitive legal determination.

5. REGULATORY REVIEW
Identify the types of regulatory areas that should be checked,
such as product classification, ingredients, manufacturing,
labelling, advertising or claims.

6. DOCUMENTS TO REVIEW
Suggest documents or information the user should collect.

7. NEXT STEPS
Give 5 practical steps for the user.

IMPORTANT:
- Use simple language.
- Do not invent laws, sections, approvals or government requirements.
- Do not present uncertain information as fact.
- Do not provide legal advice.
- Clearly state that official sources and qualified experts
  should verify the final requirements.
`;

    let response;

    try {
      response = await generateWithRetry(
        "gemini-3.8-flash",
        prompt,
        2
      );
    } catch {
      console.log(
        "Gemini 3.8 Flash unavailable. Trying fallback model..."
      );

      response = await generateWithRetry(
        "gemini-3.7-flash",
        prompt,
        1
      );
    }

    return NextResponse.json({
      result: response.text,
      status: "AI Product & IP Analysis Completed",
      analyzedAt: new Date().toISOString(),
    });

  } catch (error) {
    console.error(
      "Gemini Product & IP Checker error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Vedantra AI is temporarily unavailable. Please try again.",
      },
      { status: 503 }
    );
  }
}
