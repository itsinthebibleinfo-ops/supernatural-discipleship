import { NextRequest, NextResponse } from "next/server";

const API_BASE = "https://bible-api.com";

export async function GET(request: NextRequest) {
  const reference = request.nextUrl.searchParams.get("reference")?.trim();

  if (!reference) {
    return NextResponse.json(
      { error: "Missing reference. Try John 3:16 or Romans 8:1-4." },
      { status: 400 }
    );
  }

  try {
    const upstream = await fetch(
      `${API_BASE}/${encodeURIComponent(reference)}?translation=kjv`,
      {
        headers: {
          "User-Agent": "supernatural-discipleship-course/1.0"
        },
        next: { revalidate: 60 * 60 * 24 * 30 }
      }
    );

    const payload = await upstream.json();

    if (!upstream.ok) {
      return NextResponse.json(
        { error: payload?.error ?? "Unable to load KJV passage." },
        { status: upstream.status }
      );
    }

    return NextResponse.json({
      reference: payload.reference,
      translation: payload.translation_name ?? "King James Version",
      verses: payload.verses ?? [],
      text: String(payload.text ?? "").replace(/\s+/g, " ").trim()
    });
  } catch {
    return NextResponse.json(
      { error: "Bible lookup is temporarily unavailable. Try again shortly." },
      { status: 502 }
    );
  }
}

