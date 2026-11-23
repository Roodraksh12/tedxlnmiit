import { GlassLayer } from './liquid-glass/glass-layer';
import { GlassLens } from './liquid-glass/glass-lens';
import { navigationOptics, navigationTint } from './liquid-glass/navigation-material';

export default function TeamTabsGlass({ children }) {
  return (
    <div className="team-roster-tabs" role="tablist" aria-label="Team groups" data-glass-host="">
      <GlassLayer material="clear" tint={navigationTint} swell={false} optics={navigationOptics} />
      <GlassLens value={null} observeSelection />
      {children}
    </div>
  );
}
