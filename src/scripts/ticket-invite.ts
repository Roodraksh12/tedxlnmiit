function initTicketInvite() {
  const invite = document.querySelector<HTMLElement>('[data-ticket-invite]');
  if (!invite) return;
  const stage = invite.querySelector<HTMLElement>('.ticket-invite-stage')!;
  const link = invite.querySelector<HTMLAnchorElement>('[data-ticket-transition]')!;
  const svg = link.querySelector<SVGSVGElement>('svg')!;
  const lettering = svg.querySelector<SVGGElement>('g')!;
  const text = svg.querySelector<SVGTextElement>('text')!;
  const dot = invite.querySelector<HTMLElement>('.ticket-dot')!;
  const reveal = invite.querySelector<HTMLElement>('.ticket-reveal')!;
  const heading = invite.querySelector<HTMLElement>('.ticket-heading')!;
  const footnote = invite.querySelector<HTMLElement>('.ticket-footnote')!;
  const cue = invite.querySelector<HTMLElement>('.ticket-scroll-cue')!;
  const backdrop = invite.querySelector<HTMLElement>('.ticket-backdrop')!;
  const destination = invite.querySelector<HTMLElement>('#ticket-prices')!;
  const compact = matchMedia('(max-height: 649px)');
  const events = new AbortController();
  let frame = 0, active = true, lastProgress = -1, enhanced = false;
  let metrics: ReturnType<typeof measure> | undefined;
  let playback: { start: number; from: number; to: number; duration: number; navigation?: boolean } | undefined;
  let navigationSequence = 0;
  let navigationVeil: HTMLElement | undefined;
  let pendingAnchor = location.hash === '#ticket-prices';
  const clamp = (n: number) => Math.max(0, Math.min(1, n));
  const segment = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
  const smooth = (p: number) => p * p * (3 - 2 * p);
  const mix = (a: number, b: number, p: number) => a + (b - a) * p;

  function configure() {
    const next = document.documentElement.dataset.motion === 'full' && !compact.matches;
    if (next === enhanced && metrics) return;
    enhanced = next;
    invite!.classList.toggle('is-scroll-invite', enhanced);
    metrics = undefined;
    lastProgress = -1;
    if (!enhanced) {
      playback = undefined;
      reveal.inert = false;
      for (const el of [reveal, heading, footnote, backdrop]) el.removeAttribute('style');
      link.tabIndex = -1;
    }
  }

  // One layout read per resize/font change. Scroll frames only read scrollY.
  function measure() {
    const width = stage.clientWidth, height = stage.clientHeight;
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    const box = text.getBBox();
    const localX = text.getComputedTextLength() + 10, localY = -7;
    const base = Math.min(width * .085 / 100, width * .96 / (localX + 7));
    const baseline = height / 2 - (box.y + box.height / 2) * base;
    const rect = reveal.getBoundingClientRect(), stageRect = stage.getBoundingClientRect();
    const inset = parseFloat(getComputedStyle(stage).top) || parseFloat(getComputedStyle(invite!).getPropertyValue('--site-header-height')) || 0;
    return { width, height, localX, localY, base,
      startX: (width - (localX + 7) * base) / 2 + localX * base,
      startY: baseline + localY * base,
      centerX: rect.left - stageRect.left + rect.width / 2,
      centerY: rect.top - stageRect.top + rect.height / 2,
      radius: Math.hypot(rect.width / 2, rect.height / 2) + 2,
      start: invite!.getBoundingClientRect().top + scrollY - inset,
      range: Math.max(1, invite!.offsetHeight - stage.offsetHeight) };
  }

  function paint(progress: number, m: NonNullable<typeof metrics>) {
    if (Math.abs(progress - lastProgress) < .000001) return;
    lastProgress = progress;
    const zoom = smooth(segment(progress, .10, .44));
    const pan = smooth(segment(progress, .10, .36));
    const diameter = Math.min(100, m.width * .2);
    const factor = Math.pow(diameter / (14 * m.base), zoom);
    const scale = m.base * factor;
    const x = mix(m.startX, m.centerX, pan), y = mix(m.startY, m.centerY, pan);
    // SVG geometry is re-rasterized at its actual size: no enlarged bitmap layer.
    lettering.setAttribute('transform', `matrix(${scale} 0 0 ${scale} ${x - m.localX * scale} ${y - m.localY * scale})`);
    const textOpacity = 1 - smooth(segment(progress, .29, .42));
    link.style.opacity = String(textOpacity);
    link.style.visibility = textOpacity === 0 ? 'hidden' : '';
    link.style.pointerEvents = textOpacity < .1 ? 'none' : '';
    link.tabIndex = textOpacity < .1 ? -1 : 0;
    link.setAttribute('aria-hidden', String(textOpacity < .1));
    dot.style.transform = `translate(${x - 55}px,${y - 55}px) scale(${14 * scale / 110})`;
    dot.style.opacity = String(1 - segment(progress, .535, .57));
    const opening = smooth(segment(progress, .52, .9));
    reveal.style.clipPath = opening === 1 ? 'none' : `circle(${mix(diameter / 2, m.radius, opening)}px at 50% 50%)`;
    reveal.style.opacity = String(segment(progress, .52, .55));
    reveal.style.setProperty('--ticket-details', String(smooth(segment(progress, .54, .64))));
    reveal.inert = progress < .9;
    const arrival = smooth(segment(progress, .83, .96));
    heading.style.opacity = footnote.style.opacity = String(arrival);
    backdrop.style.opacity = String(smooth(segment(progress, .32, .72)));
    cue.style.opacity = String(1 - segment(progress, .08, .2));
  }

  function update(now: number) {
    frame = 0;
    configure();
    if (!enhanced) return;
    const m = metrics ??= measure();
    let finished = false;
    if (playback) {
      const elapsed = clamp((now - playback.start) / playback.duration);
      window.scrollTo({ top: mix(playback.from, playback.to, smooth(elapsed)), behavior: 'instant' });
      if (elapsed === 1) { pendingAnchor = !!playback.navigation; playback = undefined; finished = true; }
    }
    paint(clamp((scrollY - m.start) / m.range), m);
    if (finished) destination.focus({ preventScroll: true });
    if (playback) schedule();
  }
  function schedule() { if (!frame) frame = requestAnimationFrame(update); }
  function invalidate() { metrics = undefined; lastProgress = -1; schedule(); }
  function cancelNavigation() {
    navigationSequence++;
    navigationVeil?.getAnimations().forEach(animation => animation.cancel());
    navigationVeil?.remove();
    navigationVeil = undefined;
  }
  function stopPlayback() { playback = undefined; pendingAnchor = false; cancelNavigation(); }

  function jumpToTicket() {
    cancelNavigation();
    playback = undefined;
    configure();
    if (enhanced) {
      const m = metrics ??= measure();
      // Commit the final composition before moving the viewport, in the same task.
      paint(1, m);
      window.scrollTo({ top: m.start + m.range, behavior: 'instant' });
    } else destination.scrollIntoView({ behavior: 'instant', block: 'start' });
    document.documentElement.classList.remove('ticket-entry');
    destination.focus({ preventScroll: true });
  }

  async function navigateToTicket() {
    stopPlayback();
    if (document.documentElement.dataset.motion !== 'full') {
      pendingAnchor = true;
      jumpToTicket();
      return;
    }
    const sequence = navigationSequence;
    const veil = document.createElement('div');
    veil.className = 'ticket-navigation-veil';
    veil.setAttribute('aria-hidden', 'true');
    document.body.append(veil);
    navigationVeil = veil;
    await veil.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: 120, easing: 'ease-out', fill: 'forwards',
    }).finished.catch(() => {});
    if (sequence !== navigationSequence) return;

    configure();
    if (enhanced) {
      const m = metrics ??= measure();
      const from = m.start + m.range * .52;
      // Move behind the brief fade, then play only the dot-to-ticket reveal.
      paint(.52, m);
      window.scrollTo({ top: from, behavior: 'instant' });
      playback = { start: performance.now(), from, to: m.start + m.range, duration: 850, navigation: true };
      schedule();
    } else {
      destination.scrollIntoView({ behavior: 'instant', block: 'start' });
      destination.focus({ preventScroll: true });
      pendingAnchor = true;
    }
    document.documentElement.classList.remove('ticket-entry');
    await veil.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: 180, easing: 'ease-in', fill: 'forwards',
    }).finished.catch(() => {});
    if (sequence === navigationSequence) { veil.remove(); navigationVeil = undefined; }
  }

  link.addEventListener('click', event => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || !enhanced) return;
    event.preventDefault();
    pendingAnchor = false;
    const m = metrics ??= measure();
    cancelNavigation();
    playback = { start: performance.now(), from: Math.max(m.start, Math.min(scrollY, m.start + m.range)), to: m.start + m.range, duration: 1600 };
    schedule();
  }, { signal: events.signal });

  // Navigation hands off to the short reveal without scrolling through the page.
  document.addEventListener('click', event => {
    const anchor = (event.target as Element).closest?.('a[href]') as HTMLAnchorElement | null;
    if (!anchor || anchor === link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || (anchor.target && anchor.target !== '_self') || anchor.hasAttribute('download')) return;
    const url = new URL(anchor.href, location.href);
    if (url.origin !== location.origin || !((url.pathname === '/' && url.hash === '#ticket-prices') || url.pathname === '/tickets')) return;
    event.preventDefault();
    if (location.hash !== '#ticket-prices') history.pushState(null, '', '/#ticket-prices');
    void navigateToTicket();
  }, { capture: true, signal: events.signal });

  window.addEventListener('scroll', () => { if (active || playback) schedule(); }, { passive: true, signal: events.signal });
  window.addEventListener('resize', () => { invalidate(); if (pendingAnchor) requestAnimationFrame(jumpToTicket); }, { signal: events.signal });
  window.addEventListener('wheel', stopPlayback, { passive: true, signal: events.signal });
  window.addEventListener('touchstart', stopPlayback, { passive: true, signal: events.signal });
  window.addEventListener('keydown', event => {
    if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', 'Escape', ' '].includes(event.key)) stopPlayback();
  }, { signal: events.signal });
  window.addEventListener('hashchange', () => { pendingAnchor = location.hash === '#ticket-prices'; if (pendingAnchor) jumpToTicket(); }, { signal: events.signal });
  window.addEventListener('motion:change', invalidate, { signal: events.signal });
  window.addEventListener('pageshow', () => { invalidate(); if (pendingAnchor) requestAnimationFrame(jumpToTicket); }, { signal: events.signal });
  compact.addEventListener('change', invalidate, { signal: events.signal });
  const sizes = new ResizeObserver(invalidate); sizes.observe(reveal);
  const visibility = new IntersectionObserver(entries => { active = entries[0].isIntersecting; if (active) schedule(); }, { rootMargin: '100px' });
  visibility.observe(invite);
  document.fonts.ready.then(() => {
    if (events.signal.aborted) return;
    invalidate();
    if (pendingAnchor) jumpToTicket();
  });
  configure();
  if (pendingAnchor) jumpToTicket(); else schedule();
  const cleanup = () => { cancelNavigation(); cancelAnimationFrame(frame); sizes.disconnect(); visibility.disconnect(); events.abort(); };
  document.addEventListener('astro:before-swap', cleanup, { once: true });
  if (import.meta.hot) import.meta.hot.dispose(cleanup);
}
initTicketInvite();
