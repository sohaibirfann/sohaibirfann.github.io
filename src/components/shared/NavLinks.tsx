import Link from "next/link";
import { NAV } from "@/lib/nav";

/** The desktop nav links, shared by both wings' headers. */
export default function NavLinks({
  className,
  current,
}: {
  className: string;
  current: (href: string) => boolean;
}) {
  return (
    <nav className={className} aria-label="Site">
      {NAV.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="m-link"
          aria-current={current(item.href) ? "page" : undefined}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
