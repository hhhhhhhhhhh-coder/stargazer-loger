const repositoryList = document.querySelector("#repository-list");

function showError(message) {
  const item = document.createElement("li");
  item.className = "status";
  item.textContent = message;
  repositoryList.replaceChildren(item);
}

function renderRepositories(repositories) {
  const items = repositories.map((repository) => {
    const item = document.createElement("li");
    const link = document.createElement("a");
    const description = document.createElement("p");
    const date = document.createElement("p");

    link.href = repository.url;
    link.textContent = repository.name;
    description.className = "repository-description";
    description.textContent = repository.description;
    date.className = "repository-date";
    date.textContent = `Starred on ${repository.starred_at}`;

    item.append(link, description, date);
    return item;
  });

  repositoryList.replaceChildren(...items);
}

async function loadRepositories() {
  try {
    const response = await fetch("events.json");
    if (!response.ok) {
      throw new Error(`Could not load repositories (${response.status}).`);
    }

    const repositories = await response.json();
    if (!Array.isArray(repositories)) {
      throw new Error("The repository data is not in the expected format.");
    }

    renderRepositories(repositories);
  } catch (error) {
    console.error("Failed to load starred repositories:", error);
    showError("Could not load starred repositories. Please try again later.");
  }
}

loadRepositories();
