import { useEffect, useState } from "react";
import { useProducts } from "../../store/selectorHooks";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../../store/slice/productSlice";
import ProductCard from "../../components/ProductCard";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination";
import Loader from "../../components/Loader";


export default function Products() {
  const [currentPage, setCurrentPage] = useState(0);
  const [perPageList, setPerPageList] = useState(10);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    productsList: { isLoading, data, isError },
  } = useProducts();

  useEffect(() => {
    // Fetch product list
    const params = {
      limit: perPageList,
      offset: currentPage,
      order: "DESC",
      sortBy: "CREATED_DATE",
      filter: JSON.stringify({
        title: "variants",
        sku: "sku",
        status: "DRAFT",
        productType: "DIGITAL",
        tag: "fsdds",
      }),
    };
    dispatch(fetchProducts(params));
  }, [currentPage]);

  return (
    <div className="bg-white">
      {isLoading ? (
        <Loader/>
      ) : (
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:max-w-7xl lg:px-8" style={{height: "auto", minHeight: 'calc(100vh - 210px)'}}>
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Product list
            </h2>
            <button
              type="button"
              className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              onClick={() => navigate("/add-product")}
            >
              Add product
            </button>
          </div>

            {data?.results?.map((product) => (
              <ProductCard product={product} />
            ))}
        </div>
      )}

      <Pagination
        setCurrentPage={setCurrentPage}
        listLength={data?.total}
        perPageList={perPageList}
        currentPage={currentPage}
      />
    </div>
  );
}
