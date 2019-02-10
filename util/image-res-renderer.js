const sizeOf = require('image-size');

function renderImageResolution(content) {
    content.replace(/(<img src="(.*)" data-original="(.*)" .*>)/g, function (match, p1, p2, p3, offset, string) {
        var imageSize = sizeOf(p3)
        return '<a href="' + p3 + '" data-size="' + imageSize.width + 'x' + imageSize.height + '"> ' + p1 + ' </a>'
    })
}

module.exports = renderImageResolution