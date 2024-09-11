$(document).ready(function(){
    //code here!
    //console.log("Hello World!");

    fetch("pokedex.json")
    .then((response) => response.json())
    .then(pokedex => {
        //check pokedex
        //console.log(pokedex);
        
        let idForPage = 0;
        pokedex.forEach(pokemon => {
            console.log(pokemon);

            //init ID, name, Type, image

            //
            let id = (pokemon["id"] + 10000).toString().substring(1);
            let name = pokemon["name"]["english"];
            let image = pokemon["image"]["hires"];
            let types = pokemon["type"];
            let typesHtml = "";

            types.forEach(type => {
                typesHtml += `<span class="${type.toLowerCase()}">${type}</span>`
            });

            $(".pokemon-container").append(
                `<div class="card">
                    <img src="${image}" alt="${name}" />
                    <ul type="none">
                    <li class="pokemon-id">#${id}</li>
                    <li class="pokemon-name">
                        <a href="pages/pokemon.html?id=${idForPage++}">${name}</a>
                    </li>
                    <li class="pokemon-type">
                        ${typesHtml}
                    </li>
                    </ul>
                </div>`
            );
            
            // console.log(name);

        });
    });
});