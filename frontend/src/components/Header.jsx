export default function Header({
  rightLinkLabel = "Admin Area",
  rightLinkHref = "/admin",
}) {
  return (
    <header className="bg-[#2B65AF] text-white">
      <div className="w-full px-4 py-4 md:px-6">
        {/* DESKTOP */}
        <div className="relative hidden h-20 items-center md:flex">
          {/* Logo sinistra */}
          <div className="absolute left-0 flex h-full items-center">
            <img
              src="/logos/nextgeneu1.png"
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
              className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-[#2B65AF] shadow-sm hover:bg-slate-50"
            >
              {rightLinkLabel}
            </a>

            <img
              src="/logos/Italiadomani1.png"
              alt="Logo destra"
              className="h-full object-contain"
            />
          </div>
        </div>

	{/* MOBILE */}
        <div className="md:hidden flex flex-col items-center text-center">
        {/* Titolo */}
	<div className="text-lg font-semibold leading-snug">
            Portal PRIN 2022 - SCORET
          </div>

	{/* Logo Sinistra */}
            <img
              src="/logos/nextgeneu1.png"
              alt="Logo sinistra"
              className="mt-4 h-12 object-contain"
            />
	{/* Logo Destra */}
            <img
              src="/logos/Italiadomani1.png"
              alt="Logo destra"
              className="mt-3 h-12 object-contain"
            />
          
           <a
              href={rightLinkHref}
              className="mt-4 rounded-md bg-white px-4 py-2 text-sm font-semibold text-[#2B65AF] shadow-sm hover:bg-slate-50"
            >
              {rightLinkLabel}
            </a>
        </div>
      </div>
    </header>
  );
}
