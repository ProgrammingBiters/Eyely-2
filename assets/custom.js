$(document).ready(function(){
    $(".review-wrap").slice(0, 1).show();
    $(".mobile_btn").on("click", function(e){
        e.preventDefault();
        console.log("hii");
       $(".review-wrap:hidden").slice(0, 1).slideDown();
        if($(".review-wrap:hidden").length == 0) {
          $(".mobile_btn").fadeOut("slow");
        }
      });
      $(".more-color").click(function(e){
        e.preventDefault();
        $(this).parent().toggleClass("more-view");
        $(this).toggleClass("minus");
        $(this).toggleClass("plus");
      });
      $(".c-item").click(function(e){
        
        e.preventDefault();
        var pid=$(this).data("p-id");
       var prgrid=$("#prd-"+pid).find(".v-img");
       $(prgrid).each(function(){
        $(this).removeClass("show");

       });
        var oth=$(this).siblings('button');
        $(oth).each(function(){
          $(this).find("img").removeClass("active");
        });
        $(this).find("img").toggleClass("active");
        var vid=$(this).data("v-id");
        $("."+vid).toggleClass("show");
        
      });
      $(".c-item").hover(function(e){
        
        e.preventDefault();
        var pid=$(this).data("p-id");
       var prgrid=$(pid).find("img");
       $(prgrid).each(function(){
        $(this).removeClass("show");

       });
        var oth=$(this).siblings('button');
        $(oth).each(function(){
          $(this).find("img").removeClass("active");
        });
        $(this).find("img").toggleClass("active");
        var vid=$(this).data("v-id");
        $("."+vid).toggleClass("show");
        
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