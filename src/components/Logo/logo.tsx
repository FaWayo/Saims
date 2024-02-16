import React from 'react'
import { FcSalesPerformance } from "react-icons/fc";
import { novaOval } from "@/app/fonts";
import "./logo.css"

const Logo = (): React.ReactElement => {

  return (
      <div className="logo-container">
          <FcSalesPerformance />
          <span className={`logo-text ${novaOval.className}`}>
            SAIMS
          </span>
     </div>
  )
}

export default Logo
