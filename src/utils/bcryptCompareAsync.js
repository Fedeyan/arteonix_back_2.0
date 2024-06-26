import bcrypt from "bcrypt";

export default function bcryptCompareAsync(pass, hash) {
    return new Promise(function (resolve, reject) {
        bcrypt.compare(pass, hash, function (err, res) {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
}