const translate = require('translate-google');
translate.engine = "google";

const toEnglish = async (ivrit) => {
    if (ivrit) {
        return await translate(ivrit, { from: 'iw', to: 'en' });
    }
    return null;
};

module.exports = {
    toEnglish
};