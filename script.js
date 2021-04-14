const app = {};

// counter to create new ids
let pokeDiv = 0;

app.init = () => {
    app.getPoke();
}

// input which brings out a pokemon from the pokeapi
app.getPoke = () => {
    $('form').on('submit', function(event){
        event.preventDefault();
        var pokeInput = $("#pokemon").val().toLowerCase();
        console.log(pokeInput);
        pokeDiv += 1;
        $.ajax({
            url: `https://pokeapi.co/api/v2/pokemon/${pokeInput}`,
            method: "GET",
            dataType: "json"
        }).then(data => {
            app.callPokemon(data);
        });
    })
};

// bringing forth pokemon
app.callPokemon = (data) => {
    // used to call the primary type from the types array of the respective pokemon
    var pokeType = data.types[0].type.name;

    // appends the selected pokemon to the current roster with its nickname, sprite, actual name, pokedex # and primary type
    // pokeDiv helps create a unique ID for each one
    const poke1append = `
    <div id="poke${pokeDiv}" class="poke active">
        <h3 class="name">${$('#nickname').val()}</h3>
        <div class="imageContainer">
            <img class="pokeImage" src=${data.sprites.front_default} alt=${data.name}>
        </div>
        <div class="info">
        <p class="pokeName">${data.name}</p>
        <p>Pokedex #${data.id}</p>
        <p class="pokeType">${pokeType} type</p>
    </div>
    `;
    $("#pokemonTeam").append(poke1append);

    // moves the selected pokemon between active and fallen
    $('#poke' + pokeDiv).on("click", function() {
        if ($(this).hasClass("active")) {
            $(this).appendTo('#defeatedParty');
            $(this).removeClass("active")
            $(this).addClass("inactive")
        }
        else {
            $(this).appendTo('#pokemonTeam');
            $(this).removeClass("inactive")
            $(this).addClass("active")
        }
        
    })

}

// document ready
$(function(){
    app.init();
});