import { FiSidebar } from "react-icons/fi";
import { IoIosArrowForward } from "react-icons/io";
import { useOutletContext, Link } from "react-router-dom";

function PageHeader({ title, breadcrumbs }) {
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
                
                {breadcrumbs ? (
                    breadcrumbs.map((crumb, index) => (
                        <div key={index} className="header-content">
                            {crumb.path ? (
                                <Link to={crumb.path} className="breadcrumb-link">
                                    {crumb.label}
                                </Link>
                            ) : (
                                <p className={crumb.active ? "page-title" : ""}>{crumb.label}</p>
                            )}
                            {index < breadcrumbs.length - 1 && <IoIosArrowForward className="arrow-icon" />}
                        </div>
                    ))
                ) : (
                    <p className="page-title">{title}</p>
                )}
            </div>
        </div>
    );
}

export default PageHeader;
