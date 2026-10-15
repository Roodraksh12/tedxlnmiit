import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useContext } from 'react';
import { NavbarContext } from '../context/NavContext';

const menuLinks = ["Home", "Theme", "About", "Gallery", "Team","Campus Ambassador"];

export default function FullScreenNav() {
  const { navOpen, setNavOpen } = useContext(NavbarContext);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    if (navOpen) {
      tl.set(".fullscreennav", { display: "block" })
        .to(".stair", { height: "100%", duration: 0.4, stagger: 0.05 }, 0)
        .to(".menu-link", { opacity: 1, rotateX: 0, duration: 0.5, stagger: 0.05 }, "-=0.2");
    } else {
      tl.to(".menu-link", { opacity: 0, rotateX: 90, duration: 0.3, stagger: 0.05 })
        .to(".stair", { height: 0, duration: 0.3, stagger: 0.05 }, "-=0.1")
        .set(".fullscreennav", { display: "none" });
    }
  }, [navOpen]);

  return (
   <div
  className="fullscreennav fixed inset-0 bg-black/10 backdrop-blur-xl text-white z-50 overflow-hidden"
  style={{ display: "none" }}
>

      {/* Staircase effect */}
      <div className="absolute top-0 left-0 w-full h-full flex">
        {[...Array(5)].map((_, i) => (
         <div key={i} className="stair w-1/5 h-0 bg-black/1"></div>
        ))}
      </div>

      {/* Links */}
      <div className="relative h-full w-full flex flex-col justify-center items-center space-y-10">
        {menuLinks.map((text, i) => (
          <a
            href={text === "Home" ? "/" : `/${text.toLowerCase()}`}
            key={i}
            className="menu-link
        opacity-0
        rotate-x-90
        text-center
        whitespace-nowrap
        text-2xl sm:text-3xl md:text-4xl
        font-semibold
        uppercase"
          >
            {text}
          </a>
        ))}

        {/* Close Button */}
        <button
          className="absolute top-10 right-10 text-3xl"
          onClick={() => setNavOpen(false)}
        >
          ✕
        </button>
      </div>
    </div>
  );
}
