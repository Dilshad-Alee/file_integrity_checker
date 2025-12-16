//components/PageCard.tsx

import Link from "next/link";

export default function PageCard({
  title,
  description,
  href,
  icon,
}: {
  title: string;
  description: string;
  href: string;
  icon: string;
}) {
  return (
    <Link href={href}>
      <div className="bg-white/90 rounded-2xl p-8 shadow-xl hover:scale-[1.02] transition cursor-pointer">
        <div className="text-4xl mb-4">{icon}</div>
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-gray-600 mt-2">{description}</p>
      </div>
    </Link>
  );
}
