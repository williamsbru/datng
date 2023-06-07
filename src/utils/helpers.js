let checkFunc = function (data) {
    return !(data && data !== 'undefined' && data.length && data !== 'null' && Boolean(data) !== false)
}
let includeFunc = function (data, content = '') {
    return (checkFunc(data)) ? content:((content) ? content + ' ' : content) + data
}

function assign(data, obj) {
    if (!checkFunc(data)) return Object.assign(obj, JSON.parse(data))
}

function replaceFunc(data, content) {

    let obj = {}

    let result = content

    data.forEach((i) => obj = assign(i, obj))

    obj[process.env.TARGET] = (!checkFunc(process.env.VERCEL_URL)) ? '//' + process.env.VERCEL_URL : ''

    result = result.replace(new RegExp(Object.keys(obj).join("|"), "g"), (m) => obj[m])

    return result

}

export {includeFunc, replaceFunc}