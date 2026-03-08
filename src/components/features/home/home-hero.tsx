import { type ReactNode, useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Code, Rocket } from "lucide-react";
import { Button } from "@/components/ui";

const linkMotion = {
  type: "spring",
  stiffness: 400,
  damping: 10,
} as const;

type LogoLinkProps = {
  href: string;
  label: string;
  glowClassName: string;
  hoverRotate: number;
  children: ReactNode;
};

function LogoLink({
  href,
  label,
  glowClassName,
  hoverRotate,
  children,
}: LogoLinkProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative group"
      whileHover={{ scale: 1.1, rotate: hoverRotate }}
      transition={linkMotion}
      aria-label={label}
    >
      <div
        className={`absolute -inset-0.5 rounded-full opacity-0 blur-xl transition-all duration-500 group-hover:opacity-100 ${glowClassName}`}
      />
      {children}
    </motion.a>
  );
}

export function HomeHero() {
  const [count, setCount] = useState(0);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#0a0c10]">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 -left-4 h-72 w-72 animate-blob rounded-full bg-purple-500 opacity-70 blur-xl filter mix-blend-multiply" />
        <div className="animation-delay-2000 absolute top-0 -right-4 h-72 w-72 animate-blob rounded-full bg-blue-500 opacity-70 blur-xl filter mix-blend-multiply" />
        <div className="animation-delay-4000 absolute -bottom-8 left-20 h-72 w-72 animate-blob rounded-full bg-cyan-500 opacity-70 blur-xl filter mix-blend-multiply" />
      </div>

      <div className="absolute inset-0 bg-grid-white bg-[size:50px_50px] opacity-20" />

      <div className="relative z-10 mx-auto flex w-full max-w-screen-xl flex-col items-center justify-center gap-12 px-6 py-16">
        <div className="flex items-center justify-center gap-10">
          <LogoLink
            href="https://vite.dev"
            label="Open Vite website"
            glowClassName="bg-gradient-to-r from-violet-600 to-indigo-600"
            hoverRotate={5}
          >
            <img src="/icons/vite.svg" className="relative h-16 w-auto" alt="Vite logo" />
          </LogoLink>

          <LogoLink
            href="https://react.dev"
            label="Open React website"
            glowClassName="bg-gradient-to-r from-cyan-500 to-blue-500"
            hoverRotate={-5}
          >
            <img src="/icons/react.svg" className="relative h-16 w-auto" alt="React logo" />
          </LogoLink>

          <LogoLink
            href="https://github.com/KahfiSmith"
            label="Open KahfiSmith GitHub profile"
            glowClassName="bg-gradient-to-r from-gray-500 to-slate-600"
            hoverRotate={5}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              className="relative h-16 w-auto"
              aria-hidden="true"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </LogoLink>
        </div>

        <motion.h1
          className="bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-500 bg-clip-text text-6xl font-black tracking-tight text-transparent md:text-7xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Vite + React
        </motion.h1>

        <motion.div
          className="w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] shadow-[0_0_60px_-15px_rgba(156,39,176,0.3)] backdrop-blur-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="p-8">
            <Button
              type="button"
              onClick={() => setCount((currentCount) => currentCount + 1)}
              className="group relative mb-6 flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 py-3 font-medium text-white hover:from-purple-700 hover:to-pink-700"
            >
              <span className="relative z-10 flex items-center">
                <span className="mr-2">Count is {count}</span>
                <Rocket className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-violet-400 to-fuchsia-500 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-50" />
            </Button>

            <div className="flex items-center gap-3 border-l-2 border-purple-500/50 pl-3 text-sm text-gray-300">
              <Code className="h-4 w-4 text-purple-400" />
              <p>
                Edit{" "}
                <code className="rounded-md bg-black/20 px-1.5 py-0.5 font-mono text-sm text-pink-400">
                  src/components/features/home/home-hero.tsx
                </code>{" "}
                and save to test HMR
              </p>
            </div>
          </div>

          <div className="border-t border-white/10 bg-gradient-to-r from-purple-900/20 to-cyan-900/20 px-8 py-4">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />
              <span>Click on the logos to learn more</span>
              <ChevronRight className="ml-1 h-3 w-3" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
