//components/Navbar.tsx
"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-white">
          🛡️ File Integrity Checker
        </h1>

        <div className="flex gap-6">
          <Link href="/" className="text-white hover:underline">
            Dashboard
          </Link>
          <Link href="/register" className="text-white hover:underline">
            Register
          </Link>
          <Link href="/verify" className="text-white hover:underline">
            Verify
          </Link>
        </div>
      </div>
    </nav>
  );
}
