# Processing fee test – two variants (prototype)

Static prototype for visual and copy reference. Not production code.
Open `index.html` through a web server (`python3 -m http.server 8000`, then http://localhost:8000). Works as a static site on Vercel or GitHub Pages. Keep `support.js` next to the HTML files.

## What to look at
- Fee checkbox sits right above the payment options, plain text (no box), checked by default.
- Title: "Help cover the $X processing fee" (15px, semibold). Line below: 15px, light.
- Variant 1 line: "Support educational fundraising through GetMovin’".
- Variant 2 line: "Join over 90% of donors who help cover fees!" (the 90% is placeholder copy, not a GetMovin figure).
- Donation Details shows the fee on its own line, "Processing fee".

## Prototype assumptions
- Whole-dollar fee: $35 = $1, $50 = $2, $75 = $3, $100 = $4. Any other amount uses ~4% rounded to whole dollars, minimum $1 (placeholder rule).
- "Other" opens a dropdown from $10 to $2,500.
- Names, amounts and the payment form are sample data; nothing is submitted.
