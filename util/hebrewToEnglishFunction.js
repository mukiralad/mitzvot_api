import translate from "translate";
translate.engine = "google";

// From = he, to = en (example)
const toEnglish = async(ivrit) => {
    if (ivrit){
        const text = await translate(ivrit, { from: he, to: en });
        return text
    }
    return "error"
}


module.exports = {
    toEnglish
  };