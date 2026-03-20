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

const stats = [
  {
    value: "2 routes",
    label: "home and sign-in views built as one product flow",
  },
  {
    value: "6 states",
    label: "interactive playlist cards that change the hero player",
  },
  {
    value: "1 week",
    label: "scope framed like a compact portfolio case study",
  },
];

const spotlightRows = [
  {
    title: "Product framing before decoration",
    text: "The page was reshaped around premium conversion, not just visual mimicry, so the layout reads like a deliberate product concept.",
  },
  {
    title: "A cleaner portfolio narrative",
    text: "The experience now highlights role, challenge and interface decisions to feel more like a credible case study than a generic clone.",
  },
  {
    title: "A realistic product journey",
    text: "The second route turns the piece into a believable acquisition flow by connecting a premium landing page to a dedicated sign-in experience.",
  },
];

const caseStudyBlocks = [
  {
    eyebrow: "Role",
    title: "Product-minded frontend concept",
    text: "Designed and implemented as a React case study focused on premium storytelling, interaction polish and a stronger portfolio narrative.",
  },
  {
    eyebrow: "Challenge",
    title: "Make the project feel intentional",
    text: "The goal was to avoid a shallow page clone and instead build something that looks presentable to recruiters or clients as a compact product exploration.",
  },
  {
    eyebrow: "Approach",
    title: "Editorial layout with interactive proof",
    text: "The solution combines a high-contrast hero, searchable playlist modules, plan comparison, and a branded sign-in screen to suggest a real conversion funnel.",
  },
  {
    eyebrow: "Outcome",
    title: "Sharable portfolio-ready demo",
    text: "The final build is structured to read well in GitHub, render cleanly on GitHub Pages, and communicate product thinking beyond surface styling.",
  },
];

const proofPoints = [
  "Interactive filtering and player state on the landing page",
  "Separate sign-in route to support a realistic acquisition flow",
  "Responsive layout designed to hold up in a shared public demo",
];

const portfolioFacts = [
  { label: "Timeline", value: "Concept sprint" },
  { label: "Focus", value: "Premium conversion UX" },
  { label: "Stack", value: "React, TypeScript, Vite" },
  { label: "Type", value: "Frontend case study" },
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
            <p className="eyebrow">Frontend case study</p>
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
          <a className="nav-link" href="#case-study">
            Case study
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
            <p className="eyebrow">Streaming-inspired acquisition experience</p>
            <h2>
              A portfolio-ready premium music concept built to feel like a real
              product pitch.
            </h2>
            <p className="hero-text">
              Pulse reframes a streaming-inspired interface as a compact case
              study: stronger CTA hierarchy, searchable content modules, premium
              plan framing and a dedicated sign-in route that creates a
              believable product journey instead of a single static page.
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
              <span>Featured interaction</span>
              <span className="live-pill">Live state</span>
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
                Browse the content layer that supports the premium story.
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
                Pricing blocks designed to feel product-led, not decorative.
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
            <p className="eyebrow">Execution notes</p>
            <h3>What makes the piece feel stronger in a portfolio review.</h3>
            <p>
              Instead of stopping at visual imitation, the experience shows
              product thinking: a clear content hierarchy, a conversion path,
              stateful UI behaviour and enough surface area to discuss design
              and implementation decisions in an interview.
            </p>
          </article>

          <ul>
            {proofPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </section>

        <section className="roadmap-section" id="case-study">
          <div className="section-heading compact">
            <div>
              <p className="eyebrow">Case study breakdown</p>
              <h3>A clearer story for reviewers, recruiters and clients.</h3>
            </div>
          </div>

          <div className="roadmap-grid">
            {caseStudyBlocks.map((block) => (
              <article className="roadmap-card" key={block.title}>
                <span className="roadmap-dot" aria-hidden="true" />
                <div>
                  <p className="eyebrow small-eyebrow">{block.eyebrow}</p>
                  <strong>{block.title}</strong>
                  <p>{block.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="portfolio-section">
          <div className="section-heading compact">
            <div>
              <p className="eyebrow">Project facts</p>
              <h3>
                Compact details that help the work read like a shipped concept.
              </h3>
            </div>
          </div>

          <div className="portfolio-grid">
            {portfolioFacts.map((fact) => (
              <article className="portfolio-card" key={fact.label}>
                <span>{fact.label}</span>
                <strong>{fact.value}</strong>
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
          <p className="eyebrow">Sign-in concept</p>
          <h2>
            Sign in to continue a premium listening journey with a cleaner
            conversion touchpoint.
          </h2>
          <p>
            This route gives the project a more complete portfolio shape by
            showing how the landing page hands off into a branded authentication
            surface.
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
              <h1>Continue to Pulse</h1>
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
            This screen is intentionally scoped as part of a frontend portfolio
            concept focused on premium conversion.
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
