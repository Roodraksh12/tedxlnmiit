export function mountMobileDock(nav: HTMLElement) {
  const reopen = nav.querySelector<HTMLButtonElement>('.ted-nav-reopen');
  if (!reopen) return;

  const links = [...nav.querySelectorAll<HTMLAnchorElement>('.ted-nav-link')];
  const active = nav.querySelector<HTMLAnchorElement>('[aria-current="page"]') ?? links[0];
  const enabled = matchMedia('(max-width: 1199px) and (prefers-reduced-motion: no-preference)');
  const listeners = new AbortController();
  const { signal } = listeners;
  const scroller = document.scrollingElement ?? document.documentElement;
  const scrollPosition = () => Math.max(0, Math.min(window.scrollY, scroller.scrollHeight - scroller.clientHeight));
  let lastY = scrollPosition();
  let travel = 0;
  let frame = 0;
  let pointer: number | null = null;
  let collapsed = false;

  function setCollapsed(next: boolean) {
    travel = 0;
    if (next === collapsed) return;
    collapsed = next;
    nav.toggleAttribute('data-dock-collapsed', next);
    for (const link of links) link.inert = next;
  }

  function update() {
    frame = 0;
    const y = scrollPosition();
    const delta = y - lastY;
    lastY = y;
    if (!enabled.matches || y <= 24) {
      setCollapsed(false);
      return;
    }
    if (!delta) return;

    // Keep track of net travel in one direction so small scroll corrections
    // and mobile browser toolbar movement don't toggle the dock.
    const engaged = pointer !== null || nav.hasAttribute('data-glass-engaged') ||
      document.documentElement.hasAttribute('data-mobile-tab-transition') ||
      nav.matches(':has(:focus-visible)') || document.documentElement.dataset.navArrival === 'pending';
    if (engaged) {
      travel = 0;
      return;
    }
    if (collapsed ? delta > 0 : delta < 0) {
      travel = 0;
      return;
    }
    travel += delta;
    if (travel >= 24 || travel <= -16) setCollapsed(!collapsed);
  }

  window.addEventListener('scroll', () => {
    if (!frame && enabled.matches) frame = requestAnimationFrame(update);
  }, { passive: true, signal });
  enabled.addEventListener('change', () => {
    lastY = scrollPosition();
    setCollapsed(false);
  }, { signal });
  nav.addEventListener('pointerdown', event => {
    if (event.isPrimary && event.button === 0) pointer = event.pointerId;
  }, { passive: true, signal });
  const releasePointer = (event: PointerEvent) => {
    if (event.pointerId === pointer) pointer = null;
  };
  window.addEventListener('pointerup', releasePointer, { signal });
  window.addEventListener('pointercancel', releasePointer, { signal });
  window.addEventListener('blur', () => { pointer = null; }, { signal });
  reopen.addEventListener('click', event => {
    setCollapsed(false);
    if (event.detail === 0) active?.focus({ preventScroll: true });
  }, { signal });

  return () => {
    listeners.abort();
    cancelAnimationFrame(frame);
    setCollapsed(false);
  };
}
