import { useState } from "react";
import { Plus, Search, Briefcase } from "lucide-react";
import { toast } from "react-hot-toast";
import { useOpenings } from "../hooks/useOpenings";
import { useDepartments } from "../hooks/useDepartments";
import { usePositions } from "../hooks/usePositions";
import { useDebounce } from "../hooks/useDebounce";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import "../styles/OpeningsPage.css";
import PageHeader from "../components/layout/PageHeader";
import OpeningCard from "../components/openings/OpeningCard";

function OpeningsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [departmentId, setDepartmentFilter] = useState("");
  const [positionId, setPositionFilter] = useState("");
  const [contractType, setContractType] = useState("");

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { openings, isLoading, isError, deleteOpening, isDeletingOpening, updateOpening, isUpdatingOpening } =
    useOpenings({
      status: statusFilter === "All" ? "" : statusFilter,
      departmentId: departmentId === "All" ? "" : departmentId,
      positionId: positionId === "All" ? "" : positionId,
      contractType: contractType === "All" ? "" : contractType,
      search: debouncedSearchTerm,
    });

  const { departments } = useDepartments();
  const { positions } = usePositions();

  const statuses = ["Open", "On hold", "In interview", "Offer extended", "Closed"];
  const contractTypes = ["Full-time", "Part-time", "Intern"];

  const handleCreateOpening = () => {
    toast.success("Create Opening functionality coming soon!");
  };

  const handleEditOpening = (opening) => {
    toast.success(`Edit functionality for "${opening.title}" coming soon!`);
  };

  const handleDeleteOpening = async (id) => {
    if (confirm("Are you sure you want to delete this opening?")) {
      await deleteOpening(id);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    await updateOpening({ id, data: { status: newStatus } });
  };

  const activeFiltersCount = [
    statusFilter !== "" && statusFilter !== "All",
    departmentId !== "" && departmentId !== "All",
    positionId !== "" && positionId !== "All",
    contractType !== "" && contractType !== "All",
  ].filter(Boolean).length;

  const clearFilters = () => {
    setStatusFilter("");
    setDepartmentFilter("");
    setPositionFilter("");
    setContractType("");
    setSearchTerm("");
  };

  return (
    <div className="openings-page">
      <div className="openings-content">
        <div className="openings-container">
          {/* Header */}
          <div className="openings-header">
            <PageHeader title="Job Openings" description={"Manage open positions and track hiring progress"} />
            <button onClick={handleCreateOpening} className="btn-new-opening">
              <Plus size={16} />
              <span>New Opening</span>
            </button>
          </div>

          {/* Search and Filters */}
          <div className="openings-toolbar">
            {/* Search bar */}
            <div className="search-wrapper">
              <Search className="search-icon" size={15} />
              <input
                type="text"
                placeholder="Search openings by title"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            {/* Filter dropdowns */}
            <div className="filters-wrapper">
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="filter-select">
                <option value="All">All Statuses</option>
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>

              <select
                value={departmentId}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="filter-select"
              >
                <option value="All">All Departments</option>
                {departments?.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>

              <select value={positionId} onChange={(e) => setPositionFilter(e.target.value)} className="filter-select">
                <option value="All">All Positions</option>
                {positions?.map((pos) => (
                  <option key={pos.id} value={pos.id}>
                    {pos.name}
                  </option>
                ))}
              </select>

              <select value={contractType} onChange={(e) => setContractType(e.target.value)} className="filter-select">
                <option value="All">All Contract Types</option>
                {contractTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>

              {activeFiltersCount > 0 && (
                <button onClick={clearFilters} className="btn-clear-filters">
                  Clear all filters ({activeFiltersCount})
                </button>
              )}
            </div>
          </div>

          {/* Results count */}
          <div className="results-count">
            Showing {openings?.length || 0} {openings?.length === 1 ? "opening" : "openings"}
          </div>

          {/* Openings Grid */}
          {isLoading ? (
            <div className="loader-wrapper">
              <LoadingSpinner size={40} className="spinner-colors" />
            </div>
          ) : isError ? (
            <div className="empty-state">
              <p className="empty-text">Error loading openings.</p>
            </div>
          ) : (
            <div className="openings-grid">
              {openings.map((opening) => (
                <OpeningCard
                  key={opening.id}
                  opening={opening}
                  onEdit={() => handleEditOpening(opening)}
                  onDelete={() => handleDeleteOpening(opening.id)}
                  onStatusChange={(newStatus) => handleStatusChange(opening.id, newStatus)}
                  isDeleting={isDeletingOpening}
                  isUpdating={isUpdatingOpening}
                />
              ))}
            </div>
          )}

          {/* Empty state */}
          {!isLoading && !isError && openings.length === 0 && (
            <div className="empty-state">
              <Briefcase className="empty-icon" />
              <p className="empty-text">No openings found</p>
              <p className="empty-subtext">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OpeningsPage;
