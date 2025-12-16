"use client";
import Navbar from "../../components/Navbar";
import { useState, useRef } from "react";

export default function VerifyPage() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");
  const [explanation, setExplanation] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  async function verify() {
    if (!file) return;

    const fd = new FormData();
    fd.append("file", file);

    const res = await fetch("/api/verify", { method: "POST", body: fd });
    const data = await res.json();
    setStatus(data.status);

    const exp = await fetch("/api/explain", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const expData = await exp.json();
    setExplanation(expData.explanation);
  }

  function removeFile() {
    setFile(null);
    setStatus("");
    setExplanation("");
    if (fileRef.current) fileRef.current.value = "";
  }

  function resetAll() {
    setFile(null);
    setStatus("");
    setExplanation("");
    if (fileRef.current) fileRef.current.value = "";
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navbar />

      <main className="max-w-xl mx-auto mt-20 bg-white text-slate-900 p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Verify File Integrity
        </h2>

        <input
          ref={fileRef}
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="mb-4 w-full"
        />

        {file && <p className="mb-4">📄 {file.name}</p>}

        <div className="flex flex-wrap gap-3">
          <button
            onClick={verify}
            disabled={!file}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Verify
          </button>

          <button
            onClick={removeFile}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Remove File
          </button>

          <button
            onClick={resetAll}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Reset
          </button>
        </div>

        {status && (
          <div
            className={`mt-6 p-3 rounded ${
              status.includes("✔")
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            Status: {status}
          </div>
        )}

        {explanation && (
          <div className="mt-4 p-4 bg-gray-100 rounded">
            <h3 className="font-semibold mb-2">AI Explanation</h3>
            <p>{explanation}</p>
          </div>
        )}
      </main>
    </div>
  );
}
