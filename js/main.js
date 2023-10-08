// Get elements.
const myLoadingPage = document.querySelector(".loading-page"),
    myLPCont = myLoadingPage.querySelector(".lp-cont"),
    mySlideShow = document.querySelector(".slideshow"),
    myMenu = document.querySelector(".menu"),
    myNavBar = document.querySelector(".nav-bar"),
    myImages = Array.from(mySlideShow.children),
    myImg_position = document.querySelector(".img_position"),
    mySettings_box = document.querySelector(".settings_box"),
    mySlider_container = document.querySelector(".slider_container"),
    myColors = document.getElementById("colors").children,
    myYes = document.querySelectorAll(".but .yes"),
    myNo = document.querySelectorAll(".but .no"),
    myFav_img = document.querySelector(".fav_img");

// *** Start slide show statements.

// *** Start loading page statements.
for (let i = 0, wh = 40; i < 6; i += 1, wh -= 3) {
    const myAnimiCont = document.createElement("section"),
        myCercle = document.createElement("section");

    myAnimiCont.classList.add("animi-cont");
    myAnimiCont.style.animationDelay = (i * 80) + "ms";
    myAnimiCont.style.zIndex = wh;
    myLPCont.appendChild(myAnimiCont);

    myCercle.classList.add("cercle");
    myCercle.style.width = `${wh}px`;
    myCercle.style.height = `${wh}px`;
    myCercle.style.backgroundColor = myColors[i].dataset.color;
    myCercle.style.marginTop = (40 - wh) / 2 + "px";
    myAnimiCont.appendChild(myCercle);
}

window.onload = () => {
    window.setTimeout(() => {
        myLoadingPage.remove();
    }, 1000);
} 
// *** End loading page statements.

// Create squares for know and replace active image.
for (let i = 0; i < myImages.length; i += 1) {
    let myLi = document.createElement("li");
    myLi.classList.add("square");
    myLi.setAttribute("data-index", i);
    myImg_position.appendChild(myLi);
}

// Get squares.
const mySquares = Array.from(myImg_position.children);

let imgIndex = 0;

// For add active class for the new image and new square.
function addActiveClass() {
    "use strict";
    myImages[imgIndex].classList.add("active_img");
    mySquares[imgIndex].classList.add("active_square");
}

// For remove Active class from current active image and current active square.
function removeActiveClass() {
    "use strict";
    // Remove active class from the image who does it contain if found image contains it.
    if (mySlideShow.contains(mySlideShow.querySelector(".active_img"))) mySlideShow.querySelector(".active_img").classList.remove("active_img");
    
    // Remove active class from the square who does it contain if found an square contains it.
    if (myImg_position.contains(myImg_position.querySelector(".active_square"))) myImg_position.querySelector(".active_square").classList.remove("active_square");
}

// For replace the active image every 5s.
let slide_int;
function slideInt() {
    slide_int = setInterval(function () {
        removeActiveClass();
    
        imgIndex += 1;
        
        if (imgIndex >= myImages.length) {
            imgIndex = 0;
        }
    
        addActiveClass();
    }, 5000);
}

// For replace the active image through click on the square button.
mySquares.forEach(function (square) {
    square.onclick = function () {
        let ind = Number(this.dataset.index);

        removeActiveClass();

        imgIndex = ind;

        addActiveClass();


        if (myNo[0].classList.contains("active_but")) {
            myFav_img.querySelector(".favorite_img").classList.remove("favorite_img");
            myFav_img.children[ind].classList.add("favorite_img");
        }

        // Save the data-index value to the last li clicked in the local storage.
        window.localStorage.setItem("favImg", this.dataset.index);
    };
});

// *** End slidshow statements.

// *** Start settings box statements.

// Hide and visible settings box.
mySlider_container.onclick = function () {
    this.classList.toggle("active_i");
    this.parentElement.classList.toggle("visible_box");
};

document.onclick = function (e) {
    const pEle = mySlider_container.parentElement;
    if ((pEle.classList.contains("visible_box")) && (!e.path.includes(pEle))) {
        mySlider_container.classList.toggle("active_i");
        pEle.classList.toggle("visible_box");
    }

    if (myNavBar.classList.contains("block") && (!e.path.includes(myNavBar)) && (!e.path.includes(myMenu))) {
        myNavBar.classList.remove("block");
        myMenu.classList.remove("active");
    }
}
// ** Start colors option statement.
// Get the favorite color from local storage if it is existent.
const favColor = window.localStorage.getItem("colorLi"),
    mySpans = Array.from(document.querySelectorAll(".service_box span"));
