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
	console.log(blogData[blogDataIndex][0]);

	parsedBlog += `<div class="blog-content">${marked.parse(blog)}</div>`;

	return parsedBlog;
}

async function displayBlog(blogName) {
	// let blogContainerElement = document.querySelector(".blog-container");
	let blogElement = document.createElement("div");
	blogElement.className = "blog";

	document.body.appendChild(blogElement);

	// blogContainerElement.style.display = "flex";

	blogElement.innerHTML += await parseBlog(blogName);

	blogElement.querySelectorAll("code").forEach((code) => {
		if (code.className == "") {
			code.className = "language-text";
		}
	});

	Prism.highlightAll();

	hoverableElement(document.querySelectorAll("a"));
}

async function fetchBlog(blogName) {
	let response = await fetch("../blog_sources/" + blogName + ".md");
	return response.text();
}
