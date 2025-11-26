import { FiSidebar } from "react-icons/fi";
import { useOutletContext } from "react-router-dom";

function PageHeader({ title }) {
    const { toggleSidebar } = useOutletContext(); 

    return (
        <div id="view-info">
            <FiSidebar 
                id="sidebar-icon" 
                onClick={toggleSidebar} 
            />
            <p>Home / {title}</p>
        </div>
    );
}
export default PageHeader;