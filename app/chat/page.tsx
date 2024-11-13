import {
  Navbar2,
 Chat
} from "../components";
import React, { Suspense } from "react";
export default function Home() {
  return (
    <main className=" bg-[#FDF7F0] w-full overflow-hidden font-poppins">
      <header className="paddingX flexCenter">
        <nav className="boxWidth">
          <Navbar2 />
        </nav>
      </header>
      <section className=" bg-[#FDF7F0] w-full flexStart ">
        <section className="boxWidth">
          <Suspense fallback={<div>Loading...</div>}>
            <Chat />
          </Suspense>

        </section>
      </section>
     
    </main>
  );
}
