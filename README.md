# Heartora — Responsive Marketing & Legal Website

A self-contained static website built with HTML, CSS and vanilla JavaScript, featuring a responsive landing page, real user-supplied app art, simple motion effects, and legal/support pages.

## Pages and clean URLs

- `/` — Home / landing page
- `/privacy-policy` — Privacy Policy
- `/children` — Children's Safety and privacy for minors
- `/contact-us` — Contact / support
- `/contact` and `/contactus` — optional aliases on supported hosting

Folder `index.html` pages are included at `/privacy-policy/index.html`, etc. Clean URLs are configured for **Apache** (`.htaccess`), **Netlify/Cloudflare Pages** (`_redirects`) and **Vercel** (`vercel.json`). Some static hosts redirect `/privacy-policy` to `/privacy-policy/`; both serve the same content. For strict no-trailing-slash routing, use one of the provided hosting configurations.

## Deploy

1. Unzip the archive and upload the *contents* of the `heartora_website` folder to your hosting web root (usually `public_html` or equivalent), **including the hidden `.htaccess` file** if you use Apache.
2. Configure the domain and SSL in your hosting service so the site opens as `https://YOUR-DOMAIN/`.
3. Open all four pages on a phone and desktop, and verify `/privacy-policy`, `/children`, `/contact-us`.
4. When the App Store listing is live, edit `assets/js/site-config.js` and enter its exact `https://apps.apple.com/...` URL. Relevant website buttons will automatically turn into App Store links. Until then, the CTAs navigate to working on-site sections or support (no fake store URL).

You can preview locally by running `python3 -m http.server 8080` from this folder and opening `http://localhost:8080`. Python's simple server may add a trailing slash on directory URLs; production hosts can avoid this via the included rewrites.

## Assets and branding

- Images `characters-collage.webp`, `neon-character.webp`, `marta-preview.webp`, and `discover-preview.webp` are cropped from the supplied Heartora promotional graphic. The original is preserved as `assets/img/original-promos.png`.
- The *separate original app icon was not available* in the accessible attachments. `assets/img/brand-mark.svg`, `favicon.png`, and `apple-touch-icon.png` are a newly designed visual substitute matching the brand colors. Replace them with your actual icon before launch if the mark should match the app exactly.
- Colors and layout are based on Heartora's purple/black, luminous lime, pink, rounded UI. A Google Fonts typeface (Outfit) is loaded for visual consistency, with system fallbacks.
- All images are bundled locally except the optional web font; there are no JavaScript frameworks or third-party analytics scripts.

## IMPORTANT — Legal and operational verification before publishing

The Privacy Policy and Children's Safety Policy are *complete draft pages*, but legal accuracy depends on your real app implementation and company's processes. Do **not** publish them unchanged if any statements are inaccurate.

Confirm all of these items:

1. **Legal operator:** Add the complete legal name and registered address of the data controller, when required by applicable law. Only the supplied support email is known from the conversation.
2. **Age restriction:** The policies state Heartora is intended for **18+**. Match this to your actual registration/age-screening flow, App Store age rating, terms, and moderation policies. If the product permits users under 18, revise the children's policy and your processes.
3. **Data collected and retained:** Confirm whether there are accounts, message history, images or uploads, diagnostic data, push notifications, analytics, crash logs, advertising IDs, and data deletion options. State the real retention periods where required.
4. **AI vendors and international transfers:** Name actual service providers and describe the data shared with them when legally required. Apple's rules may require disclosure and consent before sending personal data to third-party AI providers.
5. **In-app purchases:** Confirm coins, pricing, restore flow, and whether all digital purchases use App Store In-App Purchase.
6. **Safety reporting:** Ensure `owner@great-west-nine.pro` is actively monitored and that reported child-safety violations can be handled as the site describes.
7. **No unsupported promises:** Confirm that statements about deletion, privacy rights and data security match actual operational capabilities.
8. **Domain & metadata:** Once you know your domain, add absolute `og:image` URLs, canonical tags, and a sitemap if desired. Search engines/social previews work better with absolute public URLs.
9. **Fonts & hosting logs:** The privacy draft discloses Google Fonts and routine host logs; update it if you change providers, add cookies, telemetry or tracking.

Contact: `owner@great-west-nine.pro`

## File map

```
index.html
404.html
privacy-policy/index.html
children/index.html
contact-us/index.html
assets/css/style.css
assets/js/main.js
assets/js/site-config.js
assets/img/*.webp, *.svg, *.png, *.jpg
.htaccess
_redirects
vercel.json
robots.txt
README.md
```
