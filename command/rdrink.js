const { default: axios } = require("axios")

module.exports = {
    name: 'rdrink',
    descripcion: 'Get a Random Drink',
    execute(msg, args) {
        axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php').then(
            (response) => {
                let drink = response.data.drinks[0];
                let message = `**${drink.strCategory}** --- **${drink.strAlcoholic}** \nGlass: ${drink.strGlass} \nIngridients: ${drink.strIngredient1} => ${drink.strMeasure1}`
                for (let i = 2; i <= 15; i++){
                    if(drink[`strIngredient${i}`] == null) break;
                    message += `\n ${drink[`strIngredient${i}`]} => ${drink[`strMeasure${i}`]}`
                }
                msg.channel.send(drink.strDrink);
                message += `\n Preparation: ${drink.strInstructions}`
                msg.channel.send(message);
            }
        );
    }
}