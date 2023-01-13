// You can write your custom Javascript here

/*****************************
 * Set content based on input
 *****************************/

$('.btn--add-name, .btn--add-firstname').on('click', function() {
  $('.user-name').text($('#first-name').val());
  $('.dog-name').text($('#name').val());
});

/**
 * Filter select element
 */
$('.js-filter-select').on('change', function() {
  var target = $(this).val();

  window.location.href = target;
});

/**
 * Sticky / hide element on scroll
 */
var isSticked = false;

function isScrolledIntoView(elem) {
  var docViewTop = $(window).scrollTop();
  var docViewBottom = docViewTop + $(window).height();

  var elemTop = $(elem).offset().top;
  var elemBottom = elemTop + $(elem).height();

  return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

function isInViewport(elem) {
    var top_of_element = $(elem).offset().top;
    var bottom_of_element = $(elem).offset().top + $(elem).outerHeight();
    var bottom_of_screen = $(window).scrollTop() + $(window).innerHeight();
    var top_of_screen = $(window).scrollTop();

    return (bottom_of_screen > top_of_element) && (top_of_screen < bottom_of_element) ? true : false;
  }

$(window).on('scroll load', function() {
  var $stickyElem = $('.js-sticky');
  var $stickyOffsetElem = $('.js-sticky-offset');
  var $header = $('.header');

  if ($(window).width() < 768 && $stickyElem.length && $stickyOffsetElem.length) {
    if ($(window).scrollTop() >= $stickyOffsetElem.offset().top - $header.height()) {
      isSticked = true;

      if (isSticked) {
        $stickyElem.addClass('is-sticky');
      }
    } else {
      isSticked = false;

      $stickyElem.removeClass('is-sticky');
    }
  }

  if ($(window).scrollTop() > 0) {
    $('.js-show-on-scroll').removeClass('is-hidden');
  } else {
    $('.js-show-on-scroll').addClass('is-hidden');
  }
});
$(window).scroll(function () {
  $('.anamate').each(function() {
    if (isInViewport(this) === true) {
      $(this).addClass( "anamate--visible" );
    }
  })
});
$(document).ready(function () {
  if ($('.header__bar--alt').length && window.innerWidth < 768) {
    
    var headerHeight = $('.header-bar-normal').outerHeight();
    
    $('.header__bar--alt').css('height', headerHeight);
    
    if(window.innerWidth < 531) {
      $('.article-v2').css('margin-top', headerHeight);
    }
  } else if ($('.main .section-product').length && window.innerWidth < 768) {
    var newPadding = $('.header-bar-normal').outerHeight() + 30;
    
    $('.main .section-product').addClass('dynamic-padding');
  }
  
  
  
  var marqueeClass = ".marquee__content";
  if ($(marqueeClass).length) {
    var $tickerText = $(marqueeClass).children();
    $tickerText.children().each(function() {
      $(this).width($(this).outerWidth())
    });
    var $width = $tickerText.outerWidth() * 3;
    $('.marquee__content').width($width);
    $tickerText.clone().appendTo(marqueeClass);
    $tickerText.clone().appendTo(marqueeClass);
  }
  
  if ($('.anamate').length) {
    $('.anamate').each(function() {
      if (isInViewport(this) === true) {
        $(this).addClass( "anamate--visible" );
      }
    })
  } 

  /***********************************
   * Display order summary by default
   ***********************************/
  $('.product__rate').on('click', function (e) {  
    var mq = window.matchMedia( "(max-width: 1024px)" );
    if (mq.matches) {
      $(window).scrollTop($('#shopify-section-reviews').offset().top-100);
    } else {
      $(window).scrollTop($('#shopify-section-reviews').offset().top-180);
    } 
  });
  
  
  $('.radio').on('click', function (e) {   
        setTimeout(function() {
          $('.disabled').html('Out of Stock');
        },50);  
    
        setTimeout(function() {
          $('.js-form-btn').not('.disabled').html('Add to Basket');
        },50);
  });
  
  jQuery(function() {
    var pgurl = window.location.href.substr(window.location.href.lastIndexOf("k/collections/")+1);
    jQuery(".nav-tags ul li a").each(function(){
      if(jQuery(this).attr("href") == pgurl || jQuery(this).attr("href") == '' )
        jQuery(this).addClass("nav-tag-selected");
    })
   });
  
     $('.subscribe-radio input').on('click', function (e) { 
     var id = $(this).attr('id');
     var full_price = $('.product-subscribe-radio .money').text();
     
     
     if(id === 'subscribe') {
       $('.product .one_time').addClass('hidden');
       $('.subscription-product').removeClass('hidden');
       $('.subscription-checkout-btn').addClass('hidden');
       $('.subscription-details').addClass('hidden');
     } else {
       $('.product .one_time').removeClass('hidden');
       $('.subscription-product').addClass('hidden');
       $('.subscription-checkout-btn').addClass('hidden');
       $('.subscription-details').addClass('hidden');
       $('.product__head .money').text( full_price );
     }
   });
   
//   $('#create-plan-btn').on('click', function (e) {
//     $('.product-modal-background').css('display', 'block');
//   });
  
//   $('.product-modal-background').on('click', function(event) {
//     if(event.target == event.currentTarget) {
//      $('.product-modal-background').css('display', 'none');
//     } 
//   });
  
//   $('.subscribe_modal_close').on('click', function (e) {
//     $('.product-modal-background').css('display', 'none');
//   });
  
 if(window.location.href.indexOf("yucalm-landing") > -1) {
    
    var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutationRecord) {
        $('.rc_label__autodeliver').trigger('click'); 
      });    
    });

    var target = document.getElementById('rc_container');
    observer.observe(target, { attributes : true, attributeFilter : ['style'] });
  }
  
  
    
  $(window).scroll(function(){
    if( $('#shopify-section-landing-ingredients .section-image').length ){
      	scrollTracking();
    }
		
  });

 
  let block_show = false;
 
  function scrollTracking(){
      if (block_show) {
          return false;
      }

      let wt = $(window).scrollTop();
      let wh = $(window).height();
      let et = $('#shopify-section-landing-ingredients .section-image').offset().top ;
      let eh = $('#shopify-section-landing-ingredients .section-image').outerHeight();
      let dh = $(document).height();   

      if (wt + wh >= et || wh + wt == dh || eh + et < wh){
          block_show = true;
        	console.log('started');
          setTimeout(function() {
            $('.animate-1').addClass('arrow-animate');
            $('.animate-1').removeClass('visually-hidden');
          }, 100);          
          setTimeout(function() {
            $('.animate-2').addClass('arrow-animate');
            $('.animate-2').removeClass('visually-hidden');
          }, 500);
          setTimeout(function() {
            $('.animate-3').addClass('arrow-animate');
            $('.animate-3').removeClass('visually-hidden');
          }, 1000);
          setTimeout(function() {
            $('.animate-4').addClass('arrow-animate');
            $('.animate-4').removeClass('visually-hidden');
          }, 1500); 
        
        
      }
  }
  
    /***********************************
 * trouble logging in popup
 ***********************************/
  
  $('.trouble-logging').on('click', function(e) {
    console.log('clicked');
    $('.trouble-logging-background').removeClass('hidden');
  });
  
  $('.trouble-logging-close').on('click', function(e) {
    $('.trouble-logging-background').addClass('hidden');
  });
  
  setTimeout(function() {
          $('#breed').removeClass('hidden');
        },100);
  
   /***********************************
 * check for multi subscriptions checkout
 ***********************************/
