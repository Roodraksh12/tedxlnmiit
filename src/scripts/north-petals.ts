export function createNorthPetals(hero: HTMLElement, stage: HTMLElement, heading: HTMLElement, compass: HTMLElement) {
  const canvas = stage.querySelector<HTMLCanvasElement>("[data-north-petals]");
  const ctx = canvas?.getContext("2d");
  if (!canvas || !ctx) return;
  const offscreen = document.createElement("canvas");
  const ink = offscreen.getContext("2d", { willReadFrequently: true });
  if (!ink) return;
  const spans = [...heading.querySelectorAll("span")];
  const clamp = (x: number) => Math.max(0, Math.min(1, x));
  const smooth = (x: number) => x * x * (3 - 2 * x);
  const ease = (p: number, start: number, end: number) => smooth(clamp((p - start) / (end - start)));
  let dpr = 1;
  let width = 0;
  let height = 0;
  let compact = false;
  let typography: { weight: string; size: number; family: string; spacing: number; color: string; height: number }[] = [];
  let seed = 2143;
  const random = () => ((seed = (Math.imul(1664525, seed) + 1013904223) >>> 0) / 4294967296);

  function lines() {
    const bounds = canvas.getBoundingClientRect();
    return spans.map((span, index) => {
      const rect = span.getBoundingClientRect();
      const style = typography[index];
      const scale = rect.height / style.height;
      return {
        x: rect.left - bounds.left, y: rect.top - bounds.top,
        width: rect.width, height: rect.height, text: span.textContent ?? "",
        font: `${style.weight} ${style.size * scale}px "${style.family}"`,
        spacing: `${style.spacing * scale}px`,
        color: style.color,
      };
    });
  }

  function drawText(geometry: ReturnType<typeof lines>) {
    ink!.clearRect(0, 0, width, height);
    for (const line of geometry) {
      ink!.font = line.font;
      ink!.letterSpacing = line.spacing;
      ink!.fillStyle = line.color;
      const metrics = ink!.measureText(line.text);
      const ascent = metrics.fontBoundingBoxAscent;
      const descent = metrics.fontBoundingBoxDescent;
      ink!.fillText(line.text, line.x, line.y + (line.height + ascent - descent) / 2);
    }
  }

  function makePetals(geometry: ReturnType<typeof lines>) {
    drawText(geometry);
    const pixels = ink!.getImageData(0, 0, canvas.width, canvas.height).data;
    const petals = [];
    seed = 2143;
    const count = compact ? 96 : 185;
    for (let attempts = 0; attempts < count * 18 && petals.length < count; attempts++) {
      const index = Math.floor(random() * geometry.length);
      const line = geometry[index];
      const u = random();
      const v = random();
      const px = Math.floor((line.x + line.width * u) * dpr);
      const py = Math.floor((line.y + line.height * v) * dpr);
      if (px < 0 || py < 0 || px >= canvas.width || py >= canvas.height ||
          pixels[(py * canvas.width + px) * 4 + 3] < 125) continue;
      petals.push({
        index, u, v, birth: .105 + .23 * u + random() * .045 + index * .022,
        vx: -.36 + random() * 1.45, vy: (random() - .60) * .44, wave: .8 + random() * 2.1,
        spin: (random() - .5) * 8, angle: random() * Math.PI * 2, size: 1.8 + random() * 4.3,
        color: ["#ea0028", "#a0182c", "#f16870", "#f8e8e7", "#fff5ec"][Math.floor(random() * 5)],
        returnDelay: random() * .10,
      });
    }
    return petals;
  }

  let petals: ReturnType<typeof makePetals> = [];

  function resize() {
    compact = matchMedia("(max-width: 700px)").matches;
    const resolution = compact ? 1 : Math.min(devicePixelRatio || 1, 1.5);
    typography = spans.map(span => {
      const style = getComputedStyle(span);
      return {
        weight: style.fontWeight, size: parseFloat(style.fontSize),
        family: style.fontFamily.split(",")[0].replaceAll('"', ""),
        spacing: parseFloat(style.letterSpacing) || 0, color: style.color,
        height: span.offsetHeight || 1,
      };
    });
    if (width === canvas.clientWidth && height === canvas.clientHeight && dpr === resolution) return;
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    dpr = resolution;
    canvas.width = offscreen.width = Math.max(1, Math.round(width * dpr));
    canvas.height = offscreen.height = Math.max(1, Math.round(height * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ink!.setTransform(dpr, 0, 0, dpr, 0, 0);
    petals = [];
  }

  function paint(progress: number) {
    ctx.clearRect(0, 0, width, height);
    const returnStart = compact ? .65 : .70;
    const returnEnd = compact ? .95 : .97;
    const amount = ease(progress, .10, compact ? .39 : .42) * (1 - ease(progress, returnStart, returnEnd));
    if (amount === 0 || width === 0 || height === 0) {
      hero.style.removeProperty("--north-title-opacity");
      return;
    }

    const geometry = lines();
    if (!petals.length) petals = makePetals(geometry);
    if (!petals.length) return;
    const blend = ease(amount, .005, .17);
    hero.style.setProperty("--north-title-opacity", String(1 - blend));
    if (amount < .999) {
      drawText(geometry);
      ink!.globalCompositeOperation = "destination-out";
      geometry.forEach((line, index) => {
        const erosion = ease(amount, index * .07, .91 + index * .045);
        const feather = Math.max(11, line.width * .095);
        const edge = line.x - feather + (line.width + feather * 2) * erosion;
        const mask = ink!.createLinearGradient(edge - feather, 0, edge + feather, 0);
        mask.addColorStop(0, "black");
        mask.addColorStop(1, "transparent");
        ink!.fillStyle = mask;
        ink!.fillRect(line.x - 4, line.y - 3, line.width + 8, line.height + 6);
      });
      ink!.globalCompositeOperation = "source-over";
      ctx.globalAlpha = blend;
      ctx.drawImage(offscreen, 0, 0, width, height);
      ctx.globalAlpha = 1;
    }

    const bounds = canvas.getBoundingClientRect();
    const art = compass.getBoundingClientRect();
    const hubX = art.left - bounds.left + art.width * .54;
    const hubY = art.top - bounds.top + art.height * .45;
    const spread = Math.min(compact ? 72 : 170, width * .21);
    const collect = ease(progress, compact ? .36 : .41, compact ? .67 : .73);

    for (const petal of petals) {
      if (progress <= petal.birth) continue;
      const returnAt = returnStart + petal.returnDelay * (compact ? .65 : 1);
      const home = ease(progress, returnAt, returnEnd);
      if (home >= 1) continue;
      const line = geometry[petal.index];
      const fromX = line.x + line.width * petal.u;
      const fromY = line.y + line.height * petal.v;
      const flight = ease(progress, petal.birth, .48);
      const angle = petal.angle + progress * 5;
      const loop = spread * (.22 + .31 * Math.abs(petal.vx)) * (1 - .65 * collect);
      const orbitX = hubX + Math.cos(angle) * loop;
      const orbitY = hubY + Math.sin(angle) * loop * .62;
      const kick = Math.sin(flight * Math.PI) * spread * (1 - collect);
      const x = fromX + (orbitX - fromX) * flight * (1 - home) + petal.vx * kick;
      const y = fromY + (orbitY - fromY) * flight * (1 - home) + petal.vy * kick;
      const flutter = Math.cos(petal.angle + progress * petal.wave * 28);
      const size = petal.size * (compact ? .78 : .91) * (1 - .35 * collect * (1 - home));
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(petal.angle + progress * petal.spin * 3.5);
      ctx.scale(Math.max(.18, Math.abs(flutter)), 1);
      ctx.globalAlpha = ease(progress, petal.birth, petal.birth + .045) * (1 - home);
      ctx.fillStyle = petal.color;
      ctx.beginPath();
      ctx.moveTo(-size, 0);
      ctx.quadraticCurveTo(-size * .12, -size * .78, size, -size * .22);
      ctx.quadraticCurveTo(size * .40, size * .84, -size, 0);
      ctx.fill();
      ctx.restore();
    }
  }

  return { paint, resize };
}
