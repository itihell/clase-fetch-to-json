const postContainer = document.getElementById("container-post");
// postContainer.innerHTML = `<div class="container-loader">
//               <h4>Loading...</h4>
//               <div class="loader"></div>
//             </div>`;

const editPost = async (id) => {
  //TODO: Ir al api a traer los datos del post especifico
  const post = await showPost(id);

  //TODO: Borrar el contenido del contenedor del post
  postContainer.innerHTML = ``;

  //TODO: Rendizar el formulario de edicion con los datos del post
  rederFormEditPost(post);
};

const rederFormEditPost = (post) => {
  postContainer.innerHTML = ` <form class="form" action="" id="form-post">
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
                  <button type="submit">Guardar</button>
                </div>
              </div>
            </form>`;
};

const renderPostPage = async (id) => {
  const post = await showPost(id);
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
};

// Funcion para obtener los datos de un post
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

// Funcion para pintar la lista de los post dentro del contenedor
// Es una funcion autoejecutable
(async () => {
  const containerPosts = document.getElementById("list-card");
  containerPosts.innerHTML = `<div class="container-loader">
              <h4>Loading...</h4>
              <div class="loader"></div>
            </div>`;

  // Obtener listado de post de la api
  // https://jsonplaceholder.typicode.com/posts
  // fetch
  const getPost = async () => {
    const url = `https://jsonplaceholder.typicode.com/posts`;
    const data = await fetch(url);
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
              <button type="button" onclick="renderPostPage(${element.id})" class="btn btn-default">Ver más</button>
              <button type="button" onclick="editPost(${element.id})" class="btn btn-default">Editar</button>
              </div>
            </div>
          </div>
        </div>
      </div>`;
    });
    containerPosts.innerHTML = postCard;
  };

  const posts = await getPost();

  // Obtener el primer elemento del arreglo de posts
  // para mostrarlo en el contenedor principal
  //await renderPostPage(posts[0].id);

  // Pintar el primer post en el contenedor principal

  renderPosts(posts);
})();
