const { default: axios } = require("axios");

module.exports = {
    name: "drink",
    description: "Get the ingredients and the preparation of your favorite Drink",
    execute(msg, args){
        let url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
        axios.get(url + args[0]).then((response) => {
            let drink = response.data.drinks[0];
                let message = `**${drink.strCategory}** --- **${drink.strAlcoholic}** \nGlass: ${drink.strGlass} \nIngridients: ${drink.strIngredient1} => ${drink.strMeasure1}`
                for (let i = 2; i <= 15; i++){
                    if(drink[`strIngredient${i}`] == null) break;
                    message += `\n ${drink[`strIngredient${i}`]} => ${drink[`strMeasure${i}`]}`
                }
                msg.channel.send(drink.strDrink);
                message += `\n Preparation: ${drink.strInstructions}`
                msg.channel.send(message);
        }).catch((error) => console.log(error));
    }
}