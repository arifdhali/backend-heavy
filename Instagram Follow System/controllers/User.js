const db = require("../models");
let Users = db.Users;
let Follows = db.Follows;
const jwt = require("jsonwebtoken");

const Login = async (req, res, next) => {

    let error;
    try {


        const user = await Users.findOne({
            where: {
                email: req.body.email,
            },
            raw: true,
        })

        if (!user) {
            const err = new Error("User not found");
            err.statusCode = 404;
            throw err;
        }


        let isPasswordValid = false;


        const payload = {
            id: user.id,
            username: user.username,
            email: user.email,
        }

        let token = jwt.sign(payload, "your_jwt_secret", { expiresIn: '1h' });


        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600000, // 1 hour
        })

        return res.status(200).json({
            message: "Login successful",
            token: token,
        })

        res.send('Users')
    } catch (err) {
        next(err)
    }
}
const Follow = async (req, res, next) => {

    let error;
    let transaction = await db.sequelize.transaction();
    try {
        let followerId = req.user.id;
        let followingId = req.params.user_id;

        let isFollowingIdExist = await Users.findOne({
            where: {
                id: followingId,
            },
            raw: true,
            transaction,
        });

        if (!isFollowingIdExist) {
            error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }

        if (followerId === followingId) {
            error = new Error("You cannot follow yourself");
            error.statusCode = 400;
            throw error;
        }
        const alreadyFollowing = await Follows.findOne({
            where: {
                followerId,
                followingId
            }
        });

        if (alreadyFollowing) {
            error = new Error("Already following");
            error.statusCode = 400;
            throw error;
        }

        await new Promise(resolve => setTimeout(resolve, 5000));

        await Follows.create({
            followerId,
            followingId
        }, { transaction });

        await Users.increment('followingCount', { where: { id: followerId }, transaction });
        await Users.increment('followersCount', { where: { id: followingId }, transaction });

        await transaction.commit();

        return res.status(200).json({
            success: true,
            message: "Follow successful",
        })

    } catch (err) {
        await transaction.rollback();
        next(err)
    }
}


module.exports = {
    Login,
    Follow
}