function isValidHttpUrl(urlString) {
    try {
        const url = new URL(urlString);
        return url.protocol === 'http:' || url.protocol === 'https:';
    } catch(error) {
        return false;
    }
}

module.exports = isValidHttpUrl;