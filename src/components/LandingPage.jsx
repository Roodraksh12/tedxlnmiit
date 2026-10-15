import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ScrollSmoother from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function LandingPage() {
  
  useGSAP(() => {

    ScrollTrigger.matchMedia({

      "(min-width: 640px)": () => {

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".landing",
            start: "0% 0%",
            end: "250% 30%", 
            scrub: true,
            pin: true,
            scroller: document.body,
            pinReparent: true,
            anticipatePin: 1,
          },
        });

      
gsap.set(".idea-left", { opacity: 1, x: 0 });
gsap.set(".idea-right", { opacity: 1, x: 0 });


        tl.to(
          ".idea-left",
          { y: -400, opacity: 0, duration: 6, ease: "power2.inOut" },
          "2"
        );

        tl.to(
          ".idea-right",
          { y: 400, opacity: 0, duration: 6, ease: "power2.inOut" },
          "2"
        );

        tl.fromTo(".forging",
          { x: -1000, opacity: 0 },
          { x: -250, opacity: 1, duration: 12, ease: "power3.out" },
          "5"
        );

        tl.fromTo(".the",
          { x: 800, opacity: 0 },
          { x: -250, opacity: 1, duration: 12, ease: "power3.out" },
          "5"
        );

        tl.fromTo(".future",
          { x: 1000, opacity: 0 },
          { x: -250, opacity: 1, duration: 12, ease: "power3.out" },
          "5"
        );

        tl.to(".img",
          { x: 300, duration: 12, scale: 0.8, ease: "power3.out" },
          "5"
        );

        
        tl.to(".hero-gradient",
          { x: 300, duration: 12, scale: 0.8, ease: "power3.out" },
          "5"
        );
      },

      /* ===============================
         MOBILE 
      =============================== */
      "(max-width: 639px)": () => {

        gsap.set(".img", {
          left: "50%",
          top: "50%",
          xPercent: -50,
          yPercent: -50,
          y: -10
        });

        gsap.set(".forging", { x: "-120vw" });
        gsap.set(".future", { x: "120vw" });
        gsap.set(".the", { x: "120vw", opacity: 1 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".landing",
            start: "top top",
            end: "+=500",
            scrub: true,
            pin: true,
            pinReparent: true,
            anticipatePin: 1,
          },
        });

        tl.to(".forging", { x: 0, duration: 4, ease: "power3.out" }, 0);
        tl.to(".the", { x: 0, duration: 4, ease: "power3.out" }, 0);
        tl.to(".future", { x: 0, duration: 4, ease: "power3.out" }, 0);
      },
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <section className="landing h-[105vh] relative overflow-hidden">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-center px-12 relative">

       
        <div className="idea-left font-semibold hidden sm:flex absolute left-30 h-[30vh] text-white text-3xl text-center z-20 leading-relaxed items-center  ">
          <span>
            Every Innovation <br />
            began as a <span className="text-[#eb0028]">fragile idea</span>
          </span>
        </div>

       
        <div className="-mt-1 z-20 font-semibold idea-right hidden sm:flex absolute right-30 h-[30vh] text-white  text-3xl text-center leading-relaxed items-center">
          <span>
            Until someone <br />
            <span className="text-[#eb0028]">forged it</span> into reality
          </span>
        </div>

       
        <div className="relative font-bebas flex flex-col items-center gap-6 pointer-events-none z-20">
          <p className="forging tracking-wide text-[#eb0028] text-[22vw] sm:text-[16vw] font-extrabold leading-none">
            FORGING
          </p>

          <div className="flex flex-col items-center leading-none">
            <p className="the font-bebas text-white text-[12vw] sm:text-[8vw] font-extrabold tracking-wide mb-6">
              THE
            </p>
            <p className="future font-bebas tracking-wide text-white text-[22vw] sm:text-[16vw] font-extrabold">
              FUTURE
            </p>
          </div>
        </div>

        
        <div
          className="
            hero-gradient
            absolute
            z-0
            w-[800px]
            h-[800px]
            rounded-full
             -mx-50 bg-radial from-[#38010a] from-1% to-70%
          "
        />

        
        <img
          src="/images/MainRed3d.webp"
          alt="TEDx LNMIIT Hero"
          className="img max-h-[90vh]  object-contain absolute z-10"
        />
      </div>
    </section>
  );
}
