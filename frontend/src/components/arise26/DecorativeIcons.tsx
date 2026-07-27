export default function DecorativeIcons() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {/* Mobile icons (below md) — 13 icons, right side, hero-constrained */}
      <div className="md:hidden">
        <div
          className="bg-gradient-arise animate-float absolute top-4 right-2 size-8 rotate-12"
          style={{
            WebkitMask: "url('/icons/spark.svg') no-repeat center / contain",
            mask: "url('/icons/spark.svg') no-repeat center / contain",
          }}
        />
        <div
          className="bg-gradient-arise animate-float absolute top-8 right-10 size-6 -rotate-8 opacity-50 blur-sm [animation-delay:150ms]"
          style={{
            WebkitMask: "url('/icons/cross.svg') no-repeat center / contain",
            mask: "url('/icons/cross.svg') no-repeat center / contain",
          }}
        />
        <div
          className="bg-gradient-arise animate-float absolute top-12 right-1 size-10 rotate-24 [animation-delay:300ms]"
          style={{
            WebkitMask: "url('/icons/fire.svg') no-repeat center / contain",
            mask: "url('/icons/fire.svg') no-repeat center / contain",
          }}
        />
        <div
          className="bg-gradient-arise animate-float absolute top-[5.5rem] right-8 size-7 -rotate-12 opacity-50 blur-sm [animation-delay:450ms]"
          style={{
            WebkitMask: "url('/icons/stone.svg') no-repeat center / contain",
            mask: "url('/icons/stone.svg') no-repeat center / contain",
          }}
        />
        <div
          className="bg-gradient-arise animate-float absolute top-[7.5rem] right-3 size-12 rotate-16 [animation-delay:600ms]"
          style={{
            WebkitMask: "url('/icons/wave.svg') no-repeat center / contain",
            mask: "url('/icons/wave.svg') no-repeat center / contain",
          }}
        />
        <div
          className="bg-gradient-arise animate-float absolute top-[9.5rem] right-11 size-8 -rotate-20 opacity-50 blur-sm [animation-delay:750ms]"
          style={{
            WebkitMask: "url('/icons/altar.svg') no-repeat center / contain",
            mask: "url('/icons/altar.svg') no-repeat center / contain",
          }}
        />
        <div
          className="bg-gradient-arise animate-float absolute top-13 right-1 size-6 rotate-6 [animation-delay:900ms]"
          style={{
            WebkitMask: "url('/icons/path.svg') no-repeat center / contain",
            mask: "url('/icons/path.svg') no-repeat center / contain",
          }}
        />
        <div
          className="bg-gradient-arise animate-float absolute top-[15rem] right-7 size-10 -rotate-6 opacity-50 blur-sm [animation-delay:1050ms]"
          style={{
            WebkitMask: "url('/icons/spark.svg') no-repeat center / contain",
            mask: "url('/icons/spark.svg') no-repeat center / contain",
          }}
        />
        <div
          className="bg-gradient-arise animate-float absolute top-[17rem] right-2 size-8 rotate-20 [animation-delay:1200ms]"
          style={{
            WebkitMask: "url('/icons/fire.svg') no-repeat center / contain",
            mask: "url('/icons/fire.svg') no-repeat center / contain",
          }}
        />
        <div
          className="bg-gradient-arise animate-float absolute top-[19rem] right-10 size-6 -rotate-15 opacity-50 blur-sm [animation-delay:1350ms]"
          style={{
            WebkitMask: "url('/icons/wave.svg') no-repeat center / contain",
            mask: "url('/icons/wave.svg') no-repeat center / contain",
          }}
        />
        <div
          className="bg-gradient-arise animate-float absolute top-[21rem] right-1 size-10 rotate-8 [animation-delay:1500ms]"
          style={{
            WebkitMask: "url('/icons/cross.svg') no-repeat center / contain",
            mask: "url('/icons/cross.svg') no-repeat center / contain",
          }}
        />
        <div
          className="bg-gradient-arise animate-float absolute top-[23rem] right-9 size-7 -rotate-10 opacity-50 blur-sm [animation-delay:1650ms]"
          style={{
            WebkitMask: "url('/icons/stone.svg') no-repeat center / contain",
            mask: "url('/icons/stone.svg') no-repeat center / contain",
          }}
        />
        <div
          className="bg-gradient-arise animate-float absolute top-[25rem] right-4 size-9 rotate-14 [animation-delay:1800ms]"
          style={{
            WebkitMask: "url('/icons/altar.svg') no-repeat center / contain",
            mask: "url('/icons/altar.svg') no-repeat center / contain",
          }}
        />
      </div>

      {/* Desktop icons (md+) — 13 icons, shifted inward toward title */}
      <div className="hidden md:block">
        {/* 1: spark */}
        <div
          className="bg-gradient-arise animate-float absolute top-52 right-20 size-14 rotate-12 md:right-20 md:size-14 lg:right-24 lg:size-18 xl:right-24 xl:size-24"
          style={{
            WebkitMask: "url('/icons/spark.svg') no-repeat center / contain",
            mask: "url('/icons/spark.svg') no-repeat center / contain",
          }}
        />
        {/* 2: cross — blurred */}
        <div
          className="bg-gradient-arise animate-float absolute top-40 right-36 size-10 -rotate-8 opacity-50 blur-sm [animation-delay:150ms] md:right-36 md:size-10 lg:right-52 lg:size-14 xl:right-72 xl:size-20"
          style={{
            WebkitMask: "url('/icons/cross.svg') no-repeat center / contain",
            mask: "url('/icons/cross.svg') no-repeat center / contain",
          }}
        />
        {/* 3: fire */}
        <div
          className="bg-gradient-arise animate-float absolute top-22 right-20 size-16 rotate-24 [animation-delay:300ms] md:right-20 md:size-16 lg:right-20 lg:size-20 xl:top-22 xl:right-20 xl:size-28"
          style={{
            WebkitMask: "url('/icons/fire.svg') no-repeat center / contain",
            mask: "url('/icons/fire.svg') no-repeat center / contain",
          }}
        />
        {/* 4: stone — blurred */}
        <div
          className="bg-gradient-arise animate-float absolute top-4 right-28 size-10 -rotate-12 opacity-50 blur-sm [animation-delay:450ms] md:right-28 md:size-10 lg:right-40 lg:size-12 xl:right-48 xl:size-16"
          style={{
            WebkitMask: "url('/icons/stone.svg') no-repeat center / contain",
            mask: "url('/icons/stone.svg') no-repeat center / contain",
          }}
        />
        {/* 5: wave */}
        <div
          className="bg-gradient-arise animate-float absolute top-120 right-28 size-18 rotate-16 [animation-delay:600ms] md:right-28 md:size-18 lg:right-40 lg:size-24 xl:right-52 xl:size-32"
          style={{
            WebkitMask: "url('/icons/wave.svg') no-repeat center / contain",
            mask: "url('/icons/wave.svg') no-repeat center / contain",
          }}
        />
        {/* 6: altar — blurred */}
        <div
          className="bg-gradient-arise animate-float absolute top-26 right-40 size-14 -rotate-20 opacity-50 blur-sm [animation-delay:750ms] md:right-40 md:size-14 lg:right-60 lg:size-18 xl:right-80 xl:size-24"
          style={{
            WebkitMask: "url('/icons/altar.svg') no-repeat center / contain",
            mask: "url('/icons/altar.svg') no-repeat center / contain",
          }}
        />
        {/* 7: path */}
        <div
          className="bg-gradient-arise animate-float absolute top-110 right-48 size-14 rotate-6 [animation-delay:900ms] md:right-48 md:size-14 lg:right-80 lg:size-18 xl:top-100 xl:right-28 xl:size-24"
          style={{
            WebkitMask: "url('/icons/path.svg') no-repeat center / contain",
            mask: "url('/icons/path.svg') no-repeat center / contain",
          }}
        />
        {/* 8: spark — blurred */}
        <div
          className="bg-gradient-arise animate-float absolute top-60 right-36 size-10 -rotate-6 opacity-50 blur-sm [animation-delay:1050ms] md:right-36 md:size-10 lg:right-52 lg:size-14 xl:right-72 xl:size-20"
          style={{
            WebkitMask: "url('/icons/spark.svg') no-repeat center / contain",
            mask: "url('/icons/spark.svg') no-repeat center / contain",
          }}
        />
        {/* 9: fire */}
        <div
          className="bg-gradient-arise animate-float absolute top-6 right-48 size-16 rotate-20 [animation-delay:1200ms] md:right-48 md:size-16 lg:right-80 lg:size-20 xl:right-96 xl:size-28"
          style={{
            WebkitMask: "url('/icons/fire.svg') no-repeat center / contain",
            mask: "url('/icons/fire.svg') no-repeat center / contain",
          }}
        />
        {/* 10: wave — blurred */}
        <div
          className="bg-gradient-arise animate-float absolute top-72 right-40 size-10 -rotate-15 opacity-50 blur-sm [animation-delay:1350ms] md:right-40 md:size-10 lg:right-48 lg:size-14 xl:right-64 xl:size-18"
          style={{
            WebkitMask: "url('/icons/wave.svg') no-repeat center / contain",
            mask: "url('/icons/wave.svg') no-repeat center / contain",
          }}
        />
        {/* 11: cross */}
        <div
          className="bg-gradient-arise animate-float absolute top-68 right-20 size-18 rotate-8 [animation-delay:1500ms] md:right-20 md:size-18 lg:right-20 lg:size-24 xl:right-20 xl:size-32"
          style={{
            WebkitMask: "url('/icons/cross.svg') no-repeat center / contain",
            mask: "url('/icons/cross.svg') no-repeat center / contain",
          }}
        />
        {/* 12: stone — blurred */}
        <div
          className="bg-gradient-arise animate-float absolute top-74 right-52 size-14 -rotate-10 opacity-50 blur-sm [animation-delay:1650ms] md:right-52 md:size-14 lg:right-64 lg:size-18 xl:top-96 xl:right-80 xl:size-24"
          style={{
            WebkitMask: "url('/icons/stone.svg') no-repeat center / contain",
            mask: "url('/icons/stone.svg') no-repeat center / contain",
          }}
        />
        {/* 13: altar */}
        <div
          className="bg-gradient-arise animate-float absolute top-96 right-28 size-14 rotate-14 [animation-delay:1800ms] md:right-28 md:size-14 lg:right-40 lg:size-18 xl:right-52 xl:size-24"
          style={{
            WebkitMask: "url('/icons/altar.svg') no-repeat center / contain",
            mask: "url('/icons/altar.svg') no-repeat center / contain",
          }}
        />
      </div>
    </div>
  );
}
