const postContainer = document.getElementById("container-post");

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
  const getPost = async () => {
    const url = `https://jsonplaceholder.typicode.com/posts`;
    const data = await fetch(url);
    const posts = await data.json();
    return posts;
  };

  const renderPosts = (posts) => {
    let postCard = "";
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
              <div><button type="button" onclick="renderPostPage(${element.id})" class="btn btn-default">Ver más</button></div>
            </div>
          </div>
        </div>
      </div>`;
    });
    containerPosts.innerHTML = postCard;
  };

  const posts = await getPost();
  renderPosts(posts);
})();
