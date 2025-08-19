"use client"

import React, { useEffect, useState } from "react"
import {
  BanknoteArrowDown,
  BanknoteArrowUp,
  ClipboardMinus,
  House,
  List,
  LucideIcon,
} from "lucide-react"
import { usePathname, useRouter } from "next/navigation"

function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
   const handleScroll = () => {
    const height = 64
    setIsScrolled(window.scrollY > height)
   }

   window.addEventListener('scroll', handleScroll)
   return () => window.removeEventListener('scroll', handleScroll)
  },[])

  const menuItems: {
    icon: LucideIcon
    title: string
    page: string
  }[] = [
    { icon: House, title: "Home", page: "dashboard" },
    { icon: List, title: "Products", page: "products" },
    { icon: BanknoteArrowDown, title: "Sales", page: "sales" },
    { icon: BanknoteArrowUp, title: "Purchases", page: "purchases" },
    { icon: ClipboardMinus, title: "Reports", page: "reports" },
  ]

  return (
    <nav className={`bg-primary shadow-sm border-t fixed bottom-0 left-0 right-0 w-full md:sticky py-4 md:py-6 text-white z-50 transition-all duration-300
    ${isScrolled ? 'md:top-0' : 'md-top-16'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between md:justify-center md:gap-8">
          {menuItems.map((m) => {
            const MenuIcon = m.icon
            const isActive: boolean = pathname.includes(m.page)

            return (
              <button
                key={m.page}
                className={` flex flex-col md:flex-row items-center md:gap-2 cursor-pointer group transition-all duration-200 px-2 md:px-4 py-1 md:py-2 rounded-lg hover:bg-white/10 focus:bg-white/10 focus:outline-none
                  ${isActive ? "bg-white/20" : ""}
                `}
                onClick={() => router.push(`/app/${m.page}`)}
              >
                <MenuIcon
                  size={20}
                  fill={"none"}
                  className={`transition-all duration-200 first-line:group-hover:fill-current group-hover:scale-110
                    ${isActive ? "scale-110" : ""}
                  `}
                />
                <span
                  className={`text-xs md:text-sm font-medium transition-all
                    ${isActive ? "font-bold" : ""}
                  `}
                >
                  {m.title}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
