import {
  Navbar,
  Footer,
  Boarding1
} from "../components";
import React, { Suspense } from "react";

export default function Home() {
  return (
    <main className=" bg-primary w-full overflow-hidden font-poppins">
      <section className=" bg-primary flexStart ">
        <section className="boxWidth">
          <Suspense fallback={<div>Loading...</div>}>
            <Boarding1 />
          </Suspense>
        </section>
      </section>
    </main>
  );
}
