import { useEffect, useRef } from "react";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { getGlassEngine, SPRINGS, stepSpring } from "./liquid-glass/engine";
import "./TicketSlider.css";

const clamp = value => Math.max(0, Math.min(1, value));
const settle = { omega: 22, zeta: .58 };

export default function TicketSlider() {
  const rootRef = useRef(null);
  const sliderRef = useRef(null);
  const canvasRef = useRef(null);
  const labelRef = useRef(null);
  const linkRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const slider = sliderRef.current;
    const canvas = canvasRef.current;
    const label = labelRef.current;
    const link = linkRef.current;
    const ctx = canvas.getContext("2d");
    const engine = ctx ? getGlassEngine() : null;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const position = { x: 0, v: 0 };
    const press = { x: 0, v: 0 };
    let phase = "rest";
    let pointer = null;
    let target = 0;
    let from = 0;
    let travel = 1;
    let height = 1;
    let width = 1;
    let left = 0;
    let top = 0;
    let textX = 0;
    let font = "";
    let trackColor = "";
    let frame = 0;
    let previous = 0;
    let ignoreClick = false;
    let confirmation = 0;
    let navigation = 0;
    let resetTimer = 0;

    const view = engine && ctx ? {
      canvas, ctx, dirty: false, visible: true,
      step: () => false,
      lens() {
        if (press.x <= .015) return null;
        const open = clamp(press.x);
        const size = height - 8;
        const x = from + position.x;
        const padding = 13;
        const y = height / 2 + padding;
        return {
          left: -padding, top: -padding, width: width + padding * 2, height: height + padding * 2,
          unit: size / 106, cx: x + padding, cy: y,
          hx: size * (.5 + .095 * press.x), hy: size * (.5 + .095 * press.x), radius: 999, bodyX: 0,
          bevel: 38, shadow: .23 * open, shadowSoftness: 28, shadowOffset: 20,
          strength: open, color: [1, 1, 1], surface: [.045, .03, .046], edgeClear: 0,
          border: [.95, .90, .96], borderAlpha: .43 * open, borderWidth: .85,
          screenX: left + x, screenY: top + height / 2, cursorLight: true,
          tune: { rim: 1.25, fresnel: 1.2, reflection: 1.6, caustic: .2 },
          refraction: {
            paint(back) {
              back.fillStyle = "#0c080d";
              back.fillRect(0, 0, width + padding * 2, height + padding * 2);
              back.fillStyle = trackColor;
              back.beginPath();
              back.roundRect(padding, padding, width, height, height / 2);
              back.fill();
              back.fillStyle = "#bbb3bb";
              back.font = font;
              back.textBaseline = "middle";
              back.textAlign = "center";
              back.fillText("Slide to book", padding + textX, y);
            },
            refract: 24 * open, magnify: .17 * open, dispersion: .065 * open,
            blurCenter: .2, blurEdge: 1.45, frost: 1 - open,
          },
          reflection: {
            height: size,
            paint(around, reach) {
              const warm = around.createLinearGradient(0, padding - reach, 0, padding + 9);
              warm.addColorStop(0, "#EA0028");
              warm.addColorStop(1, "#180b14");
              around.fillStyle = warm;
              around.fillRect(-reach, -reach, width + padding * 2 + 2 * reach, reach + padding + 7);
            },
          },
        };
      },
      drawn() { slider.dataset.glassDrawn = ""; },
      lost() { delete slider.dataset.glassDrawn; },
    } : null;
    if (view) engine.add(view);

    function paint() {
      slider.style.setProperty("--slide-x", `${from + position.x}px`);
      slider.style.setProperty("--slide-open", String(clamp(press.x)));
      if (press.x <= .015) delete slider.dataset.glassDrawn;
      if (view) {
        view.repaint = true;
        engine.wake();
      }
    }

    function tick(now) {
      frame = 0;
      const dt = previous ? Math.min(.05, (now - previous) / 1000) : 1 / 60;
      previous = now;
      const travelActive = stepSpring(position, target, pointer?.moved ? SPRINGS.drag : settle, dt);
      const pressActive = stepSpring(press, pointer ? 1 : 0, SPRINGS.press, dt);
      paint();
      if (travelActive || pressActive) frame = requestAnimationFrame(tick);
      else previous = 0;
    }

    function schedule() {
      if (reduced.matches) {
        cancelAnimationFrame(frame);
        frame = previous = 0;
        position.x = target;
        position.v = press.x = press.v = 0;
        paint();
        return;
      }
      if (!frame) frame = requestAnimationFrame(tick);
    }

    function setPhase(next) {
      phase = next;
      slider.dataset.phase = next;
    }

    function measure() {
      const bounds = slider.getBoundingClientRect();
      if (!bounds.height || !bounds.width) return;
      const previousTravel = travel;
      width = bounds.width;
      height = bounds.height;
      left = bounds.left;
      top = bounds.top;
      from = height / 2;
      travel = Math.max(1, width - height);
      position.x *= travel / previousTravel;
      target *= travel / previousTravel;
      textX = (width + height) / 2 - 4;
      trackColor = getComputedStyle(slider).backgroundColor;
      const style = getComputedStyle(label);
      font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
      paint();
    }

    function reset() {
      window.clearTimeout(confirmation);
      window.clearTimeout(navigation);
      window.clearTimeout(resetTimer);
      pointer = null;
      ignoreClick = false;
      target = 0;
      setPhase("rest");
      schedule();
    }

    function confirm() {
      if (phase === "settling" || phase === "confirmed") return;
      setPhase("settling");
      target = travel;
      schedule();
      confirmation = window.setTimeout(() => {
        setPhase("confirmed");
        navigation = window.setTimeout(() => {
          link.click();
          resetTimer = window.setTimeout(reset, 1000);
        }, reduced.matches ? 0 : 160);
      }, reduced.matches ? 0 : 520);
    }

    function onDown(event) {
      if (!event.isPrimary || event.button !== 0 || phase !== "rest") return;
      ignoreClick = false;
      pointer = { id: event.pointerId, x: event.clientX, start: position.x, moved: false };
      slider.setPointerCapture(event.pointerId);
      setPhase("pressing");
      schedule();
    }

    function onMove(event) {
      if (pointer?.id !== event.pointerId) return;
      const delta = event.clientX - pointer.x;
      if (!pointer.moved && Math.abs(delta) < 5) return;
      pointer.moved = true;
      target = clamp((pointer.start + delta) / travel) * travel;
      schedule();
    }

    function onRelease(event) {
      if (pointer?.id !== event.pointerId) return;
      const moved = pointer.moved;
      pointer = null;
      ignoreClick = moved;
      if (event.type === "pointerup" && moved && target >= travel * .76) {
        confirm();
      } else {
        target = 0;
        setPhase("rest");
        schedule();
      }
    }

    function onClick(event) {
      if (event.detail !== 0 && ignoreClick) return;
      confirm();
    }

    const events = new AbortController();
    const { signal } = events;
    slider.addEventListener("pointerdown", onDown, { signal });
    window.addEventListener("pointermove", onMove, { signal });
    window.addEventListener("pointerup", onRelease, { signal });
    window.addEventListener("pointercancel", onRelease, { signal });
    slider.addEventListener("click", onClick, { signal });
    slider.addEventListener("keydown", event => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      if (!event.repeat) confirm();
    }, { signal });
    window.addEventListener("pageshow", event => { if (event.persisted) reset(); }, { signal });
    reduced.addEventListener("change", schedule, { signal });

    root.dataset.ticketSlideReady = "";
    const resize = new ResizeObserver(measure);
    resize.observe(slider);
    measure();

    return () => {
      events.abort();
      resize.disconnect();
      cancelAnimationFrame(frame);
      window.clearTimeout(confirmation);
      window.clearTimeout(navigation);
      window.clearTimeout(resetTimer);
      if (view) engine.remove(view);
      delete root.dataset.ticketSlideReady;
    };
  }, []);

  return (
    <div className="ticket-slide" ref={rootRef} data-glass-skip="">
      <a className="ticket-slide-fallback" href="/#ticket-prices" data-ticket-jump ref={linkRef}>
        Get Tickets <ArrowUpRight size={15} aria-hidden="true" />
      </a>
      <button className="ticket-slide-control" type="button" aria-label="Book tickets" ref={sliderRef}>
        <span className="ticket-slide-label" aria-hidden="true" ref={labelRef}>Slide to book</span>
        <span className="ticket-slide-confirmed" aria-live="polite">Opening tickets</span>
        <span className="ticket-slide-thumb" aria-hidden="true" />
        <canvas className="ticket-slide-glass" ref={canvasRef} aria-hidden="true" />
        <span className="ticket-slide-icon" aria-hidden="true">
          <ArrowRight className="ticket-slide-arrow" size={16} strokeWidth={2.2} />
          <Check className="ticket-slide-check" size={19} strokeWidth={2.1} />
        </span>
      </button>
    </div>
  );
}
