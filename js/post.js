async function loadPost() {
    let parameters = new URLSearchParams(window.location.search);
    let name = parameters.get("name");

    if (name == null) return;

    let blog = await fetch(`./blog/${name}.md`).then((res) => res.text());
    let parsedBlog = `<div class="blog-content">${marked.parse(blog)}</div>`;

    let blogElement = document.createElement("div");
    blogElement.className = "blog";
    document.body.appendChild(blogElement);
    blogElement.innerHTML += parsedBlog;

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
