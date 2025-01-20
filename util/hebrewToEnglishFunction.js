const translate = require('translate-google');
translate.engine = "google";


const translateFunction = async (ivrit, from, to) =>{
    //Takes the hebrew text (or any other language), converts it to chosen language ('en' for english) using the translate-google Module
    if (from && to) {
        return await translate(ivrit, { from: from, to: to });
    }
    return null;
}

module.exports = {
    translateFunction
};