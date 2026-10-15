import { motion } from "framer-motion";

const About = () => {
  const sections = [
    {
      id: 1,
      title: (
        <>
          What is{" "}
          <span className="text-[#EB0028] font-semibold">TEDxLNMIIT</span>?
        </>
      ),
      text: `TEDxLNMIIT is a student-organised event that brings together community leaders, innovators, and changemakers to express their ideas. It is a forum for individuals to share their stories, thoughts, and hobbies in an instructive and inspirational way. By Forging The Future, we open up endless possibilities for innovation and game-changing ideas. This is not just necessary but also an exciting endeavour which requires bravery, ingenuity, and patience. It also provides enormous benefits and satisfaction. Our goal is to bring together the best minds to present ideas that will change your perspectives and lead you on a journey of self-discovery.`,
    },
    {
      id: 2,
      title: (
        <>
          About <span className="text-[#EB0028] font-bold">TED</span>
        </>
      ),
      text: `TED began in 1984 as a conference where Technology, Entertainment and Design converged, but today it spans a multitude of worldwide communities and initiatives exploring everything from science and business to education, arts and global issues. It is on a mission to discover and spread ideas that spark imagination, embrace possibility and catalyze impact.`,
    },
    {
      id: 3,
      title: (
        <>
          About <span className="text-[#EB0028] font-semibold">TEDx</span>
        </>
      ),
      text: `In the spirit of ideas worth spreading, TEDx is a program of local, self-organized events that bring people together to share a TED-like experience. At a TEDx event, TED Talks videos and live speakers combine to spark deep discussion and connection. These local, self-organized events are branded TEDx, where x = independently organized TED event.`,
    },
  ];

  return (
    <div className="w-full">
      {sections.map((sec) => (
        <section
          key={sec.id}
          className="relative w-full flex items-center justify-center py-20"
        >
          <div className="absolute inset-0" />

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative z-10 px-6 text-center max-w-6xl"
          >
            {/* FIXED HEADING */}
            <h2
              className="
                text-center
                font-medium
                tracking-tight
                leading-tight
                max-w-[92vw]
                mx-auto
                mb-3
                text-[clamp(2rem,6vw,4.5rem)]
              "
            >
              {sec.title}
            </h2>

            {/* TEXT */}
            <p className="mx-auto text-[1.05rem] md:text-[1.10rem] text-gray-200 drop-shadow-md max-w-3xl leading-relaxed">
              {sec.text}
            </p>
          </motion.div>
        </section>
      ))}
    </div>
  );
};

export default About;