if (favColor && favColor !== "#F44336") {
    if (document.contains(document.querySelector(`[data-color="${favColor}"]`))) {
        // Replace the value of custom property in css.
        document.documentElement.style.setProperty("--main-color", favColor);
        // Set active_li class for li who doesit contain favorite color (the color in the local storage).
        document.querySelector(`[data-color="${favColor}"]`).classList.add("active_li");
        // Set background-color (has opacity 50%) for all sapns in service_box element.
        for (let i = 0; i < mySpans.length; i += 1) {
            mySpans[i].style.backgroundColor = favColor + "50";
        }
    } else {
        document.querySelector(`[data-color="#F44336"]`).classList.add("active_li");
    }
} else {
    document.querySelector(`[data-color="#F44336"]`).classList.add("active_li");
}

for (let i = 0; i < myColors.length; i += 1) {
    // Set background-color to every li.
    myColors[i].style.backgroundColor = myColors[i].dataset.color;

    myColors[i].onclick = function () {
        // Set the new main color (color selected from colors option).
        document.documentElement.style.setProperty("--main-color", this.dataset.color);

        // For remove active class from the previous active li.
        this.parentElement.querySelector(".active_li").classList.remove("active_li");

        // For add active class to clecked li.
        this.classList.add("active_li");

        // Set background-color (has opacity 50%) for all sapns in service_box element.
        for (let i = 0; i < mySpans.length; i += 1) {
            mySpans[i].style.backgroundColor = this.dataset.color + "50";
        }

        // For set the selected color from colors option on the local storage.
        window.localStorage.setItem("colorLi", this.dataset.color);
    };
}
// ** End colors option statements.

// ** Start slide show controls.
function favoriteImg() {
    for (let i = 0; i < myImages.length; i += 1) {
        let myLi = document.createElement("li");
        myLi.classList.add("img_opt");
        myLi.style.backgroundImage = `url(${myImages[i].getAttribute("src")})`;
        myLi.setAttribute("data-index", i);
        myLi.onclick = function () {
            // Remove favorite_img class from the previous li clicked if found an li contains it.
            if (this.parentElement.contains(this.parentElement.querySelector(".favorite_img"))) this.parentElement.querySelector(".favorite_img").classList.remove("favorite_img");

            // Add favorite_img class to li clicked.
            this.classList.add("favorite_img");

            // Remove active class from the active image and active square.
            removeActiveClass();

            // Add active class to the two compared elements (image and square) to the li has been clicked. 
            mySlideShow.querySelector(`[src="${(this.style.getPropertyValue("background-image").slice(5, -2))}"]`).classList.add("active_img");
            mySquares[Number(this.dataset.index)].classList.add("active_square");

            // Set new value to the imgIndex for running the setInterval from the last favorite image.
            imgIndex = Number(this.dataset.index);

            // Save the data-index value to the last li clicked in the local storage.
            window.localStorage.setItem("favImg", this.dataset.index);
        }
        myFav_img.appendChild(myLi);
    }

    // Add acive class to the approprite li for the image which contain active_img class (active img).
    if (myImages.findIndex(img => img.classList.contains("active_img")) !== -1) myFav_img.children[myImages.findIndex(img => img.classList.contains("active_img"))].classList.add("favorite_img");

    // Add click_onno class for show myFav_img.
    myFav_img.classList.add("click_onno");
}

let slideShowLS = window.localStorage.getItem("slideShow");

if (slideShowLS) {
    // If the local storage has a value not equal to 'null'.
    if (slideShowLS === "no") {
        // If the local storage has a value equal to 'no' => stop slide show.

        // Set active class on myNo[0] button.
        myNo[0].classList.add("active_but");
        
        // Get favImg for selection the favorite image.
        let indFavImg = window.localStorage.getItem("favImg");
        if (indFavImg && indFavImg < myImages.length) {
            // If the local storage has a vlue not equel to 'null'.

            // Add active class to the last selected image from myFav_img.
            myImages[parseFloat(indFavImg)].classList.add("active_img");
            mySquares[parseFloat(indFavImg)].classList.add("active_square");

            // Set new value to the imgIndex for running the setInterval from the last favorite image.
            imgIndex = parseFloat(indFavImg);
        } else {
            // If the local storage is empty.

            // Function for add active class to default image 'the image which has the index 0'.
            addActiveClass();
        }

        favoriteImg();
    } else {
        // If the local storage has a value equal to 'yes' => active slid show.

        // Function for add active class to default image 'the image which has the index 0'.
        addActiveClass();
        // Function for running slide show.
        slideInt();
        // Set active class on myYes[0] button.
        myYes[0].classList.add("active_but");
    }
} else {
    // If the local storage is empty 'local storage value ==== null'.

    // Function for add active class to default image 'the image which has the index 0'.
    addActiveClass();
    // Function for running slide show.
    slideInt();
    // Set active class on myYes[0] button.
    myYes[0].classList.add("active_but");
}

