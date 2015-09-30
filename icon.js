var scripts = document.getElementsByTagName('script'),
    script = scripts[scripts.length - 1].src;
    base = script.substring(0, script.length - 7)

icon = {
  small: function(name) {
    return base + 'FatCow_Icons16x16/' + name + '.png';
  },
  big: function(name) {
    return base + 'FatCow_Icons32x32/' + name + '.png';
  }
}