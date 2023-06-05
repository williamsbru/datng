let includeFunc = function (data, content = '') {
    if (Boolean(data) !== false) {
        if (content) content = content + ' '
        content = content + data;
    }
    return content;
}

let replaceFunc = function (data, content) {
    if (Boolean(data) !== false) {
        data = JSON.parse(data)
        Object.keys(data).forEach(key => {
            content = content.replace(new RegExp(key, 'g'), data[key]);
        })
    }
    return content
}

export {includeFunc, replaceFunc}