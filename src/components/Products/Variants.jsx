import React from "react";
import { PlusCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

import Attribute from "./Attribute";

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
}) => {
  const watchVariants = watch("variants");
  console.info("watchVariants =>", watchVariants);

  return (
    <div className="">
      <div className="flex gap-1">
        <label
          htmlFor="last-name"
          className="block text-sm font-medium leading-6 text-gray-900 flex"
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
            <p className="font-medium  text-gray-900">
              Variant - {variantIndex + 1}
            </p>
            {/* Section start - Variants input fields */}
            <div className="grid grid-cols-3">
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
            </div>
            {/* Section end - Variants input field */}
            {/* Add attribute section start*/}
            <Attribute
              variantIndex={variantIndex}
              control={control}
              register={register}
              errors={errors}
              attributeTypes={attributeTypes}
              watch={watch}
              setAttributeTypes={setAttributeTypes}
              setValue={setValue}
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
