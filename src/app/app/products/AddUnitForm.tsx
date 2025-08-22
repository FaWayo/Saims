import { Button } from "@/components/button"
import { Input } from "@/components/input"
import { Plus, Trash2 } from "lucide-react"
import React, { useState } from "react"

interface Props {
  onClose: () => void
}

function AddUnitForm({ onClose }: Props) {
  const [units, setUnits] = useState([""])

  const addUnitField = () => {
    setUnits([...units, ""])
  }

  const removeUnitField = (index: number) => {
    if (units.length > 1) {
      setUnits(units.filter((_, i) => i !== index))
    }
  }

  const updateUnit = (index: number, value: string) => {
    const updated = units.map((unit, i) => (i === index ? value : unit))
    setUnits(updated)
  }

  const handleSubmit = () => {
    //console.log("we will add unit here")
  }

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {units.map((unit, index) => (
          <div key={index} className="flex items-center gap-2">
            <Input
              type="text"
              value={unit}
              onChange={(e) => updateUnit(index, e.target.value)}
              placeholder={`Unit ${index + 1} (e.g., kg, pieces, liters)`}
            />
            {units.length > 1 && (
              <Button
                type="button"
                onClick={() => removeUnitField(index)}
                variant={"destructive"}
                size={"icon"}
              >
                <Trash2 size={16} />
              </Button>
            )}
          </div>
        ))}
      </div>

      <Button type="button" onClick={addUnitField} variant={"outline"}>
        <Plus size={16} />
        Add Another Unit
      </Button>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          variant={"outline"}
        >
          Cancel
        </Button>
        <Button type="button" onClick={handleSubmit} variant={"primary"}>
          Add Units
        </Button>
      </div>
    </div>
  )
}

export default AddUnitForm
