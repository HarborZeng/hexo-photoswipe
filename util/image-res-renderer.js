const sizeOf = require('image-size');
const path = require('path');

function renderImageResolution(content, title) {
  return content.replace(/(<img src="(.*)" data-original="([^"]*)"[^<]*>)/g, function (match, p1, p2, p3, offset, string) {
    title = title.replace(/[,_:'";?!@><.]/gi, '-').replace(/ /g, '')
    var img = p3.replace(/(\/p\/)(.*)(\/.*)/g, title + '$3')
    img = path.join("source/_posts", img)
    if (p3.indexOf('http') === 0) {
      // 以http开头的data-origianl属性
      return '<div class="image-container" data-type="content-image">' + p1 + '</div>'
    } else {
      // 本地图片，可以求取大小
      var imageSize = sizeOf(img)
      return '<div class="image-container" data-type="content-image" data-size="' + imageSize.width + 'x' + imageSize.height + '">' + p1 + '</div>'
    }
  })
}

module.exports = renderImageResolution