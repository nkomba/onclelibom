# Oncle Libom — Bilingual Ministry Website

A polished, mission-driven **bilingual (French / English)** website for **www.onclelibom.org**, the daily-devotional and leadership ministry of **Rev. Dr. Jean Libom Li Likeng**, President of the Association of Evangelicals in Africa.

Built as a production-ready static front end: no build step, no dependencies. Open `index.html` in any browser.

## What's inside

```
C:\libom\
├── index.html            Home
├── about.html            About Rev. Dr. Jean Libom Li Likeng (verified bio)
├── devotionals.html      Daily Devotionals + archive
├── whatsapp.html         Receive devotionals on WhatsApp
├── music-videos.html     Christian music video gallery
├── audio.html            Audio devotionals & messages
├── leadership.html       Leadership formation
├── association.html      About the AEA
├── stories.html          Stories & updates
├── contact.html          Contact, prayer, speaking invitations
├── robots.txt / sitemap.xml   SEO
└── assets/
    ├── css/style.css     Design system (light + dark mode)
    ├── js/main.js        Language toggle, theme, menu, share, forms
    └── img/logo.svg, favicon.svg
```

## Key features

- **Bilingual by design.** A clear `EN | FR` switcher sits top-right in the header on every page. Clicking it instantly swaps all page text (titles, nav, CTAs, body) via `data-en` / `data-fr` attributes — no page reload. Devotionals also have their own independent French/English tabs.
- **Light & dark mode.** Toggle in the header; respects the visitor's system preference on first load.
- **WhatsApp devotional flow.** Join buttons open WhatsApp with a ready-made message, a sign-up form, a message preview, and an FAQ. (Add the ministry's real WhatsApp number/channel where marked.)
- **Media-ready.** Music-video and audio cards are structured to hold embeds/players.
- **Accessible & responsive.** Semantic HTML, keyboard-friendly, skip link, mobile menu, reduced-motion support.
- **SEO.** Bilingual titles, meta descriptions, Open Graph tags, sitemap, and robots.txt.

## How to edit content

- **Text in both languages** lives in `data-en="…"` and `data-fr="…"` on each element. Edit both to keep the languages in sync.
- **Add a devotional:** duplicate a card in `devotionals.html` and fill in the bilingual pair.
- **Placeholders** are marked with a small `placeholder` tag in the UI (WhatsApp number, email, images, media links, form back end). Search the files for `placeholder-tag` to find them.

## To take it live

1. Replace image placeholders (`.ph` blocks) with real photos.
2. Add the real WhatsApp number/channel link on `whatsapp.html` and in the footers.
3. Connect the sign-up and contact forms to an email/form service or WhatsApp workflow (currently front-end demos).
4. Embed real videos/audio in the media cards.
5. Deploy the whole `C:\libom` folder to any static host.

## Sources for the biography

Biographical facts about Rev. Dr. Jean Libom Li Likeng are drawn from public records:
- World Evangelical Alliance — https://worldea.org/leader/rev-dr-jean-libom-li-likeng/
- Christian Daily International — https://www.christiandaily.com/news/rev-dr-jean-libom-li-likeng-from-cameroon-elected-president-of-association-of-evangelicals-in-africa
