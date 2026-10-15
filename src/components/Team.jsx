import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaLinkedin } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const teamData = [
  {
    title: "Faculty Mentor",
    members: [
      {
        name: "Dr. Narendra Kumar",
        role: ["Faculty Mentor", "Licensee"],
        image: "/team/narendra.webp",
        linkedin:
          "https://www.linkedin.com/in/narendra-kumar-38692065?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      },
      {
        name: "Dr. Payel Pal",
        role: ["Faculty Mentor"],
        image: "/team/mentor2.webp",
        linkedin: "https://www.linkedin.com/in/dr-payel-pal-89593413/",
      },
    ],
  },

  {
    title: "Organizers",
    members: [
      {
        name: "Abdul Hadi Siddiqui",
        role: "Organizer",
        image: "/team/abdul.webp",
        linkedin: "https://www.linkedin.com/in/abdul-hadi-siddiqui-145850295",
      },
      {
        name: "Anshika Agrawal",
        role: "Organizer",
        image: "/team/anshika.webp",
        linkedin: "https://www.linkedin.com/in/anshika-agrawal3379",
      },
      {
        name: "Parv Khandelwal",
        role: "Supervisor",
        image: "/team/parv.webp",
        linkedin: "https://www.linkedin.com/in/parv-khandelwal-918562281",
      },
      {
        name: "Vihaan Malik",
        role: "Supervisor",
        image: "/team/vihaan.webp",
        linkedin: "https://www.linkedin.com/in/vihaan-malik",
      },
    ],
  },

  {
    title: "Development Head",
    members: [
      {
        name: "Keshav Sharma",
        role: "Development Head",
        image: "/team/keshav.webp",
        linkedin: "https://www.linkedin.com/in/keshav-sharma-0aa02627b",
      },
    ],
  },

  {
    title: "Event Management Head",
    members: [
      {
        name: "Nirmal Patel",
        role: "Event Management Head",
        image: "/team/nirmal.webp",
        linkedin: "https://www.linkedin.com/in/nirmal-patel-0a8868267",
      },
    ],
  },

  {
    title: "Sponsorship Head",
    members: [
      {
        name: "Naman Agarwal",
        role: "Sponsorship Head",
        image: "/team/naman.webp",
        linkedin: "https://www.linkedin.com/in/naman-agarwal-53b26030b",
      },
    ],
  },

  {
    title: "Speaker Outreach Head",
    members: [
      {
        name: "Priyal Maheshwari",
        role: "Speaker Outreach Head",
        image: "/team/priyal.webp",
        linkedin: "https://www.linkedin.com/in/priyal-maheshwari-001494284",
      },
    ],
  },

  {
    title: "Creative Head",
    members: [
      {
        name: "Akshat Gupta",
        role: "Graphic Designing Head",
        image: "/team/akshat.webp",
        linkedin:
          "https://www.linkedin.com/in/guptaakshat28?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      },
      {
        name: "Neha Raniwala",
        role: "Graphic Designing Head",
        image: "/team/neha.webp",
        linkedin: "https://www.linkedin.com/in/neha-raniwala",
      },
      {
        name: "Utkrasht Gupta",
        role: "Graphic Designing Head",
        image: "/team/utkrasht.webp",
        linkedin: "https://www.linkedin.com/in/utkrasht-gupta-903317205",
      },
      {
        name: "Yash Jain",
        role: "Video Editing Head",
        image: "/team/yash.webp",
        linkedin: "https://www.linkedin.com/in/yash-jain-agkj11",
      },
    ],
  },

  {
    title: "Web Development",
    members: [
      {
        name: "Arnim Agarwal",
        role: "Web Developer",
        image: "/team/arnim3.webp",
        linkedin: "https://www.linkedin.com/in/arnimaga",
      },
      {
        name: "Priyanshi Jain",
        role: "Web Developer",
        image: "/team/priyanshi.webp",
        linkedin: "https://www.linkedin.com/in/priyanshi-jain-a300bb246/",
      },
    ],
  },

  {
    title: "Content Writing",
    members: [
      {
        name: "Garvit Garg",
        role: "Content Writer",
        image: "/team/garvit.webp",
        linkedin:
          "https://www.linkedin.com/in/garvit-garg-7185bb381?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      },
      {
        name: "Krishangee Tayal",
        role: "Content Writer",
        image: "/team/krishangee.webp",
        linkedin: "https://www.linkedin.com/in/krishangee-tayal-96a861242",
      },
      {
        name: "Madhura Vyas",
        role: "Content Writer",
        image: "/team/madhura.webp",
        linkedin:
          "https://www.linkedin.com/in/madhura-vyas-730310388?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      },
      {
        name: "Poorvi Jagga",
        role: "Content Writer",
        image: "/team/poorvi.webp",
        linkedin: "https://www.linkedin.com/in/poorvi-jagga-ba6b9b341",
      },
      {
        name: "Praneel Dev",
        role: "Content Writer",
        image: "/team/praneel.webp",
        linkedin: "https://www.linkedin.com/in/praneel-dev-3b9754321",
      },
    ],
  },

  {
    title: "Speaker Outreach",
    members: [
      {
        name: "Aditya Jain",
        role: "Speaker Outreach",
        image: "/team/adi.webp",
        linkedin: "https://www.linkedin.com/in/aditya-jain-790743322",
      },
      {
        name: "Diksha Sakhi",
        role: "Speaker Outreach",
        image: "/team/diksha.webp",
        linkedin: "https://www.linkedin.com/in/diksha-sakhi-a60b62334",
      },
      {
        name: "Diya Mathur",
        role: "Speaker Outreach",
        image: "/team/diya.webp",
        linkedin: "https://www.linkedin.com/in/diya-mathur-2b0074266",
      },
      {
        name: "Raghav Khandelwal",
        role: "Speaker Outreach",
        image: "/team/raghav.webp",
        linkedin: "https://www.linkedin.com/in/raghav-khandelwal-b8b7012a4",
      },
    ],
  },

  {
    title: "Graphic Designing",
    members: [
      {
        name: "Aanya Agarwal",
        role: "Graphic Designer",
        image: "/team/aanya.webp",
        linkedin: "https://www.linkedin.com/in/aanya-agarwal-86a841380",
      },
      {
        name: "Aditya Narula",
        role: "Graphic Designer",
        image: "/team/narula.webp",
        linkedin: "https://www.linkedin.com/in/aditya-narula-b36057301",
      },
      {
        name: "Somil Ajmera",
        role: "Graphic Designer",
        image: "/team/somil.webp",
        linkedin: "https://www.linkedin.com/in/somil-ajmera-077a04356",
      },
      {
        name: "Tanmay Sharma",
        role: "Graphic Designer",
        image: "/team/tanmay.webp",
        linkedin: "https://www.linkedin.com/in/tanmay-sharma-2a84212b2",
      },
      {
        name: "Vedha Sinkar",
        role: "Graphic Designer",
        image: "/team/vedha.webp",
        linkedin: "https://www.linkedin.com/in/vedha-sinkar-308b4131a",
      },
    ],
  },

  {
    title: "Event Management",
    members: [
      {
        name: "Anshul Bansal",
        role: "Event Management",
        image: "/team/anshul.webp",
        linkedin: "https://www.linkedin.com/in/anshulbansalxd",
      },
      {
        name: "Dev Rastogi",
        role: "Event Management",
        image: "/team/dev.webp",
        linkedin:
          "https://www.linkedin.com/in/dev-rastogi-a9799230a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      },
      {
        name: "Kavya Jethani",
        role: "Event Management",
        image: "/team/kavya.webp",
        linkedin:
          "https://www.linkedin.com/in/kavya-jethani-380629292?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      },
      {
        name: "Krittika Agarwal",
        role: "Event Management",
        image: "/team/krittika.webp",
        linkedin:
          "https://www.linkedin.com/in/krittika-agrawal-716b17228?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      },
      {
        name: "Pranav Vashisth",
        role: "Event Management",
        image: "/team/pranav.webp",
        linkedin:
          "https://www.linkedin.com/in/pranav-vashisth?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      },
    ],
  },

  {
    title: "Sponsorship",
    members: [
      {
        name: "Adwaiy Mahajan",
        role: "Sponsorship",
        image: "/team/adwaiy.webp",
        linkedin: "https://www.linkedin.com/in/adwaiy-mahajan-107503212",
      },
      {
        name: "Devansh Katariya",
        role: "Sponsorship",
        image: "/team/devansh.webp",
        linkedin:
          "https://www.linkedin.com/in/devansh-katariya-a639b4289?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      },
      {
        name: "Krishna Khairnar",
        role: "Sponsorship",
        image: "/team/krishna.webp",
        linkedin: "https://www.linkedin.com/in/krishna-khairnar-229291318",
      },
      {
        name: "Manan Vaish",
        role: "Sponsorship",
        image: "/team/manan.webp",
        linkedin:
          "https://www.linkedin.com/in/manan-vaish-0ba187313?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      },
      {
        name: "Samar Goyal",
        role: "Sponsorship",
        image: "/team/samar.webp",
        linkedin:
          "https://www.linkedin.com/in/samar-goyal-164383314?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      },
    ],
  },

  {
    title: "Social Media",
    members: [
      {
        name: "Aayana Jain",
        role: "Social Media",
        image: "/team/aayana.webp",
        linkedin:
          "https://www.linkedin.com/in/aayana-jain-aa8902321?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      },
      {
        name: "Kaustubh Gera",
        role: "Social Media",
        image: "/team/kaustubh.webp",
        linkedin:
          "https://www.linkedin.com/in/kaustubh-gera-906094321?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      },
    ],
  },

  {
    title: "Video Editing",
    members: [
      {
        name: "K Arya Sekhar Das",
        role: "Video Editor",
        image: "/team/karya.webp",
        linkedin: "https://www.linkedin.com/in/intelligentears",
      },
      {
        name: "Roodraksh Agrawal",
        role: "Video Editor",
        image: "/team/roodraksh.webp",
        linkedin: "https://www.linkedin.com/in/roodraksh-agrawal-6a91a232b",
      },
      {
        name: "Rutwik Naik",
        role: "Video Editor",
        image: "/team/rutwik.webp",
        linkedin: "https://www.linkedin.com/in/rutwik-naik-0526b8340",
      },
      {
        name: "Somik Jain",
        role: "Video Editor",
        image: "/team/somik.webp",
        linkedin: "https://www.linkedin.com/in/somik-jain-3a5933316",
      },
    ],
  },
];

export default function Team() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const cards = sectionRef.current.querySelectorAll(".team-card");

    cards.forEach((card) => {
      gsap.fromTo(
        card,
        { opacity: 0, scale: 0.9, filter: "blur(8px)" },
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
        },
      );
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-black/30 text-white flex flex-col items-center py-20 px-4"
    >
      <h1
        className="
    relative z-10
    text-center
    font-light
    tracking-tight
    leading-tight
    max-w-[92vw]
    mx-auto
    py-8
    text-[clamp(2.6rem,8vw,7.5rem)]
  "
      >
        <span className="text-[#eb0028] ">Meet Our</span>{" "}
        <span className="text-[#EB0028]">Team</span>
      </h1>

      <div className="flex flex-col gap-20 w-full max-w-6xl">
        {teamData.map((group, index) => (
          <div key={index} className="w-full">
            <h2
              className="
            text-center
            font-light
            uppercase
            tracking-tight
            leading-tight
            max-w-[92vw]
            mx-auto
            py-2
            text-[clamp(2.4rem,8vw,2.8rem)]
          "
            >
              {group.title}
            </h2>

            <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
              {group.members.map((member, i) => (
                <div
                  key={i}
                  className={`
                     team-card group relative flex flex-col items-center 
                     bg-neutral-900 rounded-2xl shadow-lg p-5 
                     w-[80%] xs:w-[70%] sm:w-[45%]
                     ${
                       group.title === "Event Management" ||
                       group.title === "Graphic Designing" ||
                       group.title === "Content Writing" ||
                       group.title === "Sponsorship"
                         ? "md:w-[23%]" // 3 cards per row
                         : "md:w-[22%]" // 4 cards per row
                     }
                     transition-transform duration-300 hover:scale-95 hover:shadow-[#eb0028]/50
                   `}
                >
                  <div className="relative mb-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-28 h-28 md:w-36 md:h-36 object-cover rounded-full border-2 border-black/50"
                    />
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 
                      bg-black/60 rounded-full flex items-center justify-center
                      transition-opacity duration-300"
                    >
                      <FaLinkedin className="text-white text-3xl" />
                    </a>
                  </div>

                  <h4 className="text-base sm:text-lg font-semibold text-white text-center">
                    {member.name}
                  </h4>

                  <p className="text-xs sm:text-sm text-gray-400 text-center leading-tight">
                    {Array.isArray(member.role)
                      ? member.role.map((line, idx) => (
                          <span key={idx}>
                            {line}
                            <br />
                          </span>
                        ))
                      : member.role}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
