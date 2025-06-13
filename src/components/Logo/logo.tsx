import React from 'react'
import { novaOval } from "@/app/fonts";
import "./logo.css"
import { ChartNoAxesCombined } from 'lucide-react';

const Logo = (): React.ReactElement => {

  return (
      <div className="logo-container">
        <ChartNoAxesCombined stroke="#0D3B66"/>
          <span className={`logo-text ${novaOval.className}`}>
            SAIMS
          </span>
     </div>
  )
}

export default Logo
