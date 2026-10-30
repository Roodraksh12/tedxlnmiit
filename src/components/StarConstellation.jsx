import { useEffect, useRef } from 'react';

export default function StarConstellation() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d', { alpha: false });
    if (!ctx) return;
    const cache = document.createElement('canvas');
    const base = cache.getContext('2d', { alpha: false });
    let width = 0, height = 0, ratio = 1, stars = [], seed = 317;
    let frame = 0, last = 0, pointer = null, dirty = false, pausedUntil = 0;
    let highlighted = new Map(), edges = [], pulse = null, interactive = false;
    const rand = () => { seed = seed * 16807 % 2147483647; return (seed - 1) / 2147483646; };
    function star(g, s, radius, color, alpha) {
      g.globalAlpha = alpha; g.fillStyle = color;
      g.beginPath();
      g.moveTo(s.x, s.y - radius); g.lineTo(s.x + radius * .18, s.y - radius * .18);
      g.lineTo(s.x + radius * .8, s.y); g.lineTo(s.x + radius * .18, s.y + radius * .18);
      g.lineTo(s.x, s.y + radius); g.lineTo(s.x - radius * .18, s.y + radius * .18);
      g.lineTo(s.x - radius * .8, s.y); g.lineTo(s.x - radius * .18, s.y - radius * .18);
      g.closePath(); g.fill();
    }
    function wake() { if (!frame && !document.hidden) frame = requestAnimationFrame(draw); }
    function resize() {
      const rect = canvas.getBoundingClientRect();
      width = rect.width; height = rect.height;
      interactive = document.documentElement.dataset.motion === 'full';
      ratio = Math.min(devicePixelRatio || 1, interactive ? 1.5 : 1);
      canvas.width = cache.width = Math.round(width * ratio);
      canvas.height = cache.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0); base.setTransform(ratio, 0, 0, ratio, 0, 0);
      seed = 317; stars = []; highlighted.clear(); edges = []; pointer = pulse = null;
      base.globalAlpha = 1; base.fillStyle = '#070609'; base.fillRect(0, 0, width, height);
      const wash = base.createRadialGradient(width * .8, height * .8, 0, width * .8, height * .8, width * .7);
      wash.addColorStop(0, '#EB00280c'); wash.addColorStop(1, '#07060900'); base.fillStyle = wash; base.fillRect(0, 0, width, height);
      const count = Math.min(interactive ? 850 : 450, Math.round(width * height / 2600));
      for (let i = 0; i < count; i++) {
        base.globalAlpha = .08 + rand() * .18; base.fillStyle = '#fff0d6';
        base.fillRect(rand() * width, rand() * height, .5 + rand() * .5, .5 + rand() * .5);
      }
      const cols = Math.max(4, Math.round(width / 125)), rows = Math.max(3, Math.round(height / 115));
      for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
        const s = { x: (x + .15 + rand() * .7) * width / cols, y: (y + .15 + rand() * .7) * height / rows, r: 1.8 + rand() * 2.4 };
        stars.push(s); star(base, s, s.r, '#fff0d6', .2 + rand() * .24);
      }
      base.globalAlpha = 1; last = 0; wake();
    }
    function select() {
      dirty = false;
      highlighted.forEach(item => { item.target = 0; }); edges = [];
      if (!pointer) return;
      const radius = Math.min(165, width * .45), distance = radius * radius;
      const near = [];
      stars.forEach((s, i) => { const d = (s.x - pointer.x) ** 2 + (s.y - pointer.y) ** 2; if (d < distance) near.push({ i, d }); });
      near.sort((a, b) => a.d - b.d); near.length = Math.min(5, near.length);
      near.forEach(({ i, d }) => {
        if (!highlighted.has(i)) highlighted.set(i, { alpha: 0, target: 0 });
        highlighted.get(i).target = Math.max(.1, 1 - Math.sqrt(d) / radius);
      });
      for (let i = 1; i < near.length; i++) edges.push([near[i - 1].i, near[i].i]);
    }
    function draw(now) {
      frame = 0;
      const dt = Math.min(40, last ? now - last : 16); last = now;
      const ease = 1 - Math.exp(-dt / 115);
      if (dirty) select();
      // Dust, the wash and every idle star are a single cached image copy.
      ctx.globalAlpha = 1; ctx.shadowBlur = 0; ctx.drawImage(cache, 0, 0, width, height);
      let moving = false;
      for (const [i, item] of highlighted) {
        item.alpha += (item.target - item.alpha) * ease;
        if (Math.abs(item.target - item.alpha) > .005) moving = true;
        if (item.target === 0 && item.alpha < .005) { highlighted.delete(i); continue; }
        star(ctx, stars[i], stars[i].r * (1 + item.alpha * .8), '#fff5e7', item.alpha * .85);
      }
      ctx.strokeStyle = '#EB0028'; ctx.lineWidth = .8;
      for (const [a, b] of edges) {
        ctx.globalAlpha = Math.min(highlighted.get(a)?.alpha || 0, highlighted.get(b)?.alpha || 0) * .5;
        ctx.beginPath(); ctx.moveTo(stars[a].x, stars[a].y); ctx.lineTo(stars[b].x, stars[b].y); ctx.stroke();
      }
      if (pointer && highlighted.size) {
        const [i, item] = highlighted.entries().next().value;
        star(ctx, stars[i], stars[i].r + 4, '#EB0028', item.alpha);
      }
      if (pulse) {
        const t = (now - pulse.start) / 650;
        if (t < 1) {
          moving = true; ctx.globalAlpha = (1 - t) * .4; ctx.strokeStyle = '#EB0028';
          ctx.beginPath(); ctx.arc(pulse.x, pulse.y, 6 + t * 45, 0, Math.PI * 2); ctx.stroke();
        } else pulse = null;
      }
      ctx.globalAlpha = 1;
      if (moving && interactive) wake();
    }
    function locate(event) {
      if (!interactive || document.hidden || performance.now() < pausedUntil) return;
      pointer = { x: event.clientX, y: event.clientY }; dirty = true; wake();
    }
    function press(event) { locate(event); if (pointer && interactive) { pulse = { ...pointer, start: performance.now() }; wake(); } }
    function leave() { pointer = null; dirty = true; wake(); }
    function scroll() {
      pausedUntil = performance.now() + 160;
      if (pointer || highlighted.size || pulse) { pointer = pulse = null; highlighted.clear(); edges = []; dirty = false; wake(); }
    }
    function visibility() { if (document.hidden) { cancelAnimationFrame(frame); frame = 0; } else { last = 0; wake(); } }
    const observer = new ResizeObserver(resize); observer.observe(canvas);
    window.addEventListener('pointermove', locate, { passive: true });
    window.addEventListener('pointerdown', press, { passive: true });
    window.addEventListener('scroll', scroll, { passive: true });
    window.addEventListener('blur', leave);
    document.documentElement.addEventListener('pointerleave', leave);
    document.addEventListener('visibilitychange', visibility);
    window.addEventListener('motion:change', resize);
    return () => {
      cancelAnimationFrame(frame); observer.disconnect();
      window.removeEventListener('pointermove', locate); window.removeEventListener('pointerdown', press);
      window.removeEventListener('scroll', scroll); window.removeEventListener('blur', leave);
      document.documentElement.removeEventListener('pointerleave', leave);
      document.removeEventListener('visibilitychange', visibility); window.removeEventListener('motion:change', resize);
    };
  }, []);
  return <canvas ref={canvasRef} aria-hidden="true" style={{ display: 'block', width: '100%', height: '100%', pointerEvents: 'none' }} />;
}
