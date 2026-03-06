import type { ReactNode } from "react";

type CardGridProps = {
  children: ReactNode;
  columns?: 2 | 3;
};

export function CardGrid({ children, columns = 3 }: CardGridProps) {
  return (
    <div
      className={`grid gap-5 ${columns === 2 ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3"}`}
    >
      {children}
    </div>
  );
}
