/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
const sections = document.querySelectorAll('section');
const navUL = document.getElementById('navbar__list');
// create a fragment for performance improvements
const fragment = document.createDocumentFragment();
const pageUp = document.getElementById("top_scroll");
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
function createListItem(){
    sections.forEach(section => {
    // store the value of data-nav from the section into a variable
    const navData = section.getAttribute('data-nav');
    // store the value of id in variable
    const navId = section.getAttribute('id');
    // create new <li> 
    const listItem = document.createElement('li');
    // create new link <a>
    const links = document.createElement('a');
    // add the style to each navbar link
    links.classList.add('menu__link');
    // set the href value for each link 
    links.setAttribute('href', navId);
    // Scroll to anchor ID using scrollTO event
    links.addEventListener('click' , elem => {
        elem.preventDefault();
        section.scrollIntoView({behavior : "smooth"})
    });

    //add the name of the section
    let text = document.createTextNode(navData);
    // append all the element to each others
    links.appendChild(text);
    listItem.appendChild(links);
    //append the list Items to the fragment
    fragment.appendChild(listItem);
});
// Build menu
// append the li stored in fragment to the ul menu
navUL.appendChild(fragment);
};



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/
//determine if the section is in viewport
function secInViewPort(el){
    let secPosition = el.getBoundingClientRect();
    return (secPosition.top >= 0);
}


/**
 * End Main Functions
*/
// build the nav
createListItem();

//To check if an element is visible in the viewport 
function isInViewPort(el){
    let rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
        

    );
}
// Set sections as active
document.addEventListener("scroll", ()=> {
    sections.forEach(section =>{
        //if the section is in the view
        if(isInViewPort(section)){
            //check if it doesn't contain "your-active-class"
            if(section.class !== 'your-active-class'){
                //add the class
                section.classList.add('your-active-class');
            }
        }else{
            //if it's not in view then remove the class
            section.classList.remove('your-active-class');
        }
    });
});

// hide the navbar while scrrolling down

setTimeout(function hidenNav(){
    let lastScrollY = window.scrollY;
    window.onscroll = function(){
        let currentScrollY = window.scrollY;
        if(lastScrollY  < currentScrollY){
            navUL.classList.remove('nav__hidden');
        }else {
            navUL.classList.add('nav__hidden');
        }
        lastScrollY= currentScrollY;
    }
} , 1000);
//function to enable page up button  using scrollTo
function topPage(){
    window.scrollTo({top: 0, behavior: "smooth"});
};
//hide the pageUp button while in section 1 view port
function hideTop(){
    sections.forEach(section =>{
    if(secInViewPort(section)){
        if(section.id == 'section1'){
            pageUp.style.display = 'none';
        }
    }else{
        pageUp.style.display = 'block';
    }
})

};
// add an event to hide the pageUp button while scrolling
window.addEventListener('scroll' , hideTop);