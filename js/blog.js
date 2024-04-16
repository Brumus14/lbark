let blogNames = [["Little Man Computer Interpreter", "Programming | Rust", "15/04/2024", "LMCI"]];

async function loadBlogs() {
  const blogs = await fetchBlogs();

  let blogIndex = 0;

  blogs.forEach(blog => {
    let blogLines = blog.split('\n').map(line => line.trim());

    let newBlog = document.createElement("div");
    newBlog.className = "blog-item";
    newBlog.innerHTML = `<p class="blog-title">${blogNames[blogIndex][0]}</p><p class="blog-tags">${blogNames[blogIndex][1]}</p><p class="blog-date">${blogNames[blogIndex][2]}</p>`

    let blogName = blogNames[blogIndex][3];

    newBlog.addEventListener("click", () => {
      displayBlog(blogName);
    });
    
    document.querySelector(".blogs-container").appendChild(newBlog);

    hoverableElement(document.querySelectorAll(".blog-item"));

    blogIndex++;
  });
}

async function fetchBlogs() {
  let promises = blogNames.map(async (blogName) => {
    let response = await fetch("blogs/" + blogName + ".md");
    return response.text();
  });

  let blogs = await Promise.all(promises);
  return blogs;
}

async function fetchBlog(blogName) {
  let response = await fetch("blogs/" + blogName + ".md");
  return response.text();
}

async function displayBlog(blogName) {
  let blogElement = document.querySelector(".blog");

  blogElement.style.display = "flex";

  blogElement.innerHTML = await parseBlog(blogName);

  Prism.highlightAll();
}

function hideBlog() {
  let blogElement = document.querySelector(".blog");

  blogElement.style.display = "none";
}

async function parseBlog(blogName) {
  let blog = await fetchBlog(blogName);
  let parsedBlog = "";

  // let blogLines = blog.split("\n").map(line => line.trim());
  // blogLines = blogLines.slice(4, blogLines.length);
  // console.log(blogLines);

  // parsedBlog = `<p>${blogLines.join("<br>")}</p>`;

  // console.log(parsedBlog);

  parsedBlog = marked.parse(blog);

  return parsedBlog;
}