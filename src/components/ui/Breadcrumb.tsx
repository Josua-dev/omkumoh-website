import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-gray-400">
        <li>
          <Link
            href="/"
            className="flex items-center gap-1 transition-colors hover:text-steel-blue"
            aria-label="Home"
          >
            <Home size={14} />
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-1.5">
            <ChevronRight size={12} className="text-gray-500" />
            {item.href ? (
              <Link
                href={item.href}
                className="transition-colors hover:text-steel-blue"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-300 font-medium" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}