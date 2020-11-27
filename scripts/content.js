'use strict';

var tl;
document.onkeydown = function(element) {
  (async() => {
    var enabled = await getLocalStorage('enabled')
    console.log(enabled)
    if (!enabled && enabled !== undefined) return

    var target = document.activeElement;
    if (element.key === 'Backspace') {
      return true;
    }
    if (target.type === 'textarea' ||
      target.type === 'text' ||
      target.type === 'search' ||
      target.type === 'email'||
      target.type === 'password'
      ) {
      var key = element.key;
      var isEnter = key === 'Enter';

      if (tl) {
        tl.progress(0)
        tl.kill()
      }

      tl = new TimelineMax();
      var x_move = rand(-10, 10)
      var y_move = rand(-10, 10)
      var scale = rand(100, 150) / 100
      tl.to(target, 0.05, { x: x_move, y: y_move, scale: scale });
      tl.to(target, 0.05, { x: 0, y: 0, scale: 1});
    }
  })();

  function rand(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
}

function setLocalStorage(obj) {
  return new Promise( (resolve) => {
    chrome.storage.sync.set( obj, () => resolve() );
  });
}

function getLocalStorage(key = null) {
  return new Promise( (resolve) => {
    chrome.storage.sync.get(key, (item) => {
      key ? resolve(item[key]) : resolve(item);
    });
  });
}
