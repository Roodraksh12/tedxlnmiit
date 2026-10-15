import { FaMicrophone, FaUsers, FaGift, FaVideo, FaHandshake, FaSmile } from "react-icons/fa";


const Tickets = () => {
  return (
    <main className="text-white min-h-screen">

      {/* ---------- HERO ---------- */}
      <section className="text-center pt-20 pb-16 px-4 space-y-6">
        <h1 className="text-6xl sm:text-6xl md:text-7xl font-bold">
          <span className="text-[#EB0028]">TEDx</span>LNMIIT
        </h1>

        <p className="text-gray-300 text-lg">
          Date: 11<sup>th</sup> January 2026 | LNMIIT, Jaipur
        </p>

        <div className="mx-auto mt-10">
          <div className="py-4 text-lg font-semibold bg-gradient-to-r from-black via-[#EB0028] to-black">
            Book Your Ticket Now
          </div>
        </div>
      </section>

      {/* ---------- EXPERIENCE ---------- */}
   <section className="text-center py-8 px-4">
  <h2 className="text-4xl sm:text-5xl md:text-6xl font-light">
    Join The <span className="text-[#EB0028] font-medium">TEDx Experience</span>
  </h2>

  <p className="text-gray-300 max-w-2xl mx-auto mt-3">
    Be part of an inspiring day filled with ideas, innovation, conversations and powerful stories.
  </p>

  <div className="mt-12 max-w-3xl mx-auto">

    <div className="border border-red-500 rounded-3xl bg-gradient-to-b from-black via-[#0b0b0b] to-black shadow-[0_0_45px_rgba(235,0,40,0.35)] p-10">

      {/* Ticket Ribbon */}
      <div className="mx-auto w-fit mt-2">

</div>




      <h3 className="text-2xl font-semibold mt-6">
        TEDxLNMIIT 2026 Pass
      </h3>

      {/* Experience Highlights */}
    <div className="w-full flex justify-center">
  <div className="grid grid-cols-1 gap-4 mt-6 text-gray-200 text-left max-w-md mx-auto">
    <p>✔ Access to all TEDx talks & storytelling sessions</p>
    <p>✔ Meaningful networking with change-makers</p>
    <p>✔ Curated meals & refreshments</p>
    <p>✔ Official TEDx experience & environment</p>
    <p>✔ Exclusive attendee goodies & badge</p>
    <p>✔ A day of inspiration & transformative ideas</p>
  </div>
</div>


      {/* Price Section */}
      <div className="border-t border-gray-700 pt-8 mt-8">
        <p className="text-gray-400 text-sm">Original Price</p>
        

        

        <p className="text-5xl font-bold text-[#EB0028] mt-1">
          ₹499
        </p>


        {/* Registration Options */}
<div className="mt-8">

  <p className="text-gray-300 text-sm mb-4">
    Choose your registration category
  </p>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

    {/* LNMIIT Students & Staff */}
    <a
      href="https://docs.google.com/forms/d/e/1FAIpQLSfVT5bCJh4Mh6QsOgL2Ma2dqaS4fIsfS_QPqmALqZuJXJBsRQ/viewform?usp=publish-editor"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block w-full px-6 py-3 rounded-full
                 font-semibold text-sm
                 bg-[#111] border border-[#EB0028]
                 hover:bg-[#1a1a1a] hover:border-red-600
                 transition text-white"
    >
      🎓 LNMIIT Students & Staff
    </a>

    {/* General Audience */}
    <a
      href="https://docs.google.com/forms/d/e/1FAIpQLScY12g68K73uFWW3GMK5ktGyCNj3vjCnvEmCjtgIiOoU3eXAQ/viewform?usp=publish-editor"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block w-full px-6 py-3 rounded-full
                 font-semibold text-sm
                bg-[#111] border border-[#EB0028]
                 hover:bg-[#1a1a1a] hover:border-red-600
                 transition text-white"
    >
      🌍 General Audience
    </a>

  </div>

</div>


      </div>
    </div>
  </div>
</section>




    {/* ---------- WHY ATTEND ---------- */}
<section className="py-10 px-4 text-center">
  <h2 className="text-3xl font-semibold mb-12">
    Why Attend TEDxLNMIIT?
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">

    {[
      { icon: <FaMicrophone className="text-red-500 text-2xl" />, title: "Inspiring Talks", text: "Engage with thought-provoking ideas" },
      { icon: <FaUsers className="text-red-500 text-2xl" />, title: "Networking", text: "Connect with like-minded individuals" },
      { icon: <FaGift className="text-red-500 text-2xl" />, title: "Exclusive Goodies", text: "Take home memorable souvenirs" },
    ].map((item, i) => (
      <div key={i} className="bg-[#121212] rounded-xl p-8">
        <div className="flex justify-center mb-3">{item.icon}</div>
        <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
        <p className="text-gray-400 text-sm">{item.text}</p>
      </div>
    ))}

  </div>
</section>


{/* ---------- EVENT HIGHLIGHTS ---------- */}
<section className="py-10 px-4 text-center">
  <h2 className="text-3xl font-semibold mb-12">
    Event Highlights
  </h2>

  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">

    {[
      { icon: <FaMicrophone className="text-red-500 text-2xl" />, label: "Keynote Speakers" },
      { icon: <FaVideo className="text-red-500 text-2xl" />, label: "Interactive Sessions" },
      { icon: <FaHandshake className="text-red-500 text-2xl" />, label: "Networking Events" },
      { icon: <FaSmile className="text-red-500 text-2xl" />, label: "Fun Activities" },
    ].map((item, i) => (
      <div key={i} className="bg-[#121212] rounded-xl py-6 flex flex-col items-center gap-2">
        {item.icon}
        <span className="font-medium">{item.label}</span>
      </div>
    ))}

  </div>
</section>


    </main>
  )
}

export default Tickets