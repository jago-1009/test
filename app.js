import { checkColors } from './lib/color-checker.js'
let dark = "#2e2e2e"
let light = "#fffff0"
let isDark = true;
function initListeners() {
  $('#scrollBar').css('height',`${$(document.body).height()}px`)
  $('#scrollBackground').css('height',`${$(document.body).height()}px`)
  

}
$(window).scroll(function() {
  const windowHeight = $(window).height();
  const scrollTop = $(window).scrollTop();
  const scrollHeight = $(document).height() - $(window).height();
  const scrollRatio = scrollTop / scrollHeight;

  const boxHeight = $('#scrollTest').outerHeight();


  const thumbPosition = scrollRatio * (windowHeight - boxHeight);

  $('#scrollTest').css('top', `calc(${thumbPosition}px + 10px)` );
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
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }
  function getLuminance(obj) {
    brightness = (299*obj.r + 587*obj.g + 114*obj.b) / 1000
    return brightness
  }
  function contrast(color, background) {
    let colorSend = color.slice(1)
    let backgroundSend = background.slice(1)
    // console.log(`${colorSend} ${backgroundSend}`)
    const response = checkColors(colorSend, backgroundSend);
    let ratio = response.contrast
    return ratio;
  
  }
$("#color").on('input', (e) => {

    let color = e.target.value
    setColor(color)
    

   
})
function setColor(color) {
  var background = $(':root').css('--background')
   
  let contrastRatio = contrast(color,background)
  console.log(contrastRatio)
 if (contrastRatio < 7.5) {
  if (isDark == true) {
    $(":root").get(0).style.setProperty('--background', light)
    isDark = false
  }
  else {
    $(":root").get(0).style.setProperty('--background', dark)
    isDark = true
  }
  
 }
return $(":root").get(0).style.setProperty('--main-color', color)
}
$('.colorBtn').on('click', (e) => {
  let color = e.target.value
  setColor(color)
  $('#color').val(color)
})

 
$(document).ready(function () {
initListeners();
});