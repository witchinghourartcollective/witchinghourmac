import dotenv from "dotenv";
import { openai } from "@ai-sdk/openai";
import { withSupermemory } from "@supermemory/tools/ai-sdk";
import { generateText } from "ai";

dotenv.config({ path: ".env.local" });

const apiKey = process.env.SUPERMEMORY_API_KEY;

if (!apiKey) {
  console.error("Missing SUPERMEMORY_API_KEY in .env.local");
  process.exit(1);
}

const modelWithMemory = withSupermemory(openai("gpt-5"), "user_id_life");
const prompt = process.argv.slice(2).join(" ").trim() ||
  "What do you remember about my preferences?";

const result = await generateText({
  model: modelWithMemory,
  messages: [
    { role: "user", content: prompt }
  ]
});

console.log(result.text);
