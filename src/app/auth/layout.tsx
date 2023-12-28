import React from "react";
import authCartoon from "../../../public/assets/cartoononlayout.png";
import authCartoon2 from "../../../public/assets/cartoon.png";
import authCartoon3 from "../../../public/assets/cartoononlaay.png"
//import Carousel from "@/components/carousel/Carousel";
import Image from "next/image";
interface Props {
  children: React.ReactNode;
}

const imageItems = [authCartoon2, authCartoon, authCartoon3];

export default function AuthLayout({ children }: Props) {

  return (
    <main className="flex flex-col-12 h-screen bg-aliceblue">
      <section className="flex-6 pl-20">
        <figure className="flex items-center justify-center h-full mx-10">
          {/* <Carousel
            items={imageItems}
          /> */}
          <Image src={authCartoon2} alt="auth-img" height={600} width={600}/>
        </figure>
      </section>
      <section className="flex-6">{children}</section>
    </main>
  );
}
