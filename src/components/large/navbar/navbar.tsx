import { useState } from "react";
import { Menu, X, Instagram, Youtube } from "lucide-react";
import ToggleMode from "../../small/toggle-mode/toggle-mode";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      id="navbar"
      className="sticky top-0 z-50 w-full color-base-300 color-base-content"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center p-1">
              <span className="h-12 w-auto">
                <img src="/logos/hangers-logo.png" className="w-full h-full rounded-md" alt="" />
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="hover-bg rounded-md px-3 py-2 text-sm font-medium"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <ToggleMode />
            <a href="" className="text-sm">
              <Youtube strokeWidth={1.25} />
            </a>
            <a href="">
              <Instagram strokeWidth={1.25} />
            </a>
            <button className="inline-flex items-center justify-center rounded-md color-secondary color-secondary-content px-3 py-2">
              Get Started
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-md p-2"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="h-6 w-6 cursor-pointer" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6 cursor-pointer" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div
            className="fixed inset-0 z-50 bg-[rgba(0,0,0,0.85)]"
            onClick={() => setIsOpen(false)}
          />
          <div className="color-neutral color-neutral-content fixed right-0 top-0 z-50 h-full w-[300px] p-1">
            <div className="solid-border-b flex h-16 items-center justify-between">
              <span className="text-lg font-semibold">Menu</span>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-md p-2 cursor-pointer"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="flex flex-col space-y-1 p-4">
              <div className="solid-border-b mb-2">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block rounded-md px-3 py-2 text-base font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="flex flex-col">
                <div className="solid-border-b flex justify-start gap-5 pb-2 mb-2">
                <ToggleMode />
                <a href="" className="text-sm">
                  <Youtube strokeWidth={1.25} />
                </a>
                <a href="">
                  <Instagram strokeWidth={1.25} />
                </a>
                </div>
                <button
                  className="color-secondary color-secondary-content w-full rounded-md px-3 py-2 text-left text-base font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
