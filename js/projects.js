let defaultcolumnWidth = 680;
let numberOfColumns = Math.ceil(
	document.querySelector(".projects-container").getBoundingClientRect().width /
		defaultcolumnWidth,
);

// function loadProjects() {
// 	let projectData = [
// 		["Raycaster", "A basic raycasting program made in C++ with SFML"],
// 	];
//
// 	for (let i = 0; i < numberOfColumns; i++) {
// 		let newColumn = document.createElement("div");
// 		newColumn.className = "column";
// 		document.querySelector(".projects").appendChild(newColumn);
// 	}
//
// 	let columns = document.querySelectorAll(".projects .column");
//
// 	projectData.forEach((project) => {
// 		let newProject = document.createElement("div");
// 		newProject.className = "container";
// 		newProject.innerHTML = `
//     <p class="title">${project[0]}</p>
//     <p class="description">${project[1]}</p>`;
// 		document.querySelector(".projects").appendChild(newProject);
// 	});
//
// 	let projects = document.querySelectorAll(".projects .container");
//
// 	projects.forEach((project) => {
// 		let smallestIndex = 0;
//
// 		for (let i = 1; i < columns.length; i++) {
// 			if (
// 				columns[i].getBoundingClientRect().height <
// 				columns[smallestIndex].getBoundingClientRect().height
// 			) {
// 				smallestIndex = i;
// 			}
// 		}
//
// 		columns[smallestIndex].appendChild(project);
// 	});
//
// 	hoverableElement(document.querySelectorAll(".projects .container"));
// }

function loadWebApps() {
	let webAppData = [
		["Rollr", "An adjustable dice simulator", "rollr"],
		["Stimer", "A timer", "stimer"],
		["Genn", "Secure password generator", "genn"],
		["Rring", "A simple alarm", "rring"],
		["VCtimer", "A Rubiks cube timer with stats", "vctimer"],
		["Numer", "A basic easy to use calculator", "numer"],
		["Klick", "A minimal cps tester", "klick"],
	];

	for (let i = 0; i < numberOfColumns; i++) {
		let newColumn = document.createElement("div");
		newColumn.className = "column";
		document.querySelector(".web-apps").appendChild(newColumn);
	}

	let columns = document.querySelectorAll(".web-apps .column");

	webAppData.forEach((webApp) => {
		let newWebApp = document.createElement("div");
		newWebApp.className = "container";
		newWebApp.innerHTML = `
    <p class="title">${webApp[0]}</p>
    <p class="description">${webApp[1]}</p>
    <img src="./img/appLogos/${webApp[0].toLowerCase().replace(/ /g, "-")}.png" alt="">`;
		document.querySelector(".web-apps").appendChild(newWebApp);

		newWebApp.addEventListener("click", () => {
			window.open(`https://${webApp[2]}.netlify.app`);
		});
	});

	let webAppElements = document.querySelectorAll(".web-apps .container");

	webAppElements.forEach((app) => {
		let smallestIndex = 0;

		for (let i = 1; i < columns.length; i++) {
			if (
				columns[i].getBoundingClientRect().height <
				columns[smallestIndex].getBoundingClientRect().height
			) {
				smallestIndex = i;
			}
		}

		columns[smallestIndex].appendChild(app);
	});

	hoverableElement(document.querySelectorAll(".web-apps .container"));
}

async function loadRepositories() {
	for (let i = 0; i < numberOfColumns; i++) {
		let newColumn = document.createElement("div");
		newColumn.className = "column";
		document.querySelector(".repositories").appendChild(newColumn);
	}

	let columns = document.querySelectorAll(".repositories .column");
	let repositories = await fetchRepositories();

	repositories.forEach((repository) => {
		let smallestIndex = 0;

		for (let i = 1; i < columns.length; i++) {
			if (
				columns[i].getBoundingClientRect().height <
				columns[smallestIndex].getBoundingClientRect().height
			) {
				smallestIndex = i;
			}
		}

		let newContainer = document.createElement("div");
		newContainer.className = "container";
		newContainer.innerHTML = `<p class="title">${repository.name}</p>`;

		if (repository.description != null) {
			newContainer.innerHTML += `<p class=description>${repository.description}</p>`;
		}

		columns[smallestIndex].appendChild(newContainer);

		newContainer.addEventListener("click", () => {
			window.open(`${repository.html_url}`);
		});
	});

	hoverableElement(document.querySelectorAll(".repositories .container"));
}

async function fetchRepositories() {
	const response = await fetch("https://api.github.com/users/Brumus14/repos");
	const repositories = await response.json();

	return repositories;
}

async function updateProjects() {
	if (
		numberOfColumns !=
		Math.ceil(
			document.querySelector(".projects-container").getBoundingClientRect()
				.width / defaultcolumnWidth,
		)
	) {
		numberOfColumns = Math.ceil(
			document.querySelector(".projects-container").getBoundingClientRect()
				.width / defaultcolumnWidth,
		);

		document.querySelectorAll(".column").forEach((project) => {
			project.remove();
		});

		loadProjects();
		loadWebApps();
		await loadRepositories();
	}

	let columns = document.querySelectorAll(".column");

	columns.forEach((column) => {
		column.style.width = `calc((${column.parentElement.getBoundingClientRect().width}px - ((${numberOfColumns} - 1) * 2rem)) / ${numberOfColumns})`;
	});
}

