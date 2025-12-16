"use client";
import Navbar from "../../components/Navbar";
import { useState, useRef } from "react";

export default function RegisterPage() {
  const [file, setFile] = useState<File | null>(null);
  const [msg, setMsg] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  async function registerFile() {
    if (!file) return;

    const fd = new FormData();
    fd.append("file", file);

    const res = await fetch("/api/add", { method: "POST", body: fd });
    const data = await res.json();
    setMsg(data.message || "File registered successfully");
  }

  function removeFile() {
    setFile(null);
    setMsg("");
    if (fileRef.current) fileRef.current.value = "";
  }

  function resetAll() {
    setFile(null);
    setMsg("");
    if (fileRef.current) fileRef.current.value = "";
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navbar />

      <main className="max-w-xl mx-auto mt-20 bg-white text-slate-900 p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Register File
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
            onClick={registerFile}
            disabled={!file}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Register
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

        {msg && (
          <div className="mt-6 p-3 bg-green-100 text-green-800 rounded">
            {msg}
          </div>
        )}
      </main>
    </div>
  );
}
