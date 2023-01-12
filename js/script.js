"use strict";

function titleClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  console.log("Link was clicked!");
  console.log(event);

  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll(" .titles a.active");
  for (let activeLink of activeLinks) {
    activeLink.classList.remove("active");
  }

  /*[IN PROGRESS] add class 'active' to the clicked link */
  clickedElement.classList.add("active");
  console.log("clickedElement:", clickedElement);

  /* [DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll(".posts .active");
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove("active");
  }

  /*[IN PROGRESS] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute("href");
  console.log(articleSelector);

  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);

  /* add class 'active' to the correct article */
  targetArticle.classList.add("active");
  console.log(targetArticle);
}

const optArticleSelector = ".post",
  optTitleSelector = ".post-title",
  optTitleListSelector = ".titles",
  optArticleTagsSelector = ".post-tags .list";

function generateTitleLinks() {
  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  console.log(titleList);

  function clearMessages() {
    titleList.innerHTML = "";
  }
  clearMessages();

  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector);
  const string = "";
  articles.forEach((article) => {
    /* get the article id */
    const articleID = article.id;
    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector);

    /* get the title from the title element */
    const title = articleTitle.innerHTML;

    /* create HTML of the link */
    const link = string;
    /* insert link into titleList */
    titleList.innerHTML += `
     <li>
         <a href="#${articleID}">
               <span>${title}</span>
         </a>
     </li>
    `;
  });
}

generateTitleLinks();

const links = document.querySelectorAll(".titles a");

for (let link of links) {
  link.addEventListener("click", titleClickHandler);
}

function generateTags() {
  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);
  /* find all articles */
  for (let article of articles) {
    /* START LOOP: for every article: */
    const tagsWrapper = document.querySelector(optArticleTagsSelector);
    console.log(tagsWrapper);
    /* find tags wrapper */
    const articleTags = article.getAttribute("data-tags");
    console.log(articleTags);
    /* get tags from data-tags attribute */
    const articleTagsArray = articleTags.split(" ");
    console.log(articleTagsArray);
    /* split tags into array */

    for (let tag of articleTagsArray) {
      /* START LOOP: for each tag */
      const tagLink = `<li><a href="#${tag}">${tag}</a></li>`;
      console.log(tagLink); /* generate HTML of the link */
      /* make html variable with empty string */
      let html = " " + tagLink; /* add generated code to html variable */
      article.innerHTML =
        article.innerHTML +
        html; /* insert HTML of all the links into the tags wrapper */
    } /* END LOOP: for each tag */
  }
  /* END LOOP: for every article: */
}
generateTags();
