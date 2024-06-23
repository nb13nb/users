const userList = document.querySelector(".users");
const nextButton = document.getElementById("next");
const prevButton = document.getElementById("prev");
let page = 1;
let total;

function getUsers(page) {
  fetch("https://reqres.in/api/users?page=" + page, {
    method: "GET"
  })
    .then((response) => {
      if (!response.ok) {
        throw response.status;
      }
      return response.json();
    })
    .then((data) => {
      const fragment = new DocumentFragment();
      const users = data.data;
      total = data.total_pages;
      users.forEach((user) => {
        const listItem = document.createElement("li");
        const name = document.createElement("p");
        name.textContent = `${user.first_name} ${user.last_name}`;
        const avatar = document.createElement("img");
        avatar.src = user.avatar;
        listItem.appendChild(avatar);
        listItem.append(name);
        fragment.appendChild(listItem);
      });
      userList.innerHTML = "";
      userList.appendChild(fragment);

      buttonDisabled();
    })
    .catch((error) => {
      displayError("Error");
    });
}

getUsers(page);

nextButton.addEventListener("click", () => {
  if (page === total) {
    return;
  }
  page++;
  getUsers(page);
});

prevButton.addEventListener("click", () => {
  if (page === 1) {
    return;
  }
  page--;
  getUsers(page);
});

function buttonDisabled() {
  if (page === 1) {
    prevButton.classList.add("disabled");
    nextButton.classList.remove("disabled");
  } else if (page === total) {
    nextButton.classList.add("disabled");
    prevButton.classList.remove("disabled");
  } else {
    prevButton.classList.remove("disabled");
    nextButton.classList.remove("disabled");
  }
}

function displayError(message) {
  const errorMessage = document.createElement("h1");
  errorMessage.textContent = message;
  document.body.appendChild(errorMessage);
}

