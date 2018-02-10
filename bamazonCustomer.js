var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Beanie!2",
  database: "bamazonDB"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    queryAllProducts();
  });

  function queryAllProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
      for (var i = 0; i < res.length; i++) {
        console.log(res[i].item_id + " | " + res[i].product_name + " | $" + res[i].price);
      }
      console.log("-----------------------------------");
      inquirer.prompt([
        {
            type: "input",
            name: "what",
            message: "What would you like to buy? Enter the item id",
            
        }, {
            type: "input",
            name: "qty",
            message: "How many units would you like to buy? Enter # of units"
        }
    ]).then(function(answers) {
        answers.what = parseFloat(answers.what);
        answers.qty = parseFloat(answers.qty);
        // var productQty = "SELECT stock_qty FROM products WHERE item_id=" + answers.what;
        // var productPrice = "SELECT price FROM products WHERE item_id=" + answers.what;
        var productID = answers.what;
        var productQty = answers.qty;
        purchaseFromDatabase(productID, productQty);
    
        // console.log(answers.what + " " + typeof answers.what);
        // console.log(answers.qty + " " + typeof answers.what)
    });
    });
};
function purchaseFromDatabase(productID, productQty) {
    connection.query('SELECT * FROM products WHERE item_id = ' + productID, function(error, response) {
        if (error) { console.log(error) };
        productQty = parseFloat(productQty);
    if (productQty - response[0].stock_qty > 0) {
        var totalCost = response[0].price * productQty;
        console.log("Order Placed. \nYour total is $" + (response[0].stock_qty*totalCost) + ". \nThanks");
        connection.query('UPDATE products SET stock_qty = stock_qty - ' + productQty + ' WHERE ItemID = ' + ID);

    } else {
        console.log("Insufficient Stock");
    }
})
}
