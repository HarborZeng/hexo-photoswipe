const assert  = require("assert");
const renderImageResolution = require('../util/image-res-renderer');
hexo = {
  config: {
    photoswipe: {
      enable: true,
      imageFileBaseDir: 'test',
      imgSrcIn: 'dataOriginal',
      className: 'image-container',
      dataType: 'content-image',
    }
  }
}
let localImageTestCase = '<img src="/medias/assets/loading/Eclipse-1s-200px.svg" data-original="/p/machine-learning-tensorflow-keras-predicts-car-fuel-efficiency-the-regression-problem/1550060359264.png" title="数据有规律了许多">'
let resultLocal = renderImageResolution(localImageTestCase, "title1");
assert.equal(resultLocal, '<div class="image-container" data-type="content-image" data-size="533x532"><img src="/medias/assets/loading/Eclipse-1s-200px.svg" data-original="/p/machine-learning-tensorflow-keras-predicts-car-fuel-efficiency-the-regression-problem/1550060359264.png" title="数据有规律了许多"></div>')

let networkImageTestCase = '<img src="/medias/assets/loading/Eclipse-1s-200px.svg" data-original="https://upload-images.jianshu.io/upload_images/6399013-3d0ee36e36870916.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt="">'
let resultNetwork = renderImageResolution(networkImageTestCase, "title2");
assert.equal(resultNetwork, '<div class="image-container" data-type="content-image" data-size="960x511"><img src="/medias/assets/loading/Eclipse-1s-200px.svg" data-original="https://upload-images.jianshu.io/upload_images/6399013-3d0ee36e36870916.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt=""></div>')
