import { Upload } from "lucide-react"
import React from "react"

interface Props {
  title?: string
  value: File | null
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  maxSize?: number
  accept?: string
}

function FileUpload({ title, value, handleFileUpload, maxSize, accept }: Props) {

  function getAcceptTypes (){
    switch (accept){
      case 'image/*':
        return 'PNG, JPG'
      default:
        return 'PNG, JPG'
    }
  }
  return (
    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400 transition-colors">
      <div className="space-y-1 text-center">
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <div className="flex text-sm text-gray-600">
          <label
            htmlFor="logo-upload"
            className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
          >
            <span>{title ?? "Upload a file"}</span>
            <input
              id="logo-upload"
              name="logo-upload"
              type="file"
              className="sr-only"
              accept={`${accept ?? 'image/*'}`}
              onChange={handleFileUpload}
            />
          </label>
          <p className="pl-1">or drag and drop</p>
        </div>
        <p className="text-xs text-gray-500">{`${getAcceptTypes()} up to ${maxSize ?? '10'}MB`}</p>
        {value && (
          <p className="text-sm text-green-600 mt-2">✓ {value?.name}</p>
        )}
      </div>
    </div>
  )
}

export default FileUpload
