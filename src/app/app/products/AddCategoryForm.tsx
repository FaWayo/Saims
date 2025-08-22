import { Button } from "@/components/button"
import { Input } from "@/components/input"
import { Plus, Trash2 } from "lucide-react"
import React, { useState } from "react"

interface Props {
  onClose: () => void
}
function AddCategoryForm({ onClose }: Props) {
  const [categories, setCategories] = useState([""])

  const addCategoryField = () => {
    setCategories([...categories, ""])
  }

  const removeCategoryField = (index: number) => {
    if (categories.length > 1) {
      setCategories(categories.filter((_, i) => i !== index))
    }
  }

  const updateCategory = (index: number, value: string) => {
    const updated = categories.map((cat, i) => (i === index ? value : cat))
    setCategories(updated)
  }

  const handleSubmit = () => {
    const validCategories = categories.filter((cat) => cat.trim() !== "")
    if (validCategories.length > 0) {
      //console.log("submit will be here to api")
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {categories.map((category, index) => (
          <div key={index} className="flex items-center gap-2">
            <Input
              type="text"
              value={category}
              onChange={(e) => updateCategory(index, e.target.value)}
              placeholder={`Category ${index + 1}`}
            />
            {categories.length > 1 && (
              <Button
                type="button"
                onClick={() => removeCategoryField(index)}
                variant={"destructive"}
                size={"icon"}
              >
                <Trash2 size={16} />
              </Button>
            )}
          </div>
        ))}
      </div>

      <Button type="button" onClick={addCategoryField} variant={"outline"}>
        <Plus size={16} />
        Add Another Category
      </Button>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button
          type="button"
          onClick={onClose}
          variant={"outline"}
          className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          Cancel
        </Button>
        <Button type="button" onClick={handleSubmit} variant={"primary"}>
          Add {categories.length > 1 ? "Categories" : "Category"}
        </Button>
      </div>
    </div>
  )
}

export default AddCategoryForm
