import { challengeCategories } from "../../data/challenges";

export default function Step4Challenges({
  formData,
  updateField,
  nextStep,
  previousStep,
}) {
  const selected =
    formData.challenges || [];

  const toggleChallenge = (value) => {
    const exists =
      selected.includes(value);

    if (exists) {
      updateField(
        "challenges",
        selected.filter(
          (item) => item !== value
        )
      );
    } else {
      updateField("challenges", [
        ...selected,
        value,
      ]);
    }
  };

  return (
    <div>
      {/* HEADER */}

      <div className="pt-[60px] pb-10 border-b border-[rgba(255,255,255,.07)] mb-11">

        <div className="uppercase tracking-[0.2em] text-[10px] font-bold text-[#E8192C] mb-[10px]">
          Section 04 — Challenges
        </div>

        <h2 className="text-[30px] font-extrabold text-white mb-[10px]">
          What's stopping growth?
        </h2>

        <p className="text-[14px] text-[#A8A49C] max-w-[560px] leading-[1.75]">
          Select all challenges currently affecting
          your business. These directly influence
          the workflow blueprint and team structure.
        </p>

      </div>

      {/* CHALLENGE GROUPS */}

      <div className="space-y-8">

        {challengeCategories.map(
          (category) => (
            <div
              key={category.title}
              className="
                bg-[#111110]
                border
                border-[rgba(255,255,255,.07)]
                rounded-[18px]
                p-6
              "
            >
              <h3 className="font-bold text-white mb-5">
                {category.title}
              </h3>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">

                {category.items.map(
                  (challenge) => {
                    const active =
                      selected.includes(
                        challenge.value
                      );

                    return (
                      <button
                        key={
                          challenge.value
                        }
                        type="button"
                        onClick={() =>
                          toggleChallenge(
                            challenge.value
                          )
                        }
                        className={`
                          p-4
                          rounded-[10px]
                          border
                          text-left
                          transition-all

                          ${
                            active
                              ? "bg-[rgba(232,25,44,.12)] border-[#E8192C] text-white"
                              : "bg-[#181614] border-[rgba(255,255,255,.07)] text-[#A8A49C]"
                          }
                        `}
                      >
                        {challenge.label}
                      </button>
                    );
                  }
                )}
              </div>
            </div>
          )
        )}

      </div>

      {/* PRIORITY CHALLENGE */}

      <div className="mt-10">

        <label className="block uppercase text-[11px] tracking-[0.1em] font-bold text-[#A8A49C] mb-3">
          Biggest Challenge Right Now
        </label>

        <textarea
          rows={5}
          value={
            formData.primary_challenge ||
            ""
          }
          onChange={(e) =>
            updateField(
              "primary_challenge",
              e.target.value
            )
          }
          placeholder="Describe your biggest challenge in detail..."
          className="
            w-full
            bg-[#111110]
            border
            border-[rgba(255,255,255,.07)]
            rounded-[10px]
            p-4
            text-white
          "
        />
      </div>

      {/* URGENCY */}

      <div className="mt-10">

        <label className="block uppercase text-[11px] tracking-[0.1em] font-bold text-[#A8A49C] mb-4">
          Growth Urgency
        </label>

        <div className="grid grid-cols-5 gap-3">

          {[1, 2, 3, 4, 5].map(
            (score) => (
              <button
                key={score}
                type="button"
                onClick={() =>
                  updateField(
                    "urgency_score",
                    score
                  )
                }
                className={`
                  py-4
                  rounded-[10px]
                  border
                  font-bold

                  ${
                    formData.urgency_score ===
                    score
                      ? "bg-[#E8192C] border-[#E8192C]"
                      : "bg-[#111110] border-[rgba(255,255,255,.07)]"
                  }
                `}
              >
                {score}
              </button>
            )
          )}

        </div>

        <p className="text-[#5C5850] text-sm mt-3">
          1 = No urgency • 5 = Need
          immediate results
        </p>

      </div>

      {/* FOOTER */}

      <div className="flex justify-between items-center mt-12 pt-8 border-t border-[rgba(255,255,255,.07)]">

        <button
          onClick={previousStep}
          className="
            border
            border-[rgba(255,255,255,.07)]
            px-6
            py-3
            rounded-[10px]
          "
        >
          ← Back
        </button>

        <div className="uppercase text-[11px] tracking-[0.1em] text-[#5C5850]">
          Step 4 of 7
        </div>

        <button
          onClick={nextStep}
          className="
            bg-[#E8192C]
            px-8
            py-4
            rounded-[10px]
            font-bold
            uppercase
          "
        >
          Next: Goals →
        </button>

      </div>
    </div>
  );
}