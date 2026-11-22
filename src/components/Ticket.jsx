import "./Ticket.css";

export default function Ticket() {
  return (
    <article className="admission-ticket" aria-label="TEDxLNMIIT admission pass, 499 rupees">
      <div className="admission-main">
        <div className="admission-topline"><span>TEDxLNMIIT / ADMISSION</span><span>10 JAN 2027</span></div>
        <h3>IDEAS WORTH<br />SHOWING UP FOR.</h3>
        <div className="admission-meta">
          <div><span>VENUE</span><p>LNMIIT, Jaipur</p></div>
          <div><span>YOUR PASS</span><p>All talks. Full day.</p></div>
        </div>
        <span className="admission-serial" aria-hidden="true">TEDx / IDEAS WORTH SPREADING</span>
      </div>
      <div className="admission-stub">
        <div className="admission-price"><span>ONE PASS. ALL THE IDEAS.</span><p><span>₹</span>499</p><span>PER PERSON</span></div>
        <div className="admission-actions">
          <p>Choose your registration</p>
          <button type="button" data-registration-native="" aria-controls="ticket-registration" aria-expanded="false">LNMIIT students &amp; staff</button>
          <button type="button" data-registration-src="https://docs.google.com/forms/d/e/1FAIpQLScY12g68K73uFWW3GMK5ktGyCNj3vjCnvEmCjtgIiOoU3eXAQ/viewform?embedded=true" aria-controls="ticket-registration" aria-expanded="false">General audience</button>
        </div>
      </div>
    </article>
  );
}
