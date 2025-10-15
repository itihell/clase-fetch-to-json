(() => {
  async function getJson(url) {
    const url = `/static/data/cursos.json`;
    const rowsRaw = await fetch(url);

    console.log({ rowsRaw });
  }
})();