myYes[0].onclick = e => {
    let butClick = e.target;
    // This founction for running the slide show again.
    slideInt();

    // Remove active class from myNo[0] and add this class to myYes[0].
    if (butClick.nextElementSibling.classList.contains("active_but")) butClick.nextElementSibling.classList.remove("active_but");
    butClick.classList.add("active_but");

    // Set 'no' in the local storage for remember last selection.
    window.localStorage.setItem("slideShow", "yes");

    // Remove click_onno class from myFav_img for hide it.
    myFav_img.classList.remove("click_onno");
    
    // Remove myFav_img children from the document.
    while (myFav_img.children.length !== 0) {
        myFav_img.children[0].remove();
    }
};

myNo[0].onclick = e => {
    let butClick = e.target;
    // Stop slide show.
    clearInterval(slide_int);

    // Remove active class from myYes[0] and add this class to myNo[0].
    if (butClick.previousElementSibling.classList.contains("active_but")) butClick.previousElementSibling.classList.remove("active_but");
    butClick.classList.add("active_but");

    // Create li elements in myFav_img with the same number of images for selected the favorite image that you want influencing in the slide show.
    favoriteImg();

    // Set 'no' in the local storage for remember last selection.
    window.localStorage.setItem("slideShow", "no");
};
// ** End slide show controls statements.

// ** Start reset button statements.



document.querySelector(".settings_box section.reset").onclick = function () {
    localStorage.clear();
    
    const date = new Date();

    date.setMonth(date.getMonth() - 1);
    
    document.cookie = `portfolio=; expires = ${date}`;

    window.location.reload();
}

// ** End reset button statements.

// *** End settings box statements.

// *** Start our skills statements.

const mySkillBoxes = document.querySelectorAll(".skill_box");

for (let i = 0; i < mySkillBoxes.length; i += 1) {
    let box = mySkillBoxes[i],
        mySkillProgress = box.querySelector(".skill_progress"),
        // Get the value of the custom attribute data-skillcolor from the current box.
        data_skillcolor = box.dataset.skillcolor,
        mySkillValue = box.querySelector(".skill_value");
        
    
    if (data_skillcolor !== undefined && /#|rgb|hsl/i.test(data_skillcolor)) {
        // If the box has the current custom attribute and its a color.
        // Set it in the color property for the first child from the box.
        box.firstElementChild.style.color = data_skillcolor;
        // Set it in the background color property for the element has 'skill_value' class in the currant box.
        mySkillValue.style.backgroundColor = data_skillcolor;
        
        if (data_skillcolor.startsWith("#")) {
            // The value of the custom attribute is a hix code.
            // Add opacity value '50%' to The value of the custom attribute.
            mySkillProgress.style.backgroundColor = data_skillcolor + "50";
        } else if (/rgb/i.test(data_skillcolor.substr(0, 3))) {
            // The value of the custom attribute is a rgb color.
            // Add opacity value '50%' to The value of the custom attribute.
            let bgc = data_skillcolor.substring(0, 3).concat("a", data_skillcolor.slice(3, -1), " / 50%)");
            mySkillProgress.style.backgroundColor = bgc;
        } else {
            // The value of the custom attribute is a hsl color.
            // Add opacity value '50%' to The value of the custom attribute.
            let arr = data_skillcolor.split("");
            arr.splice(3, 0, "a");
            arr.pop();
            let bgc = arr.join("").concat(" / 50%)");
            mySkillProgress.style.backgroundColor = bgc;
        }
    }
}

const myOurSkills = document.querySelector(".our_skills");

