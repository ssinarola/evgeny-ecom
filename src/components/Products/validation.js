import * as yup from "yup";

export const productValidationSchema = yup.object().shape({
  categoryId: yup.string().nullable(true),
  productionYear: yup.number().positive().required('Production year is required'),
  type: yup.string().required("Type is required"),
  maker: yup.string().required("Manufacture is required"),
  shipmentTimeInDays: yup.string().matches(/^\d+-\d+$/, 'Please enter value in "1-2" format').required("ShipmentTime in Days is required"),
  processingTimeInDays: yup.string().matches(/^\d+-\d+$/, 'Please enter value in "1-2" format').required("Processing time in Days is required"),
  shippingPrice: yup.number().positive().required("Shipping Price is required"),
  variants: yup.lazy(() => yup.array().of(yup.object({
    title: yup.string().required("Variant title is required"), 
    quantity: yup.number().positive().required('Variant quantity is required'),  
    globalPrice: yup.number().positive().required('Variant global price is required'),  
    domesticPrice: yup.number().positive().required('Variant domestic price is required'),  
    description: yup.string().required('Variant description is required'),  
    sku: yup.string().required('SKU is required'),  
    // attributes: yup.lazy(() => yup.array().of(yup.object({
        // attributeType: yup.string().required("Attribute type is required"), 
        // attributeName: yup.string().required("Attribute name is required"),
        // attributeValue: yup.string().required("Attribute value is required"),

        // attributeTypeName: yup.string().required("Attribute type name is required"), 
        // attributeName: yup.string().required("Attribute name is required"), 
        // attributeValue: yup.string().required("Attribute value is required"), 
        // attributeUnitId: yup.object().required("Attribute unit is required"), 
        // attributeValueIds: yup.array().required('Attribute value are required')
      // })))
    })))
  });

  