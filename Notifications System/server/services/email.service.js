import transporter from "../config/mail";
import fs from "fs/promises"

async function isNodemailerActive() {
    try {
        await transporter.verify();
        console.log('Email is ready to send')
    } catch (err) {
        console.log(err)
        console.log('Email service is not ready to use')
    }
}


export const sendMail = async (user, book, author) => {

    isNodemailerActive();
    let template = await fs.readFile(new URL('../templates/book-published.html', import.meta.url), 'utf-8')
    let html = template
        .replaceAll("{{userName}}", user.name)
        .replaceAll("{{bookName}}", book.name)
        .replaceAll("{{authorName}}", author.name)
        .replaceAll("{{publishedDate}}", new Date().toLocaleDateString())
        .replaceAll("{{bookUrl}}", "https://example.com/books/" + book.id);


    let info = await transporter.sendMail({
        from: `BookNotify <notifications@example.com>`,
        to: user.email,
        subject: `New Book Released: ${book.name}`,
        html
    })
    console.log("Message sent:", info.messageId);

    return info;
}