function scrollProgress() {
    if (window.pageYOffset >= myOurSkills.offsetTop + myOurSkills.offsetHeight - window.innerHeight) {
        // If the element is visible on bottom of the window.
        for (let i = 0; i < mySkillBoxes.length; i += 1) {
            // Get boxes one by one.
            let box = mySkillBoxes[i],
            // Get the custom attribute (data-val) from box.
                data_val = box.dataset.val;

            if (data_val !== undefined && parseFloat(data_val) <= 100 && parseFloat(data_val) > 0) {
                // If the current box has the custom attribute (=< 100) and > (0).
                if (!data_val.endsWith("%")) {
                    data_val += "%";
                }

                // Set custom attribute value in the width property for the element which has 'skill_value' class in the current box.
                box.querySelector(".skill_value").style.width = data_val;
                // Set transitionDelay property for the element which has 'skill_value' class in the current box.
                box.querySelector(".skill_value").style.transitionDelay = i / 4 + "s";
                // Set custom attribute value in the text content for the element which has 'value' class in the current box.
                box.querySelector(".value").textContent = data_val;
            }
        }

        // Remove scroll event after running the followed statement one time because will not running again just will affected on the performance.
        window.removeEventListener("scroll", scrollProgress);
    }
}

window.addEventListener("scroll", scrollProgress);

// *** End our skills statements.

// *** Start our services statements.
const myOurServices = document.querySelector(".our_services"), 
    myServiceBoxes = document.querySelectorAll(".service_box");

const scrollServices = _ => {
    if (window.pageYOffset >= myOurServices.offsetTop - window.innerHeight) {
        for (let i = 0; i < myServiceBoxes.length; i += 1) { 
            if (window.pageYOffset >= myServiceBoxes[i].offsetTop + myServiceBoxes[i].offsetHeight - window.innerHeight) {
                myServiceBoxes[i].classList.add("active_ser_box");

                if (i === myServiceBoxes.length - 1) {
                    window.removeEventListener("scroll", scrollServices);
                }
    
                continue;
            }
    
            break;
        }
    }
};

window.addEventListener("scroll", scrollServices);
// *** End our services statements.

// *** Start our portfolio statements.

const myOurPortfolio = document.querySelector(".our_portfolio"),
    myAll = myOurPortfolio.querySelector(".all"),
    myWeb = myOurPortfolio.querySelector(".web"),
    myPortfolioImages = myOurPortfolio.querySelector(".images"),
    myGallery = myOurPortfolio.querySelector(".gallery"),
    // Set images sources list for the images who you wont visibled when click on the images.
    portfolio_img = [
    "images/portfolio-img/0.jpg",
    "images/portfolio-img/1.jpg",
    "images/portfolio-img/2.jpg",
    "images/portfolio-img/3.jpg",
    "images/portfolio-img/4.jpg",
    "images/portfolio-img/5.jpg",
    "images/portfolio-img/6.jpg",
    "images/portfolio-img/7.jpg"
    ],
    // Set images sources list for the images who you wont visibled when click on the web.
    portfolio_web = [
    "images/portfolio-web/0.jpg",
    "images/portfolio-web/1.png",
    "images/portfolio-web/2.jpg",
    "images/portfolio-web/3.jpg",
    "images/portfolio-web/4.png",
    "images/portfolio-web/5.jpg",
    "images/portfolio-web/6.jpg",
    "images/portfolio-web/7.jpg"
    ];
// function for remove all images from the gallery.
function emptying(ele) {
    if (myOurPortfolio.contains(myOurPortfolio.querySelector(".active_port_li"))) {
        myOurPortfolio.querySelector(".active_port_li").classList.remove("active_port_li");
    }

    ele.classList.add("active_port_li");

    while (myGallery.children.length > 0) {
        myGallery.removeChild(myGallery.children[0]);
    }
}

// function for add all images to the gallery.
function addImages(arrSrc) {
    for (let i = 0; i < arrSrc.length; i += 1) {
        let myLi = document.createElement("li"),
            myImg = document.createElement("img"),
            mySrc = document.createAttribute("src");
        
            mySrc.value = arrSrc[i];
            myImg.setAttributeNode(mySrc);
            myLi.appendChild(myImg);

            myGallery.appendChild(myLi);
    }
}

// Function for set cookies.
const setCookie = (v) => {
    let now = new Date();
    
    document.cookie = "portfolio=" + v + ";expires=" + new Date(now.setDate(now.getDate() + 7)).toUTCString() + "; path=/";
}

