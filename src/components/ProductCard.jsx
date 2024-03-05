import ProductImage from "../assets/testingProductImage.jpg";

function ProductCard({ product }) {
  return (
    <div className="mx-auto max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-10 lg:mx-0 lg:flex lg:max-w-none">
      <div className="p-8 sm:p-8 lg:flex-auto">
        <h3 className="text-2xl font-bold tracking-tight text-gray-900">
          {product.maker}
        </h3>
        <div className="mt-1 font-medium text-gray-900">Category : <span className="text-gray-500">{product?.categoryId}</span></div>
        <div className="mt-1 font-medium text-gray-900">Manufacture : <span className="text-gray-500">{product?.categoryId}</span></div>
        <div className="mt-1 font-medium text-gray-900">Year of manufacuring : <span className="text-gray-500">{product?.productionYear}</span></div>
        <div className="mt-1 font-medium text-gray-900">Product Type : <span className="text-gray-500">{product?.type}</span></div>
        <div className="mt-1 font-medium text-gray-900">Customizable : <span className="text-gray-500">{product?.customizable ? "YES" : "NO"}</span></div>
        <div className="mt-1 font-medium text-gray-900">Shipping time : <span className="text-gray-500">{product?.shipmentTimeInDays} Days</span></div>
        <div className="mt-1 font-medium text-gray-900">Shipping price : <span className="text-gray-500">{product?.shippingPrice}</span></div>
        <div className="mt-1 font-medium text-gray-900">Tags : {product?.productTags.map(tag => <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">{tag}</span>)}</div>

        <div className="m-1">
          <h2>Variants</h2>
          <ul
            role="list"
            className="grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6 "
          >
            {product.variants.map((variant) => (
              <li key={variant.productId} className="p-5 rounded-md bg-gray-50 ring-1 ring-inset">
                <div className="mt-1 font-medium text-gray-500">Title : <span className="text-gray-900">{variant.title}</span></div>
                <div className="mt-1 font-medium text-gray-500">Description : <span className="text-gray-900">{variant.description}</span></div>
                <div className="mt-1 font-medium text-gray-500">Quantity : <span className="text-gray-900">{variant.quantity}</span></div>
                <div className="mt-1 font-medium text-gray-500">DomesticPrice : <span className="text-gray-900">{variant.domesticPrice}</span></div>
                <div className="mt-1 font-medium text-gray-500">GlobalPrice : <span className="text-gray-900">{variant.globalPrice}</span></div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
