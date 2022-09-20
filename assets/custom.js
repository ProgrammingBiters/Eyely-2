
var myVar;    
function showTime(){



  $(".c-item").click(function(e){
    e.preventDefault();


    if($(this).hasClass("disabled-item")){}else{
      var fg=false;
      var vid=$(this).data("v-id");
      var u=$(this).data("prd-url");
      var pid=$(this).data("p-id");
      var prgrid=$("#prd-"+pid).find(".v-img");
      $(prgrid).each(function(){
        $(this).removeClass("show");
      });     
      $("."+vid).addClass("show");
      var oth=$(this).siblings('button');
      var c=$(this).find('img');

      $(oth).each(function(){
        $(this).find("img").removeClass("active");
      });

      $(this).find("img").addClass("active");
    }

  });

  $(".more-color").click(function(e){
    e.preventDefault();
    console.log("hii");
    var pp=$(this).parent();                                             
    if($(pp).hasClass("more-view")){
      $(pp).removeClass("more-view");
    }
    else{
      $(pp).addClass("more-view");
    }
    if($(this).hasClass("minus")){
      $(this).removeClass("minus");
      $(this).addClass("plus"); 
    }else{
      $(this).removeClass("plus");
      $(this).addClass("minus");
    }
    var pid=$(this).data("prd-id");
    if($(".review-"+pid).hasClass("d-none")){
      $(".review-"+pid).removeClass("d-none");
    }else{
      $(".review-"+pid).addClass("d-none");
    }
    if($(".title-"+pid).hasClass("d-none")){
      $(".title-"+pid).removeClass("d-none");
    }else{
      $(".title-"+pid).addClass("d-none");
    }
  });

}

function stopFunction(){
  clearInterval(myVar); // stop the timer
}
$(document).ready(function(){

  myVar = setInterval("showTime()", 500);
  setTimeout(function(){
    stopFunction();
    console.log("stop js");
  },9000);

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
  $(".size-guide-link").click(function(){
    var data=$(".size-content").html();
    $(".modal.size-popup .modal-content").html(data);
    $(".modal.size-popup").addClass("light-popup");
  });

  var v=$("#template").val();


  $(".filter-open").click(function(e){
    e.preventDefault();
    $("#main-collection-filters").toggleClass("active");

  });
  $(".sort-open").click(function(e){
    e.preventDefault();
    $(".sort-by-mobile-wrapper").toggleClass("active");
  });
  $(".utils-sortby--modal-button").click(function(e){

    e.preventDefault();
    $(".sort-by-mobile-wrapper").toggleClass("active"); 
    var v=$(this).val();
    console.log(v);
    Shopify.queryParams.sort_by = v;
    location.search = new URLSearchParams(Shopify.queryParams).toString();
  });
  $(".sort-close").click(function(e){
    e.preventDefault();
    $(".sort-by-mobile-wrapper").toggleClass("active");  
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
  var t_wrap=$(".timer_wrap_new");
  if(t_wrap != undefined){
    var i,y,m,d1,h,n;
    setTimeout(function(){
      $(t_wrap).each(function(i,d){
        i="#"+$(d).data("id");
        y=$(d).data("y");
        m=$(d).data("m");
        d1=$(d).data("d");
        h=$(d).data("h");

       var myDate=new Date();
    myDate.setDate(myDate.getDate());
    // format a date
         var n =  ("0" + (myDate.getMonth() + 1)).slice(-2) + '/' +  myDate.getDate() + '/' + myDate.getFullYear() + ' '+'23:59:00';
  console.log(n + " " + myDate.getTime());
 

        $(i).css("display","block");
        console.log(n);
        $(i).countdown({
          date: n, // TODO Date format: 07/27/2017 17:00:00
          offset: -5, // TODO Your Timezone Offset
          day: 'Day',
          days: 'Days',
          hideOnComplete: true
        }, function (container) {
          $(d).css("display","none");
        });


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

$(document).ready(function () {


  $(".live-search-form-field").focusout(function(){
    console.log("hii");
    $(".box-results").css("display","none");
  });

  $('div[itemprop="aggregateRating"]').hide();    
  setTimeout(() => {
             console.log("this is the first message")
  $(".yotpo-nav-tab:first-child").hide();
}, 6000);
  
$(".content").slice(0, 4).show();
  $(".content1").slice(0,4).show();
 $(".content2").slice(0,4).show();
$("#loadMore").on("click", function(e){
  e.preventDefault();
  $(".content:hidden").slice(0, 2).slideDown();
  if($(".content:hidden").length == 0) {
    //       $("#loadMore").text("No Content").addClass("noContent");
    $("#loadMore").fadeOut("slow");
  }
});
// $("#loadMore1").on("click", function(e){
//   e.preventDefault();
//   $(".content1:hidden").slice(0, 2).slideDown();
//   if($(".content1:hidden").length == 0) {
   
//     $("#loadMore1").fadeOut("slow");
//   }
// });
//   $("#loadMore2").on("click", function(e){
//   e.preventDefault();
//   $(".content2:hidden").slice(0, 2).slideDown();
//   if($(".content2:hidden").length == 0) {
   
//     $("#loadMore2").fadeOut("slow");
//   }
// });
$('.mailing-list__form-input').focusin(function(){
  $(".n-email").css("opacity","1");
});
$('body').focusout(function(){
  $(".n-email").css("opacity","0");
});
$(".filter-item--toggle-more").click(function(e){
  e.preventDefault();
  var t=$(this).find("a").text();
  var t1=t.replace(/^\s+|\s+$/gm,'');

  if(t1 == "See more")
  {
    $(this).find("a").text("See less");
    var p=$(this).parent();
    var links_child= $(p).find("li");
    $(links_child).each(function(){
      $(this).removeClass("filter-item--hidden");
    });
  }else{
    $(this).find("a").text("See more");
    var p=$(this).parent();
    var links_child= $(p).find("li");
    $(links_child).each(function(i,data){
      if(i>5){
        $(this).addClass("filter-item--hidden");
      }
    });
    $(this).removeClass("filter-item--hidden");
  }


});


  
//  load more btn
   $(".content").slice(0, 8).show();
  $("#loadMore-blog-grid").on("click", function(e){
    e.preventDefault();
    $(".content:hidden").slice(0, 8).slideDown();
    if($(".content:hidden").length == 0) {
//       $("#loadMore-blog-grid").text("No Content").addClass("noContent");
       $("#loadMore-blog-grid").fadeOut("slow");
    }
  });
  
});