myWeb.onclick = (e) => {
    myGallery.classList.remove("active_gal");

    emptying(e.target);

    addImages(portfolio_web);

    setTimeout(() => myGallery.classList.add("active_gal"), 1);

    setCookie("web");
};

myPortfolioImages.onclick = (e) => {
    myGallery.classList.remove("active_gal");

    emptying(e.target);

    addImages(portfolio_img);

    setTimeout(() => myGallery.classList.add("active_gal"), 1);

    setCookie("images")
};

myAll.onclick = (e) => {
    myGallery.classList.remove("active_gal");

    emptying(e.target);

    addImages(portfolio_web);

    addImages(portfolio_img);

    setTimeout(() => myGallery.classList.add("active_gal"), 1);

    setCookie("all");
}

if (document.cookie.includes("portfolio")) {
    let getCookie = document.cookie + ";";
        v = getCookie.slice(getCookie.indexOf("=", getCookie.indexOf("portfolio")) + 1, getCookie.indexOf(";", getCookie.indexOf("portfolio")));

    switch (v) {
        case "all":
            myAll.click();
            break;
        case "web":
            myWeb.click();
            break;
        case "images":
            myPortfolioImages.click();
    }
} else {
    myAll.click();
}

function scrollPortfolio() {
    if (window.scrollY >= myOurPortfolio.offsetTop + myOurPortfolio.offsetHeight - window.innerHeight) {
        myGallery.style.opacity = "1";        

        window.addEventListener("scroll", scrollPortfolio);
    }
}

window.addEventListener("scroll", scrollPortfolio);

myGallery.onclick = function (e) {
    let myPopup = document.createElement("section"),
        myContGal = document.createElement("section"),
        myImg = document.createElement("img"),
        mySpan = document.createElement("span");

    myPopup.classList.add("popup");
    myContGal.classList.add("contgal");
    myImg.setAttribute("src", e.target.getAttribute("src"));
    myContGal.appendChild(myImg);
    mySpan.textContent = "x";
    myContGal.appendChild(mySpan);
    mySpan.onclick = () => {
        myPopup.classList.remove("vis");
        setTimeout(_ => myPopup.remove(), 1001);
    };
    myPopup.appendChild(myContGal);
    document.body.insertBefore(myPopup, document.body.lastElementChild);

    setTimeout(() => myPopup.classList.add("vis"), 1);
};

// *** End our portfolio statements.

// *** Start timeline statements.

// This property not running from css file "styles.css" for this i wrote it here.
const firstYear = document.querySelector(".year");

firstYear.style = "border-top: none; margin-top: 0";
// *** End timeline statements.

// *** Start our features statements.

// ** Start features statements.
const myOurFeatures = document.querySelector(".our_features"),
    myFeatures = document.querySelectorAll(".feature");

function scrollFeatures() {
    if (window.pageYOffset >= myOurFeatures.offsetTop - window.innerHeight) {
        for (let i = 0; i < myFeatures.length; i += 1) {
            const myFeature = myFeatures[i];

            if (window.pageYOffset >= myFeature.offsetHeight + myFeature.offsetTop - window.innerHeight) {
                myFeature.classList.add("access_feat");

                setTimeout(function () {
                    myFeature.firstElementChild.classList.add("access_feat");
                }, parseFloat(window.getComputedStyle(myFeature).transitionDuration) * 1000);

                if (i === myFeatures.length - 1) {
                    window.removeEventListener("scroll", scrollFeatures);
                }

                continue;
            }

            break;
        }
    }
}

window.addEventListener("scroll", scrollFeatures);
// ** End features statements.

// ** Start accordion statements.
const myFeat_accordion = document.querySelector(".feat_accordion"),
    myAccordionLis = myFeat_accordion.querySelectorAll(".feat_accordion li");

function removeActive_h3pClass() {
    if (myFeat_accordion.contains(myFeat_accordion.querySelector(".active_h3p"))) {
        myFeat_accordion.querySelector(".active_h3p").classList.remove("active_h3p");
    }
}

const addActive_h3pClass = (p) => {
    p.classList.add("active_h3p");
};

myAccordionLis.forEach(li => {
    li.onclick = function () {
        if (this.classList.contains("active_h3p")) {
            removeActive_h3pClass();
        } else {
            removeActive_h3pClass();
            addActive_h3pClass(this);
        }
    }
});

