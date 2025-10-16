(async () => {
  const containerItems = document.getElementById("list-card");
  const createCard = (rows) => {
    rows.forEach((element) => {
      const card = `<div class="content-cards">
        <div class="content-img">
          <img src="/static/img/${element.img}" alt="${element.nombre}" />
        </div>
        <div class="content-info">
          <div class="margin-10">
            <h4>Dato del curso</h4>
            <hr />
            <div class="content-text">
              <div>Código:</div>
              <div>${element.codigo}</div>
            </div>
            <div class="content-text">
              <div>Nombre:</div>
              <div>${element.nombre}</div>
            </div>
            <div class="content-text">
              <div>Créditos:</div>
              <div>${element.creditos}</div>
            </div>
          </div>
        </div>
      </div>`;
      containerItems.innerHTML += card;
    });
  };
  async function getJson() {
    const url = `/static/data/cursos.json`;
    const rowsRaw = await fetch(url);
    const rows = await rowsRaw.json();
    return rows;
  }
  const rows = await getJson();
  createCard(rows);
})();
