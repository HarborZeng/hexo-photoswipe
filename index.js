const renderImageResolution = require('./util/image-res-renderer');

if (hexo.config.photoswipe && hexo.config.photoswipe.enable) {
    hexo.extend.filter.register('after_post_render', function (data) {
        data.content = renderImageResolution(data.content, data.title)
        return data
    }, 15)
}