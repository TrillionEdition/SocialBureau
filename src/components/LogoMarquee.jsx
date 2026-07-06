import React from "react";

const LOGOS = [
  {
    name: "Google Ads",
    src: "https://img.magnific.com/premium-vector/google-ads-logo_578229-305.jpg?semt=ais_hybrid&w=740&q=80",
  },
  {
    name: "Meta Business Manager",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCMFlza9NA2s203TxFcCrJt8IRhoLYEE40jLZscWX49dpbl0S1bJr8f47N&s=10",
  },
  {
    name: "JioHotstar Agency",
    src: "https://th-i.thgim.com/public/entertainment/movies/7baemw/article69218131.ece/alternates/FREE_1200/JioHotstar%20Brand%20Horizontal.JPEG",
  },
  {
    name: "DV360",
    src: "https://developers.google.com/static/ads/images/logo_display_video_360_192px.svg",
  },
  {
    name: "LinkedIn Ads",
    src: "https://www.paubox.com/hubfs/Imported_Blog_Media/LinkedIn-Ads-logo-3.jpg",
  },
  {
    name: "YouTube Ads",
    src: "https://static.vecteezy.com/system/resources/previews/075/653/889/non_2x/youtube-ads-logo-icon-free-png.png",
  },
  {
    name: "Amazon Ads",
    src: "https://m.media-amazon.com/images/G/01/AdProductsWebsite/images/logos/OG_image_Squid_Ink.png",
  },
  {
    name: "X Ads",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPmB-gHnCvK62Swwz4DgLntxGyviFakj311tR77uPRPlSo8QQtzsSbBKaO&s=10",
  },
  {
    name: "Snapchat Ads",
    src: "https://images.ctfassets.net/inb32lme5009/7bkohgfO4vjHwS8AGNpb0S/fa32477e3880f95625b6a3403d37dc95/Snapchat_Ghost_OG-Image.jpg",
  },
  {
    name: "Meta Ads",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLwTMK_Xr7SYUcRlwGeZAvOpcyY0tP0rTIe_M9hgWtjA&s=10",
  },
  {
    name: "Microsoft Advertising ",
    src: "https://media.licdn.com/dms/image/v2/D5612AQH3wDnQZnzspQ/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1674495024024?e=2147483647&v=beta&t=0UUqaBoWqY_vRepHybDM7UVkMoeZUe1PIcYJE8esRVM",
  },
  {
    name: "TikTok Ads",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSslhIr_yj1ekhDjXCk_YkLU_bsOXih2EGOywdmirIEf1EI3TxDksQS8Hu&s=10",
  },
  {
    name: "Pinterest Ads",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrZECiqUWk2VZa6L8yvWaBLEQjA-sC1M2pN7ZU9h1aL0GwhZu8fl9Vh9Q&s=10",
  },
  {
    name: "Spotify Ads",
    src: "https://images.ctfassets.net/tvhwpwv117no/1nWOxM7jOLjkbzV31FrAO4/4c38b15c133e446cc6d20637972b469f/AdsSpot-NewLogo-META.png",
  },
  {
    name: "Apple Search Ads",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRg6YTgmUjo-eH-Vi8t-oyBNLGYM2Wo1pw595Ex04thjQ&s=10",
  },
  {
    name: "Google Marketing Platform",
    src: "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/GMP.max-200x200.png",
  },
  {
    name: "Google Ad Manager",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStoTQzKMe-YBCYOGs66E8d5pfQHzZFK-7rZQNXWZSKyDLD-f9QFmgqSAE&s=10",
  },
  {
    name: "The Trade Desk",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoFFuGygwyB8Mea79r2dN_nQ3ob1WacHiBvMJoBHb6svQjCtdO4pH3Nd4F&s=10",
  },

  {
    name: "StackAdapt",
    src: "https://mms.businesswire.com/media/20260505143235/en/2794258/22/StackAdapt_Logo_StackAdapt_Logo%2BWordmark_500px.jpg",
  },
  {
    name: "Criteo",
    src: "https://newdelhi.ad-tech.com/wp-content/uploads/2021/08/criteo_new_logo.png",
  },
  {
    name: "Taboola",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFbdDJbJjlWVDTXdEp4WTrUAgeoRBI7mL4Uy-eEVDSFg&s=10",
  },
  {
    name: "Outbrain",
    src: "https://www.outbrain.com/blog/wp-content/uploads/2021/01/OB-Amelia-2019-Web-Orange-1024x997.png",
  },
  {
    name: "Apple Podcasts Sponsorships",
    src: "https://cdn.prod.website-files.com/69e885715916d9be88590c5f/69ef3a6ea9078b16311546d1_applepod-image.png",
  },
  {
    name: "Gaana Ads",
    src: "https://exchange4media.gumlet.io/news-photo/93617-gaanamain.jpg",
  },
  {
    name: "JioSaavn Ads",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxcC4DKCuoRx5cTEeMXttwEXf3wpLZNBsfzQrYo2Vc_Q&s",
  },
  {
    name: "Wynk Music Ads",
    src: "https://i0.wp.com/www.themediaant.com/blog/wp-content/uploads/2023/11/wynk-music-jpg.webp",
  },
  {
    name: "Netflix Ads",
    src: "https://images.ctfassets.net/4cd45et68cgf/Rx83JoRDMkYNlMC9MKzcB/2b14d5a59fc3937afd3f03191e19502d/Netflix-Symbol.png?w=700&h=456",
  },
  {
    name: "Amazon Prime Video Ads",
    src: "https://m.media-amazon.com/images/G/01/AdProductsWebsite/images/campaigns/primeVideo/pv-tile-white-on-blue_500x._TTW_.png",
  },
  {
    name: "Sony LIV Ads ",
    src: "https://cdn.smartads.in/images/product/digital/Sony-LIV.png",
  },
  {
    name: "ZEE5 Ads",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1NV7EhSL0c1CXOO3y8MYACvga6jVCVRnwhIKIAYmVZKK1HxbtnlcwcS4&s=10",
  },
  {
    name: "MX Player Ads",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQogRvKyIITxdRl_sScnnfnpXPSk0EUpn-zKq2Hc7uuaff-WhR5YvLQWWtW&s=10",
  },
  {
    name: "Samsung Ads",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa91DJ5f18NPxH4v1jYjyxql-DF7UQiC4Y6FSavcjcOQpz3l8qfxiGR6M&s=10",
  },
  {
    name: "LG Ads Solutions",
    src: "https://lgads.tv/wp-content/uploads/2022/11/lg-ad-solution-allblack-1.png",
  },
];

