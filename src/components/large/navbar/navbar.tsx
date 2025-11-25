import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingCart } from "lucide-react";
import ToggleMode from "../../small/toggle-mode/toggle-mode";
import DropDownLinks from "../../small/drop-down/drop-down";

export function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const NAVIGATION = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/" },
  ];

  const ADMIN_DROP_DOWN = {
    label: "Admin",
    classNames: {
      dropDown: "color-primary color-primary-content",
      toggleBtn: "color-primary color-primary-content p-1",
    },
    dropDownLinks: [
      {
        label: "Dashboard",
        onClick: () => {
          navigate("/admins/clothes/view-all-clothes");
        },
      },
      {
        label: "Sign In",
        onClick: () => {
          navigate("/admins/signin");
        },
      },
      {
        label: "Sign Out",
        onClick: () => {
          navigate("/admins/signout");
        },
      },
    ],
  };

  return (
    <nav id="navbar" className="color-base-300 color-base-content sticky top-0 z-50 w-full max-w-7xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center p-1">
              <span className="h-12 w-auto">
                <img src="/logos/hangers-logo.png" className="w-full h-full rounded-md" alt="" />
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {NAVIGATION.map((item) => (
                <Link key={item.name} to={item.href} className="hover-bg rounded-md px-3 py-2 text-sm font-medium">
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <ToggleMode />
            <DropDownLinks {...ADMIN_DROP_DOWN} />
            <Link to="/view-all-clothes">
              <button className="inline-flex items-center justify-center rounded-md color-secondary color-secondary-content px-3 py-2 leading-tight cursor-pointer">
                Browse Collections
              </button>
            </Link>
            <span className="cursor-pointer">
              <ShoppingCart strokeWidth={1.25} />
            </span>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="inline-flex items-center justify-center rounded-md p-2">
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
          <div className="fixed inset-0 z-50 bg-[rgba(0,0,0,0.85)]" onClick={() => setIsOpen(false)} />
          <div className="color-neutral color-neutral-content fixed right-0 top-0 z-50 h-full w-[300px] p-1">
            <div className="solid-border-b flex h-16 items-center justify-between">
              <span className="text-lg font-semibold">Menu</span>
              <button onClick={() => setIsOpen(false)} className="rounded-md p-2 cursor-pointer">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="flex flex-col space-y-1 p-4">
              <div className="solid-border-b mb-2">
                {NAVIGATION.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="block rounded-md px-3 py-2 text-base font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="flex flex-col">
                <div className="solid-border-b flex justify-start gap-5 pb-2 mb-2">
                  <ToggleMode />
                </div>
                <div className="flex flex-col gap-2">
                  <DropDownLinks {...ADMIN_DROP_DOWN} />
                  <Link to="/view-all-clothes">
                    <button
                      className="color-secondary color-secondary-content w-full rounded-md px-3 py-2 text-center text-base font-medium leading-tight cursor-pointer"
                      onClick={() => setIsOpen(false)}
                    >
                      Browse Collections
                    </button>
                  </Link>
                  <span className="cursor-pointer">
                    <ShoppingCart strokeWidth={1.25} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
