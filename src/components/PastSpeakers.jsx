import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaYoutube, FaInstagram, FaLinkedin } from "react-icons/fa";
import PixelCard from "./PixelCard";

gsap.registerPlugin(ScrollTrigger);

export default function PastSpeakers() {
  const cardsRef = useRef([]);
  const [isMobile, setIsMobile] = useState(false);

  const speakers = [
    {
      id: 1,
      name: "Dr. Tanu Jain",
      drive:true,
      image: "/images/image0.webp",
      description:
        "Former IAS officer and DRDO Assistant Director, Dr. Jain advocates for education and UPSC reforms. Her multifaceted career exemplifies her dedication to creating impact beyond conventional roles.",
      youtube:
        "https://drive.google.com/file/d/1b2JeXhUiIs2a75v09skoxKswxAoPksSP/view",
      instagram:
        "https://www.instagram.com/dr.tanujain?igsh=MXg5dWVkejNpOW1oMg==",
    },
    {
      id: 2,
      name: "Gunjan Saini",
      slug: "gunjan-saini",
      image: "/images/image01.webp",
      description:
        "Poet, writer, and founder of Let’s Talk, Gunjan Saini fosters emotional well-being through shared stories. Her work bridges emotional gaps and promotes mental health through vulnerability and connection.",
      youtube: "https://www.youtube.com/watch?v=7Qsg9A-mjgk",
      instagram:
        "https://www.instagram.com/gunjan_sainii_?igsh=OWh4dGZ0NTI2Mjd3",
    },
    {
      id: 3,
      name: "Preksha Kaparwan",
      slug: "preksha-kaparwan",
      image: "/images/image1.webp",
      description:
        "Entrepreneur and storyteller, Preksha Kaparwan is Co-Founder and CMO of Alphaa AI. She works to democratize data access using AI and NLP, empowering users to interact with data intuitively and confidently.",
      youtube: "https://youtu.be/rVfCN04AEmg?si=yrDxIiQb7OPN5uhA",
      instagram: "https://www.instagram.com/bossymiss?igsh=YnRlcHVzMDlqeGc1",
    },
    {
      id: 4,
      name: "Deepak Pareek",
      slug: "deepak-pareek",
      image: "/images/deepak.webp",
      description:
        "Co-founder of Iceberg Creations and an IMPACT 30 Under 30 honoree, Deepak Pareek is a dynamic content creator. His work spans platforms, driving innovation through engaging digital storytelling.",
      youtube: "https://youtu.be/vkIZJ0-hkQY?si=svZpcjBqIBeKMu5s",
      instagram: "https://www.instagram.com/dkpareek?igsh=MWp5bG5keWl5YzllMw==",
    },
    {
      id: 5,
      name: "Chinmay Gaur",
      slug: "chinmay-gaur",
      image: "/images/image5.webp",
      description:
        "Indian classical flutist and composer, Chinmay Gaur blends tradition with modern expression. His TEDx talk explores music’s transcendental power and its ability to connect cultures and emotions.",
      youtube: "https://youtu.be/KyLREMG86r0?si=ltKFggjT3QB82UqO",
      instagram: "https://www.instagram.com/igaur_chinmay/",
    },
    {
      id: 6,
      name: "Dr. Ajay Data",
      slug: "dr-ajay-data",
      image: "/images/image3.webp",
      description:
        "Visionary entrepreneur and Managing Director of Data Group of Industries, Dr. Ajay Data introduced the internet to Rajasthan and pioneered the world’s first linguistic email, driving digital inclusion.",
      youtube: "https://youtu.be/JfBAk9jj--0?si=zxpNOvTTxz3shQOU",
      instagram: "https://www.instagram.com/ajaydata?igsh=ZGg2bmxhMzA4ZHNu",
    },
    {
      id: 7,
      name: "Krishnan Sunderarajan",
      slug: "krishnan-sunderarajan",
      image: "/images/krishna.webp",
      description:
        "Founder of LOKA, India’s first Metaverse app, Krishnan Sunderarajan bridges technology and human experience. His Shark Tank journey reflects his vision for future digital interaction.",
      youtube: "https://youtu.be/Z9zx3kWLP6c?si=EfKANslHbtSFKjNd",
      instagram:
        "https://www.instagram.com/krish_meister?igsh=dnp4dzNmeG9yZjJs",
    },
    {
      id: 8,
      name: "Dr. Lopa Mudraa",
      slug: "dr-lopa-mudraa",
      image: "/images/image4.webp",
      description:
        "Information Security Evangelist with over two decades of experience, Dr. Lopa Mudraa is a 4× Global 100 CISO awardee. She is recognized for her leadership in cybersecurity and digital resilience.",
      youtube: "https://youtu.be/To9sxO9W_Kw?si=v7GvKJygJM71JsQ0",
      linkedin: "https://www.linkedin.com/in/drlopamudraabasuu",
    },
    {
      id: 9,
      name: "Dr. Kamna Chhibber",
      slug: "dr-kamna-chhibber",
      image: "/images/image2.webp",
      description:
        "Head of Mental Health at Fortis Healthcare, Dr. Kamna Chhibber is a clinical psychologist with 15+ years of experience, specializing in CBT, trauma, relationships, and emotional well-being.",
      youtube: "https://youtu.be/n0me_a9Amnk?si=z1uwpYOGEZlwguZM",
      instagram:
        "https://www.instagram.com/fortismentalhealth?igsh=MW5qa25hdW05aWhiNw==",
    },
    {
      id: 10,
      name: "Aabha Hanjura",
      slug: "aabha-hanjura",
      image: "/images/image6.webp",
      description:
        "Singer-songwriter and founder of the band Sufistication, Aabha Hanjura blends Kashmiri folk with Sufi and contemporary pop. Her music has earned nationwide recognition and cultural resonance.",
      youtube: "https://youtu.be/omzsDD9-Ur8?si=goIx0wTfNZePIXh3",
      instagram:
        "https://www.instagram.com/aabhahanjura?igsh=MXB1YnphcWVqaXVpNQ==",
    },
    {
      id: 11,
      name: "Chetna Balhara",
      slug: "chetna-balhara",
      image: "/images/chetna.webp",
      description:
        "Poet and digital creator, Chetna Balhara is known for heartfelt poetry on love and everyday struggles. Her relatable words and performances have built a strong and devoted audience.",
      youtube: "https://youtu.be/357IYm05oQU?si=N5EyhDZmzMzKmn42",
      instagram:
        "https://www.instagram.com/chetnabalharaofficial?igsh=bTRmODJoMWx3cWJz",
    },
    {
      id: 12,
      name: "Shelly Jyoti",
      slug: "shelly-jyoti",
      image: "/images/image7.webp",
      description:
        "Contemporary artist, designer, and poet, Shelly Jyoti explores Gandhi’s principles through art. She collaborates with Ajrakh artisans, blending traditional textiles with modern social narratives.",
      youtube: "https://youtu.be/Vu_gdUgJAzk?si=AME2ca9fpCdbIMwn",
      instagram:
        "https://www.instagram.com/shellyjyoti1211?igsh=NHU3N2dWRlMDc5",
    },
  ];

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const visibleSpeakers = isMobile ? speakers.slice(0, 5) : speakers;

  useEffect(() => {
    cardsRef.current.forEach((card) => {
      if (!card) return;
      gsap.to(card, {
        scale: 0.7,
        opacity: 0,
        scrollTrigger: {
          trigger: card,
          start: "top 15%",
          end: "bottom 15%",
          scrub: true,
        },
      });
    });
  }, [visibleSpeakers]);

  return (
    <main className="relative w-full bg-transparent text-white flex flex-col items-center py-[15vh]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-[3vw] gap-y-[15vh] place-items-center w-full px-4 sm:px-6 md:px-10">
        {visibleSpeakers.map((speaker, index) => (
          <div
            key={speaker.id}
            ref={(el) => (cardsRef.current[index] = el)}
            className="
              speaker-card sticky top-[15vh] relative
              w-[88vw] sm:w-[60vw] md:w-[32vw] lg:w-[28vw]
              max-w-[400px] min-w-[260px]
              py-[10vh] px-4
              rounded-[25px] overflow-hidden
              bg-[radial-gradient(ellipse_at_center,_#000_0%,_#000_60%,_#120000_85%,_#1a0000_100%)]
            "
          >
            <PixelCard
              variant="pink"
              className="absolute inset-0 z-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
            />

            <div className="relative z-10 flex flex-col items-center gap-4 text-center px-2 sm:px-4 pointer-events-none">
              <div className="w-[220px] aspect-square rounded-[20px] overflow-hidden border-4 border-[#EB0028] shadow-lg sm:w-[180px]">
                <img
                  src={speaker.image}
                  alt={speaker.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <h1 className="text-3xl font-extrabold text-[#EB0028] sm:text-2xl">
                {speaker.name}
              </h1>

              <p className="text-[14px] sm:text-base font-medium max-w-[95%] sm:max-w-full leading-relaxed">
                {speaker.description}
              </p>

              <div className="flex items-center justify-center gap-6 mt-8 pointer-events-auto">
                {speaker.youtube && (
                  <a
  
  href={speaker.drive ? speaker.youtube : `/talks/${speaker.slug}`}
  target={speaker.drive ? "_blank" : undefined}
  rel={speaker.drive ? "noopener noreferrer" : undefined}


                    className="text-red-600 text-3xl -mt-8 hover:scale-110 transition-transform"
                  >
                    <FaYoutube />
                  </a>
                )}
                {speaker.instagram && (
                  <a
                    href={speaker.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-600 text-3xl -mt-8 hover:scale-110 transition-transform"
                  >
                    <FaInstagram />
                  </a>
                )}
                {speaker.linkedin && (
                  <a
                    href={speaker.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-600 text-3xl -mt-8 hover:scale-110 transition-transform"
                  >
                    <FaLinkedin />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
