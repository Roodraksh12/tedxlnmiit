import { FaBullhorn, FaUsers, FaGift } from "react-icons/fa";

export default function CA() {
  return (
    <main className="text-white min-h-screen flex flex-col items-center space-y-24">

  {/*HEADER*/}
  <section className="text-center pt-20 pb-12 px-4 space-y-6 w-full">
    <h1 className="text-4xl sm:text-6xl font-bold">
      <span className="text-[#EB0028]">TEDx</span>LNMIIT{" "}
      <span className="text-[#EB0028]">2026</span>
    </h1>

    <p className="text-lg sm:text-xl text-gray-300">
      Campus Ambassador Program
    </p>

    {/* Ribbon */}
    <div className="w-full  mx-auto pt-6">
      <div
        className="
          w-full
          py-4
          text-center
          text-white
          text-lg sm:text-xl font-semibold
          bg-gradient-to-r
          from-black
          via-[#EB0028]
          to-black
        "
      >
        Spread Ideas That Matter!
      </div>
    </div>
  </section>

  {/*WHY SECTION*/}
  <section className="w-full max-w-6xl text-center px-4 space-y-10 pb-24">
    <h2 className="text-2xl sm:text-4xl text-white">
      Why Become a Campus Ambassador?
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

      {/* Benefits */}
      <div className="bg-[#0d0d0d] border border-red-600 rounded-2xl p-8 space-y-4">
        <h3 className="text-2xl font-bold text-[#EB0028]">Benefits</h3>
        <p className="text-gray-400">
          What you'll gain as an ambassador
        </p>
        <ul className="text-left list-disc list-inside space-y-2 text-gray-200">
          <li>Exclusive Free Ticket for TEDxLNMIIT 2026</li>
          <li>Exclusive TEDxLNMIIT merchandise and goodies</li>
          <li>Official certificate recognizing your contribution</li>
          <li>Networking with speakers and influencers</li>
          <li>Develop leadership and organizational skills</li>
        </ul>
      </div>

      {/* Responsibilities */}
      <div className="bg-[#0d0d0d] border border-red-600 rounded-2xl p-8 space-y-4">
        <h3 className="text-2xl font-bold text-[#EB0028]">Responsibilities</h3>
        <p className="text-gray-400">
          Your role as an ambassador
        </p>
        <ul className="text-left list-disc list-inside space-y-2 text-gray-200">
          <li>Promote TEDxLNMIIT 2026 through various channels</li>
          <li>Assist in organizing TEDx-related campus events</li>
          <li>Engage and inspire your community</li>
          <li>Share the importance of ideas worth spreading</li>
          <li>Represent TEDxLNMIIT in your institution</li>
        </ul>
      </div>

    </div>
  </section>

      {/* Form */}
      <section className="text-center mb-24">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6">
          Ready to Make an Impact?
        </h2>

       <a
  href="https://docs.google.com/forms/d/e/1FAIpQLSeFPBfER8aBnslNWhklkOpZ_LdHbtWpTjQ6bHOM4PjEGMg3ow/viewform?usp=publish-editor"
  target="_blank"
  rel="noopener noreferrer"
  class="
    bg-[#EB0028] hover:bg-red-700
    transition-all duration-300
    text-white
    px-4 sm:px-5 md:px-6
    py-2 sm:py-2.5
    rounded-full
    text-sm sm:text-base md:text-lg
    whitespace-nowrap
    inline-block
  "
>
  Apply to be a Campus Ambassador
</a>



        <p className="mt-4 text-gray-400 text-sm">
          Fill out the application form, and we'll contact you with further details.
        </p>
      </section>

      {/*  COMMUNITY */}
      <section className="w-full max-w-5xl text-center px-4 pb-24">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-10">
          Join Our Inspiring Community
        </h2>

       <div className="grid grid-cols-3 gap-4 sm:gap-8">

  <div className="bg-[#0d0d0d] rounded-xl p-4 sm:p-8 transition-transform duration-300 hover:scale-105">
    <FaBullhorn className="text-2xl sm:text-3xl text-[#EB0028] mx-auto mb-2 sm:mb-4" />
    <h3 className="text-sm sm:text-lg font-semibold mb-1 sm:mb-2 text-center">
      Spread Ideas
    </h3>
    <p className="text-xs sm:text-base text-gray-400 text-center">
      Be a catalyst for sharing innovative thoughts
    </p>
  </div>

  <div className="bg-[#0d0d0d] rounded-xl p-4 sm:p-8 transition-transform duration-300 hover:scale-105">
    <FaUsers className="text-2xl sm:text-3xl text-[#EB0028] mx-auto mb-2 sm:mb-4" />
    <h3 className="text-sm sm:text-lg font-semibold mb-1 sm:mb-2 text-center">
      Build Connections
    </h3>
    <p className="text-xs sm:text-base text-gray-400 text-center">
      Network with like-minded individuals
    </p>
  </div>

  <div className="bg-[#0d0d0d] rounded-xl p-4 sm:p-8 transition-transform duration-300 hover:scale-105">
    <FaGift className="text-2xl sm:text-3xl text-red-500 mx-auto mb-2 sm:mb-4" />
    <h3 className="text-sm sm:text-lg font-semibold mb-1 sm:mb-2 text-center">
      Personal Growth
    </h3>
    <p className="text-xs sm:text-base text-gray-400 text-center">
      Enhance your skills and broaden horizons
    </p>
  </div>

</div>

      </section>
    </main>
  );
}