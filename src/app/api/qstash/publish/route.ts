import { NextResponse } from "next/server";

export async function POST() {
  const qstashUrl = process.env.QSTASH_URL ?? "https://qstash.upstash.io";
  const qstashToken = process.env.QSTASH_TOKEN;

  if (!qstashUrl || !qstashToken) {
    return NextResponse.json(
      { error: "Missing QSTASH_URL or QSTASH_TOKEN." },
      { status: 500 }
    );
  }

  const destination = "https://witchinghourmac.com/api/qstash/receive";
  const response = await fetch(`${qstashUrl}/v2/publish/${destination}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${qstashToken}`,
    },
  });

  const bodyText = await response.text();

  return NextResponse.json(
    { ok: response.ok, status: response.status, body: bodyText },
    { status: response.ok ? 200 : 502 }
  );
}
