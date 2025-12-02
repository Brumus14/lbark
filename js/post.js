async function loadPost() {
    let parameters = new URLSearchParams(window.location.search);
    let name = parameters.get("name");

    if (name == null) return;

    let blog = await fetch(`./posts/${name}.md`).then((res) => res.text());
    let parsedBlog = marked.parse(blog);

    let blogElement = document.querySelector(".blog");

    const data = await getPostData(`${name}.md`);
    blogElement.innerHTML += `<p class="title">${data[0].slice(1, -1)}</p>`;

    blogElement.innerHTML += parsedBlog;
    blogElement.children[1].remove();
    blogElement.children[1].remove();

    document.querySelectorAll("pre code").forEach((e) => {
        hljs.highlightElement(e);
    });

    hoverableElement(document.querySelectorAll("a"));
}

function registerCustomHighlightLanguages() {
    hljs.registerLanguage("lmc", function (hljs) {
        return {
            name: "Little Man Computer",
            keywords: [
                "ADD",
                "SUB",
                "STA",
                "LDA",
                "BRA",
                "BRZ",
                "BRP",
                "INP",
                "OUT",
                "HLT",
                "DAT",
            ],
            contains: [
                {
                    className: "comment",
                    begin: /\/\/.*/,
                },
                {
                    className: "number",
                    match: /\b\d+\b/,
                },
                {
                    className: "string",
                    match: /\b(?!ADD|SUB|STA|LDA|BRA|BRZ|BRP|INP|OUT|HLT|DAT)[A-Za-z]+\b/,
                },
            ],
        };
    });
}
