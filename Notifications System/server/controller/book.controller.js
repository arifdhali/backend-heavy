import prisma from "../config/prisma";
import { sendMail } from "../services/email.service";
const getBooks = async (req, res) => {

    const users = [];

    // for (let i = 0; i < 500; i++) {

    //     users.push({
    //         id: i + 1,
    //         name: `User ${i + 1}`,
    //         user_type: "user",
    //         email: `user${i + 1}@yopmail.com`,
    //         password: `password${i + 1}`,
    //     })

    // }
    // let insertedUsers = await db.User.bulkCreate(users);

    // console.log("Inserted Users: ", insertedUsers.length);




    res.status(200).json({
        msg: "Books retrieved successfully",
        books
    })


}

const addAuthor = async (req, res) => {

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

const addBooks = async (req, res) => {


    const { author_id, name } = req.body;
    const authorId = Number(author_id);

    try {
        let result = await prisma.$transaction((async (ts) => {
            let isAuthor = await ts.user.findFirst({ where: { id: authorId, user_type: "author" } });
            if (!isAuthor) {
                return res.status(404).json({
                    msg: "Author not found"
                })
            }

            let insertedBook = await ts.book.create({
                data: {
                    author_id: authorId,
                    name,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            });

            const subscribeUser = await ts.authorSubscribe.findMany({
                where: {
                    author_id: authorId
                },
                select: {
                    user_id: true
                }
            });

            let notifications = subscribeUser.map((user) => {
                return {
                    user_id: user.user_id,
                    message: `${name} is added by ${isAuthor.name}`,
                    is_read: false,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            });

            if (notifications.length > 0) {
                await ts.notification.createMany({
                    data: notifications
                });
            }

            return {
                book: insertedBook,
                author: isAuthor,
                subscriberIds: subscribeUser.map(user => user.user_id)
            };
        }))
        if (!result) {
            return res.status(404).json({
                msg: "Author not found"
            });
        }

        let users = await prisma.user.findMany({
            where: {
                id: {
                    in: result.subscriberIds
                }
            },
            select: {
                id: true,
                email: true,
                name: true
            }
        })
        // sending mail here
        for (const user of users) {
            await sendMail(user, result.book, result.author)
        }
        return res.status(201).json({
            msg: "Book added successfully",
            totalSubscribers: users.length
        });

    } catch (err) {
        console.error(err);
        throw err;
    }
}

const bookSubscribe = async (req, res) => {

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
}

export {
    getBooks,
    addAuthor,
    addBooks,
    bookSubscribe
};