const admin = require('../controllers/admin')

function init(app) {
    const path = '/admin'
    app.get(path + '/user/list/:type', admin.getAllUsers)
    app.get(path + '/user/:id', admin.getUserDetails)
}
module.exports = init;