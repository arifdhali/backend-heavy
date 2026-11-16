const { getBooks, addAuthor, bookSubscribe, addBooks } = require("../controller/book.controller");

const bookRoute = require("express").Router();

bookRoute.get("/", getBooks);
bookRoute.post("/add-author", addAuthor)

bookRoute.post("/subscribe", bookSubscribe)


bookRoute.post("/add", addBooks);


module.exports = bookRoute;



