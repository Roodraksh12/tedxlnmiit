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
  const arrivals = [[.08, .49], [.19, .62], [.29, .70], [.39, .79]];
  const clamp = (value: number) => Math.min(1, Math.max(0, value));
  let frame = 0;
  let lastFrame = 0;
  let visualScroll = scrollY;
  let start = 0;
  let travel = 1;
  let stops: number[] = [];
  let courseEnd = 0;
  let viewport = 0;
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
    const gather = phase(progress, .04, .42);
    const settle = phase(progress, .79, .95);
    const center = 1 - settle;
    const lift = gather * center;
    const assembled = phase(progress, .77, .83);
    const details = phase(progress, .88, .97);
    const handoff = phase(progress, .97, 1);
    const arc = phase(progress, .24, .79);
    const trace = phase(progress, .78, .92);
    const lock = clamp((progress - .77) / .16);

    hero.style.setProperty('--north-center', String(center));
    hero.style.setProperty('--north-lift', String(lift));
    hero.style.setProperty('--north-title-scale', String(1 + .46 * center - .87 * lift));
    hero.style.setProperty('--north-art-scale', String(1 + .20 * lift - .10 * handoff));
    hero.style.setProperty('--north-assembled', String(assembled));
    hero.style.setProperty('--north-details', String(details));
    hero.style.setProperty('--north-details-visible', details > .04 ? 'visible' : 'hidden');
    hero.style.setProperty('--north-handoff', String(handoff));
    hero.style.setProperty('--north-arc', String(arc));
    hero.style.setProperty('--north-orbit-opacity', String(phase(progress, .12, .36) * (1 - handoff)));
    hero.style.setProperty('--north-lock', String(Math.sin(lock * Math.PI) * .84));
    hero.style.setProperty('--north-lock-scale', String(1 + lock * .31));
    hero.style.setProperty('--north-trace', String(trace));
    hero.style.setProperty('--north-cue', String(1 - phase(progress, .06, .32)));
    countdown?.style.setProperty('--countdown-trace', String(phase(progress, .90, 1)));

    pieces.forEach((piece, index) => {
      const [from, to] = arrivals[index];
      piece.style.setProperty('--piece-distance', String(1 - phase(progress, from, to)));
      piece.style.setProperty('--piece-opacity', String(phase(progress, from, from + .11) * (1 - assembled)));
    });
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
      visualScroll += remaining * (1 - Math.exp(-delta / 70));
      frame = requestAnimationFrame(tick);
    }
    paint(visualScroll);
  }

  function schedule() {
    if (motion.matches && !frame) frame = requestAnimationFrame(tick);
  }

  function measure() {
    cancelAnimationFrame(frame);
    frame = lastFrame = 0;
    const header = document.querySelector('.ted-nav-header')?.getBoundingClientRect().height ?? 0;
    viewport = document.documentElement.clientHeight;
    const pinned = motion.matches && stage.offsetHeight <= viewport - header;
    const mobile = stage.clientWidth < 640;

    start = hero.getBoundingClientRect().top + scrollY - header;
    travel = pinned
      ? Math.min(mobile ? 510 : 690, viewport * (mobile ? .61 : .72))
      : Math.min(260, viewport * .40);
    hero.style.setProperty('--north-travel', `${travel}px`);
    hero.style.setProperty('--north-title-x', `${(stage.clientWidth - title.offsetWidth) / 2 - copy.offsetLeft - title.offsetLeft}px`);
    const titleY = pinned ? (stage.clientHeight - title.offsetHeight) / 2 - copy.offsetTop - title.offsetTop : 0;
    hero.style.setProperty('--north-title-y', `${titleY}px`);
    hero.style.setProperty('--north-title-rise', `${pinned ? stage.clientHeight * .34 : 0}px`);
    hero.style.setProperty('--north-title-line', `${(title.offsetWidth - north.offsetWidth) / 2}px`);
    const artX = pinned ? stage.clientWidth / 2 - compass.offsetLeft - compass.offsetWidth * .54 : 0;
    const artY = pinned ? stage.clientHeight * .55 - compass.offsetTop - compass.offsetHeight * .45 : 0;
    hero.style.setProperty('--north-art-x', `${artX}px`);
    hero.style.setProperty('--north-art-y', `${artY}px`);
    hero.classList.toggle('is-assembling', motion.matches);
    hero.classList.toggle('is-pinned', pinned);

    const courseStart = start + travel;
    stops = [courseStart];
    for (const checkpoint of checkpoints.slice(1)) {
      const stop = checkpoint.getBoundingClientRect().top + scrollY - viewport * .55;
      stops.push(Math.max(stop, stops[stops.length - 1] + 1));
    }
    courseEnd = footer ? footer.getBoundingClientRect().top + scrollY - viewport * .52 : Infinity;
    visualScroll = scrollY;
    paint(motion.matches ? visualScroll : start);
  }

  const sizes = new ResizeObserver(measure);
  sizes.observe(stage);
  sizes.observe(title);
  if (hero.parentElement) sizes.observe(hero.parentElement);
  window.addEventListener('scroll', schedule, { passive: true, signal });
  window.addEventListener('resize', measure, { signal });
  motion.addEventListener('change', measure, { signal });
  measure();

  import.meta.hot?.dispose(() => {
    controller.abort();
    sizes.disconnect();
    cancelAnimationFrame(frame);
    hero.classList.remove('is-pinned', 'is-assembling');
    paint(start);
  });
}
