const { getData, postData, putData, deleteData, putDataStatus, countTask } = require('../model/task');

const routes = require('express').Router();
routes.route('/task').get(getData).post(postData);
routes.route('/task/:id').put(putData).delete(deleteData)
routes.route('/task/status/:id').put(putDataStatus)
routes.route('/task/count').get(countTask)

module.exports = routes;