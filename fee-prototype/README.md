# Transaction fee experiment – prototype
Static prototype. Open `index.html` (it redirects to `Start.dc.html`) through a web server, not by double-clicking:

    python3 -m http.server 8000   # then visit http://localhost:8000

Works on GitHub Pages or Vercel as a static site (no build step). Google Fonts load from the internet.
`support.js` is the runtime the screens need; do not remove it.
