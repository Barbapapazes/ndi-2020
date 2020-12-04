const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const auth = req.headers.authorization;
        const bearer = auth.split(' ')[1];
        console.log('bearer', bearer)
        jwt.verify(bearer, process.env.SECRET, function (error, decoded) {
            if(error) {
                return res.status(401).json({
                    error: "Invalid request"
                });
            }
            const userId = decoded.userId;
            if (req.body.userId && req.body.userId !== userId) {
                throw 'Invalid user ID';
            } else {
                console.log('authenticated')
                next(decoded.userId);
            }
        });   
    } catch {
        res.status(401).json({
            error: new Error('Invalid request')
        })
    }
}