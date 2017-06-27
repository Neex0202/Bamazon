//Requiring packages
var mysql = require("mysql");
var inquirer = require("inquirer");

//Creating connection to database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: "root",

    password: "",
    database: "bamazon"


});


//Upon establishing connection to database...
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);


    //Show product id, product_name, and price
    connection.query("SELECT id, product_name, price, stock_quantity FROM products", function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {

            console.log("id: " + res[i].id + "||" + " product: " + res[i].product_name + "||" + " price: " + res[i].price + " || stock quantity: " + res[i].stock_quantity);

        }


        // INQUIRER PROMPT FUNCTION to request ID of product
        pointOfSale();

        //INQUIRER PROMPT FUNCTION to request quantity of purchase


    });

});


// POINT OF SALE FUNCTION
function pointOfSale() {
    connection.query("SELECT id, product_name, price, stock_quantity FROM products", function(err, res) {
        if (err) throw err;

        //Inquirer prompting user for choice of item & quantity to purchase
        inquirer.prompt(
            [{
                    name: "productChoice",
                    type: "rawlist",
                    choices: function() {
                        // Setting an empty array to push products into using basic for loop
                        var itemArray = [];

                        for (var i = 0; i < res.length; i++) {
                            itemArray.push(res[i].product_name);

                        }
                        return itemArray;
                    },
                    message: "What would you like to buy?"
                }, {
                    name: "quantity",
                    type: "input",
                    message: "How many would you like to buy?"
                }

            ]).then(function(answer) {
            //
            console.log("You want to purchase " + answer.quantity + " item(s) of " + answer.productChoice);

            console.log(answer.productChoice);

            // console.log(res);
            //Pairing itemChosen variable to item within mySQL database using for loop to check if there is sufficient quantity in stock
            var itemChosen;
            for (var i = 0; i < res.length; i++) {
                if (res[i].product_name === answer.productChoice) {
                    itemChosen = res[i];
                }
            }
            //displaying raw data of itemChosen
            // console.log(itemChosen);
            // console.log(itemChosen.stock_quantity); --WORKING!


            //checking if sufficient stock in database --WORKING!
            if (itemChosen.stock_quantity > parseInt(answer.quantity)) {

                // setting newQuantity variable to stock quantity - user purchase quantity
                var newQuantity = itemChosen.stock_quantity - parseInt(answer.quantity);

                // console.log(newQuantity); --WORKING!

                //Updating mySQL database
                connection.query("UPDATE products SET ? WHERE ?", [{
                    stock_quantity: newQuantity
                }, {
                    id: itemChosen.id
                }], function(err, res) {
                    console.log(itemChosen.product_name + " product stock updated \n");
                    
                    //Show total cost of purchase
                    var totalCost = itemChosen.price * parseInt(answer.quantity);
                    console.log("Your total price is : " + totalCost);
                    connection.end();
                })

            }
            if(itemChosen.stock_quantity < parseInt(answer.quantity)){
            	console.log("OUT OF STOCK SUCKKKKAAAA");
            	connection.destroy();

            }
            
        })
    });
}


// //UPDATE STOCK FUNCTION
// function updateStock() {
//     console.log("Updating stock quantity \n");

//     var newQuantity = itemChosen.stock_quantity - parseInt(answer.quantity);

//     console.log("itemChosen quantity var:");
//     console.log(itemChosen.stock_quantity);


//     console.log("parsed answer.quantity:");
//     console.log(answer.quantity);

//     console.log(newQuantity);


//     connection.query("UPDATE products SET ? WHERE ?", [{
//         stock_quantity: newQuantity, //variable from user input
//     }, {
//         id: itemChosen.id //variable from user input
//     }], function(err, res) {
//         console.log(res.affctedRows + " product stock updated \n");
//         console.log(newQuantity);


//     })
// }

