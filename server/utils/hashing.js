import bcrypt from "bcryptjs";

export const hashPassword = (pw) => {
    const saltRounds = 12;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(pw, salt);
    return hash;
};

export const verifyPassword = async (pw, dbPw) => {
    const isMatch = await bcrypt.compare(pw, dbPw);
    return isMatch;
};