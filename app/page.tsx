import {
  Hero
} from "./components";

export default function Home() {
  return (
    <main className="bg-white w-full overflow-hidden font-poppins flex justify-center">
      {/* Container simulating mobile width */}
      <div className="bg-[#FDF7F0] w-[500px] min-h-screen">
        <Hero />
      </div>
    </main>
  );
}
