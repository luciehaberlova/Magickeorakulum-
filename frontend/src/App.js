import { useEffect, useRef, useState } from "react";
import "@/App.css";

const MASTERCLASSES = [
  {
    oracle:
      "…tvůj byznys právě teď volá po větším publiku na sociálních sítích. Cesta k přílivu nových sledujících se právě otevírá…",
    name: "Jak zajistit růst publika na Instagramu",
    link: "LINK_1",
  },
  {
    oracle:
      "…tvůj byznys právě teď potřebuje Instagram, který pracuje za tebe — i když na něj třeba týdny nesáhneš. Portál jednoduchých řešení se otevírá…",
    name: "Minimalistický Instagram",
    link: "LINK_2",
  },
  {
    oracle:
      "…tvůj byznys právě teď touží po efektivitě a struktuře v plánování sociálních sítí. Hvězdy uzavírají éru přemýšlení o tom, co dnes postovat, časová smyčka konzistence se otevírá…",
    name: "Obsah na 3 měsíce za 60 minut",
    link: "LINK_3",
  },
  {
    oracle:
      "…tvůj byznys právě teď potřebuje jasné základy toho, o čem mluvíš. Plamen jasné komunikace se rozsvěcí, každé rozhodnutí o obsahu je snadnější…",
    name: "5 pilířů obsahu pro budování značky",
    link: "LINK_4",
  },
  {
    oracle:
      "…tvůj byznys právě teď potřebuje tajuplnou formuli 6S. Kola obsahu, který přitahuje tvé ideální publikum, se právě roztáčejí…",
    name: "6S – 6 typů příspěvků pro váš obsah",
    link: "LINK_5",
  },
  {
    oracle:
      "…tvůj byznys právě teď volá po produktu, který otevírá dveře k důvěře. Brána snadných prodejů se doširoka otevírá…",
    name: "Prodejní strategie The Lipstick Offer",
    link: "LINK_6",
  },
];

const STORAGE_KEY = "oracle_result";
const TYPE_SPEED = 40;
const FIRST_LINE = "Magické orákulum říká…";

function CrystalBall() {
  return (
    <svg
      className="crystal-ball"
      width="120"
      height="120"
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      data-testid="crystal-ball"
    >
      <defs>
        <radialGradient id="ballGrad" cx="40%" cy="38%" r="62%">
          <stop offset="0%" stopColor="#D8CFF0" />
          <stop offset="45%" stopColor="#8C7CC4" />
          <stop offset="85%" stopColor="#3A2F6A" />
          <stop offset="100%" stopColor="#1F1845" />
        </radialGradient>
        <radialGradient id="outerGlow" cx="50%" cy="50%" r="50%">
          <stop offset="60%" stopColor="#4A3F7A" stopOpacity="0" />
          <stop offset="100%" stopColor="#4A3F7A" stopOpacity="0.35" />
        </radialGradient>
        <radialGradient id="innerLight" cx="38%" cy="35%" r="22%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Outer halo */}
      <circle cx="60" cy="60" r="58" fill="url(#outerGlow)" />

      {/* Ball body */}
      <circle cx="60" cy="62" r="46" fill="url(#ballGrad)" />

      {/* Inner ambient light */}
      <circle cx="48" cy="48" r="22" fill="url(#innerLight)" />

      {/* Stand (subtle base) */}
      <ellipse cx="60" cy="110" rx="26" ry="3" fill="#1A1A1A" opacity="0.18" />

      {/* Animated glints */}
      <circle className="glint glint-1" cx="46" cy="44" r="4.5" fill="#ffffff" />
      <circle className="glint glint-2" cx="72" cy="56" r="2.2" fill="#ffffff" />
      <circle className="glint glint-3" cx="54" cy="78" r="1.6" fill="#ffffff" />
    </svg>
  );
}

function useTypewriter(text, start, speed = TYPE_SPEED, onDone) {
  const [out, setOut] = useState("");
  const doneRef = useRef(false);

  useEffect(() => {
    if (!start) return;
    let i = 0;
    setOut("");
    doneRef.current = false;
    const id = setInterval(() => {
      i += 1;
      setOut(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(id);
        if (!doneRef.current) {
          doneRef.current = true;
          onDone && onDone();
        }
      }
    }, speed);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start, text]);

  return out;
}

