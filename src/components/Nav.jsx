import { ArrowUpRight, Compass, House, Images, Info, Megaphone, Mic, Users } from 'lucide-react';
import { GlassLens } from './liquid-glass/glass-lens';
import { GlassLayer } from './liquid-glass/glass-layer';
import { navigationOptics, navigationTint } from './liquid-glass/navigation-material';
import './Nav.css';

import { activePath, navigation } from '../data/navigation';

const mobileLinks = {
  '/': [House, 'Home'],
  '/theme': [Compass, 'Theme'],
  '/past-speakers': [Mic, 'Speakers'],
  '/team': [Users, 'Team'],
  '/gallery': [Images, 'Gallery'],
  '/campus-ambassador': [Megaphone, 'Campus'],
  '/about': [Info, 'About'],
};

function openNavPage(event, from, to) {
  if (from === to || event.defaultPrevented || event.button !== 0 ||
      event.metaKey || event.ctrlKey || event.shiftKey || event.altKey ||
      matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  event.preventDefault();
  const nav = event.currentTarget.closest('nav');
  if (nav.hasAttribute('data-nav-pending')) return;
  const link = event.currentTarget;
  const destination = link.href;
  link.setAttribute('data-nav-destination', '');
  nav.setAttribute('data-nav-pending', '');
  window.addEventListener('pageshow', () => {
    nav.removeAttribute('data-nav-pending');
    nav.querySelector('[data-nav-destination]')?.removeAttribute('data-nav-destination');
  }, { once: true });

  if (!nav.hasAttribute('data-glass-ready')) {
    window.setTimeout(() => location.assign(destination), 120);
    return;
  }
  const observer = new MutationObserver(() => {
    if (nav.hasAttribute('data-nav-settled')) finish();
  });
  const fallback = window.setTimeout(finish, 950);
  function finish() {
    observer.disconnect();
    window.clearTimeout(fallback);
    location.assign(destination);
  }
  observer.observe(nav, { attributes: true, attributeFilter: ['data-nav-settled'] });
}

export default function Navbar({ pathname = '/' }) {
  const active = activePath(pathname);
  return (
    <header className="ted-nav-header">
      <div className="ted-nav-inner">
        <a className="ted-brand" href="/" aria-label="TEDxLNMIIT home">
          <img src="/images/logo-white2.webp" alt="TEDxLNMIIT" width="180" height="60" />
        </a>
        <nav className="ted-nav-links" aria-label="Main navigation" data-glass-host="">
          <GlassLayer material="clear" swell={false} tint={navigationTint} optics={navigationOptics} />
          <GlassLens value={active} followNavigation />
          {navigation.map(({ name, href }) => {
            const [Icon, shortName] = mobileLinks[href];
            const current = active === href;
            return (
              <a key={href} className="ted-nav-link" href={href} draggable={false} data-glass-option=""
                onClick={(event) => openNavPage(event, active, href)}
                aria-label={name} aria-current={current ? 'page' : undefined}>
                <span className="ted-nav-highlight" data-glass-highlight={current ? '' : undefined} aria-hidden="true" />
                <span className="ted-nav-desktop-label">{name}</span>
                <span className="ted-nav-mobile-label" aria-hidden="true"><Icon size={17} strokeWidth={1.7} />{shortName}</span>
              </a>
            );
          })}
        </nav>
        <div className="ted-nav-actions">
          <a className="ted-ticket" href="/#ticket-prices" data-ticket-jump>Get Tickets <ArrowUpRight size={16} strokeWidth={1.8} aria-hidden="true" /></a>
        </div>
      </div>
    </header>
  );
}
