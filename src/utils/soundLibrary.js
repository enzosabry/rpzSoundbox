/***************************************************************************
 *                       Usage: node soundLibrary.js                       *
 *           à exécuter à chaque modification de assets/category/          *
 * Génère un fichier config.js contenant le tableau de données images/sons *
 ***************************************************************************/

const fs = require('fs');
let path = "./assets/category/";

let resArray = `[`;

// foreach Category directory in /assets/category
fs.readdirSync(path).forEach((val) => {
    if(val==="config.js") {
        return;
    }
    const subDir = fs.readdirSync(path + val);
    // GET all sounds and image(s)
    const sounds = subDir.filter((x) => x.includes("mp3"));
    const image = subDir.filter((x) => x.includes("thumb_"));

    if (!sounds[0] || !image[0]) return;

    // define assets array
    resArray += `
    {
        name: "${val.charAt(0).toUpperCase() + val.slice(1)}",
        image: require("${"./" + val + "/" + image[0]}"),
        sounds: [ ${sounds.map((file) =>`
            {
                name: "${file.split('.')[0].split("_").join(" ")}", 
                audio: require("${"./" + val + "/" + file}"),
            }`).join(",")}
        ],
    },`;
});
resArray += "\n]";


const res = `/**************************************************** 
 * AUTO-GENERATED FILE, PLEASE DO NOT TOUCH (merci) *
 ****************************************************/

const soundLibrary = ${resArray};

export default soundLibrary;`;

fs.writeFileSync(path+"config.js",res);
