import { checkColors } from "./lib/color-checker.js";
let dark = "#1B1F24";
let light = "#ffffff";
let isDark = true;
let rotation = 0;
let isOn = false;
const projects = ["project1", "project2", "project3"];
const projectTitle = ['EPortfolio Administrator Interface', 'Attack of the Front End Web Developer', 'ArmorCoach']
const projectDesc = ["An Adminstrator Interface for IU Indianapolis' ePortfolio Showcase.", "A short story to learn how to use the Svelte Library along with Sveltekit.", "A website for Historical Fencing academies to assign group orders for their students."]
const projectLinks = {
  project1: {
    live:"",
    github:""
  },
  project2: {
    live:"https://google.com",
    github:"https://google.com"
  },
  project3: {
    live:"https://google.com",
    github:"https://google.com"
  },
}
function initListeners() {
  $("#scrollBar").css("height", `${$(document.body).height()}px`);
  $("#scrollBackground").css("height", `${$(document.body).height()}px`);
  $("#color").val($(":root").css("--main-color"));
  $("#grid").hide();
  $("#icon-github").on('click', function (e) { 
    
    $('#link-github')[0].click()
   })
  $("#icon-live").on('click', function (e) { 
    
    $('#link-live')[0].click()
  
   })
}
$(window).scroll(function () {
  const windowHeight = $(window).height();
  const scrollTop = $(window).scrollTop();
  const scrollHeight = $(document).height() - $(window).height();
  const scrollRatio = scrollTop / scrollHeight;
  const windowWidth = $(window).width();
  const halfWaypoint = windowWidth / 2;

  $(".left").each(function () {
    const boxPosition = $(this).offset().left;
    switch (windowWidth) {
      case windowWidth < 600:
        if (boxPosition > windowWidth / 1.5) {
          $(this).hide();
        } else {
          $(this).show();
        }
        break;
      case windowWidth < 400:
        if (boxPosition > windowWidth / 1.4) {
          $(this).hide();
        } else {
          $(this).show();
        }
        break;
      default:
        if (boxPosition >= halfWaypoint) {
          $(this).css("opacity", `0`);
        } else {
          $(this).css("opacity", `1`);
        }
    }
  });

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
  });
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
  // console.log(contrastRatio);
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
$(".lever-body").on("click", function (e) {
  const $pageCover = $("#pageCover");

  $("#leverHead").addClass("lever-switch");
  $("#leverHandle").addClass("lever-switch");

  
  setTimeout(() => {
    $("#lever").css("display", "none");
  }, 2000);

  window.scrollTo(0, 0);

  setTimeout(() => {
    $("#steam").addClass("steam-anim");

    $("#lever").removeClass("fixed");
    $("#whistle-anim").removeClass("fixed");
  }, 500);
  setTimeout(() => {
    $pageCover.css("animation-play-state", "running");
    $pageCover.removeClass("flicker-reverse");
    $pageCover.addClass("flicker");
  }, 1000);
  setTimeout(() => {
    $pageCover.css("display", "none");
  }, 2000);
});
$("#gridBtn").on("click", function (e) {
  $(".pour-right").animate({ right: "50%" }, 1000);
  $(".pour-left").animate({ left: "-50%" }, 1000);
  $(".pour-right").removeAttr("style");
});
$("#carouselBtn").on("click", function (e) {  $(".pour-right").animate({ right: "-200px" }, 1000, function () {
  $(".pour-right").css("right", "200px");
});
$(".pour-left").animate({ left: "-290px" }, 1000, function () {
  $(".pour-left").css("left", "200px");
});
 
});
$(document).ready(function () {
  
  $(".animation").each(function () {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // console.log('is intersecting');
            $(entry.target).removeClass("run");
          } else {
            $(entry.target).addClass("run");
          }
        });
      },
      { rootMargin: "200px 0px 0px 0px" }
    );
    observer.observe(this);
  });
});
$("#chevron-left").on("click", function (e) {
  let leftSlideNum;
  let rightSlideNum;
  let leftSlide;
  let rightSlide;
  var slides = $(".project");
  slides.each(function (index) {
    var slide = $(this);
    if (slide.attr("id") == "center") {
      slide.removeAttr("id");

      console.log(slide);
      let currentSlide = $(slide).attr("project-label");
      let currentIndex = projects.indexOf(currentSlide);

      if (currentIndex == -1) {
        currentIndex = 2;
      }
      console.log(currentIndex);
      if (currentIndex - 1 < 0) {
        leftSlideNum = 2;
      } else {
        leftSlideNum = currentIndex - 1;
      }
      if (currentIndex + 1 > 2) {
        rightSlideNum = 0;
      } else {
        rightSlideNum = currentIndex + 1;
      }
      leftSlide = $(`.${projects[leftSlideNum]}`);
      rightSlide = $(`.${projects[rightSlideNum]}`);
      // console.log(leftSlide)
    }
  });
  leftSlide.attr("id", "center");
  // console.log(rightSlide)
  return initCarousel();
});
$("#chevron-right").on("click", function (e) {
  let leftSlideNum;
  let rightSlideNum;
  let leftSlide;
  let rightSlide;
  var slides = $(".project");
  slides.each(function (index) {
    var slide = $(this);
    if (slide.attr("id") == "center") {
      slide.removeAttr("id");

      console.log(slide);
      let currentSlide = $(slide).attr("project-label");
      let currentIndex = projects.indexOf(currentSlide);

      if (currentIndex == -1) {
        currentIndex = 2;
      }
      console.log(currentIndex);
      if (currentIndex - 1 < 0) {
        leftSlideNum = 2;
      } else {
        leftSlideNum = currentIndex - 1;
      }
      if (currentIndex + 1 > 2) {
        rightSlideNum = 0;
      } else {
        rightSlideNum = currentIndex + 1;
      }
      leftSlide = $(`.${projects[leftSlideNum]}`);
      rightSlide = $(`.${projects[rightSlideNum]}`);
      // console.log(leftSlide)
    }
  });
  rightSlide.attr("id", "center");
  // console.log(rightSlide)
  return initCarousel();
});
function initCarousel() {
  let currentSlide = $("#center");

  currentSlide.removeAttr("style");
  let currentProj = (currentSlide.attr('class')).split(' ')[1];
  if (projectLinks[currentProj].live == "") {
    $("#live").css({'visibility': 'hidden', 'opacity': '0'});
    $("#live-desktop").css({'visibility': 'hidden', 'opacity': '0'});
} else {
   $("#live-desktop").css({'visibility': 'visible', 'opacity': '1'});
    $("#live").css({'visibility': 'visible', 'opacity': '1'});
    $("#link-live").attr('href', projectLinks[currentProj].live);
}

if (projectLinks[currentProj].github == "") {
    $("#github").css({'visibility': 'hidden', 'opacity': '0'});
    $("#github-desktop").css({'visibility': 'hidden', 'opacity': '0'});
} else {
  $("#github-desktop").css({'visibility': 'visible', 'opacity': '1'});
    $("#github").css({'visibility': 'visible', 'opacity': '1'});
    $("#link-github").attr('href', projectLinks[currentProj].github);
}
  for (let i = 0; i < projects.length; i++) {
    let projNum = projects[i];
    let slide = $(`.${projNum}`);
    let isCenter = slide.attr("id");
    let leftSlide = 0;
    let rightSlide = 1;
    if (isCenter) {
      // console.log(slide)
      let currentIndex = slide.index() - 1;
      $("#project-title").html(projectTitle[currentIndex])
      $("#project-desc").html(projectDesc[currentIndex])
      if (currentIndex - 1 < 0) {
        leftSlide = 2;
      } else {
        leftSlide = currentIndex - 1;
      }
      if (currentIndex + 1 > 2) {
        rightSlide = 0;
      } else {
        rightSlide = currentIndex + 1;
      }
      let left = $(`.${projects[leftSlide]}`);
      let right = $(`.${projects[rightSlide]}`);
      left.css("transform", "translateX(-30%) scale(0.9)");
      left.css("opacity", "0.5");
      right.css("transform", "translateX(30%) scale(0.9)");
      right.css("opacity", "0.5");
    }
  }
}
$("#gridBtn").on("click", function () {
  $("#carousel").hide();
  $("#grid").show();
});
$("#carouselBtn").on("click", function () {
  $("#grid").hide();
  $("#carousel").show();
});

$(document).ready(function () {
  initListeners();
  initCarousel();
});
