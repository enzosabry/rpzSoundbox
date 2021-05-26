const fs = require('fs');
let text = "";
try {
    const d = fs.readFileSync("docs/index.html", "utf-8");
    text = d.substr(0, 37) +
        `<script async defer data-website-id="38833760-e45d-4d24-806d-c66c02980267" src="https://umami.enzosabry.fr/umami.js"></script>` +
        d.substr(37);
    fs.writeFileSync("docs/index.html", text);
} catch(e) {
    console.warn("erreur umami");
}