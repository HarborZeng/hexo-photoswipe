# hexo-photoswipe

[![npm version](https://badge.fury.io/js/hexo-photoswipe.svg)](https://badge.fury.io/js/hexo-photoswipe)
[![Known Vulnerabilities](https://snyk.io/test/github/HarborZeng/hexo-photoswipe/badge.svg?targetFile=package.json)](https://snyk.io/test/github/HarborZeng/hexo-photoswipe?targetFile=package.json)
[![CircleCI](https://circleci.com/gh/HarborZeng/hexo-photoswipe.svg?style=svg)](https://circleci.com/gh/HarborZeng/hexo-photoswipe)

## hexo-photoswipe 是什么？

当你使用hexo来搭建一个博客的时候，你可能需要你个好看漂亮的图片浏览器来展示你上传的图片。

`Hexo-photoswipe` 就是你所需要的那个插件！

 [photoswipe](https://photoswipe.com)是一个非常漂亮，易于使用的图片浏览器插件，但是受限于 [photoswipe](https://photoswipe.com)的工作原理，photoswipe 需要图片`宽度`和`高度`的属性，这个对于绝大多数图片来说都是不天生具备的。

`Hexo-photoswipe`就是为在`hexo`博客中集成[photoswipe](https://photoswipe.com)设计的，他会在你运行`hexo s`或`hexo g`的时候，生成图片的宽高。

## 如何使用？

请注意，这不是一个开箱即用的插件，为避免引入一个js文件（过多外链js文件会降低您网站的加载速度），建议您将本插件所需的js代码复制或修改，并手动写入您自己的js文件中。

如果您再使用过程中得到什么启发，我将深感荣幸。

我们稍后再说那个js怎么写。

请注意，推荐您安装 [hexo-lazyload-image](https://www.npmjs.com/package/hexo-lazyload-image), 它会使你的`img`标签里面多出一个 `data-original` 属性。 当然，你也可以选择不使用懒加载这项功能。

请注意，这个插件支持如下两个手段：

1. 使用这样的方式引入图片： `yourTitle/someImage.format` 也就是说 {% asset_img foo.bar "foobar some text" %} 这样的方式。

> 对于这些本地图片，插件将直接计算他的宽高

2. 另一种是使用http或https引入的图片，也就是说以markdown的方式： \!\[foobar some text\](http(s)://www.john.doe/foo.bar)

> 对于这些在线的图片，插件将同步的下载他们，并缓存，然后再计算图片的宽高

### 安装

首先，您可以安装 `hexo-lazyload-image`, 如果您不需要此功能特性，请忽略这一步。

```shell
$ npm install hexo-lazyload-image --save
```

下面将向您介绍如何配置 `hexo-lazyload-image`

------

> 首先在 _config.yml 中添加配置

```yaml
lazyload:
  enable: true 
  onlypost: false
  loadingImg: # eg /images/loading.gif 
```

> ### onlypost

> If true, only the images from post or page will support lazy-load.
> If false, the whole images of your site will use lazy-load, including > the images dist from your theme, but not including the background images >from CSS style.

> ### loadingImg

> If you keep the value nothing (by default), then it will use the default >loading image.
> If you want to customize the image, then you need to copy your loading > image to your current theme image folder and then change this path to > find it.
> Run hexo command.

```shell 
$ hexo clean
```

------

然后，安装 `hexo-photoswipe`:

```shell
$ npm install hexo-photoswipe --save
```

然后在配置文件里面启用它。

你的最终渲染页面里面的就会出现被 `div`包裹的 `img` 标签，同时也包含类似这样的属性在里面： `class="image-container" data-type="content-image" data-size="100x100"`。

最后，您再将下文的js，html等复制到您的模板或主题的相关文件里面即可。

> 如果您不知如何做，请给我提一个issue: <https://github.com/HarborZeng/hexo-photoswipe/issues>

## demo

![https://github.com/HarborZeng/hexo-photoswipe/blob/master/phone.gif](https://github.com/HarborZeng/hexo-photoswipe/blob/master/phone.gif)
![https://github.com/HarborZeng/hexo-photoswipe/blob/master/desktop.gif](https://github.com/HarborZeng/hexo-photoswipe/blob/master/desktop.gif)

在线预览效果，请访问<https://tellyouwhat.cn>

## 开源许可证

[MIT](https://github.com/HarborZeng/hexo-photoswipe/blob/master/LICENSE)

## 教程

假设您已经安装了该插件的依赖

### 0. 启用插件

在你博客的 `_config.yml` 文件中添加如下配置:

```yaml
# <div class="image-container" data-type="content-image" data-size="100x100"><img src="xxx" data-original="yyy"></img></div>'
# imgSrcIn: dataOriginal if you install hexo-lazyload-image, or src as default
# dataType is a presered attr, usless now but you can custum in your own js with this unique selector.
# className you can custom the class for div, in your own css file as you want.
# imageFileBaseDir is the base directory where hexo-photoswipe would find images, eg, source/_posts/my-first-post/cover.jpg. The final pattern is {imageFileBaseDir}/{YourPostTitle}/{imageName}.{imageFormat}.
photoswipe:
  enable: true
  imageFileBaseDir: source/_posts
  imgSrcIn: dataOriginal
  className: image-container
  dataType: content-image
```

### 1. 引入js和css文件

你可以在 [dist/](https://github.com/dimsemenov/PhotoSwipe/tree/master/dist) 找到js和css文件在编译版本。

不论你在哪里引入这些文件都可以，只要在 `new PhotoSwipe()` 之前加载就行。

或者

强烈推荐使用CDN：

```html
<script src="https://cdn.bootcss.com/photoswipe/4.1.3/photoswipe.min.js"></script>
<script src="https://cdn.bootcss.com/photoswipe/4.1.3/photoswipe-ui-default.min.js"></script>

<link href="https://cdn.bootcss.com/photoswipe/4.1.3/photoswipe.min.css" rel="stylesheet">
<link href="https://cdn.bootcss.com/photoswipe/4.1.3/default-skin/default-skin.min.css" rel="stylesheet">
```

### 2. 添加 `pswp` 代码到你的模板页面

这些代码应该放在 `</body>` 之前的任何地方都可以。建议直接复制，防止打错。

```html
<!-- Root element of PhotoSwipe. Must have class pswp. -->
<div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">

    <!-- Background of PhotoSwipe.
         It's a separate element as animating opacity is faster than rgba(). -->
    <div class="pswp__bg"></div>

    <!-- Slides wrapper with overflow:hidden. -->
    <div class="pswp__scroll-wrap">

        <!-- Container that holds slides.
            PhotoSwipe keeps only 3 of them in the DOM to save memory.
            Don't modify these 3 pswp__item elements, data is added later on. -->
        <div class="pswp__container">
            <div class="pswp__item"></div>
            <div class="pswp__item"></div>
            <div class="pswp__item"></div>
        </div>

        <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->
        <div class="pswp__ui pswp__ui--hidden">

            <div class="pswp__top-bar">

                <!--  Controls are self-explanatory. Order can be changed. -->

                <div class="pswp__counter"></div>

                <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>

                <button class="pswp__button pswp__button--share" title="Share"></button>

                <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>

                <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>

                <div class="pswp__preloader">
                    <div class="pswp__preloader__icn">
                        <div class="pswp__preloader__cut">
                            <div class="pswp__preloader__donut"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                <div class="pswp__share-tooltip"></div>
            </div>

            <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">
            </button>

            <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">
            </button>

            <div class="pswp__caption">
                <div class="pswp__caption__center"></div>
            </div>

        </div>

    </div>

</div>
```

### 3. 在你自己的js文件中初始化

```javascript
let pswpElement = document.querySelector('.pswp')
let imgSrcItem = []
$('someSelectorToYourImage').each(function (index) {
  // data-original is generated by hexo-lazyload-image,
  // which represent the src of the image
  let imgPath = this.getAttribute('data-original')
  // or let imgPath = this.src if you don't install hexo-lazyload-image
  
  $(this).addClass("some class if you want")
  
  // caption text
  let alt = $(this).attr('alt')
  let title = $(this).attr('title')
  let captionText = alt || title
  if (captionText) {
    let captionDiv = document.createElement('div')
    captionDiv.className += ' caption'
    let captionEle = document.createElement('b')
    captionEle.className += ' center-caption'
    captionEle.innerText = captionText
    captionDiv.appendChild(captionEle)

    // insert where appropriate
    this.parentElement.insertAdjacentElement('afterend', captionDiv)
  }
  
  if (this.parentNode.getAttribute('data-size')) {
    let resolution = this.parentNode.getAttribute('data-size').split('x')
    imgSrcItem.push({
      src: imgPath,
      w: resolution[0],
      h: resolution[1],
      title: captionText
    })
  } else {
    imgSrcItem.push({
        src: imgPath,
        w: this.naturalWidth || window.innerWidth,
        h: this.naturalHeight || window.innerHeight,
        title: captionText
    })
  }
})

$('someSelectorToYourImage').each(function (i) {
  $(this).click(function (e) {
    let options = {
      // more options at https://photoswipe.com/documentation/options.html
      // optionName: 'option value'
      // for example:
      index: i, // start at index 
      barsSize: {top: 0, bottom: 0},
      captionEl: true,
      fullscreenEl: false,
      shareEl: false,
      bgOpacity: 0.5,
      tapToClose: true,
      tapToToggleControls: true,
      showHideOpacity: false,
      counterEl: true,
      preloaderEl: true,
      history: false,
      getThumbBoundsFn: function (index) {
        // find thumbnail element
        var thumbnail = document.querySelectorAll('#articleContent img')[index];
        // get window scroll Y
        var pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
        // optionally get horizontal scroll
        // get position of element relative to viewport
        var rect = thumbnail.getBoundingClientRect();
        // w = width
        return {x: rect.left, y: rect.top + pageYScroll, w: rect.width};
      }
    }
    let gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, imgSrcItem, options)
    gallery.listen('imageLoadComplete', function (index, item) {
      // index - index of a slide that was loaded
      // item - slide object
      // update src of images in web page when their view are not reached by browser,
      // while photoswipe has completely load the image 
        // if you don't install hexo-lazyload-image, then the code below is unnessary
      $('someSelectorToYourImage')[index].src = item.src
    })
    gallery.init()
  })
})
```

### 4. 可选：添加css样式

```css
.image-container {
  text-align: center;
  /*...more style...*/
}
```