function scrollAccordion() {
    if (window.scrollY >= myFeat_accordion.offsetTop + myFeat_accordion.offsetHeight - window.innerHeight) {
        myFeat_accordion.classList.add("active_feat");

        window.addEventListener("scroll", scrollAccordion);
    }
}

window.addEventListener("scroll", scrollAccordion);

// ** End accordion statements.

// *** End our features statements.

// *** Start testimonials statements.
const myTestimonials = document.querySelector(".testimonials"),
    myTestimonialsBlocks = myTestimonials.querySelectorAll(".testimonials .testimonial");

function scollTestimonials() {
    if (window.scrollY >= myTestimonials.offsetTop - window.innerHeight) {
        for (let i = 0; i < myTestimonialsBlocks.length; i += 1) {
        
            if (window.scrollY >= myTestimonials.offsetTop + myTestimonialsBlocks[i].offsetTop + myTestimonialsBlocks[i].offsetHeight - window.innerHeight) {

                myTestimonialsBlocks[i].classList.add("access_testimonials");

                if (i === myTestimonialsBlocks.length - 1) {
                    window.removeEventListener("scroll", scollTestimonials);
                }

                continue;
            }
            
            break;
        }
    }
}

window.addEventListener("scroll", scollTestimonials);
// *** End testimonials statements.

// *** Start contact us statements.
const myInputs = document.querySelector("form"),
    myMap = document.querySelector(".map"),
    myInputsChildrens = myInputs.children;

function scollContactUsInputes() {
    if (window.scrollY >= myInputs.offsetTop + myInputs.offsetHeight - window.innerHeight) {
        let d = 0;
        const dur = parseFloat(window.getComputedStyle(myInputsChildrens[0]).transitionDuration);
        for (let i = 0; i < myInputsChildrens.length; i += 1) {
            myInputsChildrens[i].style.transitionDelay = d + "s";
            myInputsChildrens[i].classList.add("active_input");
            
            d += dur / 2;
        }

        window.removeEventListener("scroll", scollContactUsInputes);
    }
}
window.addEventListener("scroll", scollContactUsInputes);

myInputs.querySelector("textarea").value = "";

// ** Start validation form statements.
function hundleAlert(focusInp, altertText) {
    const myFormOverlay = document.createElement("section"),
        myAlert = document.createElement("section"),
        myIcon = document.createElement("section"),
        myI = document.createElement("i"),
        myAlertText = document.createElement("p"),
        myCancel = document.createElement("span");
        myOk = document.createElement("span"),
        myAlertSound = document.querySelector('[src="audios/form-alert.wav"]');

    myAlertSound.play();

    myFormOverlay.classList.add("form-overlay")
    myAlert.classList.add("alert");
    myFormOverlay.appendChild(myAlert);
    myIcon.classList.add("icon");
    myAlert.appendChild(myIcon);
    myI.className = "fa fa-bell";
    myI.setAttribute("aria-hidden", "true");
    myIcon.appendChild(myI);
    myAlertText.classList.add("alert-text");
    myAlertText.textContent = altertText;
    myAlert.appendChild(myAlertText);
    myCancel.classList.add("cancel");
    myCancel.textContent = "cancel";
    myAlert.appendChild(myCancel);
    myOk.classList.add("ok");
    myOk.textContent = "ok";
    myAlert.appendChild(myOk);
    myInputs.insertBefore(myFormOverlay, myInputs.firstElementChild);

    setTimeout(function () {
        myFormOverlay.classList.add("visible")
    }, 1);

    focusInp.blur();

    myCancel.onclick = () => {
        focusInp.value = "";
        myFormOverlay.classList.remove("visible");
        focusInp.focus();

        setTimeout(function () {
            myInputs.removeChild(myFormOverlay);
        }, 505);
    }

    myOk.onclick = () => {
        myFormOverlay.classList.remove("visible");
        focusInp.focus();
        setTimeout(function () {
            myInputs.removeChild(myFormOverlay);
        }, 505);
    }
}

myInputsChildrens[0].onkeydown = function (e) {
    const ekc = e.keyCode;
    if (!((ekc >= 65 && ekc <= 90) || ekc === 8 || ekc === 32)) {
        e.preventDefault();

        hundleAlert(this, "This input only accept the letters and spaces.");
    }
}