export default function App() {
  const [selected, setSelected] = useState(null);
  const [ballVisible, setBallVisible] = useState(false);
  const [startLine1, setStartLine1] = useState(false);
  const [startLine2, setStartLine2] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);
  const [shareMsg, setShareMsg] = useState(false);

  // Pick masterclass on mount (persist via localStorage)
  useEffect(() => {
    let idx;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored !== null && !Number.isNaN(parseInt(stored, 10))) {
        idx = parseInt(stored, 10);
        if (idx < 0 || idx >= MASTERCLASSES.length) idx = undefined;
      }
    } catch (e) {
      idx = undefined;
    }
    if (idx === undefined) {
      idx = Math.floor(Math.random() * MASTERCLASSES.length);
      try {
        localStorage.setItem(STORAGE_KEY, String(idx));
      } catch (e) {
        /* ignore */
      }
    }
    setSelected(idx);
  }, []);

  // Animation timeline
  useEffect(() => {
    if (selected === null) return;
    const t1 = setTimeout(() => setBallVisible(true), 50);
    const t2 = setTimeout(() => setStartLine1(true), 50 + 500 + 800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [selected]);

  const onLine1Done = () => {
    setTimeout(() => setStartLine2(true), 400);
  };
  const onLine2Done = () => {
    setTimeout(() => setCtaVisible(true), 600);
  };

  const mc = selected !== null ? MASTERCLASSES[selected] : null;
  const line1 = useTypewriter(FIRST_LINE, startLine1, TYPE_SPEED, onLine1Done);
  const line2 = useTypewriter(
    mc ? mc.oracle : "",
    startLine2 && !!mc,
    TYPE_SPEED,
    onLine2Done,
  );

  const handleShare = async () => {
    const text =
      "Magické orákulum od @luciehaberlova.cz #zahradnislavnost";
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
    } catch (e) {
      /* clipboard might be blocked, still attempt deep link */
    }

    // Try opening Instagram app first, fallback to web
    const win = window.open("instagram://app", "_blank");
    setTimeout(() => {
      // If app didn't open (no instagram), open the web version
      try {
        if (!win || win.closed || typeof win.closed === "undefined") {
          window.open(
            "https://www.instagram.com/",
            "_blank",
            "noopener,noreferrer",
          );
        }
      } catch (e) {
        window.open(
          "https://www.instagram.com/",
          "_blank",
          "noopener,noreferrer",
        );
      }
    }, 350);

    setShareMsg(true);
    setTimeout(() => setShareMsg(false), 4000);
  };

  if (!mc) {
    return <div className="page" />;
  }

  return (
    <main className="page" data-testid="oracle-page">
      <div className="stage">
        <div
          className={`ball-wrap ${ballVisible ? "is-visible" : ""}`}
          data-testid="ball-wrap"
        >
          <CrystalBall />
        </div>

        <p
          className="line line-1"
          data-testid="oracle-line-1"
          aria-live="polite"
        >
          {line1}
          {startLine1 && line1.length < FIRST_LINE.length && (
            <span className="caret" />
          )}
        </p>

        <p
          className="line line-2"
          data-testid="oracle-line-2"
          aria-live="polite"
        >
          {line2}
          {startLine2 && mc && line2.length < mc.oracle.length && (
            <span className="caret" />
          )}
        </p>

        <div
          className={`cta ${ctaVisible ? "is-visible" : ""}`}
          data-testid="cta-block"
        >
          <p className="cta-lead">
            Klikni na tlačítko a odemkni zdarma masterclass
          </p>
          <a
            className="btn-primary"
            href={mc.link}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="masterclass-cta"
          >
            {mc.name}
          </a>
          <p className="cta-note">
            Proklik tě provede zdarma registrací do komunity The Funnel Empire
            na Circle, kde najdeš svou masterclass.
          </p>

          <div className="ig-section" data-testid="ig-section">
            <p className="ig-lead">
              Udělejte nejdřív screenshot — pak klikněte na tlačítko níže.
            </p>
            <button
              type="button"
              className="btn-ig"
              onClick={handleShare}
              data-testid="ig-share-btn"
            >
              Sdílet věštbu na Instagram Stories
            </button>
            <p
              className={`ig-confirm ${shareMsg ? "is-visible" : ""}`}
              data-testid="ig-confirm"
              aria-live="polite"
            >
              Text zkopírován! Přidej screenshot do Stories a vlož text ze
              schránky ✨
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
