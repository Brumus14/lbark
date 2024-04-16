let blogData = [
  ["Creating this website", "Programming | Website Development", "16/04/2024", "lBark"],
  ["Little Man Computer Interpreter", "Programming | Rust", "15/04/2024", "LMCI"],
  ["This is a test", "Test", "16/04/2024", "test"]
];

async function loadBlogs() {
  for (let i = 0; i < blogData.length; i++) {
    let newBlog = document.createElement("div");
    newBlog.className = "blog-item";
    newBlog.innerHTML = `<p class="blog-title">${blogData[i][0]}</p><p class="blog-tags">${blogData[i][1]}</p><p class="blog-date">${blogData[i][2]}</p>`

    let blogName = blogData[i][3];

    newBlog.addEventListener("click", () => {
      displayBlog(blogName);
    });
    
    document.querySelector(".blogs-container").appendChild(newBlog);

    hoverableElement(document.querySelectorAll(".blog-item"));
  }
}

// async function fetchBlogs() {
//   let promises = blogData.map(async (blogName) => {
//     let response = await fetch("blogs/" + blogName + ".md");
//     return response.text();
//   });

//   let blogs = await Promise.all(promises);
//   return blogs;
// }

async function fetchBlog(blogName) {
  let response = await fetch("blogs/" + blogName + ".md");
  return response.text();
}

async function displayBlog(blogName) {
  let blogElement = document.querySelector(".blog");

  blogElement.style.display = "flex";

  blogElement.innerHTML = await parseBlog(blogName);

  blogElement.querySelectorAll("code").forEach(code => {
    if (code.className == "") {
      code.className = "language-text";
    }
  });

  Prism.highlightAll();
}

function hideBlog() {
  let blogElement = document.querySelector(".blog");

  blogElement.style.display = "none";
}

async function parseBlog(blogName) {
  let blogDataIndex = 0;

  for (let i = 0; i < blogData.length; i++) {
    if (blogData[i].includes(blogName)) {
      blogDataIndex = i;
      break;
    }
  }

  let blog = await fetchBlog(blogName);
  let parsedBlog = `<p class="title">${blogData[blogDataIndex][0]}</p>`;

  parsedBlog += `<div class="blog-content">${marked.parse(blog)}</div>`;

  return parsedBlog;
}