myInputsChildrens[1].onkeydown = function (e) {
    const ekc = e.keyCode;
    if (!((ekc >= 48 && ekc <= 57) || ekc === 8 || ekc === 32 || ekc === 187 || ekc === 16)) {
        e.preventDefault();

        hundleAlert(this, "This input only accept numbers and spaces and '+'.");
    }

}

myInputs.onsubmit = function (e) {
    const textInputs = myInputs.querySelectorAll("[placeholder]"),
        emailInput = myInputsChildrens[2];

    let exp = true;

    for (let i = 0; i < textInputs.length; i += 1) {
        if (textInputs[i].value === "") {
            if (exp) {
                e.preventDefault();
    
                hundleAlert(textInputs[i], `- The '${textInputs[i].getAttribute("placeholder")}' input cant be empty.`);

                exp = false;
            } else {
                document.querySelector(".alert-text").innerHTML += `<br>- The '${textInputs[i].getAttribute("placeholder")}' input cant be empty.`;
            }
        }
    }

    if (!emailInput.value.endsWith("@gmail.com") && emailInput.value !== "") {
        e.preventDefault();

        hundleAlert(emailInput, `The '${emailInput.getAttribute("placeholder")}' input value is not a gmail.`);
    }
}
// ** End validation form statements.

function scollContactUsMap() {
    if (window.scrollY >= myMap.offsetTop + myMap.offsetHeight - window.innerHeight) {
        myMap.classList.add("active_map");

        window.removeEventListener("scroll", scollContactUsMap);
    }
}

window.addEventListener("scroll", scollContactUsMap);

// If the navigator not connected.
if (!window.navigator.onLine) {
    myMap.removeChild(myMap.firstElementChild);
    myMap.innerHTML = "map not loading because your browser not connected. <br> my address is: <b style='color: var(--main-color)'>your address</b>.";
}
// *** End contact us statements.

// *** Start bullets statements.
const scrollEles = document.querySelectorAll('[data-scroll]'),
    myBullets = document.querySelector(".bullets");

for (let i = 0; i < scrollEles.length; i += 1) {
    let myLi = document.createElement("li"),
        mySpan = document.createElement("span");
    
    myLi.classList.add("bullet");
    mySpan.textContent = scrollEles[i].dataset.scroll;
    myLi.appendChild(mySpan);
    myBullets.appendChild(myLi);

    myLi.onclick = () => {
        scrollEles[i].scrollIntoView({behavior: "smooth"});
    }
}
// ** Start settings box show|hide bullets.
function handlaYesNo(butYes, butNo, elebn, lsKey, lsVarGet) {
    
    if (lsVarGet) {
        if (lsVarGet === "block") {
            butYes.classList.add("active_but");
        } else {
            elebn.style.display = "none";
            butNo.classList.add("active_but");
        }
    } else {
        butYes.classList.add("active_but");
    }
    
    butYes.onclick = function () {
        elebn.style.display = "block";
        this.classList.add("active_but");
        butNo.classList.remove("active_but");
        localStorage.setItem(lsKey, "block");
    }
    
    butNo.onclick = function () {
        elebn.style.display = "none";
        this.classList.add("active_but");
        butYes.classList.remove("active_but");
        localStorage.setItem(lsKey, "none");
    }
}

const lsbulltesOptions = localStorage.getItem("bulltesOptions");
handlaYesNo(myYes[1], myNo[1], myBullets, "bulltesOptions", lsbulltesOptions);
// ** End settings box show|hide bullets.
// *** End bullets statements.

// *** Start nav bar statements.
myNavBar.onclick = function (e) {
    const clickedLink = e.target;
    if (this !== clickedLink) {
        document.querySelector(clickedLink.dataset.selector).scrollIntoView({behavior: "smooth"});

        myNavBar.querySelector(".active_a").classList.remove("active_a");

        clickedLink.classList.add("active_a");
    }
}

// ** Start statements for "set" and "remove" active class from nav links pending scrolling the window for know the position in the documnet through nav links taking into account if the navigation bar is fixed or no.
const myNavBarChildren = myNavBar.children,
    mySections = [];

for (let i = 0; i < myNavBarChildren.length; i += 1) {
    mySections.push(document.querySelector(myNavBarChildren[i].dataset.selector));
}

