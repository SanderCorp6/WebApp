import { useState, useRef, useEffect, createContext, useContext, cloneElement } from "react";
import "../../styles/components/Popover.css";

const PopoverContext = createContext();

export function Popover({ children, open, onOpenChange }) {
  const [isOpenState, setIsOpenState] = useState(false);

  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : isOpenState;
  const setIsOpen = isControlled ? onOpenChange : setIsOpenState;

  const toggle = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);

  return (
    <PopoverContext.Provider value={{ isOpen, toggle, close }}>
      <div className="popover-container">{children}</div>
    </PopoverContext.Provider>
  );
}

export function PopoverTrigger({ asChild, children }) {
  const { toggle } = useContext(PopoverContext);

  if (asChild) {
    return cloneElement(children, {
      onClick: (e) => {
        children.props.onClick?.(e);
        toggle();
      },
    });
  }

  return (
    <button onClick={toggle} className="popover-trigger">
      {children}
    </button>
  );
}

export function PopoverContent({ children, className = "" }) {
  const { isOpen, close } = useContext(PopoverContext);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        return;
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        close();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, close]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="popover-backdrop" onClick={close} />
      <div ref={ref} className={`popover-content ${className}`} style={{}}>
        {children}
      </div>
    </>
  );
}
