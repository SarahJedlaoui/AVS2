import {
    Navbar2,
    SummaryAI,
    Steering
  } from "../components";
  import React, { Suspense } from "react";
  
  export default function Home() {
    return (
      <main className=" bg-[#FDF7F0] w-full overflow-hidden font-poppins">
        <section className=" bg-[#FDF7F0] flexStart ">
          <section className="boxWidth">
            <Suspense fallback={<div>Loading...</div>}>
              <Steering />
            </Suspense>
          </section>
        </section>
      </main>
    );
  }