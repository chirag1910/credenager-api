const characters =
    "#@ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const charactersLength = characters.length;

const generateRandomString = (length = 10) => {
    let string = "";
    for (let i = 0; i < length; i++) {
        string += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    }
    return string;
};

module.exports = generateRandomString;