export default function LogoMarquee() {
  const items = [...LOGOS, ...LOGOS];

 const firstRow = items.slice(0, Math.ceil(items.length / 2));
const secondRow = items.slice(Math.ceil(items.length / 2));

return (
  <div className="relative w-full overflow-hidden bg-white py-6">
    <style>{`
      @keyframes marquee-left {
        from { transform: translateX(0); }
        to { transform: translateX(-50%); }
      }

      @keyframes marquee-right {
        from { transform: translateX(-50%); }
        to { transform: translateX(0); }
      }

      .marquee-left {
        animation: marquee-left 50s linear infinite;
      }

      .marquee-right {
        animation: marquee-right 50s linear infinite;
      }
    `}</style>

    <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent" />
    <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent" />

    <div className="space-y-6">
      {/* Row 1 */}
      <div className="overflow-hidden">
        <div className="marquee-left flex w-max items-center gap-12">
          {[...firstRow, ...firstRow].map((logo, i) => (
            <div
              key={`top-${i}`}
              className="flex h-14 shrink-0 items-center justify-center rounded-xl p-3"
            >
              <img
                src={logo.src}
                alt={logo.name}
                className="max-h-full max-w-full"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 */}
      <div className="overflow-hidden">
        <div className="marquee-right flex w-max items-center gap-12">
          {[...secondRow, ...secondRow].map((logo, i) => (
            <div
              key={`bottom-${i}`}
              className="flex h-14 shrink-0 items-center justify-center rounded-xl p-3"
            >
              <img
                src={logo.src}
                alt={logo.name}
                className="max-h-full max-w-full"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
}