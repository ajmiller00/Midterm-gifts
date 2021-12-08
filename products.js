var http = require('http');
var fs = require('fs');
var qs = require('querystring');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://amille26:cs20final@cluster0.ktqrs.mongodb.net/reveauchocolat?retryWrites=true&w=majority";

http.createServer(function (req, res) {
	file1 = 'gifts.html';
    fs.readFile(file1, function(err, txt) {
    	res.writeHead(200, {'Content-Type': 'text/html'});
        //res.write(txt);
    });
    MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
        if(err) { console.log("Connection err: " + err); return; }
        
        var dbo = db.db("reveauchocolat");
        var coll = dbo.collection('products');
	    theQuery1 = {gift: false, category: "Chocolate Bars"};

	    
	    theQuery0 = {gift: false};

	    coll.find(theQuery0).toArray(function(err, items) {
		    if (err) {
			  console.log("Error: " + err);
			  res.end();
		  	  db.close();
		    } 
		    else 
		    {
		    	res.write("<!DOCTYPE html><html lang='en'><head><script src='https://code.jquery.com/jquery-3.6.0.min.js' integrity='sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=' crossorigin='anonymous'>");
		    	res.write("</script><meta charset='UTF-8'><meta name='viewpor' content='width=device-width, initial-scale=1.0'><link rel='preconnect' href='https://fonts.googleapis.com'>");
    			res.write("<link rel='preconnect' href='https://fonts.gstatic.com' crossorigin><link href='https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@600;700&display=swap' rel='stylesheet'>");
    			res.write("<link rel='preconnect' href='https://fonts.googleapis.com'><link rel='preconnect' href='https://fonts.gstatic.com' crossorigin>");
    			res.write("<link href='https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@600;700&display=swap' rel='stylesheet'><link href='https://fonts.googleapis.com/css2?family=Amaranth&display=swap' rel='stylesheet'>");

				res.write("<title>General Product Catalog</title><link rel = 'stylesheet' type = 'text/css' href = 'style.css'>");
    			res.write("<style type = 'text/css'> body { font-family: 'Amaranth', sans-serif; } .img { max-width: 290px; max-height: 330px; background-size: cover; }");
        		res.write(".column { float: left; width: 25%; padding: 10px; height: 600px; border-right: 2px solid #003267; border-left: 2px solid #003267; font-weight: 600pt; font-size: 24pt; text-align:center; box-sizing: border-box;}");
        		res.write("h2 { text-align: left; font-size: 25pt; font-weight: 900; } h4 { font-size:  25px; color: #003267; } p { font-size: 15px; font-weight:300; }");
       			res.write("#products { background-color: #FCECC8; } #message { text-align:center; } #submit { text-align:center; }");
        		res.write("@media (max-width: 991px) { .column { width: 50%; } } @media (max-width:767px) { .img { max-width:200px; } }");
       			res.write("@media (max-width:479px) { h4 { font-size:20px; } .img { max-width: 150px; } } </style></head>");

       			res.write("<body><header><a href='index.html'><img src='logo-06.png' class='header'/></a>");
            	res.write("<nav><ul><li><a href='about_us.html'>About Us</a></li><li><a href='products.html' style='text-decoration: underline; text-underline-position: under; box-sizing: border-box;'>Shop</a></li>");
                res.write("<li><a href='catering.html'>Catering</a></li><li><a href='gifts.html'>Gifts</a></li>");
                res.write("<li><a href='workshops_events.html'>Events</a></li><li><a href='contact.html'>Contact Us</a></li></ul></nav>");
				res.write("<div class='burger' id = 'bur'><img src='burger.png' class='burger' onclick='show()'></div>");
				res.write("<div class='oBurger' id = 'burger'><ul id = 'burgerUl'><li><a href='about_us.html'>About Us</a></li><li><a href='products.html'>Shop</a></li>");
                res.write("<li><a href='catering.html'>Catering</a></li><li><a style = 'text-decoration: underline; text-underline-position: under; box-sizing: border-box;' href='gifts.html'>Gifts</a></li>");
                res.write("<li><a href='workshops_events.html'>Events</a></li><li><a href='contact.html'>Contact Us</a></li></ul></div></header>");

                res.write("<div id = 'products'><h1>General Catalog</h1><div class='choose' style='text-align:center;'>");
            	res.write("<h3 style='display:inline'> <a id='choo' href=#chocobars>Chocolate Bars</a> &nbsp; &nbsp; &nbsp; | &nbsp; &nbsp; &nbsp;</h3>");
            	res.write("<h3 style='display:inline'> <a id='choo' href=#cc+mf>Chocolate Classics + Mixed Fruits</a> &nbsp; &nbsp; &nbsp; | &nbsp; &nbsp; &nbsp;</h3>");
            	res.write("<h3 style='display:inline'> <a id='choo' href=#st>Signature Truffles</a> &nbsp; &nbsp; &nbsp; | &nbsp; &nbsp; &nbsp;</h3>");
            	res.write("<h3 style='display:inline'> <a id='choo' href=#chocoBakery>Chocolate Bakery</a> &nbsp; &nbsp; &nbsp;</h3></div><br><br>");
                
		    	res.write("<script language = 'javascript'>");
    			res.write("function product(name, cost) { this.name = name; this.cost = cost; } ");
		    	res.write("menuItems = new Array(");
		    	for (i=0; i<items.length; i++) {
            		res.write("new product(\"" + items[i].name + "\", " + items[i].price + ")");
					if (i != items.length - 1) res.write(", ");
            	}
                res.write(");");
				
				// res.write("function abc() { for (i = 0; i < menuItems.length; i++) { select = makeSelect('quan' + i, 0, 10); document.getElementsByName('product')[i].innerHTML = menuItems[i].name;");
    //             res.write("document.getElementsByName('price')[i].innerHTML = '$' + menuItems[i].cost.toFixed(2) + '&nbsp;&nbsp;&nbsp;&nbsp;' + select; }}");
				// res.write("window.onload = abc;");
				

				
				res.write("function makeSelect(name, minRange, maxRange){ var t= \"\"; t = \"<select id='\" + name + \"' size='1'>\"; for (j=minRange; j<=maxRange; j++)"); //
				res.write("t += \"<option value=\" + j+ \">\" + j + \"</option>\"; t+= \"</select>\"; return t; }"); // 
				
				res.write("$(document).ready(function() { $('#submit').click(function() { var totalQuantity = 0; var totalCost = 0; var msg = ''; for (i = 0; i< menuItems.length; i++) {");
                res.write("var quan = document.getElementById('quan' + i).value; if (quan != 0) { var cost = (menuItems[i].cost * quan); msg += quan + ' ' + menuItems[i].name + ' $' + cost + '<br>';");
                res.write("totalCost += parseFloat(cost);}} msg += 'Total Price: $' + totalCost; document.getElementById('totalMes').innerHTML = msg; });});");
        		res.write("function show() { if (document.getElementById('burger').style.display =='none') { document.getElementById('burger').style.display = 'block'; } else {");
        		res.write("document.getElementById('burger').style.display = 'none'; } } </script> ");
        		
		    }
		});
		
	    
		coll.find(theQuery1).toArray(function(err, items) {
		    if (err) {
			  console.log("Error: " + err);
			  res.end();
		  	  db.close();
		    } 
		    else 
		    {
		    	/*
		    	res.write("<!DOCTYPE html><html lang='en'><head><script src='https://code.jquery.com/jquery-3.6.0.min.js' integrity='sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=' crossorigin='anonymous'>");
		    	res.write("</script><meta charset='UTF-8'><meta name='viewpor' content='width=device-width, initial-scale=1.0'><link rel='preconnect' href='https://fonts.googleapis.com'>");
    			res.write("<link rel='preconnect' href='https://fonts.gstatic.com' crossorigin><link href='https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@600;700&display=swap' rel='stylesheet'>");
    			res.write("<link rel='preconnect' href='https://fonts.googleapis.com'><link rel='preconnect' href='https://fonts.gstatic.com' crossorigin>");
    			res.write("<link href='https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@600;700&display=swap' rel='stylesheet'><link href='https://fonts.googleapis.com/css2?family=Amaranth&display=swap' rel='stylesheet'>");

				res.write("<title>General Product Catalog</title><link rel = 'stylesheet' type = 'text/css' href = 'style.css'>");
    			res.write("<style type = 'text/css'> body { font-family: 'Amaranth', sans-serif; } .img { max-width: 290px; max-height: 330px; background-size: cover; }");
        		res.write(".column { float: left; width: 25%; padding: 10px; height: 600px; border-right: 2px solid #003267; border-left: 2px solid #003267; font-weight: 600pt; font-size: 24pt; text-align:center; box-sizing: border-box;}");
        		res.write("h2 { text-align: left; font-size: 25pt; font-weight: 900; } h4 { font-size:  25px; color: #003267; } p { font-size: 15px; font-weight:300; }");
       			res.write("#products { background-color: #FCECC8; } #message { text-align:center; } #submit { text-align:center; }");
        		res.write("@media (max-width: 991px) { .column { width: 50%; } } @media (max-width:767px) { .img { max-width:200px; } }");
       			res.write("@media (max-width:479px) { h4 { font-size:20px; } .img { max-width: 150px; } } </style></head>");

       			res.write("<body><header><a href='index.html'><img src='logo-06.png' class='header'/></a>");
            	res.write("<nav><ul><li><a href='about_us.html'>About Us</a></li><li><a href='products.html' style='text-decoration: underline; text-underline-position: under; box-sizing: border-box;'>Shop</a></li>");
                res.write("<li><a href='catering.html'>Catering</a></li><li><a href='gifts.html'>Gifts</a></li>");
                res.write("<li><a href='workshops_events.html'>Events</a></li><li><a href='contact.html'>Contact Us</a></li></ul></nav>");
				res.write("<div class='burger' id = 'bur'><img src='burger.png' class='burger' onclick='show()'></div>");
				res.write("<div class='oBurger' id = 'burger'><ul id = 'burgerUl'><li><a href='about_us.html'>About Us</a></li><li><a href='products.html'>Shop</a></li>");
                res.write("<li><a href='catering.html'>Catering</a></li><li><a style = 'text-decoration: underline; text-underline-position: under; box-sizing: border-box;' href='gifts.html'>Gifts</a></li>");
                res.write("<li><a href='workshops_events.html'>Events</a></li><li><a href='contact.html'>Contact Us</a></li></ul></div></header>");
               
                res.write("<div id = 'products'><h1>General Catalog</h1><div class='choose' style='text-align:center;'>");
            	res.write("<h3 style='display:inline'> <a id='choo' href=#chocobars>Chocolate Bars</a> &nbsp; &nbsp; &nbsp; | &nbsp; &nbsp; &nbsp;</h3>");
            	res.write("<h3 style='display:inline'> <a id='choo' href=#cc+mf>Chocolate Classics + Mixed Fruits</a> &nbsp; &nbsp; &nbsp; | &nbsp; &nbsp; &nbsp;</h3>");
            	res.write("<h3 style='display:inline'> <a id='choo' href=#st>Signature Truffles</a> &nbsp; &nbsp; &nbsp; | &nbsp; &nbsp; &nbsp;</h3>");
            	res.write("<h3 style='display:inline'> <a id='choo' href=#chocoBakery>Chocolate Bakery</a> &nbsp; &nbsp; &nbsp;</h3></div><br><br>");
				*/

            	res.write("<div id = 'chocobars'><h2> &nbsp; &nbsp;Chocolate Bars</h2>");
            	for (i=0; i<items.length; i++) {
	            	res.write("<div class = 'column'><img class = 'img' src=" + items[i].img + ">");
	            	res.write("<h4 name = 'product'>" + items[i].name + "</h4>");
	                res.write("<p>" + items[i].desc + "</p><p name = 'price'>$</p></div>");
	                res.write("<script language = 'javascript'>makeSelect(\"quan\" + " + i + ", 0, 10);</script>");
	            }

		    } 
		   //  res.end();
		  	// db.close();
		});
	
		theQuery2 = {gift: false, category: "Chocolate Classics + Mixed Fruits"};

		coll.find(theQuery2).toArray(function(err, items) {
		    if (err) {
			  console.log("Error: " + err);
			  res.end();
		  	  db.close();
		    } 
		    else 
		    {
		    	res.write("</div><h3>&nbsp;</h3><br><div id='cc+mf'><h2> &nbsp; &nbsp; Chocolate Classics + Mixed Fruits </h2>");
	        	for (i=0; i<items.length; i++) {
	            	res.write("<div class = 'column'><img class = 'img' src=" + items[i].img + ">");
	            	res.write("<h4 name = 'product'>" + items[i].name + "</h4>");
	                res.write("<p>" + items[i].desc + "</p><p name = 'price'>$</p></div>");
	                res.write("<script language = 'javascript'></script>");
	            }
		    } 
		   //  res.end();
		  	// db.close();
		});

		theQuery3 = {gift: false, category: "Signature Truffles"};

		coll.find(theQuery3).toArray(function(err, items) {
		    if (err) {
			  console.log("Error: " + err);
			  res.end();
		  	  db.close();
		    } 
		    else 
		    {
		    	res.write("</div><h3>&nbsp;</h3><br><div id='st'><h2> &nbsp; &nbsp; Signature Truffles </h2>");
	        	for (i=0; i<items.length; i++) {
	            	res.write("<div class = 'column'><img class = 'img' src=" + items[i].img + ">");
	            	res.write("<h4 name = 'product'>" + items[i].name + "</h4>");
	                res.write("<p>" + items[i].desc + "</p><p name = 'price'>$</p></div>");
	             	res.write("<script language = 'javascript'>makeSelect(\"quan\" + " + i + ", 0, 10);</script>");
	            }
		    } 
		   //  res.end();
		  	// db.close();
		});

		theQuery4 = {gift: false, category: "Chocolate Bakery"};

		coll.find(theQuery4).toArray(function(err, items) {
		    if (err) {
			  console.log("Error: " + err);
			  res.end();
		  	  db.close();
		    } 
		    else 
		    {
		    	res.write("</div><h3>&nbsp;</h3><br><div id='chocoBakery'><h2> &nbsp; &nbsp; Chocolate Bakery </h2>");
	        	for (i=0; i<items.length; i++) {
	            	res.write("<div class = 'column'><img class = 'img' src=" + items[i].img + ">");
	            	res.write("<h4 name = 'product'>" + items[i].name + "</h4>");
	                res.write("<p>" + items[i].desc + "</p><p name = 'price'>$</p></div>");
	    			res.write("<script language = 'javascript'>makeSelect(\"quan\" + " + i + ", 0, 10);</script>");
	            }
	            res.write("</div><br><br><h3>&nbsp;</h3></div>");

	            res.write("<script language='javascript'> function abc() { for (i = 0; i < menuItems.length; i++) { select = makeSelect('quan' + i, 0, 10); document.getElementsByName('product')[i].innerHTML = menuItems[i].name;");
                res.write("document.getElementsByName('price')[i].innerHTML = '$' + menuItems[i].cost.toFixed(2) + '&nbsp;&nbsp;&nbsp;&nbsp;' + select; }}");
				res.write("window.onload = abc;</script>");

    			res.write("<div class = 'total' id ='submit'><h3 id = 'total'>Get Total</h3></div><h3 id = 'totalMes'></h3>");
    			res.write("<footer>&copy; 2021 Rêve au Chocolat – 23 Fausse Street, Cambridge, MA – (617) 555 0113</footer> </body> </html>");

		    } 
		    res.end();
		  	db.close();
		});

		// theQuery5 = {gift: false};

		// coll.find(theQuery5).toArray(function(err, items) {
		//     if (err) {
		// 	  console.log("Error: " + err);
		// 	  res.end();
		//   	  db.close();
		//     } 
		//     else 
		//     {
		    	
		//     } 
		//     res.end();
		//   	db.close();
		// });

	});

}).listen(8080);
