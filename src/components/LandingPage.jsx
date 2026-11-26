import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { heroArtwork } from '../data/heroArtwork';
import './LandingPage.css';

const compassImage = {
  src: heroArtwork.src,
  srcSet: heroArtwork.srcSet,
  sizes: '(max-width: 700px) 37svh, (max-width: 1150px) 46vw, 540px',
  width: heroArtwork.width,
  height: heroArtwork.height,
};

export default function LandingPage() {
  return (
    <>
      <section className="north-hero" data-north-hero aria-labelledby="north-title">
        <div className="north-layout">
          <div className="north-copy">
            <h1 id="north-title"><span>Inventing</span>{' '}<span className="north-title-north">North.</span></h1>
            <div className="north-details">
              <p className="north-statement">Some follow a direction. Others invent one.</p>
              <p className="north-event"><time dateTime="2027-01-10">10 January 2027</time><span aria-hidden="true">/</span> LNMIIT, Jaipur</p>
              <div className="north-actions">
                <a className="north-tickets" href="/#ticket-prices" data-ticket-jump>Get tickets <ArrowUpRight size={18} aria-hidden="true" /></a>
                <a className="north-explore" href="/theme">Explore the theme <ArrowUpRight size={16} aria-hidden="true" /></a>
              </div>
            </div>
          </div>
          <div className="north-compass">
            <img
              className="north-art"
              {...compassImage}
              alt={heroArtwork.alt}
              fetchPriority="high"
              decoding="async"
            />
            <div className="north-pieces" aria-hidden="true">
              {['crown', 'west', 'east', 'base'].map(piece => (
                <img {...compassImage} key={piece} className={`north-piece north-piece--${piece}`}
                  alt="" decoding="async" />
              ))}
            </div>
            <svg className="north-orbit" viewBox="0 0 240 240" aria-hidden="true">
              <path className="north-orbit-axis" d="M120 4v24 M120 212v24 M4 120h24 M212 120h24" />
              <circle className="north-orbit-ticks" cx="120" cy="120" r="117" pathLength="120" />
              <circle className="north-orbit-arc" cx="120" cy="120" r="110" pathLength="1" />
              <circle className="north-orbit-lock" cx="120" cy="120" r="110" />
            </svg>
            <span className="north-bearing" aria-hidden="true" />
          </div>
          <div className="north-intro">
            <p className="north-intro-event">
              <time dateTime="2027-01-10">10 January 2027</time>
              <span>LNMIIT, Jaipur</span>
            </p>
            <p className="north-intro-theme">Some follow a direction. Others invent one.</p>
          </div>
          <span className="north-scroll-cue" aria-hidden="true"><ArrowDown size={19} /></span>
          <canvas className="north-petals" data-north-petals aria-hidden="true" />
        </div>
      </section>
      <div className="north-course" data-north-course aria-hidden="true">
        <span className="north-course-track">
          <span className="north-course-trace" />
          <span className="north-course-marker" />
        </span>
      </div>
    </>
  );
}
