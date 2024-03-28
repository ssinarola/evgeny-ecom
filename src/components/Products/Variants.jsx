import React from "react";
import { PlusCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import Attribute from "./Attribute";
import ErrorMessage from "../ErrorMessage";

const Variants = ({
  appendVariants,
  fieldsVariants,
  removeVariants,
  register,
  setAttributeTypes,
  attributeTypes,
  setValue,
  watch,
  control,
  errors,
  isEditProduct,
}) => {
  return (
    <div className="">
      <div className="flex gap-1">
        <label
          htmlFor="last-name"
          className="text-sm font-medium leading-6 text-gray-900 flex"
        >
          Variants
        </label>
        <PlusCircleIcon
          className="h-6 w-6 cursor-pointer"
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
      {/* Variants list */}
      <ul>
        {fieldsVariants.map((item, variantIndex) => (
          <li
            key={`${item.id}-${variantIndex}`}
            className="border rounded p-3 my-3 relative"
          >
            <p className="font-medium text-gray-900 bg-gray-100 mb-2 p-2 rounded-lg" style={{textAlign:"center"}}>
              Variant - {variantIndex + 1}
            </p>
            {/* Section start - Variants input fields */}
            <div className="grid grid-cols-3 gap-4">
            <div>
                <input
                    placeholder="Enter Variant Title"
                    {...register(`variants.${variantIndex}.title`)}
                    className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors?.variants && <ErrorMessage error={errors?.variants[variantIndex]?.title} message={errors?.variants[variantIndex]?.title?.message}/>}
              </div>
             <div>
                <input
                  placeholder="Enter Variant Description"
                  {...register(`variants.${variantIndex}.description`)}
                  className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors?.variants && <ErrorMessage error={errors?.variants[variantIndex]?.description} message={errors?.variants[variantIndex]?.description?.message}/>}
             </div>
             <div>
                <input
                  placeholder="Enter Variant GlobalPrice"
                  type="number"
                  step="0.01"
                  {...register(`variants.${variantIndex}.globalPrice`)}
                  className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors?.variants && <ErrorMessage error={errors?.variants[variantIndex]?.globalPrice} message={errors?.variants[variantIndex]?.globalPrice?.message}/>}
             </div>
             <div>
                <input
                  placeholder="Enter Variant domesticPrice"
                  type="number"
                  step="0.01"
                  {...register(`variants.${variantIndex}.domesticPrice`)}
                  className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors?.variants && <ErrorMessage error={errors?.variants[variantIndex]?.domesticPrice} message={errors?.variants[variantIndex]?.domesticPrice?.message}/>}
             </div>
             <div>
              <input
                placeholder="Enter Variant Quantity"
                type="number"
                {...register(`variants.${variantIndex}.quantity`)}
                className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors?.variants && <ErrorMessage error={errors?.variants[variantIndex]?.quantity} message={errors?.variants[variantIndex]?.quantity?.message}/>}
             </div>
             <div>
                <input
                  placeholder="Enter Variant SKU"
                  {...register(`variants.${variantIndex}.sku`)}
                  className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors?.variants && <ErrorMessage error={errors?.variants[variantIndex]?.sku} message={errors?.variants[variantIndex]?.sku?.message}/>}
             </div>
            </div>
            {/* Section end - Variants input field */}
            {/* Add attribute section start*/}
            <Attribute
              variantIndex={variantIndex}
              control={control}
              regissster={register}
              errors={errors}
              attributeTypes={attributeTypes}
              watch={watch}
              setAttributeTypes={setAttributeTypes}
              setValue={setValue}
              isEditProduct={isEditProduct}
            />
            {/* Add attribute section end*/}
            <button
              className="-translate-y-1/2 absolute right-0 translate-x-1/2 top-0"
              type="button"
              onClick={() => removeVariants(variantIndex)}
            >
              <XCircleIcon className="h-6 w-6 text-red-600 cursor-pointer" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Variants;
