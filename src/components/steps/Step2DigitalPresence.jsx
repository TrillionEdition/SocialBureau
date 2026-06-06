import {
  platforms,
  contentTypes,
} from "../../data/platforms";

export default function Step2DigitalPresence({
  formData,
  updateField,
  updateNested,
  nextStep,
  previousStep,
}) {
  const togglePlatform = (platform) => {
    const exists =
      formData.platforms.includes(platform);

    if (exists) {
      updateField(
        "platforms",
        formData.platforms.filter(
          (p) => p !== platform
        )
      );
    } else {
      updateField("platforms", [
        ...formData.platforms,
        platform,
      ]);
    }
  };

  const toggleContentType = (type) => {
    const exists =
      formData.content_types.includes(type);

    if (exists) {
      updateField(
        "content_types",
        formData.content_types.filter(
          (c) => c !== type
        )
      );
    } else {
      updateField("content_types", [
        ...formData.content_types,
        type,
      ]);
    }
  };

  return (
    <div>
      {/* HEADER */}

      <div className="pt-[60px] pb-10 border-b border-[rgba(255,255,255,.07)] mb-11">

        <div className="uppercase tracking-[0.2em] text-[10px] font-bold text-[#E8192C] mb-[10px]">
          Section 02 — Digital Presence
        </div>

        <h2 className="text-[30px] font-extrabold text-white mb-[10px]">
          Your current digital footprint
        </h2>

        <p className="text-[14px] text-[#A8A49C] max-w-[560px] leading-[1.75]">
          Which platforms are you on,
          how active are you,
          and what content are you making?
        </p>

      </div>

      {/* PLATFORMS */}

      <div className="mb-10">

        <div className="uppercase text-[11px] tracking-[0.1em] font-bold text-[#A8A49C] mb-4">
          Platforms You're Currently Active On
        </div>

        <div className="grid md:grid-cols-4 gap-3">

          {platforms.map((platform) => {
            const selected =
              formData.platforms.includes(
                platform.value
              );

            return (
              <button
                type="button"
                key={platform.value}
                onClick={() =>
                  togglePlatform(
                    platform.value
                  )
                }
                className={`
                  p-4
                  rounded-[10px]
                  border
                  text-left
                  transition-all

                  ${
                    selected
                      ? "border-[#E8192C] bg-[rgba(232,25,44,.12)] text-white"
                      : "border-[rgba(255,255,255,.07)] bg-[#111110] text-[#A8A49C]"
                  }
                `}
              >
                {platform.label}
              </button>
            );
          })}
        </div>

      </div>

      {/* URL SECTION */}

      <div className="flex items-center gap-4 my-10">
        <div className="flex-1 h-px bg-[rgba(255,255,255,.07)]" />

        <span className="uppercase text-[10px] tracking-[0.2em] text-[#5C5850]">
          Platform URLs
        </span>

        <div className="flex-1 h-px bg-[rgba(255,255,255,.07)]" />
      </div>

      <div className="grid md:grid-cols-2 gap-4">

        <input
          type="url"
          placeholder="Website URL"
          value={formData.urls.website}
          onChange={(e) =>
            updateNested(
              "urls",
              "website",
              e.target.value
            )
          }
          className="bg-[#111110] border border-[rgba(255,255,255,.07)] rounded-[10px] p-3"
        />

        <input
          type="text"
          placeholder="Instagram Handle"
          value={formData.urls.instagram}
          onChange={(e) =>
            updateNested(
              "urls",
              "instagram",
              e.target.value
            )
          }
          className="bg-[#111110] border border-[rgba(255,255,255,.07)] rounded-[10px] p-3"
        />

        <input
          type="url"
          placeholder="Facebook Page URL"
          value={formData.urls.facebook}
          onChange={(e) =>
            updateNested(
              "urls",
              "facebook",
              e.target.value
            )
          }
          className="bg-[#111110] border border-[rgba(255,255,255,.07)] rounded-[10px] p-3"
        />

        <input
          type="url"
          placeholder="YouTube Channel URL"
          value={formData.urls.youtube}
          onChange={(e) =>
            updateNested(
              "urls",
              "youtube",
              e.target.value
            )
          }
          className="bg-[#111110] border border-[rgba(255,255,255,.07)] rounded-[10px] p-3"
        />

        <input
          type="url"
          placeholder="LinkedIn Page"
          value={formData.urls.linkedin}
          onChange={(e) =>
            updateNested(
              "urls",
              "linkedin",
              e.target.value
            )
          }
          className="bg-[#111110] border border-[rgba(255,255,255,.07)] rounded-[10px] p-3"
        />

        <input
          type="text"
          placeholder="Other Platforms"
          value={formData.urls.other}
          onChange={(e) =>
            updateNested(
              "urls",
              "other",
              e.target.value
            )
          }
          className="bg-[#111110] border border-[rgba(255,255,255,.07)] rounded-[10px] p-3"
        />

      </div>

      {/* CONTENT ACTIVITY */}

      <div className="flex items-center gap-4 my-10">
        <div className="flex-1 h-px bg-[rgba(255,255,255,.07)]" />

        <span className="uppercase text-[10px] tracking-[0.2em] text-[#5C5850]">
          Content Activity
        </span>

        <div className="flex-1 h-px bg-[rgba(255,255,255,.07)]" />
      </div>

      <div className="grid md:grid-cols-2 gap-4">

        <select
          value={formData.post_freq || ""}
          onChange={(e) =>
            updateField(
              "post_freq",
              e.target.value
            )
          }
          className="bg-[#111110] border border-[rgba(255,255,255,.07)] rounded-[10px] p-3"
        >
          <option value="">
            How often do you post?
          </option>

          <option value="none">
            Not Posting
          </option>

          <option value="rare">
            Rarely
          </option>

          <option value="weekly">
            Weekly
          </option>

          <option value="daily">
            Daily
          </option>

          <option value="multi">
            Multiple Times Daily
          </option>
        </select>

        <select
          value={formData.content_who || ""}
          onChange={(e) =>
            updateField(
              "content_who",
              e.target.value
            )
          }
          className="bg-[#111110] border border-[rgba(255,255,255,.07)] rounded-[10px] p-3"
        >
          <option value="">
            Who Creates Content?
          </option>

          <option value="self">
            Myself
          </option>

          <option value="intern">
            In-house Team
          </option>

          <option value="freelancer">
            Freelancer
          </option>

          <option value="agency">
            Another Agency
          </option>

          <option value="nobody">
            Nobody
          </option>
        </select>

        <select
          value={formData.paid_ads || ""}
          onChange={(e) =>
            updateField(
              "paid_ads",
              e.target.value
            )
          }
          className="bg-[#111110] border border-[rgba(255,255,255,.07)] rounded-[10px] p-3"
        >
          <option value="">
            Paid Advertising?
          </option>

          <option value="none">
            No Ads
          </option>

          <option value="boost">
            Boost Posts
          </option>

          <option value="meta">
            Meta Ads
          </option>

          <option value="google">
            Google Ads
          </option>

          <option value="both">
            Meta + Google
          </option>

          <option value="all">
            Multiple Platforms
          </option>
        </select>

        <select
          value={formData.analytics || ""}
          onChange={(e) =>
            updateField(
              "analytics",
              e.target.value
            )
          }
          className="bg-[#111110] border border-[rgba(255,255,255,.07)] rounded-[10px] p-3"
        >
          <option value="">
            Analytics Setup?
          </option>

          <option value="none">
            None
          </option>

          <option value="partial">
            Partial
          </option>

          <option value="ga_only">
            Google Analytics
          </option>

          <option value="full">
            GA4 + Search Console
          </option>

          <option value="advanced">
            Advanced Dashboard
          </option>
        </select>

      </div>

      {/* CONTENT TYPES */}

      <div className="mt-10">

        <div className="uppercase text-[11px] tracking-[0.1em] font-bold text-[#A8A49C] mb-4">
          Content Types You Produce
        </div>

        <div className="grid md:grid-cols-3 gap-3">

          {contentTypes.map((item) => {
            const selected =
              formData.content_types.includes(
                item.value
              );

            return (
              <button
                key={item.value}
                type="button"
                onClick={() =>
                  toggleContentType(
                    item.value
                  )
                }
                className={`
                  p-4
                  rounded-[10px]
                  border
                  text-left
                  transition-all

                  ${
                    selected
                      ? "bg-[rgba(232,25,44,.12)] border-[#E8192C]"
                      : "bg-[#111110] border-[rgba(255,255,255,.07)]"
                  }
                `}
              >
                {item.label}
              </button>
            );
          })}
        </div>

      </div>

      {/* FOOTER */}

      <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-4 mt-12 pt-8 border-t border-[rgba(255,255,255,.07)]">

  <button
    onClick={previousStep}
    className="
      w-full sm:w-auto
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
    Step 2 of 7
  </div>

  <button
    onClick={nextStep}
    className="
      w-full sm:w-auto
      bg-[#E8192C]
      px-8
      py-4
      rounded-[10px]
      font-bold
      uppercase
    "
  >
    Next: Performance →
  </button>

</div>
    </div>
  );
}