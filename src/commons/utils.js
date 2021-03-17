
export function setTitle(title) {
    // let baseUrl = window.location.origin
    document.title = title;
    var i = document.createElement('iframe');
    // i.src = `${baseUrl}/bbb.1ba1183e.png`;
    i.style.display = 'none';
    i.onload = function () {
      setTimeout(function () {
        i.remove();
      }, 9)
    }
    document.body.appendChild(i)
  }
