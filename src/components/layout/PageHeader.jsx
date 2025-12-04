import { FiSidebar } from "react-icons/fi";
import { IoIosArrowForward } from "react-icons/io";

function PageHeader({ title, description }) {
  return (
    <div id="main-header">
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}

export default PageHeader;
