import React from "react";
import authCartoon from "../../../public/assets/cartoononlayout.png";
import authCartoon2 from "../../../public/assets/cartoon.png";
import authCartoon3 from "../../../public/assets/cartoononlaay.png"
import Carousel from "@/components/carousel/Carousel";
interface Props {
  children: React.ReactNode;
}

const imageItems = [authCartoon2, authCartoon, authCartoon3];

export default function AuthLayout({ children }: Props) {

  return (
    <main className="flex h-screen">
      <section className="flex-1 bg-delftblue">
        <figure className="flex items-center justify-center h-full">
          <Carousel
            items={imageItems}
          />
        </figure>
      </section>
      <section className="flex-1 bg-aliceblue">{children}</section>
    </main>
  );
}
