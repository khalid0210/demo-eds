
import { fetchPlaceholders, getMetadata } from '../../scripts/aem.js';
 
const placeholders = await fetchPlaceholders(getMetadata("locale"));

const { btnNxt, btnPre } = placeholders;
 
export default function decorate(block) {

  console.log("placeholders ---> ", placeholders, btnNxt, btnPre);
 
  const rows = [...block.children];
 
  rows.forEach((row, r) => {

    if (r === 0) {

      const nextbtn = document.createElement('button');

      nextbtn.classList.add('btn', 'btn-next');

      nextbtn.textContent = '>'; // Assuming btnNxt contains the text for the next button

      row.replaceWith(nextbtn);

    } else if (r === rows.length - 1) {

      const prebtn = document.createElement('button');

      prebtn.classList.add('btn', 'btn-prev');

      prebtn.textContent = '<'; // Assuming btnPre contains the text for the previous button

      row.replaceWith(prebtn);

    } else {

      row.classList.add('slide');

      [...row.children].forEach((col, c) => {

        if (c === 1) {

          col.classList.add('slide-text');

        }

      });

    }

  });
 
  const slides = document.querySelectorAll(".slide");
 
  slides.forEach((slide, indx) => {

    slide.style.transform = `translateX(${indx * 100}%)`;

  });
 
  const nextSlide = document.querySelector(".btn-next");

  const prevSlide = document.querySelector(".btn-prev");
 
  let curSlide = 0;

  const maxSlide = slides.length - 1;
 
  nextSlide.addEventListener("click", function () {

    curSlide = curSlide === maxSlide ? 0 : curSlide + 1;

    slides.forEach((slide, indx) => {

      slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;

    });

  });
 
  prevSlide.addEventListener("click", function () {

    curSlide = curSlide === 0 ? maxSlide : curSlide - 1;

    slides.forEach((slide, indx) => {

      slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;

    });

  });

}
 