import {
  Navbar2,
  AI
} from "../components";

export default function Home() {
  return (
    <main className="bg-white w-full min-h-screen overflow-hidden font-poppins flex justify-center">
      {/* Simulated mobile viewport container */}
      <div className="bg-[#FDF7F0] w-full max-w-[500px] min-h-screen">
        <header className="paddingX">
          <nav>
            <Navbar2 />
          </nav>
        </header>
        
        <section className="flexStart">
          <section className="boxWidth">
            <AI />
          </section>
        </section>
      </div>
    </main>
  );
}
