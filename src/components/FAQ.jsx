import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react"; // icons

const faqs = [
  {
    question: "What is TEDx?",
    answer: "TEDx is a locally organized event that is licensed by TED, allowing communities to host live speakers who share their ideas, experiences, and viewpoints."
  },
  {
    question: "How can I attend a TEDx event?",
    answer: "To attend a TEDx event, visit the official TEDx website or the page dedicated to the specific event for information on registration, dates, and ticket availability."
  },
  {
    question: "Are TEDx talks available online?",
    answer: "Yes, the majority of TEDx talks are recorded and published on the TEDx YouTube channel and the TEDx website, enabling a worldwide audience to access this inspiring content."
  },
  {
    question: "What makes TEDx talks different from TED talks?",
    answer: "TEDx talks are organized and managed at the local level, whereas TED talks are curated by the main TED organization. While both platforms aim to share ideas, they function on different scales and have distinct structures."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-black/20 text-white flex flex-col items-center px-6 py-24">
   <h1
  class="
    text-center
    font-light
    tracking-tight
    leading-[1]
    max-w-[92vw]
    mx-auto
    py-8

    text-[clamp(2.4rem,7vw,4rem)]
  "
>
  <span class="text-white">Frequently asked</span>{" "}
  <span class="text-[#EB0028] ">Questions</span>
</h1>

      {/* FAQ List */}
      <div className="w-full max-w-2xl space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-neutral-900 rounded-xl shadow-md p-4 cursor-pointer transition hover:bg-neutral-800 hover:scale-[1.02]"
            onClick={() => toggleFAQ(index)}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium group">
                <span className="bg-[#b3acac] bg-clip-text text-transparent ">
                  {faq.question}
                </span>
              </h2>
              {openIndex === index ? (
                <ChevronUp className="text-[#EB0028]" />
              ) : (
                <ChevronDown className="text-[#EB0028]" />
              )}
            </div>
            {openIndex === index && (
              <p className="mt-3 text-gray-300 animate-fadeIn">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
