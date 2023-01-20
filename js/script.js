"use strict";
const templates = {
  articleLink: Handlebars.compile(
    document.querySelector("#template-article-link").innerHTML
  ),
  tagLink: Handlebars.compile(
    document.querySelector("#template-article-tag").innerHTML
  ),
};

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
  optCloudClassPrefix = "tag-size-",
  optAuthorsListSelector = ".list.authors";

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
    const linkHTMLData = { id: articleID, title: title }; //taplate added
    const link = templates.articleLink(linkHTMLData);
    string += link;
  });
  /* insert link into titleList */
  titleList.innerHTML = string;
  const links = document.querySelectorAll(".titles a");

  for (let link of links) {
    link.addEventListener("click", titleClickHandler);
  }
}
generateTitleLinks();

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
    let html = " ";
    /* find tags wrapper */
    const articleTags = article.getAttribute("data-tags");
    /* get tags from data-tags attribute */
    const articleTagsArray = articleTags.split(" ");
    /* split tags into array */

    for (let tag of articleTagsArray) {
      /* START LOOP: for each tag */
      const linkHTMLData = { tag: tag, tag: articleTagsArray };
      const linkHTML = templates.tagLink(linkHTMLData);
      /*const linkHTML = `<li><a href="#tag-${tag}">${tag}</a></li>`;*/
      /* generate HTML of the link */
      /* make html variable with empty string */
      html = html + linkHTML;
      /* add generated code to html variable */
      /* [NEW] check if this link is NOT already in allTags */
      if (!allTags.hasOwnProperty(tag)) {
        /* [NEW] add tag to allTags object*/
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      } /* END LOOP: for each tag */
      console.log("allTags:", allTags);
      tagsWrapper.innerHTML = html;
      /* insert HTML of all the links into the tags wrapper */
    }
  } /* END LOOP: for every article: */

  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);
  const tagsParams = calculateTagsParams(allTags);

  let allTagsHTML = " ";
  /* [NEW] create a variable for all links HTML code */
  for (let tag in allTags) {
    /* [NEW] generate code of a link and add it to allTagsHTML */
    const tagLinkHTML = `<li><a class="${calculateTagClass(
      allTags[tag],
      tagsParams
    )}" href="#tag-${tag}">${tag}(${allTags[tag]})</a></li>`;
    allTagsHTML += tagLinkHTML;
  }
  /* [NEW] add html from allTagsHTML to taglist */
  tagList.innerHTML = allTagsHTML;
}

generateTags();

function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute("href");
  console.log(href);

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace("#tag-", "");
  console.log(tag);

  /* find all tag links with class active */
  const activeLinksToTags = document.querySelectorAll(
    'a.active[href^="#tag-"]'
  );
  console.log(activeLinksToTags);

  /* START LOOP: for each active tag link */
  for (let activeLinkToTag of activeLinksToTags) {
    /* remove class active */
    activeLinkToTag.classList.remove("active");
    /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const allLinksToTags = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */
  for (let allLinkToTag of allLinksToTags) {
    /* add class active */
    allLinkToTag.classList.add("active");
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  const linksToTags = document.querySelectorAll(".post-tags a, .tags a");
  /* find all links to tags */
  for (let linkToTag of linksToTags) {
    /* START LOOP: for each link */
    linkToTag.addEventListener("click", tagClickHandler);
    /* add tagClickHandler as event listener for that link */
  } /* END LOOP: for each link */
}

addClickListenersToTags();

const optArticleAuthorSelector = ".list.authors";

function generateAuthors() {
  let allAuthors = {};
  const articles = document.querySelectorAll(optArticleSelector);
  /*find all articles*/
  let html = "";
  for (let article of articles) {
    const authorsWrapper = article.querySelector(optArticleAuthorSelector);
    console.log(authorsWrapper);
    const author = article.getAttribute("data-author");
    const html = `<li><a href="author-${author}">${author}</a></li>`;
    article.querySelector(".post-author").innerHTML = html;

    if (!allAuthors.hasOwnProperty(author)) {
      allAuthors[author] = 1;
    } else {
      allAuthors[author]++;
    }
    /* [NEW] find list of authors in right column */
    const authorsList = document.querySelector(optAuthorsListSelector);
    console.log(authorsList);
    /* [NEW] сreate variable for all links HTML code*/
    let allAuthorsHTML = "";
    for (let author in allAuthors) {
      /* [NEW] generate code of a link and add it to allAuthorsHTML */
      const authorLinkHTML = `<li><a href="#author-${author}">${author}(${allAuthors[author]})</a></li>`;
      console.log("authorLinkHTML:", authorLinkHTML);
      allAuthorsHTML += authorLinkHTML;
    }
    authorsList.innerHTML = allAuthorsHTML;
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
