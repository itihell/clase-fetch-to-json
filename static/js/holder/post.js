const postContainer = document.getElementById("container-post");
postContainer.innerHTML = `<div class="container-loader">
<h4>Loading...</h4>
<div class="loader"></div>
</div>`;

const containerPosts = document.getElementById("list-card");
containerPosts.innerHTML = `<div class="container-loader">
              <h4>Loading...</h4>
              <div class="loader"></div>
            </div>`;

const editPost = async (id) => {
  //TODO: Ir al api a traer los datos del post especifico
  const post = await showPost(id);

  //TODO: Borrar el contenido del contenedor del post
  postContainer.innerHTML = ``;

  //TODO: Rendizar el formulario de edicion con los datos del post
  rederFormEditPost(post);

  const form = document.getElementById("form-post");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const tempPost = await updatePost(e.target, id);
    containerPosts.innerHTML = `<div class="container-loader">
              <h4>Loading...</h4>
              <div class="loader"></div>
            </div>`;

    const posts = await getPost();
    renderPosts(posts);
    postContainer.innerHTML = `<div class="container-loader">
              <h4>Loading...</h4>
              <div class="loader"></div>
            </div>`;
    //TODO: Delay para simular la carga
    await new Promise((resolve) => setTimeout(resolve, 1000));
    renderPostPage(tempPost);
  });
};

//TODO: Metodo para hacer get a los comentarios de json placeholder
const getCommmentsPost = async (postId) => {
  const url = `https://jsonplaceholder.typicode.com/posts/${postId}/comments`;
  return await fetch(url)
    .then((response) => response.json())
    .then((json) => {
      return json;
    });
};

const renderCommnetsPost = (comments) => {
  let commentsCard = ``;
  comments.forEach((element) => {
    commentsCard += `<div class="margin-10">
              <div class="card-body">
                <i class="fa-solid fa-comment"></i>
                <div>${element.body}</div>
              </div>
              <div class="card-footer">
                <div><i class="fa-solid fa-user"></i></div>
                <div class="">
                  <div class="row gap">
                    <div>Email:</div>
                    <div>${element.email}</div>
                  </div>
                </div>
              </div>
            </div>`;
  });
  return commentsCard;
};

const rederFormEditPost = (post) => {
  postContainer.innerHTML = ` <form class="form"  method="PUT" action="" id="form-post">
  <div class="form-container margin-10">
  <div class="row-control">
  <div><label for="title">Título:</label></div>
  <div>
  <input
  class="form-control"
  type="text"
  id="title"
  value="${post.title}"
  name="title"
  />
  </div>
  </div>
  <div class="row-control">
  <div><label for="body">Cuerpo:</label></div>
  <div>
  <textarea
  class="form-control"
  id="body"
  cols="30"
  rows="10"
  name="body"
  >${post.body}</textarea>
  </div>
  </div>
  <div>
  <button type="submit">Actualizar</button>
  </div>
  </div>
  </form>`;
};

const updatePost = async (bodyForm, id) => {
  const formData = new FormData(bodyForm);
  const title = formData.get("title");
  const body = formData.get("body");
  //TODO: Listener para el envio del formulario
  const url = `https://jsonplaceholder.typicode.com/posts/${id}`;
  return fetch(url, {
    method: "PATCH",
    body: JSON.stringify({
      title: title,
      body: body,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      return json;
    });
};

const oneShowPost = async (id) => {
  const post = await showPost(id);
  renderPostPage(post);
};

const renderPostPage = async (post) => {
  //const post = await showPost(id);
  const user = await showUser(post.userId);

  postContainer.innerHTML = ` <div class="margin-10">
              <div class="card-header bg-primary">
                <div><h1>${post.title}</h1></div>
              </div>
              <div class="card-body">${post.body}</div>
              <div class="card-footer">
                <div><h4>Datos del Autor</h4></div>
                <div class="">
                  <div class="row gap">
                    <div>Nombre:</div>
                    <div>${user.name}</div>
                  </div>
                  <div class="row gap">
                    <div>Email:</div>
                    <div>${user.email}</div>
                  </div>
                </div>
              </div>
            </div>`;

  //TODO: Traer los comentarios del post
  const comments = await getCommmentsPost(post.id);
  console.log({ comments });

  postContainer.innerHTML += renderCommnetsPost(comments);
};

// especifico
const showPost = async (id) => {
  const url = `https://jsonplaceholder.typicode.com/posts/${id}`;
  const dataRaw = await fetch(url);
  const data = await dataRaw.json();
  return data;
};

// Funcion para obtenes los datos de un usuario especifico
const showUser = async (id) => {
  const url = `https://jsonplaceholder.typicode.com/users/${id}`;
  const dataRaw = await fetch(url);
  const data = await dataRaw.json();
  return data;
};

const getPost = async () => {
  const url = `https://jsonplaceholder.typicode.com/posts`;
  const data = await fetch(url);
  //delay de 2 segundos para simular la carga
  //await new Promise((resolve) => setTimeout(resolve, 2000));
  const posts = await data.json();
  return posts;
};

const renderPosts = (posts) => {
  let postCard = ``;
  posts.forEach((element) => {
    postCard += `<div class="content-cards">        
        <div class="content-info">
          <div class="margin-10">
            <h4>Dato del POST</h4>
            <hr />
            <div class="content-text">
              <div>Código:</div>
              <div>${element.id}</div>
            </div>
            <div class="content-text">
              <div>Titulo:</div>
              <div>${element.title}</div>
            </div>
            <div class="content-text">
              <div>Desarrollo:</div>
              <div>${element.body}</div>
            </div>
            <div class="content-text">
              <div></div>
              <div>
              <button type="button" onclick="oneShowPost(${element.id})" class="btn btn-default">Ver más</button>
              <button type="button" onclick="editPost(${element.id})" class="btn btn-default">Editar</button>
              </div>
            </div>
          </div>
        </div>
      </div>`;
  });
  containerPosts.innerHTML = postCard;
};
// Funcion para pintar la lista de los post dentro del contenedor
// Es una funcion autoejecutable
(async () => {
  const posts = await getPost();
  await oneShowPost(posts[0].id);
  renderPosts(posts);
})();
