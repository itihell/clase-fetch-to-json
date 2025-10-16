(async () => {
  const containerPosts = document.getElementById("list-card");
  const getPost = async () => {
    const url = `https://jsonplaceholder.typicode.com/posts`;
    const data = await fetch(url);
    const posts = await data.json();
    return posts;
  };

  const renderPosts = (posts) => {
    posts.forEach((element) => {
      const postCard = `<div class="content-cards">        
        <div class="content-info">
          <div class="margin-10">
            <h4>Dato del curso</h4>
            <hr />
            <div class="content-text">
              <div>Código:</div>
              <div>${element.id}</div>
            </div>
            <div class="content-text">
              <div>Nombre:</div>
              <div>${element.title}</div>
            </div>
            <div class="content-text">
              <div>Créditos:</div>
              <div>${element.body}</div>
            </div>
          </div>
        </div>
      </div>`;
      containerPosts.innerHTML += postCard;
      console.log(element);
    });
  };

  const posts = await getPost();
  renderPosts(posts);
  console.log(posts);
})();
