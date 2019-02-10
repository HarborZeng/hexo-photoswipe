const fs = require('hexo-fs');
const renderImageResolution = require('./util/image-res-renderer');

hexo.extend.filter.register('before_post_render', function (data) {
    data.content = renderImageResolution(data.content);
    return data;
})