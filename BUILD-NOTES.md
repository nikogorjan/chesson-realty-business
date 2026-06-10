# Chesson Realty — First Draft Build Notes

Branch: `feat/247` · all work committed locally (not pushed).
Built by reusing the existing Residem template components — no new frameworks, no CMS.

---

## What's done

A complete, clickable multi-page static site:

| Page | File | Notes |
|------|------|-------|
| Home | `index.html` | Hero with your photo card, "Meet William", Featured Homes (4), Why-Work-With-William, by-the-numbers, contact CTA |
| Homes for Sale | `homes-for-sale.html` | Listings grid (4 sample homes) |
| Property details | `listing-1.html` … `listing-4.html` | Price, specs, photo gallery, features, your contact |
| About William | `about.html` | Your bio, credentials & affiliations, personal promise |
| Contact | `contact.html` | Details + showing-request form + office map |

**Site-wide, real info applied:**
- Nav simplified to **Home · Homes for Sale · About · Contact** (the old template demo menu is gone)
- Footer + contact blocks use **William Chesson, 804 Fernwood Dr., Clayton NC 27520, Direct 919-585-7997, Mobile 919-413-7512, ChessonRealty@gmail.com, Realtor® · Doorify MLS**
- Contact form (`booking.php`) now emails **ChessonRealty@gmail.com**
- "By the numbers" uses only true facts from your bio (20+ yrs real estate, 20+ yrs contractor, 82nd Airborne, 30 yrs married)

**Cleanup:** every unused template page is in `_unused/` (nothing deleted). Original single-property homepage is at `_unused/index-single-property-backup.html`.

---

## ⚠️ Placeholder — needs your real content

1. **The 4 listings are SAMPLES** (made-up addresses, prices, specs in Clayton/Garner/Raleigh/Wendell). Replace with real listings, or tell me and I'll swap in actual ones.
2. **Property photos** are template stock images (`images/apartment/*`, `images/gallery/*`). Need real photos per home.
3. **Your photo** is a stock headshot (`images/team/2.webp`). Send a real photo of you to drop in (homepage hero card, About page, contact blocks).
4. **Logo** is still the template logo (`images/logo.webp`). Send the real Chesson Realty logo (red tree/house) — ideally a transparent PNG/SVG.
5. **Social links** in the footer point to `#` — give me your Facebook/Instagram/etc. URLs (or I'll remove the ones you don't use).
6. **Name:** used **William Chesson** everywhere (per your business card). The project folder says "Randy" — confirm which is correct.
7. **Office hours** were removed from the footer (template had fake ones) — tell me your hours if you want them shown.

---

## How to preview
Open `index.html` in a browser and click around. (The contact form's email sending only works once hosted on a PHP server — locally it just won't send.)

## Suggested next steps
- Send real listing data + photos → I'll build out real listing pages
- Send your photo + logo → I'll replace the placeholders everywhere
- Decide on real social links
- Later: connect Doorify MLS / IDX for auto-updating listings (see earlier CMS discussion)
