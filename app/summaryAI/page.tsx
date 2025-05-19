import { Navbar2, SummaryAI } from "../components";
import React, { Suspense } from "react";

export default function Home() {
  return (
    <main className="bg-white w-full min-h-screen overflow-hidden font-poppins flex justify-center">
      <div className="bg-[#FDF7F0] w-full max-w-[500px] min-h-screen">
        <header className="paddingX">
          <nav>
            <Navbar2 />
          </nav> 
        </header>
        <section className=" bg-[#FDF7F0] flexStart ">
          <section className="boxWidth">
            <Suspense fallback={<div>Loading...</div>}>
              <SummaryAI />
            </Suspense>
          </section>
        </section>
      </div>
    </main>
  );
}
