export default function Header({
  rightLinkLabel = "Admin Area",
  rightLinkHref = "/admin",
}) {
  return (
    <header className="bg-[#2f6fb6] text-white">
      <div className="w-full px-4 py-4 md:px-6">
        {/* DESKTOP */}
        <div className="relative hidden h-20 items-center md:flex">
          {/* Logo sinistra */}
          <div className="absolute left-0 flex h-full items-center">
            <img
              src="/logos/logo-sinistra.png"
              alt="Logo sinistra"
              className="h-full object-contain"
            />
          </div>

          {/* Titolo centrato */}
          <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 text-xl font-semibold">
            Portal PRIN 2022 - SCORET
          </div>

          {/* Destra: bottone + logo */}
          <div className="absolute right-0 flex h-full items-center gap-4">
            <a
              href={rightLinkHref}
              className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-[#2f6fb6] shadow-sm hover:bg-slate-50"
            >
              {rightLinkLabel}
            </a>

            <img
              src="/logos/logo-destra.png"
              alt="Logo destra"
              className="h-full object-contain"
            />
          </div>
        </div>

        {/* MOBILE */}
        <div className="md:hidden">
          <div className="text-center text-lg font-semibold leading-snug">
            Portal PRIN 2022 - SCORET
          </div>

          <div className="mt-3 flex items-center justify-center gap-4">
            <img
              src="/logos/logo-sinistra.png"
              alt="Logo sinistra"
              className="h-12 object-contain"
            />
            <img
              src="/logos/logo-destra.png"
              alt="Logo destra"
              className="h-12 object-contain"
            />
          </div>

          <div className="mt-3 flex justify-center">
            <a
              href={rightLinkHref}
              className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-[#2f6fb6] shadow-sm hover:bg-slate-50"
            >
              {rightLinkLabel}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
