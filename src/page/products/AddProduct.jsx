import { PlusCircleIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useFieldArray, useForm } from "react-hook-form";
import { PRODUCT_TYPE } from "../../utils/constant";
// import { addProducts } from "../../store/slice/productSlice";

export default function AddProduct() {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();

  // Append fields for tags
  const { fields: fieldsProductTags, append: appendProductTags, remove: removeProductTags} = useFieldArray({
    control,
    name: "productTags",
  });

  // Append fields for variants
  const { fields: fieldsVariants, append: appendVariants,remove: removeVariants} = useFieldArray({
    control,
    name: "variants",
  });

  const onSubmit = (data) => {
    console.info("onSubmit data =>", data);
    // API call for product creation
    // dispatch(addProducts(data));
  };

  return (
    <div className="bg-white mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:max-w-7xl lg:px-8">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">
        Add Product
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 gap-x-6 gap-y-8 grid grid-cols-3 gap-4">
              <div className="">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Category
                </label>
                <div className="mt-2">
                  <select
                    {...register("category")}
                    id="category"
                    name="category"
                    autoComplete="category-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option>Category 1</option>
                    <option>Category 2</option>
                    <option>Category 3</option>
                  </select>
                </div>
              </div>

              <div className="">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Manufacture
                </label>
                <div className="mt-2">
                  <input
                    {...register("manufacture", { required: true })}
                    type="text"
                    name="manufacture"
                    id="manufacture"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.manufacture && (
                    <span className="text-red-600">Manufacture is Required</span>
                  )}
                </div>
              </div>

              <div className="">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Year of manufacuring
                </label>
                <div className="mt-2">
                  <input
                    {...register("productionYear", { required: true })}
                    type="number"
                    name="productionYear"
                    id="productionYear"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.productionYear && (
                    <span className="text-red-600">Production year is Required</span>
                  )}
                </div>
              </div>

              <div className="">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Shipping time in Days
                </label>
                <div className="mt-2">
                  <input
                    {...register("shipmentTimeInDays", { required: true })}
                    type="number"
                    name="shipmentTimeInDays"
                    id="shipmentTimeInDays"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.shipmentTimeInDays && (
                    <span className="text-red-600">Shipment time is Required</span>
                  )}
                </div>
              </div>

              <div className="">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Processing time in Days
                </label>
                <div className="mt-2">
                  <input
                    {...register("processingTimeInDays", { required: true })}
                    type="number"
                    name="processingTimeInDays"
                    id="processingTimeInDays"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.processingTimeInDays && (
                    <span className="text-red-600">Processing time is Required</span>
                  )}
                </div>
              </div>

              <div className="">
                <label
                  htmlFor="shippingPrice"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Shipping price
                </label>
                <div className="mt-2">
                  <input
                    {...register("shippingPrice", { required: true })}
                    type="number"
                    name="shippingPrice"
                    id="shippingPrice"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.shippingPrice && (
                    <span className="text-red-600">Shipping price is Required</span>
                  )}
                </div>
              </div>

              <div className="">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product Type
                </label>
                <div className="mt-2">
                  {PRODUCT_TYPE.map((type) => (
                    <div className="flex items-center gap-x-3" key={type.value}>
                      <input
                        {...register("type", { required: true })}
                        id={type.value}
                        name="type"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        for={type.value}
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        {type.label}
                      </label>
                    </div>
                  ))}
                  {errors.type && (
                    <span className="text-red-600">Type is Required</span>
                  )}
                </div>
              </div>
              <div className=" flex gap-5 items-center">
                <label
                  htmlFor="Customizable"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Customizable
                </label>
                <input
                  {...register("customizable", { required: true })}
                  id="customizable"
                  name="customizable"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
              </div>

              {watch("customizable") && (
                <div className="">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Personalized message for buyer
                  </label>
                  <div className="mt-2">
                    <input
                      {...register("customizableComment", { required: true })}
                      type="text"
                      name="customizableComment"
                      id="customizableComment"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.customizableComment && (
                      <span className="text-red-600">Customizable Comment is Required</span>
                    )}
                  </div>
                </div>
              )}
          
            </div>
            
            {/* Tags and variant section */}
            <div className="my-4">
                <div className="flex gap-1">
                  <label
                    htmlFor="last-name"
                    className=" text-sm font-medium leading-6 text-gray-900 flex"
                  >
                    Tags
                  </label>
                  <PlusCircleIcon
                    className="h-6 w-6"
                    onClick={() => appendProductTags(" ")}
                  />
                </div>
                <ul className="grid grid-cols-5 gap-x-0">
                  {fieldsProductTags.map((item, index) => (
                    <li key={item.id}>
                      <input
                        {...register(`productTags[${index}]`)}
                        className="m-1 w-25 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      <button
                        type="button"
                        onClick={() => removeProductTags(index)}
                      >
                        <TrashIcon className="h-5 w-6 text-red-600" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="">
                <div className="flex gap-1">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium leading-6 text-gray-900 flex"
                  >
                    Variants
                  </label>
                  <PlusCircleIcon
                    className="h-6 w-6"
                    onClick={() =>
                      appendVariants({
                        title: "",
                        description: "",
                        globalPrice: "",
                        domesticPrice: "",
                        quantity: "",
                        sku: "",
                        attributes: [],
                      })
                    }
                  />
                </div>
                <ul>
                  {fieldsVariants.map((item, variantIndex) => (
                    <li key={item.id}>
                      <input
                        placeholder="Enter Variant Title"
                        {...register(`variants.${variantIndex}.title`)}
                        className="m-1 w-25 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      <input
                        placeholder="Enter Variant Description"
                        {...register(`variants.${variantIndex}.description`)}
                        className="m-1 w-25 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      <input
                        placeholder="Enter Variant GlobalPrice"
                        type="number"
                        {...register(`variants.${variantIndex}.globalPrice`)}
                        className="m-1 w-25 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      <input
                        placeholder="Enter Variant domesticPrice"
                        type="number"
                        {...register(`variants.${variantIndex}.domesticPrice`)}
                        className="m-1 w-25 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      <input
                        placeholder="Enter Variant Quantity"
                        type="number"
                        {...register(`variants.${variantIndex}.quantity`)}
                        className="m-1 w-25 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      <input
                        placeholder="Enter Variant SKU"
                        {...register(`variants.${variantIndex}.sku`)}
                        className="m-1 w-25 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      <button
                        type="button"
                        onClick={() => removeVariants(variantIndex)}
                      >
                        <TrashIcon className="h-5 w-6 text-red-600" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="reset"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
