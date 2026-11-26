import { createNorthPetals } from "./north-petals";

const hero = document.querySelector<HTMLElement>('[data-north-hero]');
const stage = hero?.querySelector<HTMLElement>('.north-layout');
const course = document.querySelector<HTMLElement>('[data-north-course]');

if (hero && stage && course && CSS.supports('clip-path', 'polygon(0 0, 100% 0, 0 100%)')) {
  initNorthJourney(hero, stage, course);
}

function initNorthJourney(hero: HTMLElement, stage: HTMLElement, course: HTMLElement) {
  const motion = matchMedia('(prefers-reduced-motion: no-preference)');
  const controller = new AbortController();
  const { signal } = controller;
  const countdown = document.querySelector<HTMLElement>('.home-countdown');
  const checkpoints = [...document.querySelectorAll<HTMLElement>('[data-north-waypoint], [data-ticket-invite]')];
  const footer = document.querySelector('footer');
  const title = stage.querySelector<HTMLElement>('#north-title')!;
  const north = title.querySelector<HTMLElement>('.north-title-north')!;
  const copy = title.parentElement!;
  const compass = stage.querySelector<HTMLElement>('.north-compass')!;
  const pieces = [...stage.querySelectorAll<HTMLElement>('.north-piece')];
  const petals = createNorthPetals(hero, stage, title, compass);
  const arrivals = [[.15, .51], [.21, .56], [.26, .62], [.31, .67]];
  const clamp = (value: number) => Math.min(1, Math.max(0, value));
  let frame = 0;
  let lastFrame = 0;
  let visualScroll = scrollY;
  let start = 0;
  let travel = 1;
  let stops: number[] = [];
  let courseEnd = 0;
  let viewport = 0;
  let layoutWidth = 0;
  let mobile = false;
  let initialTitleScale = 1.36;
  let previousProgress = -1;

  function phase(value: number, from: number, to: number) {
    const position = clamp((value - from) / (to - from));
    return position * position * (3 - 2 * position);
  }

  function coursePosition(value: number) {
    const step = stops.findIndex(stop => value < stop);
    if (step === 0 || stops.length < 2) return 0;
    if (step === -1) return 1;
    const before = stops[step - 1];
    const fraction = (value - before) / (stops[step] - before);
    return (step - 1 + fraction) / (stops.length - 1);
  }

  function paintHero(progress: number) {
    if (progress === previousProgress) return;
    previousProgress = progress;
    const gather = phase(progress, .08, .43);
    const center = 1 - phase(progress, .37, mobile ? .66 : .73);
    const artCenter = 1 - phase(progress, .68, mobile ? .85 : .92);
    const assembled = phase(progress, .64, .75);
    const details = phase(progress, .81, .96);
    const handoff = phase(progress, .97, 1);
    const arc = phase(progress, .16, .69);
    const trace = phase(progress, .68, .91);
    const lock = clamp((progress - .65) / .19);

    hero.style.setProperty('--north-center', String(center));
    hero.style.setProperty('--north-art-center', String(artCenter));
    hero.style.setProperty('--north-lift', String(gather * center));
    const titleScale = 1 + (initialTitleScale - 1) * center * (1 - .32 * gather);
    hero.style.setProperty('--north-title-scale', String(titleScale));
    hero.style.setProperty('--north-art-scale', String(1 + (mobile ? .035 : .09) * gather * artCenter - .04 * handoff));
    hero.style.setProperty('--north-assembled', String(assembled));
    hero.style.setProperty('--north-details', String(details));
    hero.style.setProperty('--north-details-visible', details > .04 ? 'visible' : 'hidden');
    hero.style.setProperty('--north-handoff', String(handoff));
    hero.style.setProperty('--north-arc', String(arc));
    hero.style.setProperty('--north-orbit-opacity', String(phase(progress, .12, .36) * (1 - handoff)));
    hero.style.setProperty('--north-lock', String(Math.sin(lock * Math.PI) * .52));
    hero.style.setProperty('--north-lock-scale', String(1 + lock * .17));
    hero.style.setProperty('--north-trace', String(trace));
    hero.style.setProperty('--north-cue', String(1 - phase(progress, .06, .32)));
    hero.style.setProperty('--north-intro', String(1 - phase(progress, .03, .16)));
    hero.style.setProperty('--north-intro-visibility', progress < .16 ? 'visible' : 'hidden');
    countdown?.style.setProperty('--countdown-trace', String(phase(progress, .90, 1)));

    pieces.forEach((piece, index) => {
      const [from, to] = arrivals[index];
      piece.style.setProperty('--piece-distance', String(1 - phase(progress, from, to)));
      piece.style.setProperty('--piece-opacity', String(phase(progress, from, from + .14) * (1 - assembled)));
    });
    petals?.paint(progress);
  }

  function paint(position: number) {
    const progress = clamp((position - start) / travel);
    paintHero(progress);
    const railIn = phase(progress, .96, 1);
    const railOut = 1 - phase(position, courseEnd - viewport * .3, courseEnd);
    course.style.setProperty('--north-course-opacity', String(railIn * railOut));
    course.style.setProperty('--north-course-position', String(coursePosition(position)));
  }

  function tick(now: number) {
    frame = 0;
    if (!motion.matches) return;
    const delta = lastFrame ? Math.min(50, now - lastFrame) : 16;
    lastFrame = now;
    const target = scrollY;
    const remaining = target - visualScroll;
    if (Math.abs(remaining) < .35) {
      visualScroll = target;
      lastFrame = 0;
    } else {
      visualScroll += remaining * (1 - Math.exp(-delta / (mobile ? 42 : 70)));
      frame = requestAnimationFrame(tick);
    }
    paint(visualScroll);
  }

  function schedule() {
    if (motion.matches && !frame) frame = requestAnimationFrame(tick);
  }

  function measureCourse() {
    const offset = scrollY;
    stops = [start + travel];
    for (const checkpoint of checkpoints.slice(1)) {
      const stop = checkpoint.getBoundingClientRect().top + offset - viewport * .55;
      stops.push(Math.max(stop, stops[stops.length - 1] + 1));
    }
    courseEnd = footer ? footer.getBoundingClientRect().top + offset - viewport * .52 : Infinity;
  }

  function measure() {
    cancelAnimationFrame(frame);
    frame = lastFrame = 0;
    previousProgress = -1;
    const header = document.querySelector('.ted-nav-header')?.getBoundingClientRect().height ?? 0;
    viewport = document.documentElement.clientHeight;
    layoutWidth = document.documentElement.clientWidth;
    mobile = matchMedia('(max-width: 700px)').matches;
    const available = parseFloat(getComputedStyle(stage).minHeight) || viewport - header;
    const pinned = motion.matches && stage.offsetHeight <= available + 2;
    initialTitleScale = mobile ? Math.min(1.07, stage.clientWidth * .94 / title.offsetWidth) : 1.36;

    start = hero.getBoundingClientRect().top + scrollY - header;
    travel = pinned
      ? Math.min(mobile ? 570 : 1050, mobile ? available * .94 : viewport * 1.12)
      : Math.min(mobile ? 235 : 335, viewport * .42);
    hero.style.setProperty('--north-travel', `${travel}px`);
    hero.style.setProperty('--north-title-x', `${(stage.clientWidth - title.offsetWidth) / 2 - copy.offsetLeft - title.offsetLeft}px`);
    const titleY = pinned ? (stage.clientHeight - title.offsetHeight) * (mobile ? .46 : .5) - copy.offsetTop - title.offsetTop : 0;
    hero.style.setProperty('--north-title-y', `${titleY}px`);
    hero.style.setProperty('--north-title-rise', `${pinned ? stage.clientHeight * (mobile ? .04 : .10) : 0}px`);
    hero.style.setProperty('--north-title-line', `${(title.offsetWidth - north.offsetWidth) / 2}px`);
    const artX = pinned ? stage.clientWidth / 2 - compass.offsetLeft - compass.offsetWidth * .54 : 0;
    const artY = pinned ? stage.clientHeight * (mobile ? .59 : .50) - compass.offsetTop - compass.offsetHeight * .45 : 0;
    hero.style.setProperty('--north-art-x', `${artX}px`);
    hero.style.setProperty('--north-art-y', `${artY}px`);
    hero.classList.toggle('is-assembling', motion.matches);
    hero.classList.toggle('is-pinned', pinned);

    measureCourse();
    petals?.resize();
    paint(motion.matches ? visualScroll : start);
    if (Math.abs(visualScroll - scrollY) > .35) schedule();
  }

  const sizes = new ResizeObserver(measure);
  sizes.observe(stage);
  sizes.observe(title);
  const courseSize = new ResizeObserver(() => {
    measureCourse();
    schedule();
  });
  if (hero.parentElement) courseSize.observe(hero.parentElement);
  window.addEventListener('scroll', schedule, { passive: true, signal });
  window.addEventListener('resize', () => {
    if (!mobile || layoutWidth !== document.documentElement.clientWidth) measure();
  }, { signal });
  motion.addEventListener('change', measure, { signal });
  void document.fonts.ready.then(() => {
    if (signal.aborted) return;
    measure();
    window.dispatchEvent(new Event('tedx:hero-ready'));
  });
  measure();

  import.meta.hot?.dispose(() => {
    controller.abort();
    sizes.disconnect();
    courseSize.disconnect();
    cancelAnimationFrame(frame);
    hero.classList.remove('is-pinned', 'is-assembling');
    paint(start);
  });
}
