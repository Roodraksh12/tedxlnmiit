import { useContext } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { NavbarContext } from '../context/NavContext';
import './Nav.css';

const items = [
  { name: 'Home', href: '/' },
  { name: 'Theme', href: '/theme' },
  { name: 'About', href: '/about' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Past Speakers', href: '/past-speakers' },
  { name: 'Team', href: '/team' },
  { name: 'Campus Ambassador', href: '/campus ambassador' },
];

export default function Navbar({ pathname = '/' }) {
  const { navOpen, setNavOpen } = useContext(NavbarContext);
  const active = decodeURIComponent(pathname).replace(/\/$/, '') || '/';
  return (
    <header className="ted-nav-header">
      <div className="ted-nav-inner">
        <a className="ted-brand" href="/" aria-label="TEDxLNMIIT home">
          <img src="/images/logo-white2.webp" alt="TEDxLNMIIT" width="180" height="60" />
        </a>
        <nav className="ted-nav-links" aria-label="Main navigation">
          {items.map(({ name, href }) => (
            <a key={href} className="ted-nav-link" href={href} aria-current={active === href ? 'page' : undefined}>{name}</a>
          ))}
        </nav>
        <div className="ted-nav-actions">
          <a className="ted-ticket" href="/#ticket-prices" data-ticket-jump>Get Tickets <ArrowUpRight size={16} strokeWidth={1.8} aria-hidden="true" /></a>
          <button className="ted-menu" type="button" onClick={() => setNavOpen(true)} aria-label="Open navigation menu" aria-expanded={navOpen} aria-controls="site-navigation-dialog">
            <span className="ted-menu-lines" aria-hidden="true"><span /><span /></span>
          </button>
        </div>
      </div>
    </header>
  );
}
