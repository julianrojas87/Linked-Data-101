let selectedTocLink;
let headers = document.querySelectorAll('h2, h3, h4, h5, h6');
const temp = [];

for (let i = 0; i < headers.length; i++) {
  temp.push(headers.item(i));
}

headers = temp;

let previousNumber = 2;
let str = '';

str += '<ul>';
headers.forEach(header => {
  const headerNumber = parseInt(header.tagName.replace('H', ''));

  if (headerNumber === previousNumber) {
    str += getListItem(header);
  } else if (headerNumber - 1 === previousNumber) {
    str = str.substring(0, str.length - 5);
    str += `<ul>${getListItem(header)}`;
  } else if (headerNumber < previousNumber) {
    for (let i = 0; headerNumber + i < previousNumber; i++) {
      str += '</ul></li>';
    }

    str += getListItem(header);
  }

  previousNumber = headerNumber;
});

str += '</ul>';
//console.log(str);

const tocContent = document.createElement('p');
tocContent.innerHTML = str;

const toc = document.getElementById('table-of-contents');
toc.parentNode.insertBefore(tocContent, toc.nextSibling);

function getListItem(header) {
  return `<li><a href="#${header.id}" class="toc-link">${header.innerText}</a></li>`;
}

function isElementInViewport(el) {

  //special bonus for those using jQuery
  if (typeof jQuery === "function" && el instanceof jQuery) {
    el = el[0];
  }

  var rect = el.getBoundingClientRect();

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
    rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
  );
}

function eventListener(e) {
  const links = document.querySelectorAll(".toc-link");

  for (let i = links.length - 1; i >= 0; i--) {
    const link = links.item(i);
    const sectionID = link.getAttribute('href').replace('#', '');

    if (isElementInViewport(document.getElementById(sectionID)) && (!selectedTocLink || link.getAttribute('href') !== selectedTocLink.getAttribute('href'))) {
      link.classList.add('toc-link-highlight');

      if (selectedTocLink) {
        selectedTocLink.classList.remove('toc-link-highlight');
      }

      selectedTocLink = link;
    }
  }
}

window.addEventListener('scroll', eventListener);
window.addEventListener('load', eventListener);
window.addEventListener('resize', eventListener);
window.addEventListener('DOMContentLoaded', eventListener);