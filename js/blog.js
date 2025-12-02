async function loadBlogs() {
    const posts = await getPosts();

    for (const post of posts) {
        const data = await getPostData(post);

        let newBlog = document.createElement("a");
        newBlog.className = "blog-item";
        newBlog.innerHTML = `
    <p class="blog-title">${data[0].slice(1, -1)}</p>
    <div class="blog-tags"></div>
    <p class="blog-date">${data[1].slice(1, -1)}</p>`;
        console.log(data);

        JSON.parse(data[2]).forEach((tag) => {
            let newTag = document.createElement("p");
            newTag.className = "blog-tag";
            newTag.innerHTML = tag;

            newBlog.querySelector(".blog-tags").appendChild(newTag);
        });

        newBlog.setAttribute(
            "href",
            `./post.html?name=${post.substr(0, post.indexOf("."))}`,
        );

        document.querySelector(".blogs-container").appendChild(newBlog);

        hoverableElement(document.querySelectorAll(".blog-item"));
    }

    //     for (let i = 0; i < blogData.length; i++) {
    //         let newBlog = document.createElement("a");
    //         newBlog.className = "blog-item";
    //         newBlog.innerHTML = `
    // <p class="blog-title">${blogData[i][0]}</p>
    // <div class="blog-tags"></div>
    // <p class="blog-date">${blogData[i][2]}</p>`;
    //
    //         blogData[i][1].forEach((tag) => {
    //             let newTag = document.createElement("p");
    //             newTag.className = "blog-tag";
    //             newTag.innerHTML = tag;
    //
    //             newBlog.querySelector(".blog-tags").appendChild(newTag);
    //         });
    //
    //         let blogName = blogData[i][3];
    //
    //         newBlog.setAttribute("href", "./blogs/" + blogName + ".html");
    //
    //         document.querySelector(".blogs-container").appendChild(newBlog);
    //
    //         hoverableElement(document.querySelectorAll(".blog-item"));
    //     }
}

async function getPosts() {
    const post_files_res = await fetch(
        "http://api.github.com/repos/Brumus14/lbark/contents/posts",
    ).then((res) => res.json());

    return (post_files = post_files_res
        .filter((f) => f.name.endsWith(".md"))
        .map((f) => f.name));
}

async function getPostData(file) {
    const blog = await fetch(`./posts/${file}`).then((res) => res.text());

    const metadata = /^---\n([\s\S]+?)\n---/.exec(blog)[1];

    return metadata.split("\n").map((line) => line.split(":")[1].trim());
}
