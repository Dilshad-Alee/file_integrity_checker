//app/page.tsx
import Navbar from "@/components/Navbar";
import PageCard from "@/components/PageCard";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-20">
        <h1 className="text-5xl font-extrabold text-white text-center mb-6">
          File Integrity Checker
        </h1>

        <p className="text-center text-white/80 text-lg max-w-2xl mx-auto mb-16">
          Securely register and verify files using cryptographic hashing and
          AI-powered explanations.
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          <PageCard
            title="Register File"
            description="Upload and securely register a file hash for future integrity verification."
            href="/register"
            icon="📁"
          />

          <PageCard
            title="Verify File"
            description="Verify whether a previously registered file has been modified or corrupted."
            href="/verify"
            icon="🔍"
          />
        </div>
      </main>
    </div>
  );
}
