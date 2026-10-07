// Prototype: crawlers ARE allowed to visit, so they can see the "noindex" instructions
// (the robots meta tag in app/layout.js and the X-Robots-Tag header in next.config.mjs).
// Blocking crawling here would hide those instructions, and a shared link could still get listed.
// At launch: remove the noindex instructions and add a sitemap.
export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/" },
  };
}
