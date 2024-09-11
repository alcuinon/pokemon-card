$(() => {
  //this is how you get the id from the url
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get("id");
  console.log(id);

  fetch("../pokedex.json")
    .then((rawData) => rawData.json())
    .then((pokedex) => {
      //console.log(pokedex);
      console.log(pokedex[id]);

      let pokemon = pokedex[id];
      let pokemonId = (pokemon["id"] + 10000).toString().substring(1);
      let name = pokemon["name"]["english"];
      let image = pokemon["image"]["hires"];
      let desc = pokemon["description"];
      let types = pokemon["type"];
      let typesHtml = "";
      types.forEach((type) => {
        typesHtml += `<span class="${type.toLowerCase()}">${type}</span>`;
      });
      let species = pokemon["species"];
      let height = pokemon["profile"]["height"];
      let weight = pokemon["profile"]["weight"];
      let abilities = pokemon["profile"]["ability"];
      let abilitiesHtml = "";
      abilities.forEach((ability) => {
        abilitiesHtml += `<span class="pokemon-ability">${ability[0]}</span>`;
      });

      //display
      $("#pokemon-page-name").html(name);
      $(".pokemon-page-description").html(desc);
      $(".pokemon-page-image").html(`<img src="${image}" alt="${name}"/>`);

      //details
      $(".pokemon-page-id").html(pokemonId);
      $(".pokemon-type").html(typesHtml);
      $(".pokemon-page-species").html(species);
      $(".pokemon-page-height").html(height);
      $(".pokemon-page-weight").html(weight);
      $(".pokemon-page-abilities").html(abilitiesHtml);

      //stats
      let hp = pokemon["base"]["HP"];
      let attack = pokemon["base"]["Attack"];
      let defense = pokemon["base"]["Defense"];
      let sp_attack = pokemon["base"]["Sp. Attack"];
      let sp_defense = pokemon["base"]["Sp. Defense"];
      let speed = pokemon["base"]["Speed"];
      let hp_per = (hp / 200) * 100;
      let attack_per = (attack / 200) * 100;
      let defense_per = (defense / 200) * 100;
      let sp_attack_per = (sp_attack / 200) * 100;
      let sp_defense_per = (sp_defense / 200) * 100;
      let speed_per = (speed / 200) * 100;
      let total = hp + attack + defense + sp_attack + sp_defense + speed;

      $(".hp-val").html(`<div>${hp}</div>`);
      $(".attack-val").html(`<div>${attack}</div>`);
      $(".defense-val").html(`<div>${defense}</div>`);
      $(".sp-attack-val").html(`<div>${sp_attack}</div>`);
      $(".sp-defense-val").html(`<div>${sp_defense}</div>`);
      $(".speed-val").html(`<div>${speed}</div>`);
      $(".total").html(`<div>${total}</div>`);

      getColorForPercentage(".hp div", hp_per, 1000);
      getColorForPercentage(".attack div", attack_per, 1000);
      getColorForPercentage(".defense div", defense_per, 1000);
      getColorForPercentage(".sp-attack div", sp_attack_per, 1000);
      getColorForPercentage(".sp-defense div", sp_defense_per, 1000);
      getColorForPercentage(".speed div", speed_per, 1000);
    });

  let getColorForPercentage = function (selector, percent, time) {
    let percentColors = [
      { pct: 0, color: "#FF0000" },
      { pct: 3, color: "#FF0000" },
      { pct: 6, color: "#FF0000" },
      { pct: 9, color: "#FF1100" },
      { pct: 12, color: "#FF2300" },
      { pct: 16, color: "#FF3400" },
      { pct: 20, color: "#FF4600" },
      { pct: 23, color: "#FF5700" },
      { pct: 26, color: "#FF6900" },
      { pct: 29, color: "#FF7B00" },
      { pct: 32, color: "#FF8C00" },
      { pct: 35, color: "#FF9E00" },
      { pct: 39, color: "#FFAF00" },
      { pct: 43, color: "#FFC100" },
      { pct: 47, color: "#FFD300" },
      { pct: 50, color: "#FFE400" },
      { pct: 53, color: "#FFF600" },
      { pct: 56, color: "#F7FF00" },
      { pct: 59, color: "#E5FF00" },
      { pct: 62, color: "#D4FF00" },
      { pct: 65, color: "#C2FF00" },
      { pct: 69, color: "#B0FF00" },
      { pct: 71, color: "#9FFF00" },
      { pct: 75, color: "#8DFF00" },
      { pct: 79, color: "#7CFF00" },
      { pct: 81, color: "#6AFF00" },
      { pct: 84, color: "#58FF00" },
      { pct: 88, color: "#47FF00" },
      { pct: 91, color: "#24FF00" },
      { pct: 94, color: "#12FF00" },
      { pct: 100, color: "#00FF00" },
    ];
    let i = 0;
    let percentInterval = setInterval(function () {
      i++;
      if (percent >= percentColors[i].pct) {
        $(selector).css("background-color", percentColors[i].color);
      }
      if (percentColors[i].pct >= percent) {
        clearInterval(percentInterval);
      }
    }, time / 25);
    $(selector).animate(
      {
        width: (200 / 100) * percent,
      },
      time
    );
  };
});
