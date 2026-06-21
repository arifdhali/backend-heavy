const bookRoute = require("express").Router();
const db = require("../models");

bookRoute.get("/", async (req, res) => {

    const users = [];

    for (let i = 0; i < 500; i++) {

        users.push({
            id: i + 1,
            name: `User ${i + 1}`,
            user_type: "user",
            email: `user${i + 1}@yopmail.com`,
            password: `password${i + 1}`,
        })

    }
    let insertedUsers = await db.User.bulkCreate(users);

    console.log("Inserted Users: ", insertedUsers.length);

    res.status(200).json({
        msg: "User inserted successfull"
    })


}
)



bookRoute.post("/add-author", async (req, res) => {

    const users = [];

    for (let i = 500; i < 1000; i++) {

        users.push({
            author_id: i + 1,
            user_id: `author ${i + 1}`,
            subscribed_at: "author",
            email: `author${i + 1}@yopmail.com`,
            password: `password${i + 1}`,
        })

    }
    let insertedUsers = await db.Authors.bulkCreate(users);

    console.log("Inserted author: ", insertedUsers.length);

    res.status(200).json({
        msg: "User inserted successfull"
    })


}
)

bookRoute.post("/subscribe", async (req, res) => {

    const users = [];

    for (let i = 10; i < 20; i++) {

        users.push({
            author_id: Math.floor(Math.random() * 501) + 500,
            user_id: i,
            subscribed_at: new Date(
                Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)
            ),
        })

    }
    let insertedUsers = await db.Authors_subscribe.bulkCreate(users);

    console.log("Subscribed users: ", insertedUsers.length);

    res.status(200).json({
        msg: "User inserted successfull"
    })
})


bookRoute.post("/add", async (req, res) => {


    const { author_id, name } = req.body;


    let isAuthor = await db.User.findOne({ where: { id: author_id, user_type: "author" } });

    if (!isAuthor) {
        return res.status(404).json({
            msg: "Author not found"
        })
    }


    let insertedBook = await db.Books.create({
        author_id,
        name
    });

    if (insertedBook) {


        //  get all subscribed users 

        let subscribeUser = await db.Authors_subscribe.findAll({
            where: {
                author_id
            },
            attributes: ['author_id'],
            include: {
                model: db.User,
                as: "subscriber",
                attributes: ['id']
            },

        });




        let subU = subscribeUser.map((user) => ({
            user_id: user.subscriber.id,
            message: `${name} is added by ${isAuthor.name}`,
            is_read: false
        }));


        if (subU.length > 0) {
            let notifications = await db.Notifications.bulkCreate(subU);


        }
        return res.status(201).json({
            msg: "Book added successfully"
        })
    }




})


module.exports = bookRoute;



