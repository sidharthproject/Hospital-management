

export const sendToken = (user, statuscode, res, message, role) => {
    const token  = user.generateRefreshToken()
    console.log('Token sent to client:', token);
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRY * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: true,
        sameSite: "none"
    };

    const userData = { ...user.toObject() };
    delete userData.password;
    console.log("jwt", userData);

    res.status(statuscode)
        .cookie("token", token, options)
        .json({
            success: true,
            message,
            token,
            data: userData,
            role
        });
};
