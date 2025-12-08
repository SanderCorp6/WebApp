import { Loader2 } from "lucide-react";

export function LoadingSpinner({ size = 24, className = "" }) {
  return <Loader2 className={`animate-spin ${className}`} size={size} />;
}

export default LoadingSpinner;
