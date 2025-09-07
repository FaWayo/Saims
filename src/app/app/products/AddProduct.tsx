import BottomDrawer from "@/components/bottom-drawer"
import Modal from "@/components/modal"
import React, { useEffect, useState } from "react"
import AddForm from "./AddForm"
import CategoryForm from "./AddCategoryForm"
import AddUnitForm from "./AddUnitForm"
import { getRequest } from "@/lib/auth"
import { ApiResponse } from "@/app/auth/signup/types"

interface Props {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function AddProduct({ isOpen, setIsOpen }: Props) {
  const [isMobile, setIsMobile] = useState(false)
  const [onAddCategory, setOnAddCategory] = useState(false)
  const [onAddUnit, setOnAddUnit] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [units, setUnits] = useState<{ id: string; name: string }>([])

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

  const fetchUnits = async () => {
    setIsOpen(false)
    try {
      const response = await getRequest("api/units")
      const resdata: ApiResponse = await response.json()

      //const data: { id: string; name: String } = resdata
      //setUnits(data)

      console.log(resdata, 'umites res')

      if (!resdata.success) {
        throw new Error(resdata.error?.message || "Failed to get units")
      }
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred"
      )
    }
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
          <AddUnitForm onClose={handleCloseUnit} onSubmit={fetchUnits} />
        </Modal>
      )}
    </>
  )
}

export default AddProduct
