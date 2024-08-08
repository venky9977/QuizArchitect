// src/app/api/proxy/[...proxy]/route.js
import { NextResponse } from 'next/server';

export async function GET(req) {
  const url = new URL(req.url);
  const targetUrl = `https://script.google.com${url.pathname.replace('/api/proxy', '')}${url.search}`;

  const response = await fetch(targetUrl, {
    method: 'GET',
    headers: req.headers,
  });

  const data = await response.text();
  return new NextResponse(data, {
    headers: response.headers,
    status: response.status,
    statusText: response.statusText,
  });
}

export async function POST(req) {
  const url = new URL(req.url);
  const targetUrl = `https://script.google.com${url.pathname.replace('/api/proxy', '')}${url.search}`;

  const body = await req.json();

  const response = await fetch(targetUrl, {
    method: 'POST',
    headers: req.headers,
    body: JSON.stringify(body),
  });

  const data = await response.text();
  return new NextResponse(data, {
    headers: response.headers,
    status: response.status,
    statusText: response.statusText,
  });
}
