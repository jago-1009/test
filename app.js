import { checkColors } from "./lib/color-checker.js";
let dark = "#2e2e2e";
let light = "#fffff0";
let isDark = true;
let rotation = 0;
let isOn = false;
function initListeners() {
  $("#scrollBar").css("height", `${$(document.body).height()}px`);
  $("#scrollBackground").css("height", `${$(document.body).height()}px`);
  $("#color").val($(":root").css("--main-color"));
  
}
$(window).scroll(function () {
  const windowHeight = $(window).height();
  const scrollTop = $(window).scrollTop();
  const scrollHeight = $(document).height() - $(window).height();
  const scrollRatio = scrollTop / scrollHeight;
  const windowWidth = $(window).width();
  const halfWaypoint = (windowWidth / 2);
  
 
  $(".left").each(function () {
    const boxPosition = $(this).offset().left;
    switch (windowWidth) {
      case windowWidth < 600:
        if (boxPosition > (windowWidth / 1.5)) {
          $(this).hide();
        }
        else {
          $(this).show();
        }
        break;
      case windowWidth < 400:
        if (boxPosition > (windowWidth / 1.4)) {
          $(this).hide();
        }
        else {
          $(this).show();
        }
        break;
      default:
        if (boxPosition >= halfWaypoint ) {
          $(this).css("opacity", `0`);
        }
        else {
          $(this).css("opacity", `1`);
        }
      }
    })
   
   
  
  
  
  const boxHeight = $("#scrollTest").outerHeight();

  const thumbPosition = scrollRatio * (windowHeight - boxHeight);

  $("#scrollTest").css("top", `calc(${thumbPosition}px + 10px)`);
});
$(window).resize(function () {
  const windowWidth = $(window).width();
  const halfWaypoint = windowWidth / 1.5;
  $(".left").each(function () {
    const boxPosition = $(this).position().left;
    if (boxPosition > halfWaypoint) {
      $(this).css("opacity", `0`);
    }
  })
});

function getScrollbarThumbPosition(element) {
  const scrollTop = element.scrollTop;
  const scrollHeight = element.scrollHeight;
  const clientHeight = element.clientHeight;

  const thumbPosition = (scrollTop / (scrollHeight - clientHeight)) * 100;

  return thumbPosition;
}
/* The `console.log(w)` statement is logging the value of the variable `w` to the console. In this
case, `w` is the current scroll position of the window, which is being updated whenever the
window is scrolled. This can be helpful for debugging and monitoring the scroll behavior of the
webpage. */
function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}
function getLuminance(obj) {
  brightness = (299 * obj.r + 587 * obj.g + 114 * obj.b) / 1000;
  return brightness;
}
function contrast(color, background) {
  let colorSend = color.slice(1);
  let backgroundSend = background.slice(1);
  // console.log(`${colorSend} ${backgroundSend}`)
  const response = checkColors(colorSend, backgroundSend);
  let ratio = response.contrast;
  return ratio;
}
$("#color").on("input", (e) => {
  let color = e.target.value;
  setColor(color);
});
function setColor(color) {
  var background = $(":root").css("--background");

  let contrastRatio = contrast(color, background);
  console.log(contrastRatio);
  if (contrastRatio < 7.5) {
    if (isDark == true) {
      $(":root").get(0).style.setProperty("--background", light);
      isDark = false;
    } else {
      $(":root").get(0).style.setProperty("--background", dark);
      isDark = true;
    }
  }
  return $(":root").get(0).style.setProperty("--main-color", color);
}
$(".colorBtn").on("click", (e) => {
  let color = e.target.value;
  setColor(color);
  $("#color").val(color);
});
$('#lever').on("click", function (e) {
  const $leverOn = $('#leverHeadOn');
  const $leverOff = $('#leverHeadOff');
  const $pageCover = $('#pageCover');
  isOn = !isOn;
  console.log(isOn)
  if (!isOn) {
    $leverOff.addClass("lever-switch-reverse")
      $leverOn.css("display", "none");
      $leverOff.css("display", "block");
      setTimeout(() => {
        $('#steam').removeClass('steam-anim')
      }, 500)
      setTimeout(() => {
        $pageCover.removeClass("flicker");
        $pageCover.addClass("flicker-reverse");
      }, 1000)
      
    
  }
  else {
    window.scrollTo(0, 0)
    $leverOn.addClass("lever-switch");
    $leverOn.css("display", "block");
    $leverOff.css("display", "none");
    
    setTimeout(() => {
      
      $('#steam').addClass('steam-anim')
     
      $("#lever").removeClass('fixed')
      $("#whistle-anim").removeClass('fixed')
      
    }, 500)
    setTimeout(() => {
      $pageCover.css('animation-play-state', 'running');
      $pageCover.removeClass("flicker-reverse");
      $pageCover.addClass("flicker");
    }, 1000)
    setTimeout(() => {
      $pageCover.css('display', 'none');
    }, 2000)
  }

})
$("#gear").on("click", function (e) {
  const $gear = $(this);
  rotation += 360;
  // Reset the rotation angle to 0 for each click

  // Rotate the gear
  $gear.animate(
    { deg: rotation },
    {
      duration: 1200,
      step: function (now) {
        $gear.css({ transform: `rotate(${now}deg)` });
      },
      complete: function () {
        if (rotation % 720 == 0) {
          $(".pour-right").animate(
            { right: "-250px" },
            1000,
            
            function () {
              $(".pour-right").css( "right", "280px");
            }
          );
          $(".pour-left").animate({ left: "-290px" }, 1000, function () {
            $(".pour-left").css( "left", "200px");
          });
        } else {
          $(".pour-right").animate({ right: "40%" }, 1000);
          $(".pour-left").animate({ left: "-40%" }, 1000);
          $('.pour-right').removeAttr("style");
        }
      },
    }
  );
});
$(document).ready(function() {
  $(".animation").each(function () {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log('is intersecting');
          $(entry.target).removeClass("run");
        } else {
          $(entry.target).addClass("run");
        }
      });
    });
    observer.observe(this);
  });
});

$(document).ready(function () {
  initListeners();
})