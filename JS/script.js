console.log("Hello world")

// Element selection
const yearEl=document.querySelector(".year");
const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");
const allLinks = document.querySelectorAll("a:link");
const sectionHeroEl = document.querySelector(".section-hero");
const allSections = document.querySelectorAll(".section");

const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;

btnNavEl.addEventListener("click",function(){
  headerEl.classList.toggle("nav-open");
})


allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = link.getAttribute("href");

    // scroll back to the top
    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    // scroll to other links
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }

    //  Close mobile navigation
    if (link.classList.contains("main-nav-link"))
      headerEl.classList.toggle("nav-open");
  });
});

/////////////////////////////////////////////
// sticky navigation

// console.log(document.querySelector(".main-nav").getBoundingClientRect().height);
const navHeight = document
  .querySelector(".header")
  .getBoundingClientRect().height; // this is the height of the nav. instead of hardcoding the height in the rootMargin, we get the height from the ClientRect so that when the height changes due to responsiveness
  console.log(navHeight);

const obs= new IntersectionObserver(function(entries){
  const ent=entries[0];
  console.log(ent);

  if(ent.isIntersecting===false){
document.body.classList.add("sticky");
console.log(ent);
}

if (ent.isIntersecting ===true){
  document.body.classList.remove("sticky");
}
}, 
{
  // in the viewport
  root: null,
  threshold: 0,
  rootMargin:`-${navHeight}px`, // must be in px
}
);
obs.observe(sectionHeroEl);


///////////////////////////////////////////////
// Revealing Sections

console.log(allSections);

const sectionObsCallBack = function(entries, observer){
const  [entry] = entries
console.log(entry.target)
if (entry.isIntersecting === false) return;
else {
  entry.target.classList.remove("section--hidden");
}
observer.unobserve(entry.target)
}

const sectionObserver = new IntersectionObserver(sectionObsCallBack, {
  root: null,
  threshold: 0.15,
})

allSections.forEach(sections=>{
  sectionObserver.observe(sections)
  sections.classList.add("section--hidden")
})

/////////////////////////////////////////////
// menu fade animation

// refactoring the code to obey the DRY principle

const handlerFunction = function (e) {
  console.log(this); //the *this* keyword refers to the object in which the function is called. in here it is called with 0.5. see handlerFunction.bind(0.5)
  if (e.target.classList.contains("main-nav-link")) {
    const link = e.target; // this is the element the mouse hovers over
    const siblings = link
      .closest(".nav-list")
      .querySelectorAll(".main-nav-link"); //this will select the siblings of the main-nav-link and returning a nodeList which can now be looped using forEach

    const logo = link.closest(".header").querySelector("img");
    console.log(logo);

    siblings.forEach((indivEl) => {
      if (indivEl !== link) {
        indivEl.style.opacity = this;
        logo.style.opacity = this;
      }
    });
  }
};

const unorderedListNav = document.querySelector(".nav-list")

unorderedListNav.addEventListener("mouseover", handlerFunction.bind(0.5))
unorderedListNav.addEventListener("mouseout", handlerFunction.bind(1))
/* // calling the function by using bind. Bind method sets a new function and the first argument is the object in which the *this* keyword is called on; using it like this will work. handlerFunction.bind(0.5). the this keyword in here will now point to 0.5. see above. we will now set the opacity argument to *this* on the handlerFunction function above */

//////////////////////////////////////////
// lazy loading images

const lazyImages = document.querySelectorAll("img[data-src]")

const lazyImagesCallBack = function(entries, observer){
  const [entry] = entries;
  entry.target.src = entry.target.dataset.src;

  /* before you remove the lazy-img class which is the blur, allow the image to load first, i have good internet connection and i am using a good pc that is why it loads immediately and displays the high resolution image. if not, i would need to see the low resolution image and later see the high resolution. Solution to this is to listen to laod event before removing the class */

  entry.target.addEventListener("load", function (e) {
    entry.target.classList.remove("lazy-img");
  });
  observer.unobserve(entry.target);
}

const lazyImagesObserver = new IntersectionObserver(lazyImagesCallBack, {
  root: null,
  threshold: 0,
  rootMargin: "200px"
})

lazyImages.forEach(img=> lazyImagesObserver.observe(img))




///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();

// https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js

/*
.no-flexbox-gap .main-nav-list li:not(:last-child) {
  margin-right: 4.8rem;
}

.no-flexbox-gap .list-item:not(:last-child) {
  margin-bottom: 1.6rem;
}

.no-flexbox-gap .list-icon:not(:last-child) {
  margin-right: 1.6rem;
}

.no-flexbox-gap .delivered-faces {
  margin-right: 1.6rem;
}

.no-flexbox-gap .meal-attribute:not(:last-child) {
  margin-bottom: 2rem;
}

.no-flexbox-gap .meal-icon {
  margin-right: 1.6rem;
}

.no-flexbox-gap .footer-row div:not(:last-child) {
  margin-right: 6.4rem;
}

.no-flexbox-gap .social-links li:not(:last-child) {
  margin-right: 2.4rem;
}

.no-flexbox-gap .footer-nav li:not(:last-child) {
  margin-bottom: 2.4rem;
}

@media (max-width: 75em) {
  .no-flexbox-gap .main-nav-list li:not(:last-child) {
    margin-right: 3.2rem;
  }
}

@media (max-width: 59em) {
  .no-flexbox-gap .main-nav-list li:not(:last-child) {
    margin-right: 0;
    margin-bottom: 4.8rem;
  }
}
*/
