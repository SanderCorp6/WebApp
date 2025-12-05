import { Building2, TrendingUp, DollarSign, AlertCircle, History, AlertTriangle } from "lucide-react";

const formatDate = (dateString) => {
  if (!dateString) {
    return "";
  }
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(date);
};

const getChangeTypeIcon = (type) => {
  const typeUpper = type?.toUpperCase() || "DEFAULT";

  const styles = {
    POSITION: {
      icon: TrendingUp,
      color: "#60a5fa",
      bgColor: "#deedffff",
    },
    DEPARTMENT: {
      icon: Building2,
      color: "#a78bfa",
      bgColor: "#f5f3ff",
    },
    SALARY: {
      icon: DollarSign,
      color: "#43bb6fff",
      bgColor: "#dbffe8ff",
    },
    WARNING: {
      icon: AlertTriangle,
      color: "#e32727ea",
      bgColor: "#ffdbdbff",
    },
    DEFAULT: {
      icon: AlertCircle,
      color: "#6f6f6f",
      bgColor: "#f5f5f5",
    },
  };

  return styles[typeUpper] || styles.DEFAULT;
};

function EmployeeHistory({ history }) {
  return (
    <section className="forms-section history-section cl-2">
      <header>
        <History size={14} />
        <h2>EMPLOYEE HISTORY</h2>
      </header>

      <div className="timeline-container">
        {history && history.length > 0 ? (
          history.map((item, index) => {
            const style = getChangeTypeIcon(item.change_type);
            const Icon = style.icon;
            const isLast = index === history.length - 1;

            return (
              <div key={item.id || index} className="timeline-item">
                {!isLast && <div className="timeline-line"></div>}

                <div className="timeline-icon" style={{ backgroundColor: style.color }}>
                  <Icon className="change-icon" size={16} />
                </div>

                <div className="timeline-content">
                  <div className="timeline-meta">
                    <span
                      className="change-tag"
                      style={{
                        color: style.color,
                        backgroundColor: style.bgColor,
                        borderColor: style.color,
                      }}
                    >
                      {item.change_type}
                    </span>
                    <span className="change-date">{formatDate(item.created_at)}</span>
                  </div>

                  <p className="description">{item.description}</p>

                  {(item.previous_value || item.new_value) && (
                    <div className="change-details">
                      {item.previous_value && (
                        <span>
                          From: <strong>{item.previous_value}</strong>
                        </span>
                      )}
                      {item.previous_value && item.new_value && <span className="arrow">→</span>}
                      {item.new_value && (
                        <span>
                          {item.change_type !== "WARNING" ? "To: " : "Status: "}
                          <strong>{item.new_value}</strong>
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="empty-history">
            <History className="empty-icon" size={55} />
            <p>No history available for this employee</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default EmployeeHistory;
