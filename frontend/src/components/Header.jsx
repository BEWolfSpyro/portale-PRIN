export default function Header({ rightLinkLabel = "Area Admin", rightLinkHref = "/admin" }) {
  return (
    <header className="bg-[#2f6fb6] text-white">
      <div className="relative flex h-20 w-full items-center px-6">
        {/* Logo sinistra */}
        <div className="absolute left-6 flex h-full items-center">
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
        <div className="absolute right-6 flex h-full items-center gap-4">
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
    </header>
  );
}