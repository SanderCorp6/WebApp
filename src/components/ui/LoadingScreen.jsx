import LoadingSpinner from "./LoadingSpinner";
import "../../styles/components/LoadingScreen.css";

export function LoadingScreen() {
  return (
    <div className="loading-screen">
      <LoadingSpinner size={48} className="text-primary" />
    </div>
  );
}

export default LoadingScreen;
