import translate from "translate";
translate.engine = "google";

// From = he, to = en (example)
const toEnglish = async(ivrit, from, to) => {
    if (ivrit){
        const text = await translate(ivrit, { from: from, to: to });
        return text
    }
    return "error"
}


module.exports = {
    toEnglish
  };