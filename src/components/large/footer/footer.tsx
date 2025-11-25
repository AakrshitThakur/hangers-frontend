import { Heart } from "lucide-react";

export default function Footer() {
  const navigationLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "#" },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="color-neutral color-neutral-content w-full max-w-7xl">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Navigation Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-2">Navigation</h3>
            <ul className="space-y-2">
              {navigationLinks.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="hover-bg rounded-md px-3 py-2 text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Copyright Information */}
          <div className="flex flex-col items-center">
            <div className="flex items-center mb-2">
              <Heart className="mr-2" />
              <span>Made with passion</span>
            </div>
            <p className="text-center text-sm">© {currentYear} Hanger Readymade Collection. All rights reserved.</p>
          </div>

          {/* Social Media Icons */}
          <div className="flex flex-col items-center md:items-end">
            <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
            <div className="flex justify-center items-center gap-3">
              <a href="" className="w-5 h-5">
                <img src="\logos\x-logo-white.png" className="w-full h-full" alt="X icon" />
              </a>
              <a href="" className="w-7 h-7">
                <img src="\logos\linkedin-logo.png" className="w-full h-full" alt="LinkedIn icon" />
              </a>
              <a href="" className="w-7 h-7">
                <img src="/logos/github-logo.png" className="w-full h-full" alt="GitHub icon" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
