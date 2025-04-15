async function loadBlogs() {
	for (let i = 0; i < blogData.length; i++) {
		let newBlog = document.createElement("a");
		newBlog.className = "blog-item";
		newBlog.innerHTML = `
<p class="blog-title">${blogData[i][0]}</p>
<div class="blog-tags"></div>
<p class="blog-date">${blogData[i][2]}</p>`;

		blogData[i][1].forEach((tag) => {
			let newTag = document.createElement("p");
			newTag.className = "blog-tag";
			newTag.innerHTML = tag;

			newBlog.querySelector(".blog-tags").appendChild(newTag);
		});

		let blogName = blogData[i][3];

		newBlog.setAttribute("href", "./blogs/" + blogName + ".html");

		document.querySelector(".blogs-container").appendChild(newBlog);

		hoverableElement(document.querySelectorAll(".blog-item"));
	}
}

async function fetchBlog(blogName) {
	let response = await fetch("blog_sources/" + blogName + ".md");
	return response.text();
}

// async function displayBlog(blogName) {
// 	let blogContainerElement = document.querySelector(".blog-container");
// 	let blogElement = document.querySelector(".blog");
//
// 	blogContainerElement.style.display = "flex";
//
// 	blogElement.innerHTML += await parseBlog(blogName);
//
// 	blogElement.querySelectorAll("code").forEach((code) => {
// 		if (code.className == "") {
// 			code.className = "language-text";
// 		}
// 	});
//
// 	Prism.highlightAll();
// }

// function hideBlog() {
// 	let blogElement = document.querySelector(".blog");
//
// 	blogElement.style.display = "none";
// }

// async function parseBlog(blogName) {
// 	let blogDataIndex = 0;
//
// 	for (let i = 0; i < blogData.length; i++) {
// 		if (blogData[i].includes(blogName)) {
// 			blogDataIndex = i;
// 			break;
// 		}
// 	}
//
// 	let blog = await fetchBlog(blogName);
// 	let parsedBlog = `<p class="title">${blogData[blogDataIndex][0]}</p>`;
//
// 	parsedBlog += `<div class="blog-content">${marked.parse(blog)}</div>`;
//
// 	return parsedBlog;
// }
