const apiResponse = require('../helpers/apiResponse');
const { authenticateRequest } = require('../middlewares/jwt-cookie');
const { getRandomQuote, getCatFact } = require('../services/services');
const Cache = require('../helpers/cache');
const ttl = 60 * 60 * 1; // cache for 1 Hour
const cache = new Cache(ttl); // Create a new cache service instance
const { logger } = require('../helpers/winston');
const db = require('../models/index');

/**
 * Returns a random quote
 *
 * @type {*[]}
 */
exports.getRandomQuote = [
  authenticateRequest,
  function (req, res) {
    logger.log('info', 'Retrieving random quote');
    getRandomQuote()
      .then((quote) => {
        return apiResponse.successResponseWithData(res, 'success', quote);
      })
      .catch((err) => {
        return apiResponse.ErrorResponse(res, err.message);
      });
  },
];

/**
 * Returns a single quote for the period of the cache, see @ttl
 * @type {*[]}
 */
exports.getQuoteOfDay = [
  authenticateRequest,
  function (req, res) {
    // Cache quote for the entire day - no need to query the DB
    const key = 'GET_QUOTE_OF_DAY';
    logger.log('info', 'Retrieving quote of day');
    const retrievalFunc = () => getRandomQuote();
    return cache
      .get(key, retrievalFunc)
      .then((quote) => {
        return apiResponse.successResponseWithData(res, 'success', quote);
      })
      .catch((err) => {
        return apiResponse.ErrorResponse(res, err.message);
      });
  },
];

exports.getCatFact = [
  authenticateRequest,
  function (req, res) {
    // db.models.users.findAll({ where: { username: 'chend' }, include: ['decisions'] }).then(function (user) {
    //   console.log(user);
    // });
    // db.models.users
    //   .findAll({
    //     include: { model: db.models.decisions },
    //   })
    //   .then((users) => console.log(JSON.stringify(users, null, 2)));

    // db.models.decisions
    //   .findAll({ where: { decision_maker: 'chend' } })
    //   .then((decisions) => console.log(JSON.stringify(decisions, null, 2)));

    // get commentrelations who's id is not in decisions table
    db.models.commentrelations
      .findAll({
        where: db.sequelize.literal('decisions.request_id IS null'),
        include: [{ model: db.models.decisions }],
      })
      .then((requests) => console.log(requests));

    getCatFact()
      .then((fact) => {
        console.log(fact);
        return apiResponse.successResponseWithData(res, 'success', fact);
      })
      .catch((response) => {
        console.log('error');
        return apiResponse.ErrorResponse(res, 'no cat facts');
      });
  },
];
