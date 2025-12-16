import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const prompt = `
You are a professional cybersecurity assistant helping non-technical users understand file integrity results.

Your task:
Explain the result below in clear, simple English so that anyone can understand it, even without technical knowledge.

Result Details:
- Integrity Status: ${body.status}
- Stored File Hash: ${body.storedHash || "Not available"}
- New File Hash: ${body.newHash || "Not available"}
- File Size Changed: ${body.sizeChanged ? "Yes" : "No"}

How to explain:
1. Clearly state whether the file is safe or has changed.
2. Explain what this result means in everyday language.
3. If the file was modified, explain possible reasons.
4. Explain limitations of hash-based verification:
   - Hashes only tell IF a file changed
   - They cannot tell WHAT changed
5. Reassure the user and avoid panic.
6. Provide practical next steps.
7. donot use staric if some thing important then write in bold form

Formatting rules:
- Simple language
- Bullet points where helpful
- less than 150 are  words allowed
- No technical jargon
- No false claims about exact changes
`;

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    if (!res.ok) {
      return NextResponse.json({
        explanation:
          "The file integrity check completed successfully, but the AI explanation service is currently unavailable.",
      });
    }

    const data = await res.json();

    const explanation =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "The integrity result is valid, but no detailed explanation was generated.";

    return NextResponse.json({ explanation });
  } catch (error) {
    return NextResponse.json({
      explanation:
        "The integrity check was completed, but an unexpected error occurred while generating the explanation.",
    });
  }
}
