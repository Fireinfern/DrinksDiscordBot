const { default: axios } = require("axios")

module.exports = {
    name: 'rdrink',
    descripcion: 'Get a Random Drink',
    execute(msg, args) {
        axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php').then(
            (response) => {
                let drink = response.data.drinks[0];
                msg.reply(drink.strDrink);
                msg.channel.send(`**${drink.strCategory}** --- **${drink.strAlcoholic}**
                Glass: ${drink.strGlass}
                Ingridients: ${drink.strIngredient1} => ${drink.strMeasure1}
                ${drink.strIngredient2} => ${drink.strMeasure2}
                ${drink.strIngredient3} => ${drink.strMeasure3}
                `);
            }
        );
    }
}