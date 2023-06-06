function loadProjects()
{
  let numberOfColumns = 3;

  for (let i = 0; i < numberOfColumns; i++) {
    let newColumn = document.createElement("div");
    newColumn.className = "column";
    document.querySelector(".projects").appendChild(newColumn);
  }

  let columns = document.querySelectorAll(".projects .column")
  let projects = document.querySelectorAll(".projects .container");

  projects.forEach(project => {
    let smallestIndex = 0;

    for (let i = 1; i < columns.length; i++) {
      if (columns[i].getBoundingClientRect().height < columns[smallestIndex].getBoundingClientRect().height) {
        smallestIndex = i;
      }
    }

    columns[smallestIndex].appendChild(project);
  });
}

async function loadRepositories()
{
  let numberOfColumns = 3;

  for (let i = 0; i < numberOfColumns; i++) {
    let newColumn = document.createElement("div");
    newColumn.className = "column";
    document.querySelector(".repositories").appendChild(newColumn);
  }

  let columns = document.querySelectorAll(".repositories .column")
  let repositories = await fetchRepositories();

  repositories.forEach(repository => {
    let smallestIndex = 0;

    for (let i = 1; i < columns.length; i++) {
      if (columns[i].getBoundingClientRect().height < columns[smallestIndex].getBoundingClientRect().height) {
        smallestIndex = i;
      }
    }

    let newContainer = document.createElement("div");
    newContainer.className = "container";
    newContainer.innerHTML = `<p class="title">${repository.name}</p><p class=description>${repository.description}</p>`;
    
    columns[smallestIndex].appendChild(newContainer);
  });
}

async function fetchRepositories() {
  const response = await fetch("https://api.github.com/users/Brumus14/repos");
  const repositories = await response.json();
  
  return repositories;
}