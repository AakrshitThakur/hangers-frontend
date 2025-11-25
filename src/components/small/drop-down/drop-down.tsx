import type React from "react";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface DropdownOption {
  id: string;
  display: string;
  value: string;
}

// setter has to be an object
interface DropdownProps<T> {
  set: {
    setState: React.Dispatch<React.SetStateAction<T>>;
    name: string;
  };
  options: DropdownOption[];
  placeholder?: string;
  selectedOption?: string;
}

export function Dropdown<T>(props: DropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<DropdownOption | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOptionSelect = (option: DropdownOption) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  function callSetFunc(value: string) {
    // call setter on a valid selected option value
    props.set.setState((curr) => ({ ...curr, [props.set.name]: value }));
  }

  useEffect(() => {
    if (props.selectedOption) {
      const so = props.options.find((o) => o.value === props.selectedOption);
      if (so) setSelectedOption(so);
    }
  }, [props.selectedOption]);

  return (
    <div ref={dropdownRef} className="relative inline-block">
      <button
        onClick={toggleDropdown}
        type="button"
        className="flex items-center justify-between gap-2 px-3 py-2 text-xs font-medium color-base-300 color-base-content rounded-full"
      >
        <>
          <span className="truncate">{selectedOption?.display || props.placeholder}</span>
          <ChevronDown
            className={`h-4 w-4 transition-transform 
                ${isOpen ? "rotate-180" : ""}`}
          />
        </>
      </button>

      {/* options */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-full min-w-[200px] max-h-[250px] overflow-y-scroll z-50 color-base-300 color-base-content rounded-lg shadow-lg">
          <div className="py-1">
            {props.options.map((option) => (
              <button
                key={option.id}
                onClick={() => {
                  handleOptionSelect(option);
                  callSetFunc(option.value);
                }}
                className={`w-full px-3 py-2 text-xs text-left color-base-300 color-base-content hover-bg
                    ${selectedOption?.id === option.id ? "color-success color-success-content hover-bg-success" : ""}`}
              >
                <span className="truncate">{option.display}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

interface DropDownLink {
  label: string;
  onClick: () => void;
}

interface DropDownLinksProps {
  label: string;
  classNames?: {
    dropDown?: string;
    toggleBtn?: string;
  };
  dropDownLinks: DropDownLink[];
}

export default function DropDownLinks(props: DropDownLinksProps) {
  const [open, set_open] = useState(false);
  const container_ref = useRef<HTMLDivElement | null>(null);

  // close dropdown when clicking outside
  useEffect(() => {
    function handle_click_outside(e: MouseEvent) {
      if (container_ref.current && !container_ref.current.contains(e.target as Node)) {
        set_open(false);
      }
    }
    document.addEventListener("mousedown", handle_click_outside);
    return () => {
      document.removeEventListener("mousedown", handle_click_outside);
    };
  }, []);

  return (
    <div
      ref={container_ref}
      id="dropdown-links"
      className={`flex flex-col gap-1 relative text-nowrap text-sm rounded-md ${props.classNames?.toggleBtn}`}
    >
      {/* selected display */}
      <button
        type="button"
        onClick={() => set_open((prev) => !prev)}
        className="w-full rounded-lg flex justify-center items-center cursor-pointer p-1"
      >
        {props.label && <label className="font-medium cursor-pointer pr-1">{props.label}</label>}
        {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>

      {/* dropdown options */}
      {open && (
        <div className={`absolute z-10 top-[105%] left-1/2 -translate-x-1/2 rounded-md p-1 ${props.classNames?.dropDown}`}>
          {props.dropDownLinks.map((link) => (
            <div
              onClick={() => {
                set_open(false);
                link.onClick();
              }}
              className="flex justify-center items-center gap-1 cursor-pointer px-3 py-2"
            >
              <span>{link.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
