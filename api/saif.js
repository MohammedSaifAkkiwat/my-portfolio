// api/saif.js
// Simple Vercel serverless function that proxies queries to OpenAI.
// SECURITY: Put your OpenAI key in the Vercel Environment Variables as OPENAI_API_KEY.

const fetch = require("node-fetch");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Only POST allowed" });
  }

  let body = {};
  try {
    body = typeof req.body === "object" ? req.body : JSON.parse(req.body || "{}");
  } catch (err) {
    // fallthrough
  }

  const { question, context } = body || {};
  if (!question || typeof question !== "string") {
    return res.status(400).json({ error: "Missing 'question' in request body" });
  }

  // Short system message that scopes behavior
  const system = `You are Saif Companion. Use the provided context to answer user questions about Mohammed Saif's projects, skills, and resume. Keep answers concise, polite, and avoid inventing personal contact data.`;

  // Build user prompt (keep small)
  const userPrompt = `Question: ${question}\n\nContext: ${JSON.stringify(context || {})}`;

  // Basic safety: trim question length (server-side) to avoid huge prompts
  const maxQuestionChars = 3000;
  const shortQuestion = question.length > maxQuestionChars ? question.slice(0, maxQuestionChars) : question;

  try {
    const resp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // change if you prefer another model
        messages: [
          { role: "system", content: system },
          { role: "user", content: `Question: ${shortQuestion}\n\nContext: ${JSON.stringify(context || {})}` },
        ],
        temperature: 0.2,
        max_tokens: 700,
        // optional: stop sequences, top_p, etc.
      }),
    });

    if (!resp.ok) {
      const txt = await resp.text().catch(() => "");
      console.error("OpenAI responded with non-OK:", resp.status, txt);
      return res.status(502).json({ error: "LLM error", detail: txt });
    }

    const data = await resp.json();
    const answer = data?.choices?.[0]?.message?.content || "I couldn't generate an answer right now.";

    return res.status(200).json({ answer });
  } catch (err) {
    console.error("Server error calling OpenAI:", err);
    return res.status(500).json({ error: "server error", detail: err.message });
  }
};
