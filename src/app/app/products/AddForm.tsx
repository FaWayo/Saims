import React from "react"
import { useForm } from "react-hook-form"
import { addProductSchema } from "./utils"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/form"
import FileUpload from "@/components/file-upload"
import { Input } from "@/components/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select"
import { Info, Package, ShoppingCart, DollarSign, Layers } from "lucide-react"
import { Checkbox } from "@/components/checkbox"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/card"
import { Button } from "@/components/button"

interface Props {
  handleClose: () => void
  setAddCategory: React.Dispatch<React.SetStateAction<boolean>>
  setAddUnit: React.Dispatch<React.SetStateAction<boolean>>
}

function AddForm({ handleClose, setAddCategory, setAddUnit }: Props) {
  const categories: { id: string; name: string }[] = []

  const units: { id: string; name: string }[] = []

  const form = useForm<z.infer<typeof addProductSchema>>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      image: null,
      productName: "",
      description: undefined,
      category: "",
      purchaseUnit: "",
      purchaseCost: 0,
      purchaseInitialQuantity: 0,
      itemsPerPurchaseUnit: 0,
      sellingPrice: 0,
      sellingPriceSingleItem: undefined,
      brand: undefined,
      model: undefined,
    },
    mode: "onChange",
  })

  const watchIsIndividualSale = form.watch("isIndividualSaleIncluded")
  const watchPurchaseCost = form.watch("purchaseCost")
  const watchItemsPerPurchase = form.watch("itemsPerPurchaseUnit")

  const costPerItem =
    watchItemsPerPurchase > 0
      ? (watchPurchaseCost / watchItemsPerPurchase).toFixed(2)
      : "0.00"

  const onSubmit = async (data: z.infer<typeof addProductSchema>) => {
    // console.log("Form data:", data)
  }

  return (
    <div className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Basic Information
              </CardTitle>
              <CardDescription>
                General product details and identification
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Image</FormLabel>
                    <FormControl>
                      <FileUpload
                        value={field.value}
                        handleFileUpload={field.onChange}
                        accept="image/*"
                      />
                    </FormControl>
                    <FormDescription>
                      <Info className="h-3 w-3" />
                      Upload a clear image of your product (optional)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="productName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Product Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Coca-Cola 330ml" {...field} />
                      </FormControl>
                      <FormDescription>
                        <Info className="h-3 w-3" />
                        Be specific with size/variant if applicable
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel required>Category</FormLabel>
                        <Button
                          variant={"link"}
                          size={"sm"}
                          className="text-[10px] font-bold md:text-[12px]"
                          type="button"
                          onClick={() => setAddCategory(() => true)}
                        >
                          Add Category
                        </Button>
                      </div>

                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            {categories.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        <Info className="h-3 w-3" />
                        Product category for organization
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Brief description of the product (optional)"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="brand"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Brand</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Coca-Cola, Samsung"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="model"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Model</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Model number/name (if applicable)"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div> */}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Purchase Information
              </CardTitle>
              <CardDescription>
                How you buy this product from suppliers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="purchaseUnit"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel required>Purchase Unit</FormLabel>
                        <Button
                          variant={"link"}
                          size={"sm"}
                          className="text-[10px] font-bold md:text-[12px]"
                          type="button"
                          onClick={() => setAddUnit(() => true)}
                        >
                          Add Unit
                        </Button>
                      </div>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="How do you buy this?" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            {units.map((unit) => (
                              <SelectItem key={unit.id} value={unit.id}>
                                {unit.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        <Info className="h-3 w-3" />
                        <span>
                          How you buy from suppliers (box, case, individual,
                          etc.)
                        </span>
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="itemsPerPurchaseUnit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Items per Purchase Unit</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., 24 bottles per case"
                          {...field}
                          type="number"
                          min="1"
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        <Info className="h-3 w-3" />
                        <span>
                          How many individual items in one purchase unit?
                        </span>
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="purchaseCost"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Purchase Cost</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Cost per purchase unit"
                          type="number"
                          step="0.01"
                          min="0"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormDescription className="flex items-center gap-1">
                        <Info className="h-3 w-3" />
                        <span>What you pay for one purchase unit</span>
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="purchaseInitialQuantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="required">
                        Initial Stock Quantity
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Starting inventory count"
                          type="number"
                          min="0"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormDescription className="flex items-center gap-1">
                        <Info className="h-3 w-3" />
                        <span>
                          How many purchase item units do you have in stock?
                        </span>
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {watchItemsPerPurchase > 0 && watchPurchaseCost > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-blue-700">
                    <DollarSign className="h-4 w-4" />
                    <span className="font-medium">
                      Cost per individual item: ${costPerItem}
                    </span>
                  </div>
                  <p className="text-sm text-blue-600 mt-1">
                    This is automatically calculated: ${watchPurchaseCost} ÷{" "}
                    {watchItemsPerPurchase} items
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="h-5 w-5" />
                Sales Information
              </CardTitle>
              <CardDescription>
                How you sell this product to customers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="sellingPrice"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel required>Selling Price (Full Unit)</FormLabel>
                      <Button
                        variant={"link"}
                        size={"sm"}
                        className="text-[10px] font-bold md:text-[12px]"
                      >
                        Add Unit
                      </Button>
                    </div>
                    <FormControl>
                      <Input
                        placeholder="Price for entire purchase unit"
                        type="number"
                        step="0.01"
                        min="0"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormDescription className="flex items-center gap-1">
                      <Info className="h-3 w-3" />
                      <span>
                        Price when selling the complete purchase unit (e.g.,
                        whole case)
                      </span>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isIndividualSaleIncluded"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="h-5 w-5"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-base font-medium">
                          Also sell individual items?
                        </FormLabel>
                        <FormDescription className="flex items-center gap-1">
                          <Info className="h-3 w-3" />
                          <span>
                            Enable selling single items from the purchase unit
                          </span>
                        </FormDescription>
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {watchIsIndividualSale && (
                <div className="ml-8 border-l-2 border-blue-200 pl-6 space-y-4">
                  <FormField
                    control={form.control}
                    name="sellingPriceSingleItem"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel required>
                          Price per Individual Item
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Price for single item"
                            type="number"
                            step="0.01"
                            min="0"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormDescription className="flex items-center gap-1">
                          <Info className="h-3 w-3" />
                          <span>
                            Price when customer buys just one individual item
                          </span>
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-medium text-green-800 mb-2">
                      What this means:
                    </h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Customers can buy the entire purchase unit</li>
                      <li>• Customers can also buy individual items</li>
                      <li>
                        • You&apos;ll have two products in your system for the same
                        inventory
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-4">
            <Button variant={"outline"} type="button" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" variant={"primary"}>
              Add Product
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default AddForm
