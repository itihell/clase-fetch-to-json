(async () => {
  const containerMenus = document.getElementById("nav-list");
  const getMenus = async () => {
    const url = "/static/data/menus.json";
    const response = await fetch(url);
    const menus = await response.json();
    return menus;
  };

  const createMenus = (menus) => {
    menus.forEach((element) => {
      const plantilla = `<li><a href="${element.link}">${element.name}</a></li>`;
      containerMenus.innerHTML += plantilla;
    });
  };

  const menus = await getMenus();
  createMenus(menus);
})();