//   $('.btn--checkout').on('click', function (e) {
//     var subscriptionQty = 0;
//     $('.cart-product-title').each(function(index) {
//       var productTitle = $(this).text();
      
//       if (productTitle.toLowerCase().indexOf("subscription") >= 0) {
//         subscriptionQty++;
//       }    
//     });
    
//     if(subscriptionQty > 1) {
//       console.log('multi subs');
//     } else {
//       console.log('one or less');
//     }
//   });
  
  $('.cross-sell-close').on('click', function(e) {
    $('.cross-sell-active').removeClass('cross-sell-active');
  });
  
  $('.header__bar .ico-close').on('click', function(e){
    $('.header-bar-normal').css('display', 'none');
    $('.scrolled--fixed .main').addClass('header-closed');
  });
  
  $('.header-bar-landing .ico-close').on('click', function(e){
    $('.header-bar-normal').css('display', 'none');
    $('.scrolled--fixed .main').addClass('header-closed');
    $('.header').css('margin-top', '0');
  });
  
  
  
  // Join the club popup 
  
    $('.header-bar-normal .popup-launcher, .landing-popup-cta').on('click', function(e){
      $('#perks-popup').removeClass('perks-popup-hidden');
    });
  
  
    
//     if (window.location.href.indexOf("account") < 0) {
//       if ($("#perks-popup .form__errors").html().length > 0) {
//         $('#perks-popup').removeClass('perks-popup-hidden');
//       } 
//     } 
  
   
  /***********************************
 * Landing subscribe popup launch test
 ***********************************/
  
  $('.landing-subscribe-btn').on('click', function(e) {    
    window.document.location = 'https://yumove.co.uk/products/yumove-plus-for-dogs' + '?' + 'landing';
  });
  
  if(window.location.href.indexOf("landing") > -1) {
    let radiobtn = document.getElementById("subscribe");
    radiobtn.checked = true;
    
    $('.product-modal-background').css('display', 'block');
    $('.product .one_time').addClass('hidden');
    $('.subscription-product').removeClass('hidden');
    $('.subscription-checkout-btn').addClass('hidden');
    $('.subscription-details').addClass('hidden');
  } 
  
  $('.cross-sell-close').on('click', function(e) {
    $('.cross-sell-active').removeClass('cross-sell-active');
  });
  
  
  //Searchanise page change event
  
  if($('.snize-results-page').length > 0) {
    snizeClickEvents();
  }
  
  $('.nav-access .search').click(function() {
    $('.search-outer').addClass('search-expanded');
  });
  
  $('.search-drawer .btn-close').click(function() {
    $('.search-outer').removeClass('search-expanded');
  });
  
  //Search usage dyanmic yield event 
  
  $('.search-content .search-text').click(function() {
    DY.API( 'event',{name: 'search_event', properties:{search_used: true}});
  });
});

