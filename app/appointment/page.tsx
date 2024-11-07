import {
  Navbar,
  AppointmentDetails
} from "../components";

export default function Home() {
  return (
    <main className=" bg-primary w-full overflow-hidden font-poppins">
      <header className="paddingX flexCenter">
        <nav className="boxWidth">
          <Navbar />
        </nav>
      </header>
      <section className=" bg-primary flexStart">
        <section className="boxWidth">
          <AppointmentDetails />
        </section>
      </section>

    </main>
  );
}
