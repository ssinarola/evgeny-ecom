import { Suspense } from "react";
import Router from "./routes/index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Suspense fallback={<div>Loading..</div>}>
      <Router />
      <ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="dark"
				className={"w-100"}
			/>
    </Suspense>
  );
}

export default App;
