import { PlusCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import Dropdown from "../Dropdown";
import { fetchAllAttributeTypes } from "../../services/products";
import {
  GET_ALL_ATTRIBUTE_BY_TYPE_URL,
  GET_ALL_ATTRIBUTE_TYPES_URL,
} from "../../utils/endpoints";
import axios from "../../config/axios";
import { LINK_TYPE, NUMERIC_TYPE, STRING_TYPE } from "../../utils/constant";
import { Controller } from "react-hook-form";

const Variants = ({
  appendVariants,
  fieldsVariants,
  appendAttributes,
  fieldsAttributes,
  removeVariants,
  register,
  setAttributeTypes,
  attributeTypes,
  setAttributes,
  attributes,
  setValue,
  watch,
  control,
}) => {
  const watchVariants = watch('variants');

  console.info("watch({}) =>", watch({}));

  const inputAsPerAttributeType = useCallback(
    (variantIndex, attributeIndex) =>
      new Map([
        [LINK_TYPE, <input
          placeholder="Enter..."
          className="rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />],
        [STRING_TYPE, <input
          placeholder="Enter..."
          className="rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />],
        [
          NUMERIC_TYPE,
          <Controller
            control={control}
            name={`variants[${variantIndex}].selectedAttributes[${attributeIndex}].units`}
            render={({ field: { onChange, value } }) => {
              console.info("value NUMERIC_TYPE =>", value);
              return (
                <Dropdown
                  options={watch(`variants[${variantIndex}].selectedAttributes[${attributeIndex}].units`)?.map((unit) => {
                    return { label: unit.unitName, value: unit.unitId };
                  })}
                  isMulti={watch(
                    `variants[${variantIndex}].selectedAttributes[${attributeIndex}].multiValueSupported`
                  )}
                  onChange={unit => {
                    console.info('unit =>',unit)
                    
                    onChange;
                    setValue(`variants[${variantIndex}].selectedAttributeUnit[${attributeIndex}]`, unit);
                }}
                />
              );
            }}
          />,
          // <Dropdown options={watch(`variants[${variantIndex}].selectedAttributes[${attributeIndex}].units`)?.map(unit => {return { label: unit.unitName,value: unit.unitId}})} isMulti={watch(`variants[${variantIndex}].selectedAttributes[${attributeIndex}].multiValueSupported`)} onChange={(item) => console.info('item =>',item)
          // }/>
        ],
      ]),
    [watch({})]
  );
  

  const fetchAllAttributeType = async () => {
    // Get All AttributeType
    try {
      const response = await axios.get(GET_ALL_ATTRIBUTE_TYPES_URL);
      setAttributeTypes(() =>
        response?.data?.data.map((item) => {
          return {
            ...item, label: item.typeName,value: item.typeId};
        })
      );
    } catch (error) {
      console.info("error =>", error);
    }
  };

  const getAttributesAsPerAttributeType = async (selectedAttributeType, variantIndex, attributeIndex) => {
      // Get Attributes as per selected attributeType
      try {
        const response = await axios.get(
          `${GET_ALL_ATTRIBUTE_BY_TYPE_URL}/${selectedAttributeType.typeId}`
        );
        // Set out attributeType and attribute as per attributeType
        setValue(`variants[${variantIndex}].attributeType[${attributeIndex}]`, selectedAttributeType);
        setValue(`variants[${variantIndex}].attributes[${attributeIndex}]`, response?.data?.data.map((item) => {
          return {...item, label: item.attributeName, value: item.attributeId}
        }));

        setValue(`variants[${variantIndex}].attributesTypeAndValue[${attributeIndex}]`,
        { type: selectedAttributeType, vlaue: response?.data?.data.map((item) => {
          return {label: item.attributeName, value: item.attributeId}
        })});        
      } catch (error) {console.info("error =>", error)}
    };

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
          <li key={`${item.id}-${variantIndex}`} className="border rounded p-3 my-3 relative">
            {/* Section - Variants input field start */}
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
            {/* Section - Variants input field end */}
            {/* Add attribute section start*/}
            <div className="flex gap-1 my-3">
              <label
                htmlFor="last-name"
                className="text-sm font-medium leading-6 text-gray-900 flex"
              >
                Attribute
              </label>
              <PlusCircleIcon
                className="h-6 w-6 cursor-pointer"
                onClick={() => {
                  appendAttributes({
                    attributeType: "",
                    attributeName: "",
                    test: "",
                  });
                  !attributeTypes.length && fetchAllAttributeType();
                }}
              />
            </div>
            <ul>
              {fieldsAttributes.map((item, attributeIndex) => (
                <li
                  key={item.attributeId}
                  className="border rounded p-3 my-3 relative"
                >
                  <div className="grid grid-cols-4 gap-2">
                    <Dropdown
                      options={attributeTypes}
                      onChange={(selected) => getAttributesAsPerAttributeType(selected, variantIndex, attributeIndex)}
                    />
                     <Controller
                        control={control}
                        name={`variants[${variantIndex}].attributes[${attributeIndex}]`}
                        render={({ field: { onChange, value } }) => {
                          return (
                            <Dropdown
                              options={value}
                              onChange={selected => {
                                onChange;
                                setValue(`variants[${variantIndex}].selectedAttributes[${attributeIndex}]`, selected);
                            }}
                          />
                          )
                        }}
                      />
                      
                    {inputAsPerAttributeType(variantIndex, attributeIndex).get(
                      watch(`variants[${variantIndex}].selectedAttributes[${attributeIndex}].attributeValueType`)
                    )}
                  </div>
                </li>
              ))}
            </ul>
            {/* Add attribute section end*/}
            <button
              className="-translate-y-1/2 absolute right-0 translate-x-1/2 top-0"
              type="button"
              onClick={() => removeVariants(variantIndex)}
            >
              {/* <TrashIcon className="h-6 w-6 text-red-600" /> */}
              <XCircleIcon className="h-6 w-6 text-red-600 cursor-pointer" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default memo(Variants);
