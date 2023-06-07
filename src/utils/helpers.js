let checkFunc = function (data) {
    return !(data && data !== 'undefined' && data.length && data !== 'null' && Boolean(data) !== false)
}
let includeFunc = function (data, content = '') {
    if (checkFunc(data)) return content
    return ((content) ? content + ' ' : content) + data
}

function assign(data, obj) {
    if (!checkFunc(data)) return Object.assign(obj, JSON.parse(data))
}

function replaceFunc(data, content) {

    let obj = {}

    let result = content

    data.forEach((i) => obj = assign(i, obj))

    if (!checkFunc(process.env.VERCEL_URL)) obj[process.env.TARGET] = '//' + process.env.VERCEL_URL

    result = result.replace(new RegExp(Object.keys(obj).join("|"), "g"), (m) => obj[m])

    return result

}

export {includeFunc, replaceFunc}