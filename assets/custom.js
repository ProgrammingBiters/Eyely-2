$(document).ready(function(){
  $(".qty-select").change(function(e){
    e.preventDefault();
    var newval=parseInt($(this).val());
    
    var i=$(this).data("cartitem-index");
    updateQty(newval,i);
    if(newval == 10){
    $("#qty-num-"+i).removeClass("visually-hidden");
    $("#qty-select-"+i).addClass("visually-hidden");
    $("#qty-num-"+i).val("10");
    }
    else{
      $("#qty-num-"+i).addClass("visually-hidden");
      $("#qty-select-"+i).removeClass("visually-hidden");
    }
    });
    function updateQty(newval,i){
      $.ajax({
        url: "/cart/change.js",
        data: { quantity: newval, line: i },
        dataType: "json",
        success: function (data, status, xhr) {
      console.log(data.items);
      $(data.items).each(function(index,d){
        var vv=index+1;
    
      if(i == vv){
        var el=$(".price-"+i);
        $(el).each(function(){
          $(this).html(Shopify.formatMoney(d.final_line_price, window.money));
        });
      
      }
      })
      $("#Quantity-"+i).val(newval);
      $(".upsell-custom-regular-price").html(Shopify.formatMoney(data.total_price, window.money));
        }
      });
    
    }
    $(".qty-num-new").change(function(e){
      e.preventDefault();
      var i=$(this).data("cartitem-index");
      var v=$(this).val();
      if(v.match(/^\d+$/)) {
        // your code here
    v=parseInt($(this).val());
    
    updateQty(v,i);
    if(v >= 10){
      $("#qty-num-"+i).removeClass("visually-hidden");
      $("#qty-select-"+i).addClass("visually-hidden");
      }
      else{
        $("#qty-num-"+i).addClass("visually-hidden");
        $("#qty-select-"+i).removeClass("visually-hidden");
        $("#qty-select-"+i).val(v);
      }
    }
    else{
    $(this).focus();
    $(this).val(10);
    updateQty(10,i);
    }
    });

        $(".review-wrap").slice(0, 1).show();
    $(".mobile_btn").on("click", function(e){
        e.preventDefault();
        console.log("hii");
       $(".review-wrap:hidden").slice(0, 1).slideDown();
        if($(".review-wrap:hidden").length == 0) {
          $(".mobile_btn").fadeOut("slow");
        }
      });
      $(".tab-detail").click(function(){
        $(this).toggleClass("active");
        $(this).next().slideToggle();
      });
      $(".see-details").click(function(){
        $('html, body').animate({
          scrollTop: $("#moneyback-content").offset().top
      }, 2000);
 

      });
      // $(".list-menu li").mouseenter(function(){
      //   var test = $(this).find("details").attr("open","open");
      // });
      // $(".list-menu li").mouseout(function(){
      //   $(this).find("details").attr();
      //   console.log("Called!");
      // });

      $(".more-color").click(function(e){
        e.preventDefault();
        $(this).parent().toggleClass("more-view");
        $(this).toggleClass("minus");
        $(this).toggleClass("plus");
        var pid=$(this).data("prd-id");
        $(".review-"+pid).toggleClass("d-none");
        $(".title-"+pid).toggleClass("d-none");
      });
      //Swatch-item Js   start

      $(".c-item").click(function(e){
        e.preventDefault();
        var fg=false;
        var vid=$(this).data("v-id");
        var u=$(this).data("prd-url");
        var pid=$(this).data("p-id");
        var prgrid=$("#prd-"+pid).find(".v-img");
        $(prgrid).each(function(){
          if( $("."+vid).hasClass("show") ){
            fg=true;
          }else{
            $(this).removeClass("show");

          }
          });     
       $("."+vid).toggleClass("show");

        var oth=$(this).siblings('button');
        var c=$(this).find('img');
        
        $(oth).each(function(){
            $(this).find("img").removeClass("active");
         });
       
          $(this).find("img").toggleClass("active");
       
         if(fg){  
            var m=u.split("?");
            $(".prd-link-"+pid).attr("href",m[0]);  
            $(".prd-img-link-"+pid).attr("href",m[0]);
         }else{
          $(".prd-link-"+pid).attr("href",u);
          $(".prd-img-link-"+pid).attr("href",u);
         }

      });
    //Swatch-item Js end
$(".filter-open").click(function(e){
e.preventDefault();
$("#main-collection-filters").toggleClass("active");

});
$(".close-filter").click(function(e){
  e.preventDefault();
  $("#main-collection-filters").toggleClass("active");
  
  });
       $(".shop-by-color-item").slice(0, 2).show();
      $(".shop-by-color-link").on("click", function(e){
        e.preventDefault();
        $(".shop-by-color-item:hidden").slice(0, 2).slideDown();
        if($(".shop-by-color-item:hidden").length == 0) {
           $(".shop-by-color-link").fadeOut("slow");
        }
      });
      var month = $("#month-data").val();
      var day = $("#days-data").val();
      var year = $("#year-data").val();
      console.log(year);
      if(year != undefined){
        var now = new Date();
        $(".timer_wrap").css("display","inline-flex");
        var nextyear = month + '/' + day + '/' + year + ' 00:00:00';
        console.log(nextyear);
        setTimeout(function(){
          $('#example').countdown({
            date: nextyear, // TODO Date format: 07/27/2017 17:00:00
            offset: -5, // TODO Your Timezone Offset
            day: 'Day',
            days: 'Days',
            hideOnComplete: true
          }, function (container) {
             $(".timer_wrap").css("display","none");
       
          });
  

        },3000);
  

      } 
      $(".faq_questions").on("click", function() {
      if ($(this).hasClass("active")) { 
        $(this).siblings(".faq_answer").slideUp(500);
         $("i").removeClass("fa-angle-up").addClass("fa-angle-down");
   
        $(this).removeClass("active");
          $(this).next(".faq_answer").removeClass("active");
        
          } else {
        $("i").removeClass("fa-angle-up").addClass("fa-angle-down");
        $(this).find("i").removeClass("fa-angle-down").addClass("fa-angle-up");
        $(".faq_questions").removeClass("active");
        $(".faq_answer").slideUp(500);
        
        $(this).addClass("active");
        $(this).next(".faq_answer").addClass('active');
        $(this).next(".faq_answer").slideDown(500);
      }
    });     
  });   
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl,{
      customClass : 'swatch-tooltip shadow'
    })
  })

  function openPopup(pageName){
    $('body').addClass('static-page-popup');
    $(".popup-content-loader").show();
    $(".light-page-popup").addClass('light-popup');
    $(".guid-popup").hide();
    //$("#boxtxt").load('/pages/'+pageName);
    //$("."+className).show();
      // $(".lighting-static-popups").load('/pages/'+pageName, function(){
      //$(".popup-content-loader").hide();
      // });
        $.ajax({
    url:'/pages/'+pageName,
    type:'GET',
    dataType : 'json',
    success: function(data){
    console.log(data.page.body_html );
    //console.log("Data Object",data);
  //     var content = $(data).find('#site-main');
  //    console.log("content",content);
    $("#boxtxt").html(data.page.body_html);
    }
  });
  }

  $(".modal-light-close").on('click', function(){
    $('body').removeClass('static-page-popup');
    $(".light-page-popup").removeClass('light-popup');
    $(".guid-popup").hide();
    $(".lighting-static-popups").empty();
  });
  
  $(".modal-size-close").on('click', function(){
    $('body').removeClass('static-page-popup');
    $(".size-popup").removeClass('light-popup');
    $(".guid-popup").hide();
  });

  // collection loadmore
  function isVisible($el) {
    var winTop = $(window).scrollTop();
    var winBottom = winTop + $(window).height();
    var elTop = $el.offset().top;
    var elBottom = elTop + $el.height();
    return ((elBottom<= winBottom) && (elTop >= winTop));
  }
    let triggered = false;
  
    function ScrollExecute() {
      let moreButon = $('#more');
      let nextUrl = $(moreButon).find('a').attr("href");
      let loader=$(".loader-div");
      if ((triggered == false) && nextUrl != undefined && isVisible(loader)) {
           
          $(moreButon).remove();
  
          triggered = true;
          $.ajax({url: nextUrl,
            dataType: "html",
            success: function (data, status, xhr) {// success callback function
                              console.log(data);
                              $(loader).remove();
  
                              $('#product-grid').append($(data).find('#product-grid').html());
                              triggered = false;
                            
                              //            $(".loader-div").toggleClass("hide");
                              var api = new Yotpo.API(yotpo);
                              api.refreshWidgets();
                              $(".c-item").click(function(e){
        
                                e.preventDefault();
                                var fg=false;
                                var vid=$(this).data("v-id");
                                var u=$(this).data("prd-url");
                                var pid=$(this).data("p-id");
                                var prgrid=$("#prd-"+pid).find(".v-img");
                                $(prgrid).each(function(){
                                  if( $("."+vid).hasClass("show") ){
                                    fg=true;
                                  }else{
                                    $(this).removeClass("show");
                        
                                  }
                                  });     
                               $("."+vid).toggleClass("show");
                        
                                var oth=$(this).siblings('button');
                                var c=$(this).find('img');
                                
                                $(oth).each(function(){
                                    $(this).find("img").removeClass("active");
                                 });
                               
                                  $(this).find("img").toggleClass("active");
                               
                                 if(fg){  
                                    var m=u.split("?");
                                    $(".prd-link-"+pid).attr("href",m[0]);  
                                    $(".prd-img-link-"+pid).attr("href",m[0]);
                                 }else{
                                  $(".prd-link-"+pid).attr("href",u);
                                  $(".prd-img-link-"+pid).attr("href",u);
                                 }
                        
                              });
                              $(".more-color").click(function(e){
                                e.preventDefault();
                                $(this).parent().toggleClass("more-view");
                                $(this).toggleClass("minus");
                                $(this).toggleClass("plus");
                                var pid=$(this).data("prd-id");
                                $(".review-"+pid).toggleClass("d-none");
                                $(".title-"+pid).toggleClass("d-none");
                              });
                    }
                  });
        
         

        
      }
    }
              
    $(document).ready(function () {
      $(window).scroll(function(){
        //  ScrollExecute();
       }); 
       $('.product-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.pro-nav-ul',
              adaptiveHeight:true
     
      });
       $('.pro-nav-ul').slick({
        slidesToShow: 8,
        slidesToScroll: 1,
        asNavFor: '.product-slider',
        dots: false,
        focusOnSelect: true,
        vertical:true,
        arrows:true,
         cssEase: 'linear',
         speed: 1000,
        prevArrow:"<button type='button' class='slick-prev'><i class='fa fa-angle-up' aria-hidden='true'></i></button>",
        nextArrow:"<button type='button' class='slick-next'><i class='fa fa-angle-down' aria-hidden='true'></i></button>",
          responsive: [
         {
           breakpoint: 768,
           settings: {
             vertical:false,
             slidesToShow:5,
             slidesToScroll: 1,
                arrows:true,
              prevArrow:"<button type='button' class='slick-prev'><i class='fa fa-angle-left' aria-hidden='true'></i></button>",
        nextArrow:"<button type='button' class='slick-next'><i class='fa fa-angle-right' aria-hidden='true'></i></button>",
         speed: 300, 
             cssEase: 'ease'
           }
         },
            {
           breakpoint: 720,
           settings: {
             vertical:false,
             slidesToShow:6,
             slidesToScroll: 1,
                arrows:true,
           speed: 300,
              prevArrow:"<button type='button' class='slick-prev'><i class='fa fa-angle-left' aria-hidden='true'></i></button>",
        nextArrow:"<button type='button' class='slick-next'><i class='fa fa-angle-right' aria-hidden='true'></i></button>", 
             cssEase: 'ease'
           }
         },
         {
           breakpoint: 600,
           settings: {
             vertical:false,
             slidesToShow: 5,
             slidesToScroll: 1,
             arrows:true,
             prevArrow:"<button type='button' class='slick-prev'><i class='fa fa-angle-left' aria-hidden='true'></i></button>",
              nextArrow:"<button type='button' class='slick-next'><i class='fa fa-angle-right' aria-hidden='true'></i></button>",
          speed: 300, 
             cssEase: 'ease'
     
           }
         },
             {
           breakpoint: 500,
           settings: {
             vertical:false,
             slidesToShow:4,
             slidesToScroll: 1,
             arrows:true,
             prevArrow:"<button type='button' class='slick-prev'><i class='fa fa-angle-left' aria-hidden='true'></i></button>",
             nextArrow:"<button type='button' class='slick-next'><i class='fa fa-angle-right' aria-hidden='true'></i></button>",
            speed: 300
           }
         },
         {
           breakpoint: 480,
           settings: {
             vertical:false,
             slidesToShow: 4,
             slidesToScroll: 1,
             arrows:true,
              speed: 300,
             prevArrow:"<button type='button' class='slick-prev'><i class='fa fa-angle-left' aria-hidden='true'></i></button>",
            nextArrow:"<button type='button' class='slick-next'><i class='fa fa-angle-right' aria-hidden='true'></i></button>"
           }
         }
         
       ]
     
      });
      $('.e-slider').slick({
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        dots:false,
        responsive: [
          {
            breakpoint: 1199,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 1,
              infinite: true,
              dots: false,
              arrows:true
            }
          },
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              infinite: true,
              dots: false,
              arrows:true
            }
          },
          {
            breakpoint: 480,
            settings: 'unslick'
          }
        ]
    
      });         
     });