function addAllItems(array){
	Shopify.queue = [];
	  var quantity = 3 ;
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
	    var data = 'id='+ request.variantId + '&quantity='+1
	    $.ajax({
	      type: 'POST',
              url: '/cart/add.js',
	      dataType: 'json',
	      data: data,
	      success: function(res){
	        Shopify.moveAlong();
    		quantity += 1;
            $(".upsell_product").show();
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