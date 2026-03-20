import { startTransition, useDeferredValue, useMemo, useState } from "react";
import { HashRouter, Link, NavLink, Route, Routes } from "react-router-dom";

type Category = "All" | "Focus" | "Workout" | "Chill" | "Podcasts";

type Playlist = {
  id: number;
  title: string;
  artist: string;
  tag: Exclude<Category, "All">;
  bpm: number;
  accentClass: string;
  description: string;
};

const categories: Category[] = ["All", "Focus", "Workout", "Chill", "Podcasts"];

const playlists: Playlist[] = [
  {
    id: 1,
    title: "Night Shift Motion",
    artist: "Pulse Originals",
    tag: "Workout",
    bpm: 128,
    accentClass: "accent-workout-1",
    description: "High-contrast cardio tracks with a neon-laced finish.",
  },
  {
    id: 2,
    title: "City Rain Loop",
    artist: "Mara Vale",
    tag: "Chill",
    bpm: 84,
    accentClass: "accent-chill-1",
    description: "Soft synths for late-night focus and rainy windows.",
  },
  {
    id: 3,
    title: "Deep Work Signals",
    artist: "System Static",
    tag: "Focus",
    bpm: 96,
    accentClass: "accent-focus-1",
    description: "Minimal beats for long sessions without attention spikes.",
  },
  {
    id: 4,
    title: "Founders After Dark",
    artist: "The Briefing Club",
    tag: "Podcasts",
    bpm: 72,
    accentClass: "accent-podcast-1",
    description: "Short-form interviews on product, design and momentum.",
  },
  {
    id: 5,
    title: "Kinetic Morning",
    artist: "Solar Bloom",
    tag: "Workout",
    bpm: 122,
    accentClass: "accent-workout-2",
    description: "Warm-up tracks that build pace without flattening the mood.",
  },
  {
    id: 6,
    title: "Loft Notes",
    artist: "Ari Mercer",
    tag: "Focus",
    bpm: 90,
    accentClass: "accent-focus-2",
    description: "Calm vocal textures for writing, sketching and review work.",
  },
];

const milestones = [
  "Day 1: refine the premium banner copy and spacing.",
  "Day 2: add mobile navigation behaviour and menu transitions.",
  "Day 3: create a playlist details side panel.",
  "Day 4: animate card reveals on scroll.",
  "Day 5: improve keyboard navigation across chips and CTAs.",
  "Day 6: add validation states to the login page.",
  "Day 7: add theme toggles for alternate art direction.",
  "Day 8: create a testimonials carousel.",
  "Day 9: expand the premium plan comparison.",
  "Day 10: connect a simple mock API for tracks.",
  "Day 11: add loading skeletons for playlist cards.",
  "Day 12: improve accessibility labels and focus states.",
  "Day 13: polish footer layout and social links.",
  "Day 14: review performance and image-free rendering quality.",
];

const stats = [
  { value: "82M+", label: "listeners moving between work and play" },
  { value: "4.9/5", label: "average rating for curated moods" },
  { value: "12", label: "editorial scenes refreshed each week" },
];

const spotlightRows = [
  {
    title: "Made for focus-heavy mornings",
    text: "Algorithmic mixes, editorial playlists and zero-friction playback cues.",
  },
  {
    title: "Premium energy without the default template",
    text: "Bright contrast, editorial typography and sections that feel product-led.",
  },
  {
    title: "A second page for login and conversion flow",
    text: "The app now includes a dedicated authentication-style route instead of only one landing view.",
  },
];

const plans = [
  {
    name: "Individual",
    price: "CAD 10.99",
    note: "1 account, ad-free music, offline playback and cancellation anytime.",
  },
  {
    name: "Duo",
    price: "CAD 14.99",
    note: "2 accounts under one bill, each with separate recommendations.",
  },
  {
    name: "Student",
    price: "CAD 5.99",
    note: "Discounted premium with the same playback experience and curated scenes.",
  },
];

const loginBenefits = [
  "Continue your mix across devices",
  "Save premium picks and playlists",
  "Get recommendations tuned to your routine",
  "Start with a free month and cancel anytime",
];

