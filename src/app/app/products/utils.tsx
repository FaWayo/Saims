import z from "zod"

export const addProductSchema = z
  .object({
    image: z.file().nullable(),
    productName: z.string().min(1, "Product name is required"),
    description: z.string().optional(),
    category: z.string().min(1, "Product category is required"),
    baseUnit: z.string().min(1, "Base unit is required"),
    purchaseUnit: z.string().min(1, "Purchase unit is required"),
    purchaseCost: z.number().positive("Purchase cost must be positive"),
    purchaseInitialQuantity: z
      .number()
      .positive("Initial quantity must be positive"),
    itemsPerPurchaseUnit: z
      .number()
      .positive("Items per purchase unit must be positive"),
    sellingPrice: z.number().positive("Selling price is required"),
    isIndividualSaleIncluded: z.boolean(),
    sellingPriceSingleItem: z.number().positive().optional(),

    // costPerItem: z.number(),//this should be autocalculated.. purchase cost divided by the items per purchase unit
    // itemsPerSalesUnit: z.number(),  //by default this is the same as items per purchase unit
    // itemsPerSalesUnitSingleItem: z.number().default(1) //by default this is 1

    brand: z.string().optional(),
    model: z.string().optional(),
    trackInventory: z.boolean(),
    isActive: z.boolean(),
    isTaxable: z.boolean(),
    taxRate: z.number().min(0).max(1),
  })
  .refine(
    (data) => {
      if (data.isIndividualSaleIncluded) {
        return (
          data.sellingPriceSingleItem !== undefined &&
          data.sellingPriceSingleItem > 0
        )
      }
      return true
    },
    {
      message:
        "Single item selling price is required when individual sales are enabled",
      path: ["sellingPriceSingleItem"],
    })
