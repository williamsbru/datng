let checkFunc = function (data) {
    return (data && true && data !== 'undefined' && data.length && data !== 'null')
}

let includeFunc = function (data, content = null) {
    if (checkFunc(data)) {
        if (content) content = content + ' '
        content = content + data;
    }
    return content;
}

let replaceFunc = function (data, content) {
    if (checkFunc(data)) {
        data = JSON.parse(data)
        Object.keys(data).forEach(key => {
            content = content.replace(new RegExp(key, 'g'), data[key]);
        })
    }
    return content
}

export {includeFunc, replaceFunc}