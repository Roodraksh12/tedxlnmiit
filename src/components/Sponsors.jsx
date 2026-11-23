import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import "./Sponsors.css";

export default function Sponsors() {
  const partnersRef = useRef(null);

  useEffect(() => {
    const section = partnersRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(([entry]) => {
      section.classList.toggle("is-visible", entry.isIntersecting);
    });
    section.classList.add("is-ready");
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const currentPartners = [
    {
      name: "The YAKKS",
      logo: "/CurrentPartners/YAKKS.webp",
      link: "https://www.instagram.com/yakks.media?igsh=MXc5NWlkcHp5emVhdA==",
      domain: "Videography",
    },
    {
      name: "The Fern Residency",
      logo: "/CurrentPartners/fern.webp",
      link: "https://www.instagram.com/the_fern_residency_jaipur?igsh=anNkeHgwangzMGYz",
      domain: "Hospitality",
    },
    {
      name: "Imagination",
      logo: "/CurrentPartners/ImagiLogoe.webp",
      link: "https://www.instagram.com/imagination.lnmiit/",
      domain: "Photography",
    },
  ];

  const previousPartners = [
    { name: "Petite Patisserie", logo: "/PrevPartners/petite.webp", link: "https://www.instagram.com/petitepatisserie_jaipur?igsh=Mml3MjZwaTh4ZXY=" },
    { name: "Kalam IAS Academy", logo: "/PrevPartners/kalam.webp", link: "https://www.instagram.com/kalam.ias.academy?igsh=MzJiYWx5dTd0NGpx" },
    { name: "Sarovar Hotels", logo: "/PrevPartners/sarovar.webp", link: "https://www.instagram.com/sarovar_hotels?igsh=MWxyMnZiZ2FocHQ3MQ==" },
    { name: "Regal Offset", logo: "/PrevPartners/regal.webp" },
    { name: "Union Bank", logo: "/PrevPartners/unionn.webp", link: "https://www.instagram.com/unionbankinsta?igsh=MXV0bmI5cGhzbnRuZA==" },
    { name: "The Waffle Charm", logo: "/PrevPartners/Waffle.webp", link: "https://www.instagram.com/thewafflecharm?igsh=MWV1eTZlNTk3b3ZvcQ==" },
    { name: "VRJ Productions", logo: "/PrevPartners/image.webp", link: "https://www.instagram.com/vrjproductions?igsh=cGw2NWxwZzV6OTV3" },
    { name: "The Fern Residency", logo: "/CurrentPartners/fern.webp", link: "https://www.instagram.com/the_fern_residency_jaipur?igsh=anNkeHgwangzMGYz" },
    { name: "Canara Bank", logo: "/PrevPartners/canaraa.webp", link: "https://www.instagram.com/canarabankinsta?igsh=eTRxdHJpMzNvbzho" },
  ];

  const partnerRows = [previousPartners.slice(0, 5), previousPartners.slice(5)];

  return (
    <section className="text-white py-5 flex flex-col items-center gap-20 overflow-hidden">
      <div className="text-center">
        <h2 className="partners-title">Current <span>Partners</span></h2>

        <div className="flex flex-wrap justify-center gap-10">
          {currentPartners.map((partner, i) => (
            <a
              key={i}
              href={partner.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-2xl p-8 shadow-xl hover:scale-105 transition-transform w-56 h-56 flex flex-col justify-center items-center"
            >
              <img
  src={partner.logo}
  alt={partner.name}
  className="object-contain w-40 h-24 mb-3"
/>

<p className="text-black font-semibold text-center text-sm mb-1">
  {partner.name}
</p>

<p className="text-gray-600 text-center text-xs py-2">
  {partner.domain}
</p>
            </a>
          ))}
        </div>
      </div>

      <section ref={partnersRef} id="previous-partners" className="previous-partners" aria-labelledby="previous-partners-title">
        <h2 id="previous-partners-title" className="partners-title">Previous <span>Partners</span></h2>

        <div className="partners-marquee" aria-hidden="true">
          {partnerRows.map((row, index) => (
            <div className="partners-window" key={row[0].name}>
              <div className="partners-track" data-direction={index === 0 ? "left" : "right"}>
                {[0, 1, 2].map(copy => (
                  <div className="partners-group" key={copy}>
                    {row.map(partner => <PartnerTile key={partner.name} partner={partner} rolling />)}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <ul className="partners-grid">
          {previousPartners.map(partner => (
            <li key={partner.name}>
              <PartnerTile partner={partner} />
            </li>
          ))}
        </ul>
      </section>

      <div className="text-center max-w-3xl px-5">
        <h1 className="text-center font-light tracking-tight leading-tight max-w-[92vw] mx-auto py-5 text-[clamp(2rem,6vw,3.2rem)]">
          <span className="text-white">Interested in partnership?</span>
        </h1>

        <p className="max-w-2xl text-lg md:text-xl mt-4 leading-relaxed font-medium text-gray-200">
          Collaborating with{" "}
          <span className="text-tedx font-semibold">TEDxLNMIIT</span>{" "}
          provides a unique opportunity to enhance your organization's global
          network within the{" "}
          <span className="text-white font-semibold">TED community</span>.
          Leverage{" "}
          <span className="text-tedx font-semibold">innovative ideas</span>{" "}
          and technology to empower education and foster innovation.
        </p>

        <a
          href="/Brochure/Partnership_Brochure_TEDxLNMIIT2026.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-6 py-3 bg-tedx text-white font-medium rounded-full transition-all duration-300 ease-out hover:bg-tedx hover:-translate-y-0.5 active:translate-y-0 mt-8"
        >
          Know more
        </a>
      </div>
    </section>
  );
}

function PartnerTile({ partner, rolling = false }) {
  const content = (
    <>
      <span className="partner-logo"><img src={partner.logo} alt="" width="130" height="56" loading="lazy" decoding="async" /></span>
      <span className="partner-name">{partner.name}</span>
    </>
  );

  return partner.link ? (
    <a className="partner-tile" href={partner.link} target="_blank" rel="noopener noreferrer" tabIndex={rolling ? -1 : undefined}>
      {content}
      {!rolling && <ArrowUpRight className="partner-link-icon" size={14} aria-hidden="true" />}
    </a>
  ) : <div className="partner-tile">{content}</div>;
}
