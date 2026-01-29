import { NextResponse } from "next/server";

export async function POST(request: Request) {
  if (!process.env.QSTASH_CURRENT_SIGNING_KEY) {
    return NextResponse.json(
      { ok: false, error: "QSTASH_CURRENT_SIGNING_KEY is not set" },
      { status: 500 }
    );
  }

  const { verifySignatureAppRouter } = await import("@upstash/qstash/nextjs");
  const handler = verifySignatureAppRouter(async (req: Request) => {
    const body = await req.json().catch(() => null);

    return NextResponse.json({
      ok: true,
      received: body,
    });
  });

  return handler(request);
}
