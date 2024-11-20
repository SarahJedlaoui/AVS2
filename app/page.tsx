import {
 Hero,
 Navbar2
} from "./components";

export default function Home() {
  return (
    <main className=" bg-[#FDF7F0] w-full overflow-hidden font-poppins">
     <header className="paddingX flexCenter">
        <nav className="boxWidth">
          <Navbar2 />
        </nav>
      </header>
      <section className=" bg-[#FDF7F0] flexStart w-full">
        <section className="boxWidth">
          <Hero />
        </section>
      </section>
      
    </main>
  );
}
