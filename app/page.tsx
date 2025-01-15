import {
 Hero,
 Navbar2,
 Steering
} from "./components";

export default function Home() {
  return (
    <main className=" bg-[#FDF7F0] w-full overflow-hidden font-poppins">
      <section className=" bg-[#FDF7F0] flexStart w-full">
        <section className="boxWidth">
          <Hero />
        </section>
      </section>
      
    </main>
  );
}
