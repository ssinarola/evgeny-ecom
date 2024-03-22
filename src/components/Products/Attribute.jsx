import { PlusCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import React, { useCallback, useEffect } from "react";
import { Controller, useFieldArray } from "react-hook-form";
import Dropdown from "../Dropdown";
import { GET_ALL_ATTRIBUTE_BY_TYPE_URL, GET_ALL_ATTRIBUTE_TYPES_URL } from "../../utils/endpoints";
import axios from "../../config/axios";
import { ENUM_TYPE, LINK_TYPE, NUMERIC_TYPE, STRING_TYPE } from "../../utils/constant";

export default function Attribute({setValue, variantIndex, control, register, errors, attributeTypes ,watch, setAttributeTypes}) {
  // Append fields for attributes
  const { fields: fieldsAttributes, append: appendAttributes, remove: removeAttributes} = useFieldArray({
    control,
    name: `variants[${variantIndex}].attributes`,
  });
  
  const inputAsPerAttributeType = useCallback(
    (variantIndex, attributeIndex) =>
      new Map([
        [
          LINK_TYPE,
          <Controller
            control={control}
            name={`variants[${variantIndex}].attributes[${attributeIndex}]`}
            render={({ field: { onChange, value } }) => (
              <input
                placeholder="Enter..."
                onChange={(event) => {
                  onChange({
                    attributeId: watch(`variants[${variantIndex}].selectedAttributeTypeAndValue[${attributeIndex}].value.attributeId`),
                    attributeValue: event.target.value,
                  });
                }}
                className="rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            )}
          />
        ],
        [
          STRING_TYPE,
          <Controller
          control={control}
          name={`variants[${variantIndex}].attributes[${attributeIndex}]`}
          render={({ field: { onChange, value } }) => (
            <input
              placeholder="Enter..."
              onChange={(event) => {
                onChange({
                  attributeId: watch(`variants[${variantIndex}].selectedAttributeTypeAndValue[${attributeIndex}].value.attributeId`),
                  attributeValue: event.target.value,
                });
              }}
              className="rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          )}
        />
        ],
        [
          NUMERIC_TYPE,
          <Controller
            control={control}
            name={`variants[${variantIndex}].attributes[${attributeIndex}]`}
            render={({ field: { onChange, value } }) => {
              return (
                <>
                  <input
                    className="rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    type="number"
                    placeholder="Enter..."
                    onChange={(e) => {                      
                      onChange({
                        attributeId: watch(
                          `variants[${variantIndex}].selectedAttributeTypeAndValue[${attributeIndex}].value.attributeId`
                        ),
                        attributeValue: e.target.value,
                      });
                    }}
                  />
                  <Dropdown
                    options={watch(
                      `variants[${variantIndex}].selectedAttributeTypeAndValue[${attributeIndex}].value.units`
                    ).map((unit) => {
                      return {
                        ...unit,
                        label: unit.unitName,
                        value: unit.unitId,
                      };
                    })}
                    onChange={(select) => {
                      // modify value and add formate as we need
                      onChange({
                        ...watch(`variants[${variantIndex}].attributes[${attributeIndex}]`),
                        attributeUnitId: select.unitId,
                      });
                    }}
                  />
                </>
              );
            }}
          />
        ],
        [
          ENUM_TYPE,
          <Controller
          control={control}
          name={`variants[${variantIndex}].attributes[${attributeIndex}]`}
          render={({ field: { onChange, value } }) => {
            return (
              <Dropdown
                isMulti={watch(`variants[${variantIndex}].selectedAttributeTypeAndValue[${attributeIndex}].value.multiValueSupported`)}
                options={watch(`variants[${variantIndex}].selectedAttributeTypeAndValue[${attributeIndex}].value.predefinedValues`).map((value) => {
                  return {
                    ...value,
                    label: value.value,
                    value: value.valueId,
                  };
                })}
                onChange={(selectedValue) => {                  
                  // modify value and add formate as we need
                  // onChangeHandlerForAttributeValue(variantIndex, attributeIndex)
                  onChange({
                    attributeId: watch(`variants[${variantIndex}].selectedAttributeTypeAndValue[${attributeIndex}].value.attributeId`),
                    attributeValueIds: watch(`variants[${variantIndex}].selectedAttributeTypeAndValue[${attributeIndex}].value.multiValueSupported`)
                      ? selectedValue.map((selectedVal) => selectedVal.valueId)
                      : [selectedValue.valueId],
                  });
                }}
              />
            );
          }}
        />
        ]
      ]),
    [watch({})]
  );

  const fetchAllAttributeType = async () => {
    try {
      // Get All AttributeType
      const response = await axios.get(GET_ALL_ATTRIBUTE_TYPES_URL);
      setAttributeTypes(() => response?.data?.data.map((item) => { return { ...item, label: item.typeName,value: item.typeId};}));
    } catch (error) {
      console.error("error =>", error);
    }
  };
  const getAttributesAsPerAttributeType = async (selectedAttributeType, variantIndex, attributeIndex) => {
    try {
        // Fetch Attributes as per selected attributeType
        const response = await axios.get(
          `${GET_ALL_ATTRIBUTE_BY_TYPE_URL}/${selectedAttributeType.typeId}`
        );
        // set selected attribute type in selectedAttributeTypeAndValue
        setValue(`variants[${variantIndex}].selectedAttributeTypeAndValue[${attributeIndex}].type`, selectedAttributeType);

        // set attribute type and value in attributesTypeAndValue for listing in attribute section
        setValue(`variants[${variantIndex}].attributesTypeAndValue[${attributeIndex}]`,
        { type: selectedAttributeType, vlaue: response?.data?.data.map((item) => {
          return {...item, label: item.attributeName, value: item.attributeId}
        })});        
      } catch (error) {console.info("error =>", error)}
    };

  return (
    <>
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
              // attributeType: "",
              // attributeName: "",
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
                name={`variants[${variantIndex}].selectedAttributeTypeAndValue[${attributeIndex}].value`}
                render={({ field: { onChange, value } }) => {
                  return (
                    <Dropdown
                      value={value}
                      options={watch(
                        `variants[${variantIndex}].attributesTypeAndValue[${attributeIndex}].vlaue`
                      )}
                      onChange={onChange}
                    />
                  );
                }}
              />
              {inputAsPerAttributeType(variantIndex, attributeIndex).get(
                watch(
                  `variants[${variantIndex}].selectedAttributeTypeAndValue[${attributeIndex}].value.attributeValueType`
                )
              )}
            </div>
            <button
              className="-translate-y-1/2 absolute right-0 translate-x-1/2 top-0"
              type="button"
              onClick={() => removeAttributes(attributeIndex)}
            >
              {/* <TrashIcon className="h-6 w-6 text-red-600" /> */}
              <XCircleIcon className="h-6 w-6 text-red-600 cursor-pointer" />
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
