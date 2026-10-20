import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowDown, ArrowRight, Check, ChevronRight, ExternalLink, Gem, Share2 } from "lucide-react";

import watchEditorial from "@/assets/alganee-watch-editorial.jpg";
import { Button } from "@/components/ui/button";
import { alganeeProducts, type ProductCategory } from "@/lib/alganee-products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Alganee — Indian-Inspired Jewellery & Watches" },
      {
        name: "description",
        content:
          "Discover Alganee: a considered edit of Indian-inspired jewellery and watches, with handpicked styles to shop on Amazon.",
      },
      { property: "og:title", content: "Alganee — Indian-Inspired Jewellery & Watches" },
      {
        property: "og:description",
        content:
          "A little old-world grace, a little everyday magic. Explore jewellery and watches from Alganee.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [category, setCategory] = useState<ProductCategory | "All pieces">("All pieces");
  const [shareLabel, setShareLabel] = useState("Share Alganee");
  const [linkCopied, setLinkCopied] = useState(false);

  const products = useMemo(
    () =>
      category === "All pieces"
        ? alganeeProducts
        : alganeeProducts.filter((product) => product.category === category),
    [category],
  );

  async function sharePage() {
    const url = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({ title: "Alganee", text: "Explore the Alganee collection", url });
        return;
      }

      await navigator.clipboard.writeText(url);
      setLinkCopied(true);
      setShareLabel("Link copied");
      window.setTimeout(() => {
        setLinkCopied(false);
        setShareLabel("Share Alganee");
      }, 2200);
    } catch {
      setShareLabel("Share unavailable");
      window.setTimeout(() => setShareLabel("Share Alganee"), 2200);
    }
  }

  return (
    <div className="alganee-page" id="top">
      <div className="announcement-bar">
        <span className="announcement-flourish" aria-hidden="true">✳</span>
        A little old-world grace, a little everyday magic
        <span className="announcement-flourish" aria-hidden="true">✳</span>
      </div>

      <header className="site-header">
        <a className="brand-lockup" href="#top" aria-label="Alganee home">
          <span className="brand-seal" aria-hidden="true"><Gem size={18} strokeWidth={1.35} /></span>
          <span className="brand-name">alganee<span className="brand-period">.</span></span>
        </a>

        <nav className="main-navigation" aria-label="Main navigation">
          <a className="nav-link nav-link-active" href="#collection">The collection</a>
          <a className="nav-link" href="#our-edit">Our edit</a>
        </nav>

        <Button className="share-button" variant="outline" onClick={sharePage}>
          {linkCopied ? <Check aria-hidden="true" /> : <Share2 aria-hidden="true" />}
          <span>{shareLabel}</span>
        </Button>
      </header>

      <main>
        <section className="opening-section" aria-labelledby="opening-title">
          <div className="opening-copy">
            <span className="eyebrow opening-eyebrow"><span /> THE ALGanee EDIT <span /></span>
            <h1 id="opening-title">A touch of <em>tradition.</em><br />A moment of you.</h1>
            <p>Indian-inspired jewels and timepieces, chosen for the little moments that deserve to feel special.</p>
            <Button asChild size="lg" className="collection-cta">
              <a href="#collection">Discover the collection <ArrowDown aria-hidden="true" /></a>
            </Button>
            <div className="opening-note"><span aria-hidden="true">✳</span> Adornment for every occasion</div>
          </div>
          <div className="opening-image-wrap">
            <img
              className="opening-image"
              src={watchEditorial}
              alt="An ornate crystal and pearl gold bracelet watch on ivory silk"
              width={1536}
              height={1024}
              fetchPriority="high"
            />
            <div className="image-caption">
              <span className="caption-rule" />
              <span>TIMELESS, WITH A TWIST</span>
            </div>
            <div className="image-counter"><span>01</span> <span className="counter-slash">/</span> 03</div>
          </div>
          <div className="opening-watermark" aria-hidden="true">अ</div>
        </section>

        <div className="collection-ribbon" aria-hidden="true">
          <span>GOLDEN DETAILS</span><span>✳</span><span>FESTIVE FINDS</span><span>✳</span>
          <span>EVERYDAY HEIRLOOMS</span><span>✳</span><span>GOLDEN DETAILS</span>
        </div>

        <section className="collection-section" id="collection" aria-labelledby="collection-title">
          <div className="collection-heading-row">
            <div className="collection-intro">
              <span className="eyebrow collection-eyebrow">A CURATED LITTLE WORLD</span>
              <h2 id="collection-title">Pieces to <em>keep close.</em></h2>
              <p>Thoughtful little treasures, with a nod to Indian artistry.</p>
            </div>
            <div className="collection-aside">
              <span className="collection-aside-top">THE ALGanee COLLECTION</span>
              <span className="collection-aside-bottom">Jewellery <i>·</i> Watches <i>·</i> Occasionwear</span>
            </div>
          </div>

          <div className="collection-controls">
            <div className="category-tabs" role="group" aria-label="Filter by category">
              {(["All pieces", "Watches", "Jewellery"] as const).map((tab) => (
                <Button
                  key={tab}
                  className={`category-tab ${category === tab ? "category-tab-active" : ""}`}
                  onClick={() => setCategory(tab)}
                  variant="ghost"
                  aria-pressed={category === tab}
                >
                  {tab}
                </Button>
              ))}
            </div>
            <span className="pieces-count">{products.length.toString().padStart(2, "0")} PIECES</span>
          </div>

          <div className="product-grid">
            {products.map((product, index) => (
              <article className="product-card" key={product.id}>
                <a
                  className={`product-image-link ${product.isPlaceholder ? "product-image-placeholder" : ""}`}
                  href={product.amazonUrl ?? "#collection"}
                  aria-label={product.amazonUrl ? `View ${product.name} on Amazon` : `${product.name}, coming soon`}
                  target={product.amazonUrl ? "_blank" : undefined}
                  rel={product.amazonUrl ? "noreferrer" : undefined}
                  onClick={product.isPlaceholder ? (event) => event.preventDefault() : undefined}
                >
                  <img
                    className={`product-image product-image-${product.id}`}
                    src={product.image}
                    alt={product.imageAlt}
                    width={index === 0 ? 342 : 1024}
                    height={index === 0 ? 437 : 1024}
                    loading="lazy"
                  />
                  <span className={`product-badge ${product.amazonUrl ? "product-badge-active" : ""}`}>
                    {product.badge}
                  </span>
                  {product.amazonUrl && <span className="product-quick-view"><ArrowRight size={17} aria-hidden="true" /></span>}
                </a>
                <div className="product-meta">
                  <span className="product-category">{product.category}</span>
                  {product.price && <span className="product-price">{product.price}<small> on Amazon</small></span>}
                </div>
                <h3 className="product-title">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                {product.amazonUrl ? (
                  <Button asChild variant="outline" className="product-action">
                    <a href={product.amazonUrl} target="_blank" rel="noreferrer">
                      View on Amazon <ExternalLink aria-hidden="true" />
                    </a>
                  </Button>
                ) : (
                  <span className="coming-soon-link">A little something, coming soon <ChevronRight aria-hidden="true" /></span>
                )}
              </article>
            ))}
          </div>
          <p className="price-note">Amazon prices and availability can change. Please check the product page for the latest details.</p>
        </section>

        <section className="brand-note-section" id="our-edit" aria-labelledby="brand-note-title">
          <div className="brand-note-motif" aria-hidden="true">✳</div>
          <span className="eyebrow">A NOTE FROM ALGanee</span>
          <h2 id="brand-note-title">For the stories you <em>wear.</em></h2>
          <p>We love the way one little detail can change the whole feeling of a day. Alganee is a growing collection of jewellery and watches with a little Indian soul, a hint of occasion, and plenty of room to make them yours.</p>
          <a className="note-link" href="#collection">Find your little something <ArrowRight aria-hidden="true" /></a>
        </section>
      </main>

      <footer className="site-footer">
        <a className="brand-lockup footer-lockup" href="#top" aria-label="Alganee home">
          <span className="brand-seal" aria-hidden="true"><Gem size={16} strokeWidth={1.35} /></span>
          <span className="brand-name">alganee<span className="brand-period">.</span></span>
        </a>
        <span className="footer-caption">A LITTLE OLD-WORLD GRACE.</span>
        <a className="footer-back-to-top" href="#top">Back to top <ArrowRight aria-hidden="true" /></a>
        <span className="footer-copyright">© 2026 Alganee</span>
      </footer>
    </div>
  );
}
