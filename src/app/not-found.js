import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
const notFound = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="not-found-content d-flex justify-content-center align-items-center flex-column gap-2">
        <h3 className="text-capitalize">page not found</h3>
        <div className="p-1 rounded-1" style={{ backgroundColor: "#ee7b0b" }}>
          <FaArrowLeft />
          <Link
            href="/"
            className="text-decoration-none text-capitalize text-black ms-1"
          >
            home
          </Link>
        </div>
      </div>
    </div>
  );
};
export default notFound;
