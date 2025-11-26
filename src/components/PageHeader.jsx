import { FiSidebar } from "react-icons/fi";
import { IoIosArrowForward } from "react-icons/io";
import { useOutletContext } from "react-router-dom";

function PageHeader({ title }) {
    const { toggleSidebar } = useOutletContext(); 

    return (
        <div id="view-info">
            <FiSidebar 
                id="sidebar-icon" 
                onClick={toggleSidebar} 
            />
            <div className="header-content">
                <p>Home</p>
                <IoIosArrowForward className="arrow-icon" />
                <p className="page-title">{title}</p>
            </div>
        </div>
    );
}
export default PageHeader;