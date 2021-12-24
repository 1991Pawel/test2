//Slides

const slides = [
  {
    title: "Slide 1",
    desc: "There are many variations of passages of Lor",
    imageUrl:
      "https://cdn.pixabay.com/photo/2021/11/09/17/17/deer-6781976_1280.jpg",
    id: 0,
  },
  {
    title: "Slide 2",
    desc: "There are many variations of passages of Lorem Ipsum available, but the majority",
    imageUrl:
      "https://cdn.pixabay.com/photo/2021/11/13/21/28/bird-6792420_1280.jpg",
    id: 1,
  },
  {
    title: "Slide 3",
    desc: "There are many variations of passages of Lorem Ipsum availabes of Lorem Ipsum av le, but the majority",
    imageUrl:
      "https://cdn.pixabay.com/photo/2021/12/07/21/17/sheep-6854087_1280.jpg",
    id: 2,
  },
  {
    title: "Slide 4",
    desc: "There are many variations of passages of Lorem but the majority",
    imageUrl:
      "https://cdn.pixabay.com/photo/2021/10/17/02/29/blackish-oystercatcher-6716397_1280.jpg",
    id: 3,
  },
  {
    title: "Slide 5",
    desc: "There are many variations opsum available, but the majority",
    imageUrl:
      "https://cdn.pixabay.com/photo/2021/09/25/22/00/sea-lion-6655963__340.jpg",
    id: 4,
  },
  {
    title: "Slide 6",
    desc: "There are many variations of passages of L, but the majority",
    imageUrl:
      "https://cdn.pixabay.com/photo/2021/11/02/10/46/lemur-6762935_1280.jpg",
    id: 5,
  },
];

const sliderTrack = document.querySelector(".slider__track");
//SliderItem html
const slideItem = ({ title, content, desc, imageUrl }, idx) => {
  const listItem = document.createElement("li");
  const sliderContent = document.createElement("div");
  const sliderTitle = document.createElement("h2");
  const sliderDesc = document.createElement("p");
  const sliderImage = document.createElement("img");

  sliderTitle.innerText = title;
  sliderTitle.classList.add("slider__title");
  sliderDesc.innerText = desc;
  sliderDesc.classList.add("slider__desc");
  sliderImage.src = imageUrl;
  sliderImage.classList.add("slider__image");
  sliderContent.classList.add("slider__content");
  //add active class to first element
  idx === 0
    ? listItem.classList.add("slider__item", "slider__item--active")
    : listItem.classList.add("slider__item");

  listItem.setAttribute("dataset", idx);
  sliderTrack.appendChild(listItem);
  listItem.appendChild(sliderContent);
  listItem.appendChild(sliderImage);
  sliderContent.appendChild(sliderTitle);
  sliderContent.appendChild(sliderDesc);

  const slideWidth = listItem.getBoundingClientRect().width;
  listItem.style.left = idx * slideWidth + "px";
};


//Selectors
const slider = document.querySelector(".slider");
const slideNumber = slides.length;
const nextBtn = document
  .querySelector(".next")
  .addEventListener("click", () => handleChangeSlide("next"));
const prevBtn = document
  .querySelector(".prev")
  .addEventListener("click", () => handleChangeSlide("prev"));




const moveToSlide = (targetSlide,activeSlide,sliderTrack) => {
    const moveTo = targetSlide.style.left;
    sliderTrack.style.transform = `translateX(-${moveTo})`;
    activeSlide.classList.remove("slider__item--active");
    targetSlide.classList.add("slider__item--active");
  }
  
  const handleBackgroundChange = (idx = 0) => {
    const bgWrapper = document.querySelector('.page');
    if(idx <= slideNumber -1) {
      bgWrapper.style.backgroundImage = `url(${slides[idx].imageUrl})`;
    } else {
      bgWrapper.style.backgroundImage = `url(${slides[0].imageUrl})`;
    }
      
  }
  


  const handleChangeSlide = (dir) => {
    const activeSlide = document.querySelector(".slider__item--active");
    const currentSlide = activeSlide.getAttribute('dataset');
    const bgIndex = parseInt(currentSlide) + 1;

   
  

  
    const nextSlide = activeSlide.nextElementSibling;
    const prevSlide = activeSlide.previousElementSibling;
  

  if (dir === "prev" && prevSlide ) {
    moveToSlide(prevSlide,activeSlide,sliderTrack);
   

  }else if (dir === "prev" && !prevSlide ) {
    handleLoopSlide(prevSlide,currentSlide,dir);
  }
  if(dir === "next" && nextSlide) {
    moveToSlide(nextSlide,activeSlide,sliderTrack);
  }else if (dir === "next" && !nextSlide ) {
    handleLoopSlide(prevSlide,dir);
  }
      handleBackgroundChange(bgIndex);
};




const handleLoopSlide = (targetSlide,dir) => {
  const slideWidth = document.querySelector('.slider__item').getBoundingClientRect().width;
  const lastSlide = sliderTrack.children[slideNumber -1] 
  const firstSlide = sliderTrack.children[0];
  if(dir === 'next') {

       firstSlide.classList.add('slider__item--active');
       lastSlide.classList.remove('slider__item--active');
       sliderTrack.style.transform = `translateX(-${0})`;

  }else {
    firstSlide.classList.remove('slider__item--active');
       lastSlide.classList.add('slider__item--active');
       sliderTrack.style.transform = `translateX(-${slideWidth * (slideNumber -1 ) + 'px'})`;

      }

    
}


const addSlideItemToTrack = () =>
  slides.map((slide, idx) => slideItem(slide, idx));
// add SliderItem
addSlideItemToTrack();
handleBackgroundChange();