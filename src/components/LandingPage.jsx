import { useEffect, useRef } from 'react';
import { heroArtwork } from '../data/heroArtwork';
import './LandingPage.css';

function DirectionOrbit() {
  return <svg className="north-orbit" viewBox="-300 -300 600 600" aria-hidden="true">
    <g fill="none" stroke="#f5f2eb" strokeWidth=".7">
      <circle r="244" />
      <path d="M0-262V-233M0 233V262M-262 0H-233M233 0H262" />
    </g>
    <path d="M0-244V190" stroke="#EB0028" strokeWidth=".7" strokeDasharray="2 9" />
    <text y="-277" textAnchor="middle" fill="#EB0028" fontFamily="monospace" fontSize="13">N</text>
    <circle cy="-244" r="3" fill="#EB0028" />
  </svg>;
}

export default function LandingPage() {
  const rootRef = useRef(null);
  useEffect(() => {
    const root = rootRef.current;
    const stage = root.querySelector('.landing-stage');
    const art = root.querySelector('.north-art-motion');
    const artFrame = root.querySelector('.north-art-frame');
    const heading = root.querySelector('.north-inventing');
    const word = root.querySelector('.north-word-motion');
    const outline = root.querySelector('.north-word-outline');
    const solid = root.querySelector('.north-word-solid');
    const orbit = root.querySelector('.north-orbit');
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
        const wordWidth = word.offsetWidth, wordHeight = word.offsetHeight;
        const wordCenter = root.querySelector('.north-word-plane').offsetTop;
        const wordScale = Math.min(.68, height * .29 / wordHeight);
        const wordBottom = height - Math.max(60, Math.min(90, height * .08));
        const wordTop = wordBottom - wordHeight * wordScale;
        const headingBottom = heading.offsetTop - height * .012 + heading.offsetHeight * .84;
        const artHeight = artFrame.offsetHeight;
        const artCenter = artFrame.offsetTop + artHeight / 2;
        const artScale = Math.min(.86, Math.max(.25, (wordTop - headingBottom - 32) / artHeight));
        metrics = {
          start: root.getBoundingClientRect().top + scrollY - (parseFloat(getComputedStyle(stage).top) || 0),
          range: Math.max(1,root.offsetHeight-stage.offsetHeight),
          height, mobile, wordWidth, wordHeight, wordCenter, wordScale,
          wordShift: wordBottom - wordHeight * wordScale / 2 - wordCenter,
          artHeight, artCenter, artScale,
          artShift: (headingBottom + wordTop) / 2 - artCenter,
        };
      }
      const p=full?clamp((scrollY-metrics.start)/metrics.range):0;
      if(p===lastProgress&&full===lastFull)return;
      lastProgress=p;lastFull=full;
      const align=phase(p,.08,.86);
      const artScale = metrics.mobile ? 1 - .18 * align : 1 + (metrics.artScale - 1) * align;
      const artShift = metrics.mobile ? -metrics.height * .12 * align : metrics.artShift * align;
      const wordScale = metrics.mobile ? 1 - .06 * align : 1 + (metrics.wordScale - 1) * align;
      const wordShift = metrics.mobile ? metrics.height * .095 * align : metrics.wordShift * align;
      const angle = -7 * (1 - align);
      const radians = Math.abs(angle) * Math.PI / 180;
      const wordTop = metrics.wordCenter + wordShift - (metrics.wordHeight * Math.cos(radians) + metrics.wordWidth * Math.sin(radians)) * wordScale / 2;
      const artBottom = metrics.artCenter + artShift + metrics.artHeight * artScale / 2;
      // Keep the type outlined until the desktop artwork has cleared its bounds.
      const clearance = clamp((wordTop - artBottom + 2) / 18);
      const fill = metrics.mobile ? phase(p,.24,.77) : clearance * clearance * (3 - 2 * clearance);
      // The artwork stays on the same axis. Typography changes its relationship to it.
      art.style.transform=`translate3d(0,${artShift}px,0) scale(${artScale})`;
      heading.style.transform=`translate3d(0,${-metrics.height*.012*align}px,0) scale(${1-.16*align})`;
      word.style.transform=`translate3d(0,${wordShift}px,0) rotate(${angle}deg) scale(${wordScale})`;
      outline.style.opacity=String(.6-.5*fill);
      solid.style.opacity=String(fill);
      orbit.style.transform=`translate(-50%,-50%) rotate(${-24+38*align}deg) scale(${1-.12*align})`;
      orbit.style.opacity=String(.24-.16*align);
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
        <DirectionOrbit />
        <div className="north-art-frame"><div className="north-art-motion"><img src={heroArtwork.src} srcSet={heroArtwork.srcSet} sizes="(max-width:699px) 70vw, 38vw" width={heroArtwork.width} height={heroArtwork.height} alt={heroArtwork.alt} fetchPriority="high" decoding="async" /></div></div>
        <div className="north-manifesto"><p>Some follow a direction. <strong>Others invent one.</strong></p></div>
        <div className="north-closing"><p>A direction<br /><strong>of your own.</strong></p><a className="north-explore" href="/theme">Explore the theme <span aria-hidden="true">↗</span></a></div>
        <div className="north-bottomline"><span>SCROLL TO REORIENT <span className="north-scroll-arrow" aria-hidden="true">↓</span></span><span className="north-progress" aria-hidden="true"><span className="north-progress-track"><span className="north-progress-fill" /></span><span>N</span></span></div>
      </div>
    </section>
  );
}
