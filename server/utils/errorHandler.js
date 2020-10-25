module.exports = (res, error) => {
    if (error.name !== undefined && error.name !== null && error.name !== '' && error.name !== 'Error') {
        res.status(error.statusCode()).json({
            statusCode: error.statusCode(),
            success: false,
            message: error.message ? error.message : error
        })
    } else {
        res.status(500).json({
            statusCode: 500,
            success: false,
            message: error.message ? error.message : error
        })
    }
}
