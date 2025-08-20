import BottomDrawer from "@/components/bottom-drawer"
import Modal from "@/components/modal"
import React, { useEffect, useState } from "react"

interface Props {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function AddProduct({ isOpen, setIsOpen }: Props) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  const handleClose = () => {
    setIsOpen(false)
  }

  console.log("here", isOpen, isMobile)

  return (
    <>
      {/* Mobile */}
      {isMobile && isOpen && (
        <BottomDrawer onClose={handleClose} title={"Add Product"} isOpen>
          <h2>The content is here</h2>
        </BottomDrawer>
      )}

      {/* Desktop */}
      {isOpen && !isMobile && (
        <Modal onClose={handleClose} title={"Add Product"}>
          <div>Content is here</div>
        </Modal>
      )}
    </>
  )
}

export default AddProduct
