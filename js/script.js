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
  optArticleTagsSelector = ".post-tags .list",
  optTagsListSelector = ".tags.list",
  optCloudClassCount = 5,
  optCloudClassPrefix = "tag-size-";

function generateTitleLinks(customSelector = " ") {
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
  const links = document.querySelectorAll(".titles a");

  for (let link of links) {
    link.addEventListener("click", titleClickHandler);
  }
}

function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
  const result = `${optCloudClassPrefix}${classNumber};`;
  return result;
}

function generateTags() {
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};
  const articles = document.querySelectorAll(optArticleSelector);
  /* find all articles */
  for (let article of articles) {
    /* START LOOP: for every article: */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    let html = "";
    /* find tags wrapper */
    const articleTags = article.getAttribute("data-tags");
    /* get tags from data-tags attribute */
    const articleTagsArray = articleTags.split(" ");
    /* split tags into array */

    for (let tag of articleTagsArray) {
      /* START LOOP: for each tag */
      const tagLink = `<li><a href="#tag-${tag}">${tag}</a></li>`;
      /* generate HTML of the link */
      /* make html variable with empty string */
      html = " " + tagLink;
      /* add generated code to html variable */
      /* [NEW] check if this link is NOT already in allTags */
      if (allTags.hasOwnProperty(tagLink)) {
        /* [NEW] add tag to allTags object*/
        allTags[tagLink] = 1;
      } else {
        allTags[tagLink]++;
      } /* END LOOP: for each tag */
      tagsWrapper.innerHTML += html;
      /* insert HTML of all the links into the tags wrapper */
    }
  } /* END LOOP: for every article: */

  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);

  /* [NEW] create a variable for all links HTML code */
  const tagsParams = calculateTagsParams(allTags);
  console.log("tagsParams", tagsParams);

  const tagLinkHTML =
    "<li>" + calculateTagClass(allTags[tag], tagsParams) + "</li>";
  console.log("tagLinkHTML:", tagLinkHTML);

  let allTagsHTML = " ";
  /* [NEW] start LOOP for each tag in allTags*/
  for (let tag in allTags) {
    /* [NEW] Generate code of a link and add it into allTagsHTML */
    allTagsHTML += tagLinkHTML;
  } /*end LOOP for each tag in allTags
 /* [NEW] add html from allTagsHTML to TagList */
  tagList.innerHTML = allTagsHTML;
  console.log(allTagsHTML);
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

  const allTagLinks = href.querySelectorAll(`a[href="${href}"]`);
  /* find all tag links with "href" attribute equal to the "href" constant */
  for (let tagLink of allTagLinks) {
    /* START LOOP: for each found tag link */
    tagLink.classList.add("active"); /* add class active */
  } /* END LOOP: for each found tag link */
  generateTitleLinks('[data-tags~="' + tag + '"]');
  /* execute function "generateTitleLinks" with article selector as argument */

  function calculateTagsParams(tags) {
    const params = {
      max: 0,
      min: 999999,
    };
    for (let tag in tags) {
      console.log(tag + " is used " + tags[tag] + " times");
      if (tags[tag] > params.max) {
        params.max = tags[tag];
      }
      if ((tags[tag], params.min)) {
        params.min = tags[tag];
      }
    }
    return params;
  }
}

function addClickListenersToTags() {
  const linkToTags = document.querySelectorAll('a[href^="#tag-"]');
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
  /*find all articles*/
  for (let article of articles) {
    /*get author name*/
    const author = article.getAttribute("data-author");
    /*create author*/
    const html = `<a href="#author-${author}">${author}</a>`;
    /*write author into HMTL*/
    article.querySelector(".post-author").innerHTML = html;
  }
}

generateAuthors();
//call function only at CLICK
function authorClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute("href");
  //change #author into epty

  const tagAuthor = href.replace(`#author-`, ``);
  //find all active authors
  const authorLinks = document.querySelectorAll(`a.active[href^="#author-"]`);
  for (const authorLink of authorLinks) {
    authorLink.classList.remove("active");
  }
  //find all chosen authors
  const allAuthorLinks = document.querySelectorAll(`a[href="${href}"]`);
  for (const allAuthorLink of allAuthorLinks) {
    allAuthorLink.classList.add("active");
  }
  generateTitleLinks('[data-author="' + tagAuthor + '"]');
}

function addClickListenersToAuthors() {
  //get all authors
  const allAuthorLinks = document.querySelectorAll('a[href^="#author-"]');

  for (let allAuthorLink of allAuthorLinks) {
    //use CLICK on authors
    allAuthorLink.addEventListener("click", authorClickHandler);
  }
}
addClickListenersToAuthors();
