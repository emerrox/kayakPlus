export default function MainLayout({ children }: { children: React.ReactNode }) {

  return (
    <>

        <header className="flex items-center justify-between w-fit h-fit ">
          <h1 className="font-headings text-4xl font-extrabold tracking-wide mb-8 text-center flex-grow">
            KAYAK+
          </h1>
        </header>
        {children}
        <footer className="">
          <p className="text-sm">KAYAK+ desarrollado por Emerrox - Mauro Cordal</p>
        </footer>
    </>
  );
}