"use client"

import React, { useState } from "react"
import Image from "next/image"
import ProductImg from "@/assets/product-img.png"
import EmptyProduct from "@/assets/emptyproducts.png"
import { Button } from "@/components/button"
import AddProduct from "./AddProduct"

function Products() {
  const [isOpenAdd, setIsOpenAdd] = useState(false)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-5 pb-24 md:pb-6">
      <header className="flex items-center gap-3 mb-8">
        <div className="w-8 h-8 md:w-10 md:h-10 flex-shrink-0">
          <Image
            src={ProductImg}
            alt={"product-img"}
            className="w-full h-full object-contain"
          />
        </div>
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">
          Products
        </h1>
      </header>

      <div className="flex flex-col items-center justify-center text-center py-12 md:py-20">
        <div className="mb-6 md:mb-8 relative">
          <div className="md:w-64 md:h-64 mx-auto relative">
            <Image
              src={EmptyProduct}
              alt={"empty-img"}
              className="object-contain opacity-90 h-24 w-24 md:h-full md:w-full"
            />
          </div>

          <div
            className="absolute -top-2 -right-2 w-3 h-3 bg-blue-400 rounded-full animate-bounce opacity-70"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div
            className="absolute -bottom-1 -left-1 w-2 h-2 bg-purple-400 rounded-full animate-bounce opacity-70"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="max-w-md mx-auto space-y-4 md:space-y-6">
          <p className="text-lg md:text-xl text-gray-600 font-medium">
            Your inventory is empty
          </p>
          <p className="text-sm md:text-base text-gray-500 leading-relaxed px-4">
            Start building your product catalog by adding your first item. You
            can manage products from here.
          </p>

          <div className="pt-4">
            <Button
              variant={"outline"}
              size={"sm"}
              onClick={() => setIsOpenAdd(true)}
            >
              Add Product
            </Button>
          </div>
        </div>
      </div>

      {true && <AddProduct isOpen={isOpenAdd} setIsOpen={setIsOpenAdd} />}
    </div>
  )
}

export default Products
