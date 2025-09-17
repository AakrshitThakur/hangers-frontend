import type React from "react";
import { useState, useRef, useEffect } from "react";
import type { DropdownOptions } from "../../../types/dropdown.types";
import { ChevronDown } from "lucide-react";

// custom dropdown props
// interface CustomDropdownProps {
//   options: DropdownOption[];
//   placeholder?: string;
// }

// export function CustomDropdown(props: CustomDropdownProps) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedOption, setSelectedOption] = useState<DropdownOption | null>(
//     null
//   );
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         setIsOpen(false);
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleOptionSelect = (option: DropdownOption) => {
//     setSelectedOption(option);
//     setIsOpen(false);
//   };

//   const toggleDropdown = () => {
//     setIsOpen(!isOpen);
//   };

//   useEffect(() => {
//     // call setter on a valid selected option value
//     if (selectedOption) {
//     }
//   }, [selectedOption]);

//   return (
//     <div ref={dropdownRef} className="relative inline-block">
//       <button
//         onClick={toggleDropdown}
//         className="flex items-center justify-between gap-2 px-4 py-2.5 text-sm font-medium bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-[200px] transition-colors"
//       >
//         <>
//           <span className="truncate text-gray-900">
//             {selectedOption?.display || props.placeholder}
//           </span>
//           <ChevronDown
//             className={`h-4 w-4 text-gray-500 transition-transform
//                 ${isOpen ? "rotate-180" : ""}`}
//           />
//         </>
//       </button>

//       {/* options */}
//       {isOpen && (
//         <div className="absolute top-full left-0 mt-2 w-full min-w-[200px] z-50 bg-white border border-gray-200 rounded-lg shadow-lg">
//           <div className="py-1">
//             {props.options.map((option) => (
//               <button
//                 key={option.id}
//                 onClick={() => handleOptionSelect(option)}
//                 className={`w-full px-4 py-2.5 text-sm text-left text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed
//                     ${
//                       selectedOption?.id === option.id
//                         ? "bg-blue-50 text-blue-700"
//                         : ""
//                     }`}
//               >
//                 <span className="truncate">{option.display}</span>
//               </button>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

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
  //   setter: React.Dispatch<React.SetStateAction<T>>;
  //   name: string;
  options: DropdownOption[];
  placeholder?: string;
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

  return (
    <div ref={dropdownRef} className="relative inline-block">
      <button
        onClick={toggleDropdown}
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
