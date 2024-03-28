import { PlusCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ENUM_TYPE, NUMERIC_TYPE, PROCESSING, PRODUCT_CATEGORY, PRODUCT_TYPE, SAVE, requiredKeyForCreateProduct} from "../../utils/constant";
import ErrorMessage from "../../components/ErrorMessage";
import { useEffect, useMemo, useState } from "react";
import { getProductById } from "../../services/products";
import Variants from "../../components/Products/Variants";
import { addProducts, updateProduct } from "../../store/slice/productSlice";
import { useDispatch } from "react-redux";
import { useProducts } from "../../store/selectorHooks";
import LoadingIcon from "../../assets/LoadingIcon";
import Dropdown from "../../components/Dropdown";
import { productValidationSchema } from "../../components/Products/validation";

export default function AddProduct() {
  const { pathname } = useLocation();
  const { productId } = useParams();
  const [selectedProductDetail, setSelectedProductDetail] = useState({});
  const [attributeTypes, setAttributeTypes] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { createAndUpdateProduct : { isLoading, isError }} = useProducts();

  const isEditProduct = useMemo(() => !!(productId && pathname.includes("edit-product")) ,[pathname, productId]);
  
  const { register, handleSubmit, watch, control, formState: { dirtyFields, errors }, setValue, reset} = useForm({
    resolver: yupResolver(productValidationSchema) 
  });

  useEffect(() => {
    reset(selectedProductDetail);
  },[selectedProductDetail]);
  
  const fetchProductById = async () => {    
    const productDetail = await getProductById({ productId });    
    setSelectedProductDetail(productDetail?.data);
  };  
  useEffect(() => {
    if(isEditProduct){
      // API call to Get product detail by ID and set form value with product detail
      fetchProductById();
    } else {
      setSelectedProductDetail({})
    }
  },[isEditProduct, productId]);

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

  const resetForm = () => {
    reset(); removeProductTags(); removeVariants()
  }

const createProductPayload = (data) =>{
  const payload = { ...data }; // Start with a copy of the original data

  // Process variants:
  payload.variants = data.variants.map((variant) => {
    const variantPayload = { ...variant }; // Copy variant object

    // Process attributes:
    variantPayload.attributes = variant.attributes.map((attribute) => {
      const attributePayload = {};

      attributePayload.attributeId = attribute.attributeId;

      if (attribute.attributeValueType === "NUMERIC") {
        attributePayload.attributeValue = attribute.attributeValue;
        attributePayload.attributeUnitId = attribute.attributeUnit.attributeUnitId;
      } else if (attribute.attributeValueType === "ENUM") {
        attributePayload.attributeValuesIds = attribute.attributeValues.map(
          (value) => value.attributeValueId
        );
      } else {
        // Handle other attributeValueTypes (LINK, etc.) if needed
        attributePayload.attributeValue = attribute.attributeValue;
      }

      return attributePayload;
    });

    return variantPayload;
  });

  return payload;
}

  const onSubmit = async (data) => {
    console.info('data submit =>', data)
    const productObject = createProductPayload(data)

    if(isEditProduct){
      // console.info('filterData =>',filterData(productObject))

      // console.info('updatedObject =>', updatedObject)
      // dispatch(updateProduct({productId, body: updatedObject}));  

      // navigate("/")
      return;
    }else{
      // API call for product creation
      dispatch(addProducts({body: {...requiredKeyForCreateProduct, ...productObject}, resetForm}));
    }
  };

  return (
    <div className="bg-white mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:max-w-7xl lg:px-8">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">
        {isEditProduct ? "Update" : "Add"} Product
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 gap-x-6 gap-y-8 grid grid-cols-3 gap-4">
              <div className="">
                <label
                  htmlFor="first-name"
                  className="text-sm font-medium leading-6 text-gray-900"
                >
                  Category
                </label>
                <div className="mt-2">
                  <Controller
                    // rules={{ required: true }}
                    control={control}
                    name={`categoryId`}
                    render={({ field: { onChange, value } }) => {
                      return (
                        <Dropdown
                          placeholder="Select Category"
                          options={PRODUCT_CATEGORY}
                          defaultValue={{ label:1, value: 1 }}
                          onChange={(selectedItem) => onChange(selectedItem.value)}
                        />
                      );
                    }}
                  />
                  <ErrorMessage error={errors?.categoryId} message={errors?.categoryId?.message} />
                </div>
              </div>
              <div className="">
                <label
                  htmlFor="last-name"
                  className="text-sm font-medium leading-6 text-gray-900"
                >
                  Manufacture
                </label>
                <div className="mt-2">
                  <input
                    {...register("maker")}
                    type="text"
                    name="maker"
                    id="maker"
                    className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <ErrorMessage error={errors?.maker} message={errors?.maker?.message}/>
                </div>
              </div>

              <div className="">
                <label
                  htmlFor="first-name"
                  className="text-sm font-medium leading-6 text-gray-900"
                >
                  Year of manufacuring
                </label>
                <div className="mt-2">
                  <input
                    {...register("productionYear")}
                    type="number"
                    name="productionYear"
                    id="productionYear"
                    className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <ErrorMessage error={errors?.productionYear} message={errors?.productionYear?.message}/>
                </div>
              </div>

              <div className="">
                <label
                  htmlFor="first-name"
                  className="text-sm font-medium leading-6 text-gray-900"
                >
                  Shipping time in Days
                </label>
                <div className="mt-2">
                  <input
                    {...register("shipmentTimeInDays")}
                    placeholder="Enter value in this format '0-1'"
                    type="text"
                    name="shipmentTimeInDays"
                    id="shipmentTimeInDays"
                    className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <ErrorMessage
                    error={errors?.shipmentTimeInDays} message={errors?.shipmentTimeInDays?.message}
                  />
                </div>
              </div>

              <div className="">
                <label
                  htmlFor="last-name"
                  className="text-sm font-medium leading-6 text-gray-900"
                >
                  Processing time in Days
                </label>
                <div className="mt-2">
                  <input
                    placeholder="Enter value in this format '0-1'"
                    {...register("processingTimeInDays")}
                    type="text"
                    name="processingTimeInDays"
                    id="processingTimeInDays"
                    className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <ErrorMessage
                    error={errors?.processingTimeInDays} message={errors?.processingTimeInDays?.message}
                  />
                </div>
              </div>

              <div className="">
                <label
                  htmlFor="shippingPrice"
                  className="text-sm font-medium leading-6 text-gray-900"
                >
                  Shipping price
                </label>
                <div className="mt-2">
                  <input
                    {...register("shippingPrice")}
                    step="0.01"
                    type="number"
                    name="shippingPrice"
                    id="shippingPrice"
                    className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <ErrorMessage error={errors?.shippingPrice} message={errors?.shippingPrice?.message}/>
                </div>
              </div>

              <div className="">
                <label
                  htmlFor="last-name"
                  className="text-sm font-medium leading-6 text-gray-900"
                >
                  Product Type
                </label>
                <div className="mt-2">
                  <Controller
                    // rules={{ required: true }}
                    control={control}
                    name={"type"}
                    render={({ field: { onChange, value } }) => {
                      return PRODUCT_TYPE.map((type) => (
                        <div
                          className="flex items-center gap-x-3"
                          key={type.value}
                        >
                          <input
                            checked={value === type.value}
                            onChange={() => onChange(type.value)}
                            id={type.value}
                            name="type"
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <label
                            for={type.value}
                            className="text-sm font-medium leading-6 text-gray-900"
                          >
                            {type.label}
                          </label>
                        </div>
                      ));
                    }}
                  />
                  <ErrorMessage error={!watch(`type`) && errors?.type} message={errors?.type?.message} />
                </div>
              </div>
              <div className=" flex gap-5 items-center">
                <label
                  htmlFor="Customizable"
                  className="text-sm font-medium leading-6 text-gray-900"
                >
                  Customizable
                </label>
                <input
                  {...register("customizable")}
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
                    className="text-sm font-medium leading-6 text-gray-900"
                  >
                    Personalized message for buyer
                  </label>
                  <div className="mt-2">
                    <input
                      {...register("customizableComment")}
                      type="text"
                      name="customizableComment"
                      id="customizableComment"
                      className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage
                      error={
                        watch(`customizable`) && errors?.customizableComment
                      }
                      message={errors?.customizableComment?.message}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Tags section start */}
            <div className="my-4">
              <div className="flex gap-1">
                <label
                  htmlFor="last-name"
                  className=" text-sm font-medium leading-6 text-gray-900 flex"
                >
                  Tags
                </label>
                <PlusCircleIcon
                  className="h-6 w-6 cursor-pointer"
                  onClick={() => appendProductTags(" ")}
                />
              </div>
              <ul className="grid grid-cols-5 gap-4 mt-1">
                {fieldsProductTags.map((item, index) => (
                  <li key={item.id} className="relative">
                    <input
                      {...register(`productTags[${index}]`)}
                      className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <button
                      type="button"
                      onClick={() => removeProductTags(index)}
                      className="-translate-y-1/2 absolute right-0 translate-x-1/2 top-0"
                    >
                      <XCircleIcon className="h-6 w-6 text-red-600" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            {/* Tags section end */}

            {/* Variants section start */}
            <Variants
              appendVariants={appendVariants}
              fieldsVariants={fieldsVariants}
              removeVariants={removeVariants}
              register={register}
              setAttributeTypes={setAttributeTypes}
              attributeTypes={attributeTypes}
              setValue={setValue}
              watch={watch}
              control={control}
              errors={errors}
              isEditProduct={isEditProduct}
            />
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="reset"
            className="text-sm font-semibold leading-6 text-gray-900"
            disabled={isLoading}
            onClick={resetForm}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="flex gap-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {isLoading ? (
              <>
                <LoadingIcon className="h-5 w-5" />
                {PROCESSING}
              </>
            ) : (
              SAVE
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
