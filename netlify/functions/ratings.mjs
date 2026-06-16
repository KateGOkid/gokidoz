// GOkidOZ shared ratings — Netlify Function backed by Netlify Blobs.
// GET  /api/ratings?ids=slug1,slug2   -> { slug1:{count,avg}, ... }
// POST /api/ratings  {id,stars,comment,name,listing,page} -> { count, avg }
// Ratings are stored server-side so every visitor sees the same averages,
// and they survive every redeploy (Blobs are separate from your site files).
import { getStore } from "@netlify/blobs";

const clampStars = (v) => Math.max(1, Math.min(5, parseInt(v, 10) || 0));
const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export default async (req) => {
  const store = getStore("gokidoz-ratings");

  if (req.method === "OPTIONS") return new Response("", { headers: cors });

  if (req.method === "GET") {
    const url = new URL(req.url);
    const ids = (url.searchParams.get("ids") || "").split(",").map(s => s.trim()).filter(Boolean).slice(0, 200);
    const out = {};
    await Promise.all(ids.map(async (id) => {
      const rec = await store.get(id, { type: "json" });
      if (rec && rec.count) out[id] = { count: rec.count, avg: rec.sum / rec.count, recent: (rec.items || []).slice(-2) };
    }));
    return new Response(JSON.stringify(out), { headers: { ...cors, "Content-Type": "application/json" } });
  }

  if (req.method === "POST") {
    let body;
    try { body = await req.json(); } catch (e) { return new Response("bad json", { status: 400, headers: cors }); }
    const id = (body.id || "").toString().slice(0, 80);
    const stars = clampStars(body.stars);
    if (!id || !stars) return new Response("missing id/stars", { status: 400, headers: cors });
    const rec = (await store.get(id, { type: "json" })) || { count: 0, sum: 0, items: [] };
    rec.count += 1;
    rec.sum += stars;
    rec.items.push({
      s: stars,
      c: (body.comment || "").toString().slice(0, 140),
      n: (body.name || "").toString().slice(0, 40),
      d: Date.now(),
    });
    if (rec.items.length > 100) rec.items = rec.items.slice(-100);
    rec.listing = (body.listing || rec.listing || "").toString().slice(0, 120);
    await store.set(id, JSON.stringify(rec));
    return new Response(JSON.stringify({ count: rec.count, avg: rec.sum / rec.count }), { headers: { ...cors, "Content-Type": "application/json" } });
  }

  return new Response("method not allowed", { status: 405, headers: cors });
};

export const config = { path: "/api/ratings" };
