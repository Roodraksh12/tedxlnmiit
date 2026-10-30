import { useContext, useEffect, useRef } from 'react';
import { NavbarContext } from '../context/NavContext';
import './FullScreenNav.css';

const links = [['Home', '/'], ['Theme', '/theme'], ['About', '/about'], ['Gallery', '/gallery'], ['Past Speakers', '/past-speakers'], ['Team', '/team'], ['Campus Ambassador', '/campus ambassador']];
export default function FullScreenNav({ pathname = '/' }) {
  const { navOpen, setNavOpen } = useContext(NavbarContext);
  const ref = useRef(null);
  useEffect(() => {
    if (!navOpen) return;
    const previous = document.activeElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    ref.current?.querySelector('a')?.focus();
    const onKey = event => {
      if (event.key === 'Escape') setNavOpen(false);
      if (event.key !== 'Tab') return;
      const items = [...ref.current.querySelectorAll('a,button')];
      if (event.shiftKey && document.activeElement === items[0]) { event.preventDefault(); items.at(-1).focus(); }
      else if (!event.shiftKey && document.activeElement === items.at(-1)) { event.preventDefault(); items[0].focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = overflow; document.removeEventListener('keydown', onKey); previous?.focus({ preventScroll: true }); };
  }, [navOpen, setNavOpen]);
  if (!navOpen) return null;
  const active = decodeURIComponent(pathname).replace(/\/$/, '') || '/';
  return <div ref={ref} id="site-navigation-dialog" className="site-menu" role="dialog" aria-modal="true" aria-label="Site navigation">
    <div className="site-menu-content">
      <p className="site-menu-label">EXPLORE TEDxLNMIIT</p>
      <nav aria-label="Expanded navigation">{links.map(([text, href]) => <a key={href} href={href} aria-current={active === href ? 'page' : undefined} onClick={() => setNavOpen(false)}>{text}</a>)}</nav>
      <a className="site-menu-ticket" href="/#ticket-prices" data-ticket-jump onClick={() => setNavOpen(false)}>Get Tickets <span aria-hidden="true">↗</span></a>
    </div>
    <button className="site-menu-close" type="button" onClick={() => setNavOpen(false)} aria-label="Close navigation">×</button>
  </div>;
}
