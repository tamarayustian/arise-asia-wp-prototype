export default function DecorativeIcons() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Mobile icons (below md) */}
      <div className="md:hidden">
        <div
          className="bg-gradient-arise animate-float absolute top-32 right-8 size-14 rotate-12 opacity-50 blur-sm"
          style={{
            WebkitMask: "url('/icons/spark.svg') no-repeat center / contain",
            mask: "url('/icons/spark.svg') no-repeat center / contain",
          }}
        />
        <div
          className="bg-gradient-arise animate-float absolute top-64 left-4 size-10 -rotate-12 opacity-50 blur-sm [animation-delay:200ms]"
          style={{
            WebkitMask: "url('/icons/cross.svg') no-repeat center / contain",
            mask: "url('/icons/cross.svg') no-repeat center / contain",
          }}
        />
        <div
          className="bg-gradient-arise animate-float absolute top-[40rem] right-4 size-12 rotate-24 [animation-delay:400ms]"
          style={{
            WebkitMask: "url('/icons/wave.svg') no-repeat center / contain",
            mask: "url('/icons/wave.svg') no-repeat center / contain",
          }}
        />
        <div
          className="bg-gradient-arise animate-float absolute top-[56rem] left-6 size-10 -rotate-8 opacity-50 blur-sm [animation-delay:600ms]"
          style={{
            WebkitMask: "url('/icons/fire.svg') no-repeat center / contain",
            mask: "url('/icons/fire.svg') no-repeat center / contain",
          }}
        />
        <div
          className="bg-gradient-arise animate-float absolute top-[72rem] right-10 size-14 rotate-16 [animation-delay:800ms]"
          style={{
            WebkitMask: "url('/icons/stone.svg') no-repeat center / contain",
            mask: "url('/icons/stone.svg') no-repeat center / contain",
          }}
        />
      </div>

      {/* Desktop icons (md+) */}
      <div className="hidden md:block">
        {/* Left side */}
        <div
          className="bg-gradient-arise animate-float absolute top-32 -rotate-8 md:left-12 md:size-16 lg:left-20 lg:size-20 xl:left-32 xl:size-24"
          style={{
            WebkitMask: "url('/icons/fire.svg') no-repeat center / contain",
            mask: "url('/icons/fire.svg') no-repeat center / contain",
          }}
        />
        <div
          className="bg-gradient-arise animate-float absolute top-72 -rotate-15 opacity-50 blur-sm [animation-delay:150ms] md:left-6 md:size-12 lg:left-12 lg:size-16 xl:left-20 xl:size-20"
          style={{
            WebkitMask: "url('/icons/cross.svg') no-repeat center / contain",
            mask: "url('/icons/cross.svg') no-repeat center / contain",
          }}
        />
        <div
          className="bg-gradient-arise animate-float absolute top-[36rem] rotate-24 [animation-delay:300ms] md:left-8 md:size-14 lg:left-14 lg:size-16 xl:left-24 xl:size-20"
          style={{
            WebkitMask: "url('/icons/stone.svg') no-repeat center / contain",
            mask: "url('/icons/stone.svg') no-repeat center / contain",
          }}
        />
        <div
          className="bg-gradient-arise animate-float absolute top-[52rem] -rotate-12 opacity-50 blur-sm [animation-delay:450ms] md:left-14 md:size-12 lg:left-24 lg:size-14 xl:left-40 xl:size-16"
          style={{
            WebkitMask: "url('/icons/spark.svg') no-repeat center / contain",
            mask: "url('/icons/spark.svg') no-repeat center / contain",
          }}
        />
        <div
          className="bg-gradient-arise animate-float absolute top-[68rem] rotate-16 [animation-delay:600ms] md:left-10 md:size-16 lg:left-18 lg:size-20 xl:left-28 xl:size-24"
          style={{
            WebkitMask: "url('/icons/path.svg') no-repeat center / contain",
            mask: "url('/icons/path.svg') no-repeat center / contain",
          }}
        />

        {/* Right side */}
        <div
          className="bg-gradient-arise animate-float absolute top-24 rotate-12 md:right-16 md:size-16 lg:right-28 lg:size-20 xl:right-44 xl:size-28"
          style={{
            WebkitMask: "url('/icons/spark.svg') no-repeat center / contain",
            mask: "url('/icons/spark.svg') no-repeat center / contain",
          }}
        />
        <div
          className="bg-gradient-arise animate-float absolute top-60 -rotate-8 opacity-50 blur-sm [animation-delay:150ms] md:right-8 md:size-12 lg:right-16 lg:size-16 xl:right-28 xl:size-20"
          style={{
            WebkitMask: "url('/icons/wave.svg') no-repeat center / contain",
            mask: "url('/icons/wave.svg') no-repeat center / contain",
          }}
        />
        <div
          className="bg-gradient-arise animate-float absolute top-[32rem] -rotate-20 [animation-delay:300ms] md:right-12 md:size-14 lg:right-20 lg:size-18 xl:right-36 xl:size-24"
          style={{
            WebkitMask: "url('/icons/altar.svg') no-repeat center / contain",
            mask: "url('/icons/altar.svg') no-repeat center / contain",
          }}
        />
        <div
          className="bg-gradient-arise animate-float absolute top-[48rem] rotate-8 [animation-delay:450ms] md:right-6 md:size-16 lg:right-12 lg:size-20 xl:right-24 xl:size-28"
          style={{
            WebkitMask: "url('/icons/fire.svg') no-repeat center / contain",
            mask: "url('/icons/fire.svg') no-repeat center / contain",
          }}
        />
        <div
          className="bg-gradient-arise animate-float absolute top-[64rem] -rotate-15 opacity-50 blur-sm [animation-delay:600ms] md:right-14 md:size-12 lg:right-24 lg:size-16 xl:right-40 xl:size-20"
          style={{
            WebkitMask: "url('/icons/cross.svg') no-repeat center / contain",
            mask: "url('/icons/cross.svg') no-repeat center / contain",
          }}
        />
      </div>
    </div>
  );
}
