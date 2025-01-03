export default function MainLayout({ children }: { children: React.ReactNode }) {

  return (
    <>
          <main className="font-geist m-0 p-0 w-full flex flex-col items-center justify-around min-h-screen px-5 overflow-auto bg-backgroundColor text-textPrimary">

        <header className="flex items-center justify-between w-full mb-10">
          <h1 className="font-headings text-4xl font-extrabold tracking-wide mb-8 text-center flex-grow">
            KAYAK+
          </h1>
        </header>
        {children}
        <footer className="mt-10">
          <p className="text-sm">KAYAK+ desarrollado por Emerrox - Mauro Cordal</p>
        </footer>
      </main>
    </>
  );
}