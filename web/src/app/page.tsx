"use client";

import Graph from "./Graph";

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="w-full max-w-5xl p-6 rounded-2xl shadow-lg bg-white">
        <Graph />
      </div>
    </main>
  );
}
