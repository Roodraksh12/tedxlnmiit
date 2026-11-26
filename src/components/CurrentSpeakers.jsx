import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { FaLinkedin, FaInstagram } from "react-icons/fa";
import { currentSpeakers as SPEAKERS } from "../data/currentSpeakers.js";

gsap.registerPlugin(ScrollToPlugin);

export default function CurrentSpeakers() {
  const trackRef = useRef(null);
  const cards = useRef([]);
  const [active, setActive] = useState(0);

  const isAnimatingRef = useRef(false);
  const autoplayIntervalRef = useRef(null);
  const autoplayPausedRef = useRef(false);
  const interactionTimeoutRef = useRef(null);
  const wheelStopTimerRef = useRef(null);

  const AUTOPLAY_MS = 4000;
  const RESUME_AFTER_MS = 3500;
  const WHEEL_SENSITIVITY = 1.2;

  const centerCard = (index, setActiveCard = true) => {
    const track = trackRef.current;
    const card = cards.current[index];
    if (!track || !card) return;

    isAnimatingRef.current = true;

    const cardRect = card.getBoundingClientRect();
    const trackRect = track.getBoundingClientRect();
    const target =
      track.scrollLeft +
      (cardRect.left - trackRect.left + cardRect.width / 2 - trackRect.width / 2);

    gsap.to(track, {
      scrollTo: { x: target },
      duration: 0.7,
      ease: "power2.out",
      onComplete: () => {
        isAnimatingRef.current = false;
        if (typeof setActiveCard === "boolean" && setActiveCard) {
          setActive(index);
        }
      },
    });
  };

  const findClosest = () => {
    const track = trackRef.current;
    if (!track) return 0;
    const center = track.getBoundingClientRect().width / 2;
    let closest = 0;
    let minDist = Infinity;

    cards.current.forEach((card, i) => {
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const dist = Math.abs(rect.left + rect.width / 2 - center);
      if (dist < minDist) {
        closest = i;
        minDist = dist;
      }
    });

    return closest;
  };

  const clearAutoplay = () => {
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current);
      autoplayIntervalRef.current = null;
    }
  };

  const startAutoplay = () => {
    clearAutoplay();
    if (autoplayPausedRef.current) return;
    autoplayIntervalRef.current = setInterval(() => {
      if (isAnimatingRef.current) return;
      setActive((prev) => {
        const next = (prev + 1) % SPEAKERS.length;
        centerCard(next, true);
        return next;
      });
    }, AUTOPLAY_MS);
  };

  const pauseAutoplay = () => {
    autoplayPausedRef.current = true;
    clearAutoplay();
    if (interactionTimeoutRef.current) {
      clearTimeout(interactionTimeoutRef.current);
      interactionTimeoutRef.current = null;
    }
  };

  const resumeAutoplayAfterIdle = (delay = RESUME_AFTER_MS) => {
    if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current);
    interactionTimeoutRef.current = setTimeout(() => {
      autoplayPausedRef.current = false;
      startAutoplay();
    }, delay);
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    setTimeout(() => centerCard(0, true), 80);

    let onScrollTimer = null;

    const onScroll = () => {
      if (isAnimatingRef.current) return;

      pauseAutoplay();
      resumeAutoplayAfterIdle();

      if (onScrollTimer) clearTimeout(onScrollTimer);
      onScrollTimer = setTimeout(() => {
        const idx = findClosest();
        centerCard(idx, true);
      }, 140);
    };

    const onWheel = (e) => {
      if (Math.abs(e.deltaY) >= Math.abs(e.deltaX)) {
        e.preventDefault();
        pauseAutoplay();
        track.scrollLeft += e.deltaY * WHEEL_SENSITIVITY;

        if (wheelStopTimerRef.current) clearTimeout(wheelStopTimerRef.current);
        wheelStopTimerRef.current = setTimeout(() => {
          const idx = findClosest();
          centerCard(idx, true);
          resumeAutoplayAfterIdle();
        }, 160);
      }
    };

    const onPointerDown = () => pauseAutoplay();
    const onMouseEnter = () => pauseAutoplay();
    const onMouseLeave = () => resumeAutoplayAfterIdle();

    track.addEventListener("scroll", onScroll, { passive: true });
    track.addEventListener("wheel", onWheel, { passive: false });
    track.addEventListener("pointerdown", onPointerDown, { passive: true });
    track.addEventListener("mouseenter", onMouseEnter);
    track.addEventListener("mouseleave", onMouseLeave);

    autoplayPausedRef.current = false;
    startAutoplay();

    return () => {
      track.removeEventListener("scroll", onScroll);
      track.removeEventListener("wheel", onWheel);
      track.removeEventListener("pointerdown", onPointerDown);
      track.removeEventListener("mouseenter", onMouseEnter);
      track.removeEventListener("mouseleave", onMouseLeave);
      if (onScrollTimer) clearTimeout(onScrollTimer);
      if (wheelStopTimerRef.current) clearTimeout(wheelStopTimerRef.current);
      if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current);
      clearAutoplay();
    };
  }, []);

  useEffect(() => {
    cards.current.forEach((card, i) => {
      if (!card) return;
      const isActive = i === active;
      gsap.to(card, {
        scale: isActive ? 1.1 : 0.9,
        duration: 0.6,
        ease: "power3.out",
        filter: isActive ? "grayscale(0%) contrast(110%)" : "grayscale(100%) contrast(90%)",
      });
    });
  }, [active]);

  const handlePrev = () => {
    pauseAutoplay();
    setActive((prev) => {
      const next = (prev - 1 + SPEAKERS.length) % SPEAKERS.length;
      centerCard(next, true);
      resumeAutoplayAfterIdle();
      return next;
    });
  };

  const handleNext = () => {
    pauseAutoplay();
    setActive((prev) => {
      const next = (prev + 1) % SPEAKERS.length;
      centerCard(next, true);
      resumeAutoplayAfterIdle();
      return next;
    });
  };





  return (


    <section className="w-full bg-transparent text-white py-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-10">



        {/* MOBILE HEADING */}
        <h1
          className="
          block lg:hidden
          text-center
          font-light
          tracking-tight
          leading-tight
          text-[clamp(3.5rem,12vw,5.5rem)]
          mb-6
        "
       >

         <span className="text-tedx">Speakers</span>

       </h1>


  {/* CAROUSEL */}
    <div className="relative w-full lg:w-2/3 order-1 lg:order-none mb-6">
       <button
          aria-label="previous"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/25 text-white text-2xl"
          onClick={handlePrev}
      >

           ←

      </button>

  <button
    aria-label="next"
    className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/25 text-white text-2xl"
    onClick={handleNext}
  >
    →
  </button>

  <div
    ref={trackRef}
    className="flex overflow-x-auto scrollbar-none gap-12 py-6 px-4 md:px-20"
    style={{ scrollbarWidth: "none" }}
  >
    {SPEAKERS.map((spk, i) => (
      <div
        key={spk.id}
        ref={(el) => (cards.current[i] = el)}
        onClick={() => {
          pauseAutoplay();
          centerCard(i, true);
          resumeAutoplayAfterIdle();
        }}
        className="
          min-w-[250px]
          h-[300px]
          sm:min-w-[400px]
          sm:h-[500px]
          rounded-2xl
          overflow-hidden
          cursor-pointer
          transition-all
        "
      >
        <img
          src={spk.image}
          alt={spk.name}
          className="w-full h-full object-cover"
        />
      </div>
    ))}
  </div>
</div>





  
        {/* BIO */}
        <div className="w-full lg:w-1/3 order-2 lg:order-none lg:sticky lg:top-28">

          {/* DESKTOP HEADING */}
          <h1
            className="
              hidden lg:block
              font-light
              tracking-tight
              leading-tight
              text-[clamp(2.4rem,6vw,4.5rem)]
              mb-6
            "
          >
            <span className="text-tedx">Speakers</span>
          </h1>

          <div className="mt-8 text-center lg:text-left">
            <h3 className="text-2xl md:text-3xl font-bold">{SPEAKERS[active].name}</h3>
            <p className="text-tedx font-medium mt-1">{SPEAKERS[active].title}</p>
            <p className="mt-4 text-gray-300 text-lg">{SPEAKERS[active].bio}</p>

            <div className="mt-6 flex justify-center lg:justify-start gap-3">
              {SPEAKERS[active].linkedin && (
                <a href={SPEAKERS[active].linkedin} target="_blank" rel="noreferrer" className="border px-3 py-2 rounded-full hover:text-tedx transition">
                  <FaLinkedin />
                </a>
              )}
              {SPEAKERS[active].instagram && (
                <a href={SPEAKERS[active].instagram} target="_blank" rel="noreferrer" className="border px-3 py-2 rounded-full hover:text-tedx transition">
                  <FaInstagram />
                </a>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
