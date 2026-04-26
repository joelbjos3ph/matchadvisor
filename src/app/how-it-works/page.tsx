import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const steps = [
  {
    number: "01",
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.6}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
        />
      </svg>
    ),
    title: "Tell us what you need",
    description:
      "Fill in a short form describing your situation — whether you're planning your finances, buying a home, or renovating a space. It takes less than two minutes and there's no obligation.",
    detail: "No account required to get started.",
  },
  {
    number: "02",
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.6}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z"
        />
      </svg>
    ),
    title: "Get matched with vetted professionals",
    description:
      "Our system surfaces the most relevant professionals for your specific needs — filtered by specialisation, location, language, and availability. Every professional on our platform has been screened and verified.",
    detail: "All credentials are checked before listing.",
  },
  {
    number: "03",
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.6}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
        />
      </svg>
    ),
    title: "Review profiles and ratings",
    description:
      "Browse detailed profiles showing each professional's experience, specialisations, client reviews, and verified credentials. Take your time — there's no pressure and no one will contact you uninvited.",
    detail: "Reviews are from real, verified clients.",
  },
  {
    number: "04",
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.6}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
        />
      </svg>
    ),
    title: "Connect and get started",
    description:
      "When you're ready, reach out directly to the professional of your choice. They'll respond promptly to arrange a consultation. Your contact details remain private until you choose to share them.",
    detail: "You stay in control, every step of the way.",
  },
];

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-16 px-6 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
            Simple. Transparent. Free.
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight mb-5">
            How MatchAdvisor works
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed">
            From describing your needs to speaking with the right professional
            — the whole process takes minutes, not days.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Vertical connector line */}
            <div
              aria-hidden
              className="absolute left-[2.25rem] top-0 bottom-0 w-px bg-slate-100 hidden sm:block"
            />

            <div className="flex flex-col gap-10">
              {steps.map((step, i) => (
                <div key={i} className="relative flex gap-6 sm:gap-8 group">
                  {/* Step circle */}
                  <div className="relative z-10 flex-shrink-0 w-[4.5rem] flex flex-col items-center">
                    <div className="w-[4.5rem] h-[4.5rem] rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-200 group-hover:bg-indigo-700 transition-colors">
                      {step.icon}
                    </div>
                  </div>

                  {/* Content card */}
                  <div className="flex-1 bg-white border border-slate-200 rounded-2xl p-7 hover:shadow-lg hover:shadow-slate-100 hover:-translate-y-0.5 transition-all duration-200 mb-2">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-bold text-indigo-400 tracking-widest uppercase">
                        Step {step.number}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 mb-3">
                      {step.title}
                    </h2>
                    <p className="text-slate-500 leading-relaxed mb-4">
                      {step.description}
                    </p>
                    <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full">
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                      {step.detail}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
            Ready to find your match?
          </h2>
          <p className="text-slate-500 mb-8">
            It&apos;s free for consumers and takes less than two minutes to get
            started.
          </p>
          <a
            href="/#categories"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors shadow-sm shadow-indigo-200"
          >
            Find a Professional
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
