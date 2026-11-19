import {
    getBooks,
    addAuthor,
    bookSubscribe,
    addBooks
} from "../controller/book.controller.js";

import { Router } from "express";

const bookRoute = Router();

bookRoute.get("/", getBooks);
bookRoute.post("/add-author", addAuthor);
bookRoute.post("/subscribe", bookSubscribe);
bookRoute.post("/add", addBooks);

export default bookRoute;