const refs = {
  inputForm: document.querySelector("#js-form"),
};
let list = document.querySelector("#list");
let pagination = document.querySelector("#pagination");
let showModal = document.querySelector(".modal-trigger");
let modal = document.querySelector("#modal1 ");
let hideModal = document.querySelector(".modal-close");

refs.inputForm.addEventListener("submit", addPost);
showModal.addEventListener("click", openModal);
hideModal.addEventListener("click", closeModal);

let allPosts = [];
let currentPage = 1;
let rows = 3;

// Get posts
(async function getPosts() {
  try {
    const posts = await axios.get("http://localhost:3001/posts");
    allPosts.push(...posts.data);
    SetupPagination(allPosts, pagination, rows);
  } catch (error) {
    console.error("GET  zapros", error);
  }
})();

// ADD POST
async function addPost(e) {
  e.preventDefault();
  const title = e.currentTarget.elements.title.value;
  const text = e.currentTarget.elements.note.value;

  try {
    const addpost = await axios.post("http://localhost:3001/posts", {
      title,
      text,
    });
    closeModal();
    window.location.replace("/");
    return addpost;
  } catch (error) {
    throw Error(error);
  }
}

//  DELETE post
function deletePost({ id }) {
  console.log("Delete", id);
  try {
    const url = `http://localhost:3001/posts/${id}`;
    return axios.delete(url).then((res) => {
      console.log(res);
    });
  } catch (error) {
    throw Error(error);
  }
}

//Pagination

function DisplayList(items, wrapper, rowsOnPage, page) {
  wrapper.innerHTML = "";
  page--;
  let start = rowsOnPage * page;
  let end = start + rowsOnPage;
  let paginatedItems = items.slice(start, end);

  paginatedItems.map((item) => {
    const markup = `
          <li class="collection-item purple accent-1" id=${item._id}> 
      <h3 class="modal__title blue lighten-3">${item.title}</h3>
      <p classs="modal__text blue lighten-3" >${item.text}</p></div> 
      <a href="/" class="notes-delete btn red accent-4" id=${item._id} onclick="deletePost(this)">Delete</a>
      </li>
`;
    wrapper.insertAdjacentHTML("beforeend", markup);
  });
}

function SetupPagination(posts, wrapper, rowsOnPage) {
  wrapper.innerHTML = "";
  let pageCount = Math.ceil(posts.length / rowsOnPage);
  for (let i = 0; i < pageCount; i++) {
    let paginationPosts = PaginationButton(i + 1, posts);
    wrapper.insertAdjacentElement("beforeend", paginationPosts);
  }
}

function PaginationButton(page, posts) {
  let button = document.createElement("button");
  button.textContent = +page;

  if (currentPage == page) button.classList.add("active");

  DisplayList(posts, list, rows, currentPage);

  button.addEventListener("click", function () {
    currentPage = page;
    DisplayList(posts, list, rows, currentPage);
    let currentBtn = document.querySelector(".pagenumbers button.active");
    currentBtn.classList.remove("active");
  });

  return button;
}

function openModal(e) {
  window.addEventListener("keydown", onPressEscape);
  modal.hidden = false;
}
function closeModal() {
  window.removeEventListener("keydown", onPressEscape);
  modal.hidden = true;
}

function onPressEscape(event) {
  if (event.code === "Escape") {
    console.log("Надо закрыть, нажали ESC");
    modal.hidden = true;
  }
}