function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [query, setQuery] = useState("");
  const [playingId, setPlayingId] = useState<number>(playlists[0].id);
  const deferredQuery = useDeferredValue(query);

  const visiblePlaylists = useMemo(() => {
    const normalizedQuery = deferredQuery.trim().toLowerCase();

    return playlists.filter((playlist) => {
      const matchesCategory =
        selectedCategory === "All" || playlist.tag === selectedCategory;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        playlist.title.toLowerCase().includes(normalizedQuery) ||
        playlist.artist.toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [deferredQuery, selectedCategory]);

  const playingNow =
    visiblePlaylists.find((playlist) => playlist.id === playingId) ??
    visiblePlaylists[0] ??
    playlists[0];

  const handleCategoryChange = (category: Category) => {
    startTransition(() => {
      setSelectedCategory(category);
    });
  };

  return (
    <div className="page-shell">
      <div className="ambient ambient-left" />
      <div className="ambient ambient-right" />

      <header className="topbar">
        <div className="brand-lockup">
          <div className="brand-mark" aria-hidden="true">
            P
          </div>
          <div>
            <p className="eyebrow">Spotify-inspired React project</p>
            <h1>Pulse</h1>
          </div>
        </div>

        <nav className="topnav" aria-label="Main navigation">
          <NavLink className="nav-link" to="/">
            Home
          </NavLink>
          <a className="nav-link" href="#discover">
            Discover
          </a>
          <a className="nav-link" href="#premium">
            Premium
          </a>
          <a className="nav-link" href="#roadmap">
            Roadmap
          </a>
        </nav>

        <div className="actions">
          <Link className="ghost-button" to="/login">
            Log in
          </Link>
          <a className="solid-button" href="#premium">
            View plans
          </a>
        </div>
      </header>

      <main>
        <section className="hero-grid" id="discover">
          <div className="hero-copy">
            <p className="eyebrow">
              Premium music, cloned as a React experience
            </p>
            <h2>
              Turn a Spotify-style premium pitch into a two-page product demo.
            </h2>
            <p className="hero-text">
              The home page now leans closer to Spotify Premium storytelling:
              stronger call-to-action hierarchy, plan framing, curated playlists
              and a direct path into a dedicated login route.
            </p>

            <div className="hero-actions">
              <Link className="solid-button large" to="/login">
                Get Premium
              </Link>
              <a className="ghost-button large" href="#premium">
                Compare plans
              </a>
            </div>

            <div className="stat-row">
              {stats.map((stat) => (
                <article className="stat-card" key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </article>
              ))}
            </div>
          </div>

          <aside className="hero-panel" aria-label="Featured playlist">
            <div className="panel-header">
              <span>Now playing</span>
              <span className="live-pill">Premium mix</span>
            </div>

            <div className={`cover-art ${playingNow.accentClass}`}>
              <div className="cover-glow" />
              <div className="cover-content">
                <p>{playingNow.tag}</p>
                <strong>{playingNow.title}</strong>
                <span>{playingNow.artist}</span>
              </div>
            </div>

            <div className="player-meta">
              <div>
                <p className="muted-label">Description</p>
                <strong>{playingNow.description}</strong>
              </div>
              <div>
                <p className="muted-label">Tempo</p>
                <strong>{playingNow.bpm} BPM</strong>
              </div>
            </div>

            <div className="player-progress" aria-hidden="true">
              <span />
            </div>

            <div className="player-controls">
              <button type="button">Shuffle</button>
              <button type="button" className="play-button">
                Play
              </button>
              <button type="button">Queue</button>
            </div>
          </aside>
        </section>

        <section className="spotlight-section">
          <div className="spotlight-grid">
            {spotlightRows.map((row) => (
              <article className="spotlight-card" key={row.title}>
                <p className="eyebrow">Pulse highlight</p>
                <h3>{row.title}</h3>
                <p>{row.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="discover-section"
          aria-labelledby="playlist-heading"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">Curated shelves</p>
              <h3 id="playlist-heading">
                Browse the moods that sell the premium story.
              </h3>
            </div>

            <label className="searchbox">
              <span>Search tracks or artists</span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Try Focus or Mara"
              />
            </label>
          </div>

          <div
            className="chip-row"
            role="tablist"
            aria-label="Playlist categories"
          >
            {categories.map((category) => (
              <button
                key={category}
                className={
                  category === selectedCategory ? "chip active" : "chip"
                }
                onClick={() => handleCategoryChange(category)}
                type="button"
              >
                {category}
              </button>
            ))}
          </div>

          <div className="playlist-grid">
            {visiblePlaylists.map((playlist) => (
              <article className="playlist-card" key={playlist.id}>
                <div className={`playlist-art ${playlist.accentClass}`}>
                  <span>{playlist.tag}</span>
                </div>

                <div className="playlist-content">
                  <div>
                    <h4>{playlist.title}</h4>
                    <p>{playlist.artist}</p>
                  </div>
                  <small>{playlist.description}</small>
                </div>

                <div className="playlist-footer">
                  <span>{playlist.bpm} BPM</span>
                  <button
                    type="button"
                    onClick={() => setPlayingId(playlist.id)}
                  >
                    Play this
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="premium-section" id="premium">
          <div className="section-heading compact">
            <div>
              <p className="eyebrow">Premium plans</p>
              <h3>
                Closer to a Spotify Premium pitch, without copying assets.
              </h3>
            </div>
            <Link className="ghost-button" to="/login">
              Open login page
            </Link>
          </div>

          <div className="premium-grid">
            {plans.map((plan) => (
              <article className="premium-card" key={plan.name}>
                <p className="eyebrow">{plan.name}</p>
                <h4>{plan.price}</h4>
                <p>{plan.note}</p>
                <Link className="solid-button premium-button" to="/login">
                  Choose {plan.name}
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="experience-strip">
          <article>
            <p className="eyebrow">Why this clone works</p>
            <h3>It feels like a product flow now, not only a hero mockup.</h3>
            <p>
              The app now has a conversion path: a premium-oriented landing
              page, plan cards and a standalone login route that gives the
              project a more credible Spotify-style journey.
            </p>
          </article>

          <ul>
            <li>Home route focused on premium storytelling</li>
            <li>Dedicated login route with a branded sign-in layout</li>
            <li>Daily roadmap preserved for incremental commits</li>
          </ul>
        </section>

        <section className="roadmap-section" id="roadmap">
          <div className="section-heading compact">
            <div>
              <p className="eyebrow">Daily evolution</p>
              <h3>Suggested backlog for the automatic daily commits.</h3>
            </div>
          </div>

          <div className="roadmap-grid">
            {milestones.map((milestone) => (
              <article className="roadmap-card" key={milestone}>
                <span className="roadmap-dot" aria-hidden="true" />
                <p>{milestone}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function LoginPage() {
  return (
    <div className="page-shell login-shell">
      <div className="ambient ambient-left" />
      <div className="ambient ambient-right" />

      <main className="login-layout">
        <section className="login-hero">
          <p className="eyebrow">Premium access</p>
          <h2>
            Log in to keep your mixes, recommendations and premium picks moving.
          </h2>
          <p>
            This second page makes the clone feel closer to a real streaming
            product by adding a sign-in experience with supporting benefit
            messaging.
          </p>

          <ul className="login-benefits">
            {loginBenefits.map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>

          <Link className="ghost-button large login-home-link" to="/">
            Back to home
          </Link>
        </section>

        <section className="login-panel" aria-label="Login form">
          <div className="brand-lockup compact-brand">
            <div className="brand-mark" aria-hidden="true">
              P
            </div>
            <div>
              <p className="eyebrow">Welcome back</p>
              <h1>Sign in to Pulse</h1>
            </div>
          </div>

          <form className="login-form">
            <label>
              <span>Email address</span>
              <input type="email" placeholder="hello@pulse.fm" />
            </label>

            <label>
              <span>Password</span>
              <input type="password" placeholder="Enter your password" />
            </label>

            <button className="solid-button login-submit" type="submit">
              Continue
            </button>
          </form>

          <div className="login-divider">
            <span />
            <p>or continue with</p>
            <span />
          </div>

          <div className="social-buttons">
            <button className="ghost-button social-button" type="button">
              Google
            </button>
            <button className="ghost-button social-button" type="button">
              Apple
            </button>
            <button className="ghost-button social-button" type="button">
              Facebook
            </button>
          </div>

          <p className="login-note">
            By continuing, you agree to the premium demo flow and product-design
            experiment.
          </p>
        </section>
      </main>
    </div>
  );
}

export function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </HashRouter>
  );
}
