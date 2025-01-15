import {
    Prompt
  } from "../components";
  import React, { Suspense } from "react";
  
  export default function Home() {
    return (
      <main className=" bg-[#FDF7F0] w-full overflow-hidden font-poppins">
        <section className=" bg-[#FDF7F0] flexStart ">
          <section className="boxWidth">
           
              <Prompt />
           
          </section>
        </section>
      </main>
    );
  }