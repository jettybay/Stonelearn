export function Footer() {
  return (
    <footer className="border-t py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <a
            href="https://pathfinderdigitech.org"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-[#722F37] hover:underline"
          >
            Powered by Pathfinder
          </a>
          <p className="text-sm text-black">
            © {new Date().getFullYear()} Stonelearn. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
