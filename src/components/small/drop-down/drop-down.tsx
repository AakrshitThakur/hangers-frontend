import type React from "react";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

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
  const [selectedOption, setSelectedOption] = useState<DropdownOption | null>(
    null
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
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
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block">
      <button
        onClick={toggleDropdown}
        type="button"
        className="flex items-center justify-between gap-2 px-3 py-2 text-xs font-medium color-base-300 color-base-content rounded-full"
      >
        <>
          <span className="truncate">
            {selectedOption?.display || props.placeholder}
          </span>
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
                    ${
                      selectedOption?.id === option.id
                        ? "color-success color-success-content hover-bg-success"
                        : ""
                    }`}
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
