import { Compass, House, Images, Info, Megaphone, Mic, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { GlassLayer } from './liquid-glass/glass-layer';
import { navigationOptics, navigationTint } from './liquid-glass/navigation-material';
import TicketSlider from './TicketSlider';
import './Nav.css';

import { activePath, navigation } from '../data/navigation';

const mobileLinks = {
  '/': [House, 'Home'],
  '/theme': [Compass, 'Theme'],
  '/past-speakers': [Mic, 'Past talks'],
  '/team': [Users, 'Team'],
  '/gallery': [Images, 'Gallery'],
  '/campus-ambassador': [Megaphone, 'Campus'],
  '/about': [Info, 'About'],
};

export default function Navbar({ pathname = '/' }) {
  const active = activePath(pathname);
  const [ActiveIcon] = mobileLinks[active] ?? mobileLinks['/'];
  const [compact, setCompact] = useState(() => typeof window === 'undefined' || matchMedia('(max-width: 1199px)').matches);
  useEffect(() => {
    const dock = matchMedia('(max-width: 1199px)');
    const update = () => setCompact(dock.matches);
    dock.addEventListener('change', update);
    update();
    return () => dock.removeEventListener('change', update);
  }, []);
  return (
    <header className="ted-nav-header">
      <div className="ted-nav-inner">
        <a className="ted-brand" href="/" aria-label="TEDxLNMIIT home" data-glass-skip="">
          <img src="/images/logo-white2.webp" alt="TEDxLNMIIT" width="180" height="60" />
        </a>
        <nav className="ted-nav-links" aria-label="Main navigation" data-glass-host="" suppressHydrationWarning>
          <GlassLayer material="clear" swell={false} tint={navigationTint} optics={navigationOptics} disabled={compact} />
          <canvas className="ted-nav-lens" data-glass-route-lens="" aria-hidden="true" suppressHydrationWarning />
          {navigation.map(({ name, href }, index) => {
            const [Icon, shortName] = mobileLinks[href];
            const current = active === href;
            return (
              <a key={href} className="ted-nav-link" href={href} draggable={false} data-glass-option="" suppressHydrationWarning
                data-astro-prefetch={current ? undefined : "hover"}
                aria-label={name} aria-current={current ? 'page' : undefined}
                style={{ '--dock-index': index }}>
                <span className="ted-nav-option-art">
                  <span className="ted-nav-highlight" data-glass-highlight={current ? '' : undefined} data-glass-skip="" aria-hidden="true" />
                  <span className="ted-nav-desktop-label">{name}</span>
                  <span className="ted-nav-mobile-label" aria-hidden="true">
                    <Icon size={17} strokeWidth={1.7} />
                    <span className="ted-nav-mobile-short">{shortName}</span>
                  </span>
                </span>
              </a>
            );
          })}
          <button className="ted-nav-reopen" type="button" aria-label="Expand navigation">
            <ActiveIcon size={19} strokeWidth={1.8} aria-hidden="true" />
          </button>
        </nav>
        <div className="ted-nav-actions">
          <TicketSlider />
        </div>
      </div>
    </header>
  );
}
