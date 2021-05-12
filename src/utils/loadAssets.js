const fs = require("fs");

const loadAssets = (path)=> {
    const sounds = fs.readdirSync(path)
        .filter(x => x.includes("png"))
        .filter(x => !x.includes('@2x'))
        .filter(x => !x.includes('@3x'));

    const res = files.map(file => `export { default as image${file.split('.png')[0]} } from './${file}';`)
        .join('\n');

    fs.writeFileSync("./src/common/assets/images/index.js", res);
}

export default loadAssets;