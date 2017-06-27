# Bamazon


Require packages

Declare variables

Set up database Connection

	.connect(function())

	show table upon connection (only Ids, names, and pr. columns)

	inquirer prompt

		function - id of product to purchase 

		function - quantity to purchase

	Send request of purchase back to database

		if sufficient stock then execute PURCHASE FUNCTION

			update SQL database

			console.log( TOTAL PRICE)

		if insufficent stock then console.log("Out of Stock")



	