import type { NextRequest } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);


  const dateParam = searchParams.get("date") || "2025-09-22";
  const labelParam = searchParams.get("label") || `Coding Since ${dateParam}`;
  const colorParam = searchParams.get("color") || "333ab2";
  const bgParam = searchParams.get("bg") || "e0e7ff";

  const startDate = new Date(dateParam);
  const today = new Date();

  if (Number.isNaN(startDate.getTime())) {
    return new Response("Invalid Date Format. Use YYYY-MM-DD", { status: 400 });
  }

  const diffInMs = today.getTime() - startDate.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const dDayText = `D+${diffInDays}`;

  const labelLength = labelParam.length;
  const splitPoint = Math.max(140, labelLength * 8 + 20);
  const width = splitPoint + 60;
  const height = 28;

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <linearGradient id="g" x2="0" y2="100%">
        <stop offset="0" stop-color="#fff" stop-opacity=".1"/>
        <stop offset="1" stop-opacity=".1"/>
      </linearGradient>

      <mask id="round">
        <rect width="${width}" height="${height}" rx="3" fill="#fff"/>
      </mask>
      
      <g mask="url(#round)">
        <rect width="${splitPoint}" height="${height}" fill="#${bgParam}"/>
        <rect x="${splitPoint}" width="${width - splitPoint}" height="${height}" fill="#${colorParam}"/>
        <rect width="${width}" height="${height}" fill="url(#g)"/>
      </g>

      <g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" font-size="11">
        <text x="${splitPoint / 2}" y="18.5" fill="#000" opacity="0.1">${labelParam}</text>
        <text x="${splitPoint / 2}" y="17.5" fill="#${colorParam}">${labelParam}</text>
        
        <text x="${splitPoint + (width - splitPoint) / 2}" y="18.5" fill="#000" opacity="0.2" font-weight="bold">${dDayText}</text>
        <text x="${splitPoint + (width - splitPoint) / 2}" y="17.5" fill="#fff" font-weight="bold">${dDayText}</text>
      </g>
    </svg>
  `;

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "no-cache, no-store, must-revalidate",
    },
  });
}
