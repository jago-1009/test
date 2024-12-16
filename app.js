import { checkColors } from "./lib/color-checker.js";
let dark = "#1B1F24";
let light = "#ffffff";
let isDark = true;
let rotation = 0;
let isOn = false;
const projects = ["project1", "project2", "project3"];
const projectTitle = ['EPortfolio Administrator Interface', 'Attack of the Front End Web Developer', 'ArmorCoach']
const projectDesc = ["An Adminstrator Interface for IU Indianapolis' ePortfolio Showcase.", "A short story to learn how to use the Svelte Library along with Sveltekit.", "A website for Historical Fencing academies to assign group orders for their students."]
const projectDialog = {
  project1: {
    title: "EPortfolio Administrator Interface",
    desc: "I made this project for IU Indianapolis'ePortfolio Showcase to allow the administrators of the showcase to have a easy to use application to manage the showcase entries.  This project taught me how to use many different full-stack tools at my disposal, including:",
    skillsLearned: [
      "PHP", "Laravel", "Eloquent/Illuminate", "Diactoros", "HTML Rendering with Twig"
    ],
    viewLiveLink:"",
    viewGithubLink: ""
  },
  project2: {
    title: "Attack of the Front End Web Developer",
    desc: "This project was a challenge to myself to attempt to learn as much as I can in Svelte and Sveltekit in a predefined amount of time. I was inspired by 1950s horror movies for my theme and wrote a story about a ghostly apparition of a front-end web developer. This project was completed in about 2 days, and I learned many things in the realm of Front-End Javascript Frameworks, including:",
    skillsLearned: [
      "Svelte", "Sveltekit"
    ],
    viewLiveLink:"https://framework-practice.vercel.app/",
    viewGithubLink: ""
  },
  project3: {
    title: "ArmorCoach",
    desc: "This project was created for my NEWM-N423, and is an application to help students of Historical Fencing academies select items to add to group orders. The application has two separate views; User and Admin. The admin is able to physically able to purchase items from a group order, while a user is able to add it to the group orders database. Throughout this project, I used what I learned in Sveltekit and developed it using these skills:",
    skillsLearned: [
      "Svelte", "Sveltekit", "Firebase", "Firebase Firestore", "Nodemailer"
    ],
    viewLiveLink:"https://n-423-homework.vercel.app/",
    viewGithubLink: "https://github.com/jago-1009/N-423-homework/tree/main/Final-Proj/my-app"
  }
}
function initListeners() {
  $("#scrollBar").css("height", `${$(document.body).height()}px`);
  $("#scrollBackground").css("height", `${$(document.body).height()}px`);
  $("#color").val($(":root").css("--main-color"));
  $("#grid").hide();
  $('#dialog-show').on('click', (e) => {
    let projectArr = $("#center").attr('class').split(" ")[1]
    let projectSelect = projectDialog[projectArr];
    $('#dialog-title').html(projectSelect.title)
    $('#dialog-desc').html(projectSelect.desc)
    let skillsHTML = ""
    projectSelect.skillsLearned.forEach(element => {
      skillsHTML +=`<li>${element}</li>`
    });
    $('#dialog-skills').html(skillsHTML)
    if (projectSelect.viewLiveLink != "") {
      $('#dialog-online').html('View Live')
      $('#dialog-online').attr('href',projectSelect.viewLiveLink)
    }
    if (projectSelect.viewGithubLink != "") {
      $('#dialog-github').html('View Github')
      $('#dialog-github').attr('href',projectSelect.viewGithubLink)
    }
    $('#dialog-project')[0].showModal();
  })
  $('#dialog-close').on('click', (e) => {
    $('#dialog-project')[0].close();
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
