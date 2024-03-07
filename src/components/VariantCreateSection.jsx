import { PlusCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import { fetchAllAttributeTypes } from "../services/products";
import {
  GET_ALL_ATTRIBUTE_BY_TYPE_URL,
  GET_ALL_ATTRIBUTE_TYPES_URL,
} from "../utils/endpoints";
import axios from "../config/axios";
import { LINK_TYPE, NUMERIC_TYPE, STRING_TYPE } from "../utils/constant";

const VariantCreateSection = ({
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
  watch
}) => {
const [selectedAttributeValueType, setSelectedAttributeValueType] = useState(null);

const inputAsPerAttributeType = new Map([[LINK_TYPE, <input />],[STRING_TYPE, <input />], [NUMERIC_TYPE, <Dropdown/>]]);

  const fetchAllAttributeType = async () => {
    // Get All AttributeType
    try {
      const response = await axios.get(GET_ALL_ATTRIBUTE_TYPES_URL);
      // setAttributeTypes(response.data.data);
      setAttributeTypes(() =>
        response?.data?.data.map((item) => {
          return {
            ...item,
            label: item.typeName,
            value: item.typeId,
          };
        })
      );
      setAttributes([]);
    } catch (error) {
      console.info("error =>", error);
    }
  };

  const getAttributesAsPerAttributeType = async (typeId) => {
    // Get Attributes as per selected attributeType
    try {
      const response = await axios.get(
        `${GET_ALL_ATTRIBUTE_BY_TYPE_URL}/${typeId}`
      );
      console.info("response =>", response);

      setAttributes(() =>
        response?.data?.data.map((item) => {
          return {
            ...item,
            label: item.attributeName,
            value: item.attributeId,
          };
        })
      );
    } catch (error) {
      console.info("error =>", error);
    }
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
          <li key={item.id} className="border rounded p-3 my-3 relative">
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
            {/* attribute section start*/}

            <div className="flex gap-1 my-3">
              <label
                htmlFor="last-name"
                className="text-sm font-medium leading-6 text-gray-900 flex"
              >
                Attribute
              </label>
              <PlusCircleIcon
                className="h-6 w-6"
                onClick={() => {
                  appendAttributes({ attributeType:"", attributeName:"", test:""});
                  !attributeTypes.length && fetchAllAttributeType();
                }}
              />
            </div>
            <ul>
              {fieldsAttributes.map((item, attributeIndex) => (
                <li key={item.attributeId} className="border rounded p-3 my-3 relative">
                  <div className="grid grid-cols-4 gap-2">
                    <Dropdown
                      options={attributeTypes}
                      onChange={(selected) => { 
                        getAttributesAsPerAttributeType(selected.typeId)
                        setValue(`variants[${variantIndex}].attributes[${attributeIndex}].attributeType`, selected.typeName)
                    }}
                    />
                    <Dropdown
                      options={watch(`variants[${variantIndex}].attributes`)}
                      onChange={(selected) => {
                        setValue(`variants[${variantIndex}].attributes[${attributeIndex}].attributeName`, selected.attributeName)
                      }}
                    />
                    {inputAsPerAttributeType.get(selectedAttributeValueType?.attributeValueType)}
                  </div>
                </li>
              ))}
            </ul>
            {/* attribute section end*/}
            <button
              className="-translate-y-1/2 absolute right-0 translate-x-1/2 top-0"
              type="button"
              onClick={() => removeVariants(variantIndex)}
            >
              {/* <TrashIcon className="h-6 w-6 text-red-600" /> */}
              <XCircleIcon className="h-6 w-6 text-red-600" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default VariantCreateSection;
