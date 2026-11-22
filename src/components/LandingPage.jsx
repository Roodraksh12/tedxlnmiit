import { useEffect, useRef } from 'react';
import { heroArtwork } from '../data/heroArtwork';
import './LandingPage.css';

export default function LandingPage() {
  const rootRef = useRef(null);
  useEffect(() => {
    const root = rootRef.current;
    const stage = root.querySelector('.landing-stage');
    const art = root.querySelector('.north-art-motion');
    const artFrame = root.querySelector('.north-art-frame');
    const ticket = document.querySelector('.ted-nav-header .ted-ticket');
    const heading = root.querySelector('.north-inventing');
    const word = root.querySelector('.north-word-motion');
    const outline = root.querySelector('.north-word-outline');
    const solid = root.querySelector('.north-word-solid');
    const manifesto = root.querySelector('.north-manifesto');
    const closing = root.querySelector('.north-closing');
    const link = root.querySelector('.north-explore');
    const progress = root.querySelector('.north-progress-fill');
    let frame = 0, active = true, metrics, lastProgress = -1, lastFull, disposed = false;
    const clamp = n => Math.max(0, Math.min(1, n));
    const phase = (p,a,b) => { const t=clamp((p-a)/(b-a)); return t*t*(3-2*t); };
    const render = () => {
      frame = 0;
      const full = document.documentElement.dataset.motion === 'full';
      if (!metrics) {
        const height = stage.clientHeight;
        const mobile = stage.clientWidth < 700;
        const wordHeight = word.offsetHeight;
        const wordCenter = root.querySelector('.north-word-plane').offsetTop + wordHeight / 2;
        const wordScale = Math.min(mobile ? .94 : .68, height * .29 / wordHeight);
        const wordBottom = height - Math.max(60, Math.min(90, height * .08));
        const wordTop = wordBottom - wordHeight * wordScale;
        const headingStartOffset = Math.min(100, Math.max(28, window.innerHeight * .11));
        const headingShift = -headingStartOffset - height * .012;
        const headingBottom = heading.offsetTop + headingShift + heading.offsetHeight * .84;
        const artHeight = artFrame.offsetHeight;
        const artCenter = artFrame.offsetTop + artHeight / 2;
        const ticketBounds = ticket?.getBoundingClientRect();
        const stageBounds = stage.getBoundingClientRect();
        const stickyTop = parseFloat(getComputedStyle(stage).top) || 0;
        const artStartX = ticketBounds?.width
          ? ticketBounds.left + ticketBounds.width / 2 - stageBounds.left
          : stage.clientWidth - 48;
        const artStartY = ticketBounds?.height
          ? ticketBounds.top + ticketBounds.height / 2 - stickyTop
          : -24;
        const artStartScale = Math.min(.4, 110 / artHeight);
        const artScale = Math.min(1, Math.max(.25, (wordTop - headingBottom - 16) / artHeight));
        const artEndY = (headingBottom + wordTop) / 2;
        const curlAspect = mobile ? 1 : 1.65;
        const curlX = artStartX - stage.clientWidth / 2;
        const curlY = (artStartY - artEndY) * curlAspect;
        metrics = {
          start: root.getBoundingClientRect().top + scrollY - stickyTop,
          range: Math.max(1,root.offsetHeight-stage.offsetHeight),
          height, mobile, wordHeight, wordCenter, wordScale, headingShift,
          wordShift: wordBottom - wordHeight * wordScale / 2 - wordCenter,
          artHeight, artCenter, artScale, artStartScale, artEndY,
          curlAspect, curlRadius: Math.hypot(curlX, curlY),
          curlStartAngle: Math.atan2(curlY, curlX),
        };
      }
      const p=full?clamp((scrollY-metrics.start)/metrics.range):0;
      if(p===lastProgress&&full===lastFull)return;
      lastProgress=p;lastFull=full;
      const align=phase(p,.08,.86);
      const flight = phase(p, .015, .72);
      // A shrinking elliptical orbit curls inward around the final position.
      const curlAngle = metrics.curlStartAngle + 1.6 * Math.PI * flight;
      const curlRadius = metrics.curlRadius * (1 - flight) ** 1.6;
      const artX = Math.cos(curlAngle) * curlRadius;
      const artY = metrics.artEndY - metrics.artCenter
        + Math.sin(curlAngle) * curlRadius / metrics.curlAspect;
      // Grow throughout the curl and hold the arrival size.
      const growth = 1 - (1 - flight) ** 2.4;
      const arrivalScale = metrics.artScale;
      const artScale = metrics.artStartScale + (arrivalScale - metrics.artStartScale) * growth;
      const artRotation = -28 + 388 * flight;
      const wordScale = 1 + (metrics.wordScale - 1) * align;
      // Open the gap as the clock enters the hero and settle it by arrival.
      const wordShift = metrics.wordShift * phase(p, .12, .72);
      const wordTop = metrics.wordCenter + wordShift - metrics.wordHeight * wordScale / 2;
      const artBottom = metrics.artCenter + artY + metrics.artHeight * artScale / 2;
      // Keep the type outlined until the desktop artwork has cleared its bounds.
      const clearance = clamp((wordTop - artBottom + 2) / 18);
      const fill = (metrics.mobile ? phase(p,.65,.88) : clearance * clearance * (3 - 2 * clearance)) * phase(p,.65,.8);
      // The artwork stays on the same axis. Typography changes its relationship to it.
      art.style.opacity = full ? String(phase(flight, .04, .19)) : '';
      art.style.transform=`translate3d(${artX}px,${artY}px,0) rotate(${artRotation}deg) scale(${artScale})`;
      heading.style.transform=`translate3d(0,${metrics.headingShift * align}px,0) scale(${1-.16*align})`;
      word.style.transform=`translate3d(0,${wordShift}px,0) scale(${wordScale})`;
      outline.style.opacity=String(.6-.5*fill);
      solid.style.opacity=String(fill);
      manifesto.style.opacity=String(1-phase(p,.05,.36));
      manifesto.style.transform=`translate3d(0,${-14*phase(p,.05,.36)}px,0)`;
      const arrival=full?phase(p,.68,.9):1;
      closing.style.opacity=String(arrival);
      closing.style.transform=`translate3d(0,${10*(1-arrival)}px,0)`;
      link.style.visibility=arrival>.05?'visible':'hidden';
      link.tabIndex=arrival>.05?0:-1;
      progress.style.transform=`scaleX(${p})`;
    };
    const schedule=()=>{if(!frame&&active&&!disposed)frame=requestAnimationFrame(render)};
    const invalidate=()=>{metrics=undefined;lastProgress=-1;schedule()};
    const observer=new IntersectionObserver(entries=>{active=entries[0].isIntersecting;if(active)invalidate()},{rootMargin:'100px'});
    observer.observe(root);
    const sizes=new ResizeObserver(invalidate);sizes.observe(stage);
    window.addEventListener('scroll',schedule,{passive:true});
    window.addEventListener('resize',invalidate);window.addEventListener('motion:change',invalidate);
    document.fonts.ready.then(()=>{if(!disposed)invalidate()});
    render();
    return()=>{disposed=true;cancelAnimationFrame(frame);observer.disconnect();sizes.disconnect();window.removeEventListener('scroll',schedule);window.removeEventListener('resize',invalidate);window.removeEventListener('motion:change',invalidate)};
  },[]);

  return (
    <section ref={rootRef} className="landing north-hero" aria-label="Inventing North">
      <div className="landing-stage north-stage">
        <div className="north-topline"><span>TEDxLNMIIT <span>/</span> THE NEW CHAPTER</span><span className="north-location">JAIPUR, INDIA</span></div>
        <h1 className="north-title"><span className="sr-only">Inventing North</span>
          <span className="north-inventing" aria-hidden="true"><img src="/images/inventing-north/inventing.webp" width="2181" height="247" alt="" fetchPriority="high" decoding="async" /></span>
          <span className="north-word-plane" aria-hidden="true"><span className="north-word-motion">
            <img className="north-word-outline" src="/images/inventing-north/north-outline.webp" width="2181" height="791" alt="" decoding="async" />
            <img className="north-word-solid" src="/images/inventing-north/north-star.webp" width="2181" height="791" alt="" decoding="async" />
          </span></span>
        </h1>
        <div className="north-art-frame"><div className="north-art-motion"><img src={heroArtwork.src} srcSet={heroArtwork.srcSet} sizes="(max-width:699px) 70vw, 38vw" width={heroArtwork.width} height={heroArtwork.height} alt={heroArtwork.alt} fetchPriority="high" decoding="async" /></div></div>
        <div className="north-manifesto"><p>Some follow a direction. <strong>Others invent one.</strong></p></div>
        <div className="north-closing"><p>A direction<br /><strong>of your own.</strong></p><a className="north-explore" href="/theme">Explore the theme <span aria-hidden="true">↗</span></a></div>
        <div className="north-bottomline"><span>SCROLL TO REORIENT <span className="north-scroll-arrow" aria-hidden="true">↓</span></span><span className="north-progress" aria-hidden="true"><span className="north-progress-track"><span className="north-progress-fill" /></span><span>N</span></span></div>
      </div>
    </section>
  );
}