function snizeClickEvents() {
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutationRecord) {
      
      if(mutationRecord.target.classList.contains('page__content') || mutationRecord.target.classList.contains('snize-search-results-content')) {
        console.log('mutation running');
        if($('.snize-main-panel-controls-pages.active').length > 0) {
          $('#snize_results').addClass('snize-pages');
          $('#snize_results').removeClass('snize-products');
          
          if($('.snize-page .read-more').length === 0) {
            observer.disconnect();
          
            var readMoreBtn = "<div class='read-more'>Read More</div>";
            $('.snize-page a').append(readMoreBtn);
          
            var target = document.querySelector('.snize-results-page .page__content');
          
            observer.observe(target, { subtree: true, childList: true });
          }  
          
        } else if ($('.snize-main-panel-controls-products.active').length > 0) {
          $('#snize_results').addClass('snize-products');
          $('#snize_results').removeClass('snize-pages');
          
          $('.snize-description').each(function() {
            var oldDescription = $(this).text();
            var newDescription = (oldDescription).split('<');
            $(this).text(newDescription[0]);
          });
        }
      }
      
        
    });    
  });

  var target = document.querySelector('.snize-results-page .page__content');
  
  observer.observe(target, { subtree: true, childList: true });
}


 /***********************************
 * Yucalm subscribe auto select 
 ***********************************/
//   if(window.location.href.indexOf("yucalm-landing") > -1) {
    
//     var observer = new MutationObserver(function(mutations) {
//       mutations.forEach(function(mutationRecord) {
//         $('.rc_label__autodeliver').trigger('click'); 
//       });    
//     });

//     var target = document.getElementById('rc_container');
//     observer.observe(target, { attributes : true, attributeFilter : ['style'] });
//   }

/***********************************
 * Display order summary by default
 ***********************************/
if (window.location.href.indexOf("checkout") > -1) {
  if (Shopify.Checkout.step === "contact_information") {
        Checkout.$('[data-drawer-toggle="[data-order-summary]"]').click();
    };
}

/***********************************
 * Remove related posts placeholder if empty
 ***********************************/

var $remover = $('.js-remove-paragraph');
var $container = $remover.parent();
$remover.remove();

if ($container.text().trim().length == 0) {
  $container.remove();
}

/***********************************
 * Article v2 sticky sidebar
 ***********************************/

$(document).ready(function(event) {
  var $win = $(window);
  var stickyTopClass = 'sticky-top';
  var stickyBottomClass = 'sticky-bot';
  var $sidebar = $('.article-v2 .article__aside-inner');
  var $sidebarContainer = $sidebar.parent();
  var startPoint = $sidebarContainer.offset().top;
  var endPoint = $sidebarContainer.outerHeight() + startPoint;
  var headerHeight = $('.header').outerHeight();
  var headerSpacing = 20;
  var sidebarHeight = $sidebar.outerHeight();
  var sidebarBottom = sidebarHeight + headerHeight + headerSpacing;

  function handleStickySidebar(scroll) {
    isStickyTop = scroll + headerHeight + headerSpacing >= startPoint
    isStickyBottom = scroll + sidebarBottom >= $sidebarContainer.outerHeight() + startPoint;

    if (isStickyBottom && isStickyTop) {
      $sidebar.addClass(stickyBottomClass)
      $sidebar.removeClass(stickyTopClass)
    }
    else if (isStickyTop) {
      $sidebar.addClass(stickyTopClass)
      $sidebar.removeClass(stickyBottomClass)
    }
    else {
      $sidebar.removeClass(stickyTopClass)
      $sidebar.removeClass(stickyBottomClass)
    }
  }

  function setFixedParams() {
    $sidebar.css('left', $sidebarContainer.offset().left + 'px');
    $sidebar.css('top', headerHeight + headerSpacing + 'px');
  }

  // Set initial position before scroll
  var scroll = $win.scrollTop();
  handleStickySidebar(scroll)
  setFixedParams();


  $win.on('scroll', function(event) {
    var scroll = $win.scrollTop();

    handleStickySidebar(scroll)
  });

  $win.on('resize', function(event) {
    startPoint = $sidebarContainer.offset().top;
    endPoint = $sidebarContainer.outerHeight() + startPoint;
    headerHeight = $('.header').outerHeight();
    headerSpacing = 20;
    sidebarHeight = $sidebar.outerHeight();
    sidebarBottom = sidebarHeight + headerHeight + headerSpacing;

    setFixedParams();
  });
});