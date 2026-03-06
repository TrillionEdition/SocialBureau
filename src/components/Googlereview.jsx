import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import {
  Star,
  MapPin,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Info,
  ArrowRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─────────────────────────────────────────────
   Load Google Maps SDK
───────────────────────────────────────────── */
const loadGoogleScript = (apiKey) =>
  new Promise((resolve, reject) => {
    if (window.google?.maps?.places) return resolve(window.google);
    const s = document.createElement('script');
    s.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    s.async = true;
    s.onload = () => resolve(window.google);
    s.onerror = reject;
    document.head.appendChild(s);
  });

/* ─────────────────────────────────────────────
   Stars
───────────────────────────────────────────── */
const Stars = ({ rating, size = 18 }) => {
  const r = Math.max(0, Math.min(5, Number(rating) || 0));
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          className={
            i <= Math.floor(r)
              ? 'fill-yellow-400 text-yellow-400'
              : 'text-zinc-400'
          }
        />
      ))}
    </div>
  );
};

/* ─────────────────────────────────────────────
   Rating Bar
───────────────────────────────────────────── */
const RatingBar = ({ label, count, total }) => {
  const pct = total ? (count / total) * 100 : 0;
  return (
    <div className="flex items-center gap-3 text-xs">
      <span className="w-2 text-right text-zinc-500">{label}</span>
      <div className="flex-1 h-1.5 bg-zinc-200 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1 }}
          className="h-full bg-yellow-400"
        />
      </div>
      <span className="w-6 text-right text-zinc-500 tabular-nums">
        {count}
      </span>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Review Card
───────────────────────────────────────────── */
const ReviewCard = ({ r }) => {
  const [open, setOpen] = useState(false);
  const text = r.text || '';
  const long = text.length > 150;

  return (
    <div className="
      min-w-[260px] max-w-[260px]
      sm:w-[300px]
      lg:min-w-[340px] lg:max-w-[340px]
      bg-white rounded-3xl p-6 sm:p-8
      border border-gray-100
      flex flex-col gap-4"
    >
      <div className="flex items-center gap-3">
        <img
          src={r.profile_photo_url}
          alt={r.author_name}
          className="w-12 h-12 rounded-full"
          onError={(e) =>
          (e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
            r.author_name || 'A'
          )}`)
          }
        />
        <div className="min-w-0">
          <p className="font-semibold truncate">
            {r.author_name}
          </p>
          <Stars rating={r.rating} size={14} />
        </div>
      </div>

      <p className="text-sm text-[#424245] leading-relaxed">
        {long && !open ? `${text.slice(0, 150)}...` : text}
      </p>

      {long && (
        <button
          onClick={() => setOpen(!open)}
          className="text-xs text-[#0066cc] flex items-center gap-1 self-start"
        >
          {open ? 'Show less' : 'Read more'}
          <ArrowRight size={12} />
        </button>
      )}

      <span className="text-xs text-zinc-500">
        {r.relative_time_description}
      </span>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Map
───────────────────────────────────────────── */
const MapEmbed = ({ apiKey, placeId, location }) => (
  <div className="w-full h-full min-h-[420px] rounded-3xl overflow-hidden border relative">
    <iframe
      title="Map"
      src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=place_id:${placeId}`}
      className="w-full h-full grayscale hover:grayscale-0 transition"
      allowFullScreen
    />
    <div className="absolute bottom-6 left-6 bg-white px-5 py-4 rounded-2xl shadow flex gap-3 items-center">
      <MapPin size={18} />
      <span className="text-sm font-medium">
        {location || 'Chakkalakkal Metro, near Petta, Kochi'}
      </span>
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
export const Googlereview = () => {
  const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
  const PLACE_ID = import.meta.env.VITE_GOOGLE_PLACE_ID;

  const [reviews, setReviews] = useState([]);
  const [place, setPlace] = useState(null);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);

  const [isVisible, setIsVisible] = useState(false);
  const placesDiv = useRef(null);
  const scrollRef = useRef(null);
  const sectionRef = useRef(null);
  const scrollRafId = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const fetchReviews = useCallback(async () => {
    try {
      const google = await loadGoogleScript(API_KEY);
      // Create a temporary div if placesDiv is not yet available
      const containerDiv = placesDiv.current || document.createElement('div');
      const svc = new google.maps.places.PlacesService(
        containerDiv
      );

      svc.getDetails(
        {
          placeId: PLACE_ID,
          fields: [
            'rating',
            'user_ratings_total',
            'reviews',
            'url',
            'formatted_address',
          ],
        },
        (p, s) => {
          if (s === 'OK') {
            setPlace(p);
            setReviews(p.reviews || []);
            setStatus('success');
          } else {
            setStatus('error');
            setError('Failed to load reviews');
          }
        }
      );
    } catch (err) {
      setStatus('error');
      setError(err.message);
    }
  }, [API_KEY, PLACE_ID]);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 20);
    setCanRight(
      el.scrollLeft + el.clientWidth <
      el.scrollWidth - 20
    );
  };

  const handleScroll = () => {
    if (scrollRafId.current) return;
    scrollRafId.current = requestAnimationFrame(() => {
      checkScroll();
      scrollRafId.current = null;
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' } // Load when within 200px of viewport
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      fetchReviews();
    }
  }, [isVisible, fetchReviews]);

  useEffect(() => {
    checkScroll();
  }, [reviews]);

  const metrics = useMemo(() => {
    const avg = place?.rating || 0;
    const total = place?.user_ratings_total || reviews.length;

    return {
      avg,
      total,
      stars: [5, 4, 3, 2, 1].map((n) => ({
        label: n,
        count: reviews.filter(
          (r) => Math.round(r.rating) === n
        ).length,
      })),
    };
  }, [place, reviews]);

  return (
    <section ref={sectionRef} className="bg-[#9E0B13] py-20 sm:py-28">
      <div ref={placesDiv} className="hidden" />

      <div className="max-w-7xl mx-auto px-6 space-y-16 sm:space-y-20">
        {/* Header */}
        <header className="flex flex-col gap-6 sm:gap-0 sm:flex-row sm:justify-between sm:items-end">
          <div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter text-white">
              Google reviews
            </h2>
            <div className="flex items-center gap-3 mt-3 text-white">
              <Stars rating={metrics.avg} size={18} />
              <span className="text-lg font-medium">
                {metrics.avg.toFixed(1)}
              </span>
              <span className="text-zinc-400">
                ({metrics.total.toLocaleString()})
              </span>
            </div>
          </div>

          <button
            onClick={() =>
              window.open(
                place?.url ||
                `https://search.google.com/local/writereview?placeid=${PLACE_ID}`,
                '_blank'
              )
            }
            className="
              bg-[#d8d8d8ff] text-black font-medium rounded-full
              px-5 py-3 text-sm
              sm:px-6 sm:py-3 sm:text-base
              lg:px-8 lg:py-4
              flex items-center justify-center sm:justify-start gap-2
              whitespace-nowrap
              hover:bg-gray-200
              transition-colors
              w-full sm:w-auto
            "
          >
            Write review
            <ExternalLink size={16} className="hidden sm:block" />
          </button>
        </header>

        {status === 'loading' && (
          <div className="flex items-center justify-center py-20">
            <div className="text-white text-lg">Loading reviews...</div>
          </div>
        )}

        {status === 'error' && (
          <div className="flex items-center justify-center py-20">
            <div className="text-white text-lg">
              {error || 'Failed to load reviews. Please try again later.'}
            </div>
          </div>
        )}

        {status === 'success' && (
          <>
            {/* Stats + Map */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border space-y-6">
                <div>
                  <div className="text-6xl sm:text-7xl font-bold">
                    {metrics.avg.toFixed(1)}
                  </div>
                  <Stars rating={metrics.avg} size={20} />
                  <p className="text-sm text-zinc-500 mt-1">
                    {metrics.total.toLocaleString()} reviews
                  </p>
                </div>

                <div className="space-y-2">
                  {metrics.stars.map((s) => (
                    <RatingBar
                      key={s.label}
                      {...s}
                      total={reviews.length}
                    />
                  ))}
                </div>

                <div className="flex gap-2 text-xs text-zinc-500">
                  <Info size={12} /> Google verified data
                </div>
              </div>

              <div className="lg:col-span-8">
                <MapEmbed
                  apiKey={API_KEY}
                  placeId={PLACE_ID}
                  location={place?.formatted_address}
                />
              </div>
            </div>

            {/* Reviews */}
            <div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0 mb-6">
                <h3 className="text-xl font-semibold text-white">
                  Recent reviews
                </h3>
                <div className="flex gap-2 text-white">
                  <button
                    onClick={() =>
                      scrollRef.current?.scrollBy({
                        left: -360,
                        behavior: 'smooth',
                      })
                    }
                    disabled={!canLeft}
                    className="p-2 hover:bg-white/10 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft />
                  </button>
                  <button
                    onClick={() =>
                      scrollRef.current?.scrollBy({
                        left: 360,
                        behavior: 'smooth',
                      })
                    }
                    disabled={!canRight}
                    className="p-2 hover:bg-white/10 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight />
                  </button>
                </div>
              </div>

              <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex gap-6 overflow-x-auto pb-6 no-scrollbar"
              >
                {reviews.map((r, i) => (
                  <ReviewCard key={`${r.author_name}-${i}`} r={r} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};