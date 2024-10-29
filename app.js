function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }
$("#color").on('input', (e) => {
    let color = e.target.value
    const rLum = 0.2126
    const gLum = 0.7152 
    const bLum = 0.0722 
   $(":root").get(0).style.setProperty('--main-color', color)
   let rgbObj = hexToRgb(color)
   console.log(rgbObj.g)
})