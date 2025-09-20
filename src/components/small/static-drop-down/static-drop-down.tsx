import { useState, useRef, useEffect } from "react";

// props interface
interface StaticDropDownProps {
  classNames?: {
    select?: string;
    options?: string;
  };
  headings?: {
    select?: string;
  };
  options: {
    label: string;
    href: string;
  }[];
}

export default function StaticDropDown(props: StaticDropDownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLElement | null>(null);

  // toggle-off on click outside the drop-down
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event?.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center justify-center rounded-md color-primary color-primary-content px-3 py-2 cursor-pointer ${props.classNames?.select}`}
      >
        {props.headings?.select || "Select"}
      </button>
      {isOpen && (
        <section
          className={`absolute top-full left-0 min-w-[150px] mt-1 rounded-xl p-1 ${props.classNames?.options}`}
        >
          {props.options.map((i, idx) => (
            <a
              key={idx}
              href={i.href}
              className="inline-block w-full px-3 py-2 text-xs text-left rounded-lg hover-bg"
            >
              {i.label}
            </a>
          ))}
        </section>
      )}
    </section>
  );
}
