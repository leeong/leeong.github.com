(function($){

  // Caption
  $('.article-entry').each(function(i){
    $(this).find('img').each(function(){
      if ($(this).parent().hasClass('fancybox')) return;

      var alt = this.alt;

      if (alt) $(this).after('<span class="caption">' + alt + '</span>');

      $(this).wrap('<a href="' + $(this).attr('src') + '" title="' + alt + '" class="fancybox"></a>');
    });

    $(this).find('.fancybox').each(function(){
      $(this).attr('rel', 'article' + i);
    });
  });

  if ($.fancybox){
    $('.fancybox').fancybox();
  }

  //Remove search input icon
  $('input[type=search]').removeAttr('results');

  function startWindowAnim(){
    $('#header').addClass('open');
    $('#wrap > .outer').addClass('open');
    $('#footer').addClass('open');
  }

  //Set image scrollLoading
  $('.article-entry img').each(function() {
    $(this).attr('data-url', $(this).attr('src'));
    $(this).removeAttr('src');
    $(this).addClass('scrollLoading');
    $(this).wrap('<div class="img-wrap"></div>');
  });

  var imgCount,
      timer = setInterval(function () {
        if(imgCount <= 0)
          clearInterval(timer);
        isLoaded();
      }, 500);

  var isLoaded = function () {
    $('.scrollLoading').each(function (i, img) {
      if($(this).height() > 0 && $(this).parents('.img-wrap').length) {
        if($(this).parent().hasClass('img-wrap'))
          $(this).unwrap();
        else
          $(this).parent().unwrap();
      }
    });
    imgCount = $('.img-wrap').length;
  }

  $('.scrollLoading').scrollLoading();

  setTimeout(startWindowAnim, 1);

  // Share
  $('body').on('click', function(){
    $('.article-share-box.on').removeClass('on');
  }).on('click', '.article-share-link', function(e){
    e.stopPropagation();

    var $this = $(this),
      url = $this.attr('data-url'),
      encodedUrl = encodeURIComponent(url),
      id = 'article-share-box-' + $this.attr('data-id'),
      offset = $this.offset();

    if ($('#' + id).length){
      var box = $('#' + id);

      if (box.hasClass('on')){
        box.removeClass('on');
        return;
      }
    } else {
      var html = [
        '<div id="' + id + '" class="article-share-box">',
          '<input class="article-share-input" value="' + url + '">',
          '<div class="article-share-links">',
            '<a href="https://twitter.com/intent/tweet?url=' + encodedUrl + '" class="article-share-twitter" target="_blank" title="Twitter"></a>',
            '<a href="https://www.facebook.com/sharer.php?u=' + encodedUrl + '" class="article-share-facebook" target="_blank" title="Facebook"></a>',
            '<a href="http://pinterest.com/pin/create/button/?url=' + encodedUrl + '" class="article-share-pinterest" target="_blank" title="Pinterest"></a>',
            '<a href="https://plus.google.com/share?url=' + encodedUrl + '" class="article-share-google" target="_blank" title="Google+"></a>',
          '</div>',
        '</div>'
      ].join('');

      var box = $(html);

      $('body').append(box);
    }

    $('.article-share-box.on').hide();

    box.css({
      top: offset.top + 25,
      left: offset.left
    }).addClass('on');
  }).on('click', '.article-share-box', function(e){
    e.stopPropagation();
  }).on('click', '.article-share-box-input', function(){
    $(this).select();
  }).on('click', '.article-share-box-link', function(e){
    e.preventDefault();
    e.stopPropagation();

    window.open(this.href, 'article-share-box-window-' + Date.now(), 'width=500,height=450');
  });

  //Open search box
  $('#nav-search-btn').on('click', function(){
    $('#search-form-wrap').toggleClass('on');
    $('#main-nav').toggleClass('off');
  });
  //When click other element. close search box
  $("#wrap > .outer").on('click', function(){
    $('#search-form-wrap').removeClass('on');
    $('#main-nav').removeClass('off');
  });

  // Mobile nav
  $('#main-nav-toggle').on('click', function(){
    $('#mobile-nav').toggleClass('off');
  });


  var stars = new Array(
      '愿有人陪你颠沛流离 —— 卢思浩',
      '愿你有酒有肉有朋友',
      '愿漂泊的人都有酒喝 孤独的人都会唱歌',
      '我有酒有肉 你有故事吗 ',
      'Young For You —— GALA',
      '为了心中的美好 不妥协直到变老 —— GALA',
      '你是人间的四月天 —— 林徽因',
      '一身诗意千寻瀑 万古人间四月天 —— 金岳霖',
      '我只想要拉住流年 好好的说声再见 —— 雷雨心',
      '把能带走的都丢弃 把能回忆的都忘记 —— 小果',
      '即使装逼得宠，矫情获利，卖萌当道……我还是要做一个靠颜值闯出一片天的人，这是宿命……',
      '你是要当一辈子,懦夫还是要当英雄，哪怕只有几分钟。你需要的不仅仅是勇气，来自心底的革命呐喊，只为惊醒少数人……',
      '山本不需要云的缱绻 是云从天空降到了半山腰 —— 梁晓生',
      '如果你喜欢一个女生 那就好好读书 努力赚钱 等她结婚的时候 你多出点份子钱',
      '得到的都是侥幸 失去的都是人生',
      '行到水穷处，坐看云起时。 —— 王维',
      '树叶的飘落 是对风的追求 还是树的不挽留',
      '春水初生，春林初盛，春风十里，不如你。 —— 冯唐',
      '年轻的时候，总是把创作的冲动误以为是创作的才华;总是把对孤独的恐惧误以为是对爱情的向往。',
      '永远年轻，永远热泪盈眶。 —— Jack Kerouac',
      '注定风是不羁的旅人 你我也不过是一季过客'
  );
  var stars_n = Math.floor(Math.random() * stars.length + 1)-1;
  $("#footer-star").html(stars[stars_n]);
})(jQuery);
