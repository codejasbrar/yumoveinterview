
             		function updateCartContent() {
						$.ajax({
							url: '/cart'
						}).done(function(response) {
							var $count = $(response).find('.nav-access .count');
							var $formNew = $(response).find('.section-cart form');
							var $formBodyNew = $formNew.find('.form__content');
							var $totalNew = $formNew.find('.form__aside-total .price');
							var $cart = $('.section-cart .form--cart');
							var $cartContent = $cart.find('.form__content');
							var $total = $cart.find('.form__aside-total .price');
							var $cartPopup = $('.cart__wrapper');
							var $cartPopupForm = $cartPopup.find('form');
							var $cartPopupFormBody = $cartPopupForm.find('.form__content');
							console.log($count);
							$('.form__aside-total .price').each(function() {
								$(this).html($totalNew.html());
							});
							$('.cart-trigger-js .count').text($count.text());
                            var count_txt = $('.mobile-cart-container .count').html();
                            if(count_txt == 0){
                            	$('.mobile-cart-container .count').hide();
                            }
                            else{
                            	$('.mobile-cart-container .count').show();
                            }
                          
							if ($cartContent.length == 0) {
								$cartPopupFormBody.html($formBodyNew.html());
							} else {
								$cartContent.html($formBodyNew.html());
							}
                            selectCrossSell();
						});
					}
function addAllItems(array){
	Shopify.queue = [];
	  var quantity = 0 ;
    var add_qty = $(".bundle_quantity").data("bundle_quantity");
	  var newArray = array.split(',');
	  for (var i = 0; i < newArray.length; i++) {
	    product = newArray[i]
	    Shopify.queue.push({
	      variantId: product,
	    });
          }
	  Shopify.moveAlong = function() {
	  // If we still have requests in the queue, let's process the next one.
	  if (Shopify.queue.length) {
	    var request = Shopify.queue.shift();
	    var data = 'id='+ request.variantId + '&quantity='+1;
		var $html = $('html');
		var $body = $('body');
	    $.ajax({
	      type: 'POST',
              url: '/cart/add.js',
	      dataType: 'json',
	      data: data,
	      success: function(res){
	        Shopify.moveAlong();
    		quantity += 1;
            $(".upsell_product").show();
			updateCartContent();
			$body.addClass('cart-expanded');
			$html.addClass('cart-expanded');
		//	console.log('add to cart form ' +  serializeForm);
			/***** Dy event for engagment with ajax cart *****/
			DY.API( 'event',{name: 'ajax_cart_open', properties:{ajax_cart: open}})
	     },
         error: function(){
	     // if it's not last one Move Along else update the cart number with the current quantity
		  if (Shopify.queue.length){
		    Shopify.moveAlong()
		  } else {
                  console.log("quantity_add_qty=>",quantity)

		    $('#cart-number').replaceWith('<a href="cart" id="cart-number">View cart ("'+ quantity + '") Items</a>');
		  }
	      }
           });
        }
	 // If the queue is empty, we add 1 to cart
	else {
	  quantity += 1;
      console.log("add_qtyadd_qty=>",quantity)
	  addToCartOk(quantity);
	 }
       };
    Shopify.moveAlong();
  };

  function addToCartOk(quantity){  
	$('#cart-number').replaceWith('<a href="/cart" id="cart-number">View cart ("' + quantity + '") Items</a>');
} 