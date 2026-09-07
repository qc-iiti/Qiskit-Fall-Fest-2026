"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
};

export default function TiltCard({ children, className = "" }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    node.style.transform = `perspective(800px) rotateX(${y * -8}deg) rotateY(${x * 10}deg) translateY(-4px)`;
    node.style.setProperty("--glow-x", `${(x + 0.5) * 100}%`);
    node.style.setProperty("--glow-y", `${(y + 0.5) * 100}%`);
  }

  function handleLeave() {
    const node = ref.current;
    if (!node) return;
    node.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)";
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`transition-transform duration-300 ease-out [transform-style:preserve-3d] ${className}`}
      style={{
        backgroundImage:
          "radial-gradient(400px circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(255,79,160,0.08), transparent 60%)",
      }}
    >
      {children}
    </div>
  );
}
