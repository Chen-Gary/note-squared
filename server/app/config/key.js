/*
 * This is used in encryption / decryption of jwt,
 * to check whether a user is logged in
 */

module.exports = {
    // the following are just constant strings, used for jwt.sign
    secret : 'register-rule',
    secretVerification: "bezkoder-secret-key",
}
