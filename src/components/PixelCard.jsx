import { useEffect, useRef, useState } from "react";

/* ================= PIXEL CLASS ================= */
class Pixel {
  constructor(canvas, context, x, y, color, speed, delay) {
    this.ctx = context;
    this.x = x;
    this.y = y;
    this.color = color;
    this.speed = this.rand(0.1, 0.9) * speed;
    this.size = 0;
    this.sizeStep = Math.random() * 0.4;
    this.minSize = 0.5;
    this.maxSize = this.rand(this.minSize, 2);
    this.delay = delay;
    this.counter = 0;
    this.counterStep = Math.random() * 4 + (canvas.width + canvas.height) * 0.01;
    this.isIdle = false;
    this.isReverse = false;
    this.isShimmer = false;
  }

  rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.size, this.size);
  }

  appear() {
    this.isIdle = false;
    if (this.counter <= this.delay) {
      this.counter += this.counterStep;
      return;
    }
    if (this.size >= this.maxSize) this.isShimmer = true;
    this.isShimmer ? this.shimmer() : (this.size += this.sizeStep);
    this.draw();
  }

  disappear() {
    this.isShimmer = false;
    this.counter = 0;
    if (this.size <= 0) {
      this.isIdle = true;
      return;
    }
    this.size -= 0.1;
    this.draw();
  }

  shimmer() {
    if (this.size >= this.maxSize) this.isReverse = true;
    if (this.size <= this.minSize) this.isReverse = false;
    this.size += this.isReverse ? -this.speed : this.speed;
  }
}

/* ================= HELPERS ================= */
function getEffectiveSpeed(value, reducedMotion) {
  if (reducedMotion) return 0;
  return Math.min(parseInt(value, 10) || 0, 100) * 0.001;
}

/* ================= VARIANTS ================= */
const VARIANTS = {
  default: { gap: 5, speed: 35, colors: "#f8fafc,#f1f5f9,#cbd5e1" },
  blue: { gap: 10, speed: 25, colors: "#e0f2fe,#7dd3fc,#0ea5e9" },
  yellow: { gap: 3, speed: 20, colors: "#fef08a,#fde047,#eab308" },
  pink: { gap: 6, speed: 80, colors: "#fecdd3,#fda4af,#e11d48" },
};

/* ================= COMPONENT ================= */
export default function PixelCard({
  variant = "default",
  className = "",
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const pixelsRef = useRef([]);
  const animationRef = useRef(null);
  const timeRef = useRef(0);

  const [isClient, setIsClient] = useState(false);
  const reducedMotion = useRef(false);

  const { gap, speed, colors } = VARIANTS[variant] || VARIANTS.default;

  /* ---------- CLIENT INIT ---------- */
  useEffect(() => {
    setIsClient(true);
    reducedMotion.current =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    timeRef.current = performance.now();
  }, []);

  /* ---------- PIXEL INIT ---------- */
  useEffect(() => {
    if (!isClient || !containerRef.current || !canvasRef.current) return;

    const init = () => {
      const rect = containerRef.current.getBoundingClientRect();
      const ctx = canvasRef.current.getContext("2d");

      canvasRef.current.width = rect.width;
      canvasRef.current.height = rect.height;

      const palette = colors.split(",");
      const pxs = [];

      for (let x = 0; x < rect.width; x += gap) {
        for (let y = 0; y < rect.height; y += gap) {
          const dx = x - rect.width / 2;
          const dy = y - rect.height / 2;
          const delay = reducedMotion.current ? 0 : Math.sqrt(dx * dx + dy * dy);
          pxs.push(
            new Pixel(
              canvasRef.current,
              ctx,
              x,
              y,
              palette[Math.floor(Math.random() * palette.length)],
              getEffectiveSpeed(speed, reducedMotion.current),
              delay
            )
          );
        }
      }
      pixelsRef.current = pxs;
    };

    init();
    const ro = new ResizeObserver(init);
    ro.observe(containerRef.current);

    return () => {
      ro.disconnect();
      cancelAnimationFrame(animationRef.current);
    };
  }, [isClient, variant]);

  /* ---------- ANIMATION ---------- */
  const animate = (mode) => {
    cancelAnimationFrame(animationRef.current);

    const loop = () => {
      animationRef.current = requestAnimationFrame(loop);
      const now = performance.now();
      if (now - timeRef.current < 16) return;
      timeRef.current = now;

      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx) return;

      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      let idle = true;
      pixelsRef.current.forEach((p) => {
        p[mode]();
        if (!p.isIdle) idle = false;
      });

      if (idle) cancelAnimationFrame(animationRef.current);
    };

    animationRef.current = requestAnimationFrame(loop);
  };

  /* ---------- SSR FALLBACK ---------- */
  if (!isClient) return null;

  /* ---------- RENDER ---------- */
  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 z-0 pointer-events-auto ${className}`}
      onMouseEnter={() => animate("appear")}
      onMouseLeave={() => animate("disappear")}
    >
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}
