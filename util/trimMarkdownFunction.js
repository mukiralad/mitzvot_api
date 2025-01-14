function trimMarkdown(markdown){
    //Takes in a markdown string and returns the JSON object
    const jsonString = markdown.replace(/```(json)?/g, '').trim();
    const data = JSON.parse(jsonString);
    return data
}

export default {
    trimMarkdown
};