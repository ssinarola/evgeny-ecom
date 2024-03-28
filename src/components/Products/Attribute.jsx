import { PlusCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import React, { useCallback, useEffect } from "react";
import { Controller, useFieldArray } from "react-hook-form";
import Dropdown from "../Dropdown";
import {
  GET_ALL_ATTRIBUTE_BY_TYPE_URL,
  GET_ALL_ATTRIBUTE_TYPES_URL,
} from "../../utils/endpoints";
import axios from "../../config/axios";
import { ENUM_TYPE, LINK_TYPE, NUMERIC_TYPE, STRING_TYPE } from "../../utils/constant";
import ErrorMessage from "../ErrorMessage";

export default function Attribute({setValue, variantIndex, control, errors, attributeTypes ,watch, setAttributeTypes, isEditProduct}) {  
  // Append fields for attributes
  const { fields: fieldsAttributes, append: appendAttributes, remove: removeAttributes} = useFieldArray({
    control,
    name: `variants[${variantIndex}].attributes`,
  });

  useEffect(() => {
    !attributeTypes.length && fetchAllAttributeType();
  },[attributeTypes]);

  const inputAsPerAttributeType = useCallback((variantIndex, attributeIndex, item) =>{
    return new Map([
        [
          LINK_TYPE,
          <Controller
            control={control}
            name={`variants[${variantIndex}].attributes[${attributeIndex}].attributeValue`}
            render={({ field: { onChange, value } }) => {                            
                return <div>
                <input
                placeholder="Enter..."
                defaultValue={value}
                onChange={(event) => onChange(event.target.value)}
                className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {!value && <ErrorMessage error={!value} message={"Attribute Value is required"} /> }
              {/* {errors?.variants && <ErrorMessage error={errors?.variants[variantIndex]?.attributes[attributeIndex]?.attributeValue} message={errors?.variants[variantIndex]?.attributes[attributeIndex]?.attributeValue?.message} /> } */}
            </div>}
            }
          />
        ],
        [
          STRING_TYPE,
          <Controller
          rules={{ required: true }}
          control={control}
          name={`variants[${variantIndex}].attributes[${attributeIndex}].attributeValue`}
          render={({ field: { onChange, value } }) => (
            <div>
              <input
                placeholder="Enter..."
                defaultValue={value}
                onChange={(event) => onChange(event.target.value)}
                className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {!value && <ErrorMessage error={!value} message={"Attribute Value is required"} /> }
              {/* {errors?.variants && <ErrorMessage error={errors?.variants[variantIndex]?.attributes[attributeIndex]?.attributeValue} message={errors?.variants[variantIndex]?.attributes[attributeIndex]?.attributeValue?.message} /> } */}
            </div>
          )}
        />
        ],
        [
          NUMERIC_TYPE,
          <>
           <Controller
            rules={{ required: true }}
            control={control}
            name={`variants[${variantIndex}].attributes[${attributeIndex}].attributeValue`}
            render={({ field: { onChange, value, name} }) => {
              return (
                <div>
                  <input
                    name={name}
                    value={value}
                    className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    type="number"
                    placeholder="Enter..."
                    onChange={onChange}
                  />
                  {/* {errors?.variants && <ErrorMessage error={errors?.variants[variantIndex]?.attributes[attributeIndex]?.attributeValue} message={errors?.variants[variantIndex]?.attributes[attributeIndex]?.attributeValue?.message} /> } */}
                  {!value && <ErrorMessage error={!value} message={"Attribute Value is required"} /> }
                </div>
              );
            }}
          />
           <Controller
            rules={{ required: true }}
            control={control}
            name={`variants[${variantIndex}].attributes[${attributeIndex}].attributeUnit`}
            render={({ field: { onChange, value } }) => {                                                                      
              return (
                <div>
                  <Dropdown
                    onMenuOpen={isEditProduct && !watch(`variants[${variantIndex}].attributes[${attributeIndex}].units`) ? async () => {                            
                        const response = await axios.get(`${GET_ALL_ATTRIBUTE_BY_TYPE_URL}/${item?.attributeType?.typeId}`);                       
                        const attributeObject  = response?.data?.data
                        .filter((attribute) => attribute.attributeId === item?.attributeId)
                        .map((item) => {
                          return {
                            ...item,
                            label: item.attributeUnitName,
                            value: item.attributeUnitId,
                          };
                        });                        

                        setValue(
                          `variants[${variantIndex}].attributes[${attributeIndex}]`,
                         { 
                          ...watch(
                            `variants[${variantIndex}].attributes[${attributeIndex}]`
                          ),
                          ...attributeObject[0]
                        }
                        );
                    } : () =>{}}
                    placeholder="Select Attribute Unit"
                    defaultValue={value ? { label: value?.attributeUnitName, value: value?.attributeUnitId,}: "Select Attribute Unit"}
                    options={watch(
                      `variants[${variantIndex}].attributes[${attributeIndex}].units`
                    )?.map((unit) => {
                      return {
                        ...unit,
                        label: unit.attributeUnitName,
                        value: unit.attributeUnitId,
                      };
                    })}
                    onChange={onChange}
                  />
                  {!value && <ErrorMessage error={!value} message={"Attribute unit is required"} /> }
                </div>
                );
              }}
            />
          </>,
        ],
        [
          ENUM_TYPE,
          <Controller
            rules={{ required: true }}
            control={control}
            name={`variants[${variantIndex}].attributes[${attributeIndex}].attributeValues`}
            render={({ field: { onChange, value } }) => {
              const defaultValue =  watch(`variants[${variantIndex}].attributes[${attributeIndex}].multiValueSupported`) ?value?.map(item => {
                return {
                ...item,
                label: item.attributeValue,
                value: item.attributeValueId,
              }})   :    { label: item.attributeValue,
                value: item.attributeValueId}      
              return (
                <div>
                <Dropdown
                  isMulti={watch(`variants[${variantIndex}].attributes[${attributeIndex}].multiValueSupported`)}
                  onMenuOpen={isEditProduct && !watch(`variants[${variantIndex}].attributes[${attributeIndex}].predefinedValues`)
                      ? async () => {
                          const response = await axios.get(
                            `${GET_ALL_ATTRIBUTE_BY_TYPE_URL}/${item?.attributeType?.typeId}`
                          );
                          const attributeObject = response?.data?.data
                            .filter(
                              (attribute) => attribute.attributeId === item?.attributeId)
                            .map((item) => {
                              return {
                                ...item,
                                label: item.attributeValue,
                                value: item.attributeValueId,
                              };
                            });
                          setValue(
                            `variants[${variantIndex}].attributes[${attributeIndex}]`,
                            {
                              ...watch(
                                `variants[${variantIndex}].attributes[${attributeIndex}]`
                              ),
                              ...attributeObject[0],
                            }
                          );
                        }
                      : () => {}
                  }
                  options={watch(
                    `variants[${variantIndex}].attributes[${attributeIndex}].predefinedValues`
                  )?.map((value) => {
                    return {
                      ...value,
                      label: value.attributeValue,
                      value: value.attributeValueId,
                    };
                  })}
                  defaultValue={value ? defaultValue: "Select Attribute Values"}
                  placeholder="Select Attribute Values"
                  onChange={(selectedValue) => {
                    // modify value and add format as we need
                    onChange(
                      watch(
                        `variants[${variantIndex}].attributes[${attributeIndex}].multiValueSupported`
                      )
                        ? selectedValue
                        : [selectedValue]
                    );
                  }}
                />
                {!value && <ErrorMessage error={!value} message={"Attribute value is required"} /> }
                </div>
              );
            }}
          />,
        ],
      ])},
    [watch({}), isEditProduct, errors]
  );
  
  const fetchAllAttributeType = async () => {
    try {
      // Get All AttributeType
      const response = await axios.get(GET_ALL_ATTRIBUTE_TYPES_URL);
      setAttributeTypes(() => response?.data?.data.map((item) => {
          return { ...item, label: item.typeName, value: item.typeId };
        })
      );
    } catch (error) {
      console.error("error =>", error);
    }
  };
  const getAttributesAsPerAttributeType = async (selectedAttributeType, variantIndex, attributeIndex) => {
    try {      
        // Fetch Attributes as per selected attributeType
        const response = await axios.get(`${GET_ALL_ATTRIBUTE_BY_TYPE_URL}/${selectedAttributeType.typeId}`);
        
        setValue(`variants[${variantIndex}].attributes[${attributeIndex}].attributeValuesAsPerType`, 
          response?.data?.data.map((item) => {
            return {
              ...item,
              label: item.attributeName,
              value: item.attributeId,
            };
          }),
        );
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
            appendAttributes({});
            !attributeTypes.length && fetchAllAttributeType();
          }}
        />
      </div>
      <ul>
        {fieldsAttributes.map((item, attributeIndex) => (
          <li
            key={`${item.attributeId}-${attributeIndex}`}
            className="border rounded p-3 my-3 relative"
          >
            <div className="grid grid-cols-4 gap-2">
               <Controller
                disabled={isEditProduct && !!fieldsAttributes[attributeIndex].productAttributeId}
                control={control}
                name={`variants[${variantIndex}].attributes[${attributeIndex}].attributeType`}
                render={({ field: { onChange, value, disabled}}) => {                                                                                                                                                                                                          
                  return (
                  <div>
                    <Dropdown
                      isDisabled={disabled}
                      placeholder="Select Attribute Type"
                      options={attributeTypes}
                      defaultValue={value ? {label: value?.typeName, value: value?.typeId} : "Select Attribute Type" }
                      onChange={(selected) => {
                        onChange(selected);
                        getAttributesAsPerAttributeType(
                          selected,
                          variantIndex,
                          attributeIndex,
                        )}}
                    />
                     {!value && <ErrorMessage error={!value} message={"Attribute type is required"} /> }
                    </div>                   
                  );
                }}
              />
              <Controller
                rules={{ required: true }}
                disabled={isEditProduct && !!fieldsAttributes[attributeIndex].productAttributeId}
                control={control}
                name={`variants[${variantIndex}].attributes[${attributeIndex}].attributeName`}
                render={({ field: { onChange, value, disabled } }) => {                  
                  return (
                    <div>
                    <Dropdown
                      isDisabled={disabled}
                      placeholder="Select Attribute"
                      defaultValue={value ? { label: value, value: value } : "Select Attribute"}
                      options={watch(
                        `variants[${variantIndex}].attributes[${attributeIndex}].attributeValuesAsPerType`
                      )}
                      onChange={(selectedItem) => {                        
                        setValue(`variants[${variantIndex}].attributes[${attributeIndex}].attributeId`, selectedItem.attributeId);
                        setValue(`variants[${variantIndex}].attributes[${attributeIndex}].attributeValueType`,
                          selectedItem.attributeValueType
                        );
                        onChange(selectedItem.attributeName);
                        setValue(
                          `variants[${variantIndex}].attributes[${attributeIndex}]`,
                          {
                            ...watch(
                              `variants[${variantIndex}].attributes[${attributeIndex}]`
                            ),
                            ...selectedItem,
                          }
                        );
                      }}
                    />
                     {!value && <ErrorMessage error={!value} message={"Attribute is required"} /> }
                     {/* {errors?.variants && <ErrorMessage error={errors.variants[variantIndex]?.attributes[attributeIndex]?.attributeName} message={errors.variants[variantIndex]?.attributes[attributeIndex]?.attributeName?.message} /> } */}
                    </div>
                  );
                }}
              />
              {inputAsPerAttributeType(variantIndex, attributeIndex, item).get(
                watch(`variants[${variantIndex}].attributes[${attributeIndex}].attributeValueType`))}
            </div>
            <button
              className="-translate-y-1/2 absolute right-0 translate-x-1/2 top-0"
              type="button"
              onClick={() => removeAttributes(attributeIndex)}
            >
              <XCircleIcon className="h-6 w-6 text-red-600 cursor-pointer" />
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