function navScroll() {
    for (let i = 0; i < mySections.length; i += 1) {
        if (window.pageYOffset >= mySections[i].offsetTop) {

            myNavBar.querySelector(".active_a").classList.remove("active_a");

            myNavBarChildren[i].classList.add("active_a");

        }
    }
}
// ** End statements for "set" and "remove" active class from nav links pending scrolling the window for know the position in the documnet through nav links taking into account if the navigation bar is fixed or no.
// *** End nav bar statements.

// *** Start scroll bar progress statements.
const myProgressBar = document.querySelector(".progress-bar"),
    myButtonToTop = document.querySelector(".button-to-top");

function scrollBarProgress() {
    const invisibleArea = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    // Scroll bar progress
    myProgressBar.style.width = (window.scrollY * 100) / invisibleArea + "%";

    // Scroll button to top
    if (window.scrollY >= invisibleArea * .9) {
        myButtonToTop.style.display = "block";
        myButtonToTop.firstElementChild.className = "fa fa-chevron-up";
        myButtonToTop.lastElementChild.className = "fa fa-chevron-up";
    } else if (window.scrollY >= invisibleArea * .7) {
        myButtonToTop.style.display = "block";
        myButtonToTop.firstElementChild.className = "fa fa-chevron-up";
        myButtonToTop.lastElementChild.removeAttribute("class");
    } else {
        myButtonToTop.style.display = "none";
    }
}

window.addEventListener("scroll", scrollBarProgress);
// *** End scroll bar progress statements.

// ** Start settings box show|hide scroll bar progress.
const myScrollProgress = document.querySelector(".scroll-progress"),
    lsScrollBarOptions = localStorage.getItem("scrollBarOptions");

handlaYesNo(myYes[2], myNo[2], myScrollProgress, "scrollBarOptions", lsScrollBarOptions);
// ** End settings box show|hide scroll bar progress.

// *** Start button to top statements.
myButtonToTop.onclick = () => {
    scrollTo(0, 0);
}
// *** End button to top statements.

// *** Start fixed nav bar statements.
const myTopBar = document.querySelector(".top-bar");

function scrollTopBar() {
    if (window.scrollY >= myTopBar.offsetHeight) {
        myTopBar.classList.add("fixed-bar-hide");
        setTimeout(() => {myTopBar.classList.add("fixed-bar-visible")}, 1);
    } else {
        myTopBar.classList.remove("fixed-bar-hide", "fixed-bar-visible");
    }
}

window.addEventListener("scroll", scrollTopBar);

// ** Start settings box fixed nav bar statements.
const lsFixedBarOptions = localStorage.getItem("fixedNavBar");

if (lsFixedBarOptions) {
    if (lsFixedBarOptions === "yes") {
        myYes[3].classList.add("active_but");

        // Add event listener for "set" and "remove" active class from nav links.
        window.addEventListener("scroll", navScroll);
    } else {
        window.removeEventListener("scroll", scrollTopBar);
        if (myTopBar.classList.contains("fixed-bar-hide")) {
            myTopBar.classList.remove("fixed-bar-hide", "fixed-bar-visible");
        }

        myNo[3].classList.add("active_but");
    }
} else {
    myYes[3].classList.add("active_but");
}

myYes[3].onclick = function () {
    window.addEventListener("scroll", scrollTopBar);
    if (window.scrollY >= myTopBar.offsetHeight) {
        myTopBar.classList.add("fixed-bar-hide");
        setTimeout(() => {myTopBar.classList.add("fixed-bar-visible")}, 1);
    }
    this.classList.add("active_but");
    myNo[3].classList.remove("active_but");
    localStorage.setItem("fixedNavBar", "yes");

    // Add event listener for "set" and "remove" active class from nav links.
    window.addEventListener("scroll", navScroll);
}

myNo[3].onclick = function () {
    window.removeEventListener("scroll", scrollTopBar);
    if (myTopBar.classList.contains("fixed-bar-hide")) {
        myTopBar.classList.remove("fixed-bar-hide", "fixed-bar-visible");
    }
    this.classList.add("active_but");
    myYes[3].classList.remove("active_but");
    localStorage.setItem("fixedNavBar", "no");

    // Remove event listener 'for "set" and "remove" active class from nav links' because the nav bar is not fixed.
    window.removeEventListener("scroll", navScroll);
}
// ** End settings box fixed nav bar statements.
// *** Start fixed nav bar statements.

// *** Start media queries statements.
myMenu.onclick = function () {
    this.classList.toggle("active");
    myNavBar.classList.toggle("block");
}
// *** End media queries statements.