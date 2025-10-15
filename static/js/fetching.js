(() => {
  async function getJson() {
    const url = `/static/data/cursos.json`;
    const rowsRaw = await fetch(url);
    const rows = await rowsRaw.json();
    console.log({ rows });
  }
  getJson();
})();
