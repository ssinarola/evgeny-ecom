import * as yup from "yup";

export const productValidationSchema = yup.object().shape({
  categoryId: yup.number().required().typeError("Category is required"),
  productionYear: yup.number().required().typeError("Production year is required").moreThan(0, "Production year cannot be negative"),
  type: yup.string().required("Type is required"),
  maker: yup.string().required("Manufacture is required"),
  shipmentTimeInDays: yup.string().matches(/^\d+-\d+$/, 'Please enter value in "1-2" format').required("ShipmentTime in Days is required"),
  processingTimeInDays: yup.string().matches(/^\d+-\d+$/, 'Please enter value in "1-2" format').required("Processing time in Days is required"),
  shippingPrice: yup.number().required().typeError("Shipping Price is required").moreThan(0, "Shipping Price cannot be negative"),
  variants: yup.lazy(() => yup.array().of(yup.object({
    title: yup.string().required("Variant title is required"), 
    quantity: yup.number().required().typeError("Variant quantity is required").moreThan(0, "Variant quantity cannot be negative"),  
    globalPrice: yup.number().required().typeError("Variant global price is required").moreThan(0, "Variant global price cannot be negative"),  
    domesticPrice: yup.number().required().typeError("Variant domestic price is required").moreThan(0, "Variant domestic price cannot be negative"),  
    description: yup.string().required('Variant description is required'),  
    sku: yup.string().required('SKU is required'),  
    // attributes: yup.lazy(() => yup.array().of(yup.object({
    //     attributeName: yup.string().required("Attribute name is required"),
    //     attributeValue: yup.string().required("Attribute value is required"),
    //   })))
    })))
  });

  