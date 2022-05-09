export const getQueryString = (baseRoute, data) => {
    let queryString = `${baseRoute}?`
    for (const [key, value] of Object.entries(data)) {
        queryString += encodeURI(`${key}=${value}&`)
    }
    return queryString
}