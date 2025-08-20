import { X } from "lucide-react"
import React, { ReactNode } from "react"

interface Props {
  children: ReactNode
  isOpen: boolean
  onClose: () => void
  title: string
}

function BottomDrawer({ children, isOpen, onClose, title }: Props) {

    console.log(isOpen, 'drawer open')
  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      <div
        className={`fixed inset-x-0 bottom-0 transform transition-transform duration-300 ease-in-out bg-white shadow-lg rounded-t-xl z-50 max-h-[85vh] overflow-y-auto 
            ${isOpen ? "translate-y-0" : "translate-y-full"}`}
      >
        <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mt-3 mb-4" />

        <div className="px-4 pb-4">
          <header className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </header>

          {children}
        </div>
      </div>
    </>
  )
}

export default BottomDrawer
