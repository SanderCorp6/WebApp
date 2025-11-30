import { useNavigate } from 'react-router-dom';
import { IoArrowBack } from "react-icons/io5";
import { GoPencil } from "react-icons/go";
import { MdOutlineClose } from "react-icons/md";
import { FiSave } from 'react-icons/fi';

export default function EmployeeActionsBar({ 
    isEditing, 
    isUpdating, 
    status, 
    onEdit, 
    onCancel, 
    onSave, 
    onToggleStatus 
}) {
    const navigate = useNavigate();

    return (
        <div className='top-actions'>
            <button className="back-btn" onClick={() => navigate(-1)}>
                <IoArrowBack />
            </button>

            <div>
                {!isEditing ? (
                    <>
                        <button className='edit-btn' onClick={onEdit}>
                            <GoPencil className='icon' />
                            <p>Edit</p>
                        </button>
                        <button 
                            className={`set-status-btn ${status?.toLowerCase()}`} 
                            onClick={onToggleStatus} 
                            disabled={isUpdating}
                        >
                            {`Set ${status === "Active" ? "Inactive" : "Active" }`}
                        </button>
                    </>
                ) : (
                    <>
                        <button className='cancel-btn' onClick={onCancel}>
                            <MdOutlineClose className='icon' />
                            <p>Cancel</p>
                        </button>

                        <button 
                            className='save-btn'
                            onClick={onSave}
                            disabled={isUpdating} 
                        >
                            <FiSave className='icon' />
                            <p>{isUpdating ? 'Saving...' : 'Save Changes'}</p>
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}