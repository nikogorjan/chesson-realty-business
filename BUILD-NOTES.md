# Chesson Realty Website — Build Notes

Branch: `feat/247` · committed locally (not pushed). Built by reusing the Residem
template's prebuilt components + animation library — no new frameworks, no CMS.

---

## The site (12 pages)

| Page | File | Highlights |
|------|------|-----------|
| Home | `index.html` | Hero swiper + agent card, **animated NC-towns marquee**, Meet William story, Featured Homes, Why-William icon cards, How-It-Works steps, **Areas We Serve**, testimonials, by-the-numbers, **FAQ**, parallax CTA |
| Homes for Sale | `homes-for-sale.html` | **Filterable grid** (by price) of 6 listings, CTA |
| Listing details ×6 | `listing-1…6.html` | Hero badge, price + spec cards, **lightbox photo gallery**, features, **what's nearby**, area map, William contact, CTA |
| Buying | `buying.html` | Intro, 6-step buyer journey, first-time-buyer tips, buyer FAQ, CTA |
| Selling | `selling.html` | Free-valuation CTA, 6-step process, contractor-advantage cards, seller FAQ |
| About William | `about.html` | Full story, **journey timeline**, credential cards, "my promise", testimonials, counters |
| Contact | `contact.html` | Agent details + call/text buttons, showing-request form (`booking.php`), office map, quick FAQ |

## Brand & design
- **Brand palette** (`css/colors/scheme-ncflag.css` + accents in `chesson.css`): deep **Chesson red #A11F2A** is the main color (buttons, links, badges, icons, CTAs); **navy #002B5C** supports it and is the dark-section background; on the navy sections a lighter red **#E8525C** keeps accents (step numbers, marquee dots, footer icons) legible; taglines are neutral grey. (Reds taken from the logo; no gold.)
- **Custom CSS layer** (`css/chesson.css`): NC marquee, card hover-lift, process steps, testimonials, FAQ, journey timeline.
- **Animations used:** WOW.js scroll reveals, Jarallax parallax heroes, animated counters, Swiper hero (4 slides, parallax), Magnific lightbox galleries, isotope price filtering, CSS marquee, hover scale/blur/slide effects.
- Nav: Home · Homes for Sale · Buying · Selling · About · Contact. Rich 4-column footer site-wide.
- All real contact info applied (William Chesson, 804 Fernwood Dr Clayton NC, 919-585-7997 / 919-413-7512, ChessonRealty@gmail.com, Realtor®·Doorify MLS). `booking.php` emails ChessonRealty@gmail.com.
- Source is **pure-ASCII / HTML-entity safe** — renders correctly on any host.

## Quality checks done
All 12 pages verified: consistent nav/footer/brand, **0 broken internal links, 0 missing images**, no leftover template references, all icon classes confirmed to exist, visual render confirmed (home, listing, about).

---

## ⚠️ Still placeholder — needs your real content
1. **The 6 listings are SAMPLES** (made-up addresses, prices, specs across Clayton/Garner/Raleigh/Wendell/Knightdale/Fuquay-Varina). Replace with real listings.
2. **Property photos** = template stock (`images/apartment/*`, `images/gallery/*`).
3. **William's photo** = stock headshot (`images/team/2.webp`). Send a real photo.
4. **Logo** = real Chesson Realty logo (`images/chesson_realty_logo.svg`), shown on a small white chip in the header/footer so its colors read on the dark navy. *(Optional: the browser-tab favicon `images/icon.webp` is still the template's — send a favicon/ICO if you want that updated too.)*
5. **Social links** in the footer point to `#` — send your Facebook/Instagram/etc URLs.
6. **Testimonials** are representative samples — replace with real client reviews (clearly labeled as samples on the page for now).
7. **Name:** used **William Chesson** (business card). Folder says "Randy" — confirm.
8. **"Areas We Serve" / "What's nearby"** copy is written from general local knowledge — review for accuracy.

## Preview
Open `index.html` in a browser and click around. (The contact form only sends once hosted on a PHP server.)

## To add a listing later
The 6 listing pages share one structure. Easiest path: copy an existing `listing-N.html`, change the address/price/specs/photos. (They were generated from a small Python template during the build — ask and I can regenerate the generator.)
