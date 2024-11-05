import {
  Boarding3
} from "../components";
import React, { Suspense } from "react";

export default function Home() {
  return (
    <main className=" bg-primary w-full overflow-hidden font-poppins">
      <section className=" bg-primary flexStart ">
        <section className="boxWidth">
            <Boarding3 />
        </section>
      </section>
    </main>
  );
}
