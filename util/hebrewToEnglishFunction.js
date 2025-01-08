const translate = require('translate-google');
translate.engine = "google";

const toEnglish = async (ivrit) => {
    //Takes the hebrew text and translates it to english using the translate-google Module
    if (ivrit) {
        return await translate(ivrit, { from: 'iw', to: 'en' });
    }
    return null;
};

module.exports = {
    toEnglish
};