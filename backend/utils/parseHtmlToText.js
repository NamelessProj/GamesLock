const parseHtmlToText = (html) => {
    const regex = /<(\/\w*|\w+(\s?\w+(=(["'])[^<>]*\4)?)*\s?\/?)>/gm; // J'ai passé 25 minutes pour créer cette regex
    const text = html.replace(regex, ' ');
    return text.replace(/\s{2,}/, ' '); // Removing all double or more spaces
}

module.exports = {
    parseHtmlToText
}