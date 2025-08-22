import BottomDrawer from "@/components/bottom-drawer"
import Modal from "@/components/modal"
import React, { useEffect, useState } from "react"
import AddForm from "./AddForm"
import CategoryForm from "./AddCategoryForm"
import AddUnitForm from "./AddUnitForm"

interface Props {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function AddProduct({ isOpen, setIsOpen }: Props) {
  const [isMobile, setIsMobile] = useState(false)
  const [onAddCategory, setOnAddCategory] = useState(false)
  const [onAddUnit, setOnAddUnit] = useState(false)

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

  const handleCloseCategory = () => {
    setOnAddCategory(false)
  }

  const handleCloseUnit = () => {
    setOnAddUnit(false)
  }
  // console.log("here", isOpen, isMobile)

  return (
    <>
      {/* Mobile */}
      {isMobile && isOpen && (
        <BottomDrawer onClose={handleClose} title={"Add Product"} isOpen>
          <AddForm
            handleClose={handleClose}
            setAddCategory={setOnAddCategory}
            setAddUnit={setOnAddUnit}
          />
        </BottomDrawer>
      )}

      {/* Desktop */}
      {isOpen && !isMobile && (
        <Modal onClose={handleClose} title={"Add Product"}>
          <AddForm
            handleClose={handleClose}
            setAddCategory={setOnAddCategory}
            setAddUnit={setOnAddUnit}
          />
        </Modal>
      )}

      {onAddCategory && (
        <Modal onClose={handleCloseCategory} title={"Add Category"}>
          <CategoryForm onClose={handleCloseCategory} />
        </Modal>
      )}

      {onAddUnit && (
        <Modal onClose={handleCloseUnit} title={"Add Units"}>
          <AddUnitForm onClose={handleCloseUnit} />
        </Modal>
      )}
    </>
  )
}

export default AddProduct
