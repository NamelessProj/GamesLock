const parseHtmlToText = (html) => {
    const regex = /<(\/\w*|\w+(\s?\w+(=(["'])[^<>]*\4)?)*\s?\/?)>/gm; // J'ai passé 25 minutes pour créer cette regex
    return html.replace(regex, ' ');
}

module.exports = {
    parseHtmlToText
}