import { ApiResponse } from "@/app/auth/signup/types"
import { Alert, AlertDescription } from "@/components/alert"
import { Button } from "@/components/button"
import { Input } from "@/components/input"
import { postRequest } from "@/lib/auth"
import { Plus, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import { toast } from "sonner"

interface Props {
  onClose: () => void
  onSubmit: () => void
}

function AddUnitForm({ onClose, onSubmit }: Props) {
  const [units, setUnits] = useState([""])
  const router = useRouter()
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      console.log("we will add unit here", units)
      const response = await postRequest('/api/products/units/add', units)
      console.log(response, 'from adding a unit')

      const data: ApiResponse = await response.json()
      if (!data.success) {
        throw new Error(
          data.error?.message || "Failed to add unit. Please try again"
        )
      }

      const msg = data.data as { id: string; name: string }[]

      toast(`${msg.join(", ")} units added`, {
        //style: {},
        className: "toaster group",
        description: "",
      })

      onSubmit
    } catch (error) {
      console.error("Add unit error:", error)
      setError(error instanceof Error ? error.message : "An unexpected error occurred")
    } finally {
      setIsSubmitting(false)
    }

  }

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant={"destructive"}>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
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
        <Button type="button" onClick={handleSubmit} variant={"primary"} disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add Units"}
        </Button>
      </div>
    </div>
  )
}

export default AddUnitForm
