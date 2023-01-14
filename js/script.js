"use strict";

function titleClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;

  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll(" .titles a.active");
  for (let activeLink of activeLinks) {
    activeLink.classList.remove("active");
  }

  /*[IN PROGRESS] add class 'active' to the clicked link */
  clickedElement.classList.add("active");

  /* [DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll(".posts .active");
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove("active");
  }

  /*[IN PROGRESS] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute("href");

  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);

  /* add class 'active' to the correct article */
  targetArticle.classList.add("active");
}

const optArticleSelector = ".post",
  optTitleSelector = ".post-title",
  optTitleListSelector = ".titles",
  optArticleTagsSelector = ".post-tags .list";

function generateTitleLinks(customSelector = "") {
  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);

  titleList.innerHTML = "";
  /* for each article */
  const articles = document.querySelectorAll(
    optArticleSelector + customSelector
  );
  let string = "";
  articles.forEach((article) => {
    /* get the article id */
    const articleID = article.id;
    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector);

    /* get the title from the title element */
    const title = articleTitle.innerHTML;

    /* create HTML of the link */
    const link = `
     <li>
         <a href="#${articleID}">
               <span>${title}</span>
         </a>
     </li>
    `;
    string += link;
  });
  /* insert link into titleList */
  titleList.innerHTML = string;
}

generateTitleLinks();

const links = document.querySelectorAll(".titles a");

for (let link of links) {
  link.addEventListener("click", titleClickHandler);
}

function generateTags() {
  const articles = document.querySelectorAll(optArticleSelector);

  /* find all articles */
  for (let article of articles) {
    /* START LOOP: for every article: */
    const tagsWrapper = document.querySelector(optArticleTagsSelector);

    /* find tags wrapper */
    const articleTags = article.getAttribute("data-tags");

    /* get tags from data-tags attribute */
    const articleTagsArray = articleTags.split(" ");

    /* split tags into array */

    for (let tag of articleTagsArray) {
      /* START LOOP: for each tag */
      const tagLink = `<li><a href="#${tag}">${tag}</a></li>`;
      /* generate HTML of the link */
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

function tagClickHandler(event) {
  event.preventDefault();
  /* prevent default action for this event */
  const clickedElement = this;
  /* make new constant named "clickedElement" and give it the value of "this" */
  const href = clickedElement.getAttribute("href");
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const tag = href.replace("#tag-", "");
  /* make a new constant "tag" and extract tag from the "href" constant */
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  /* find all tag links with class active */
  for (let activeTagLink of activeTagLinks) {
    /* START LOOP: for each active tag link */
    activeTagLink.classList.remove("active");
    /* remove class active */
  } /* END LOOP: for each active tag link */
  const allTagLinks = href.querySelectorAll("href");
  /* find all tag links with "href" attribute equal to the "href" constant */
  for (let tagLink of allTagLinks) {
    /* START LOOP: for each found tag link */
    tagLink.classList.add("active"); /* add class active */
  } /* END LOOP: for each found tag link */
  generateTitleLinks('[data-tags~="' + tag + '"]');
  /* execute function "generateTitleLinks" with article selector as argument */
}

function addClickListenersToTags() {
  const linkToTags = document.querySelectorAll(".list, .li.a");
  console.log(linkToTags);
  /* find all links to tags */
  for (let linkToTag of linkToTags) {
    /* START LOOP: for each link */
    linkToTag.addEventListener("click", tagClickHandler);
    /* add tagClickHandler as event listener for that link */
  } /* END LOOP: for each link */
}
addClickListenersToTags();

const optArticleAuthorSelector = ".list.authors";
console.log(optArticleAuthorSelector);

function generateAuthors() {
  const articles = document.querySelectorAll(optArticleSelector);
  let html = "";
  const listAuthors = document.querySelector(".authors");
  /* find all articles */
  for (let article of articles) {
    const author = article
      .querySelector(".post-author")
      .innerHTML.replace("by ", "");

    html += `<li><a href="#${author}">${author}</a></li>`;
  }
  listAuthors.innerHTML = html;
}

generateAuthors();
