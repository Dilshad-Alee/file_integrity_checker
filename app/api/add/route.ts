import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { calculateHash } from "@/lib/hash";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const hash = calculateHash(buffer);

  const client = await clientPromise;
  const db = client.db("integrityDB");

  await db.collection("files").updateOne(
    { filename: file.name },
    {
      $set: {
        filename: file.name,
        hash,
        size: file.size,
        uploadedAt: new Date(),
      },
    },
    { upsert: true }
  );

  return NextResponse.json({
    status: "OK",
    message: "File registered successfully",
  });
}
