import './Theme.css';

export default function Theme() {
  return (
    <section className="north-theme-page" aria-labelledby="north-theme-title">
      <div className="north-theme-topline"><span>THIS YEAR’S THEME</span><span>TEDxLNMIIT</span></div>
      <h1 id="north-theme-title" className="sr-only">Inventing North</h1>
      <img className="north-theme-poster" src="/images/inventing-north/editorial.webp" width="1800" height="605" alt="Inventing North, the TEDxLNMIIT theme" fetchPriority="high" decoding="async" />
      <div className="north-theme-story">
        <div><p className="north-theme-eyebrow">A DIRECTION OF YOUR OWN</p><h2>What if your north<br />is yours to invent?</h2></div>
        <div className="north-theme-copy">
          <p>North gives us a point to orient ourselves by. But the paths we inherit do not have to define the paths we take.</p>
          <p><strong>Inventing North</strong> asks us to question the compass: to explore what matters to us, challenge familiar assumptions, and choose a direction with intention.</p>
          <p>Through ideas, stories, and conversations at TEDxLNMIIT, we invite you to see new possibilities—and consider where you want to go next.</p>
          <a href="/#ticket-prices" data-ticket-jump>Take your seat <span aria-hidden="true">↗</span></a>
        </div>
      </div>
      <p className="north-theme-signoff">Some follow a direction.<br /><span>Others invent one.</span></p>
    </section>
  );
}
