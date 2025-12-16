import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { calculateHash } from "@/lib/hash";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db("integrityDB");

  const stored = await db.collection("files").findOne({ filename: file.name });

  if (!stored) {
    return NextResponse.json({ status: "NOT_REGISTERED" });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const newHash = calculateHash(buffer);

  const status = newHash === stored.hash ? "OK" : "VIOLATION";

  return NextResponse.json({
    status,
    storedHash: stored.hash,
    newHash,
    sizeChanged: stored.size !== file.size,
  });
}
