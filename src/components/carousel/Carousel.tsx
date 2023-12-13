'use client'
import Image, { StaticImageData } from "next/image";
import React, { useState } from "react";
import "./carousel.css";

interface Props {
  items: StaticImageData[];
}

function Carousel({ items }: Props) {
  const [currentImage, setCurrentImage] = useState(0);
  const totalImages = items.length;

  const refs = items.reduce<Record<number, React.RefObject<any>>>(
    (acc, _, i) => {
      acc[i] = React.createRef();
      return acc;
    },
    {} as const
  );

  const scrollToImage = (i: number) => {
    setCurrentImage(i);

    refs[i].current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  };

  const nextImage = () => {
    if (currentImage >= totalImages - 1) {
      scrollToImage(0);
    } else {
      scrollToImage(currentImage + 1);
    }
  };

  const previousImage = () => {
    if (currentImage === 0) {
      scrollToImage(totalImages - 1);
    } else {
      scrollToImage(totalImages - 1);
    }
  };

  const arrowStyle =
    "absolute text-white text-2xl z-10 bg-black h-10 w-10 rounded-full opacity-75 flex items-center justify-center";

  const sliderControl = (isLeft?: boolean) => (
    <button
      type="button"
      onClick={isLeft ? previousImage : nextImage}
      className={`${arrowStyle} ${isLeft ? "left-2" : "right-2"}`}
      style={{ top: "40%" }}
    >
      <span role="img" aria-label={`Arrow ${isLeft ? 'left' : 'right'}`}>
        {isLeft ? '◀' : '▶'}
      </span>
    </button>
  );

  return (
    <div className="p-12 flex justify-center w-screen md:w-1/2 items-center">
      <div className="relative w-full">
        <div className="carousel">
          {sliderControl(true)}
          {items.map((img, index) => (
            <figure
              className="w-full flex-shrink-0"
              key={index}
              ref={refs[index]}
            >
              <Image
                src={img}
                className="w-full object-contain"
                alt="carousel-img"
              />
            </figure>
          ))}
          {sliderControl()}
        </div>
      </div>
    </div>
  );
}

export default Carousel;
