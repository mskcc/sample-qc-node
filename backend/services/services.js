// relays information from somewhere else in this case the LIMS

const QuoteModel = require('../models/QuoteModel');
const { getNumQuotes } = require('../models/setup_deleteMe');
const axios = require('axios');
const https = require('https');

const LIMS_AUTH = {
  username: process.env.LIMS_USER,
  password: process.env.LIMS_PASSWORD,
};

// LIMS is authorized. Avoids certificate verification & "unable to verify the first certificate in nodejs" errors
const agent = new https.Agent({
  rejectUnauthorized: false,
});
/**
 * Returns a random quote in the database
 * @returns {Promise<*>}
 */
exports.getRandomQuote = async function () {
  const id = Math.floor(Math.random() * getNumQuotes());
  const quote = await QuoteModel.findOne({ id });

  if (quote == null) return;

  // Redact data
  const quoteJson = quote.toJSON();
  delete quoteJson._id;
  delete quoteJson.id;
  delete quoteJson.__v;

  return quoteJson;
};

exports.getCatFact = async function () {
  return axios
    .get('https://catfact.ninja/fact')
    .then((response) => {
      return { fact: response.data.fact };
    })
    .catch((error) => {
      // console.log(error);
      // return 'Could not retrieve a cat fact';
      throw error;
    })
    .then((response) => {
      return response;
    });
};

// returns request level information including a list of samples in the request
// queries IGO LIMS REST
exports.getRequestSamples = async function (requestId) {
  return axios
    .get(process.env.LIMS_API_ROOT + '/api/getRequestSamples', {
      auth: { ...LIMS_AUTH },
      httpsAgent: agent,
      params: { request: requestId },
    })
    .then((limsResponse) => {
      // let limsAssays = limsResponse.data.assays;
      // // response.status(200).json(response.data);
      // limsAssays.forEach((limsAssay) => console.log(limsAssay.assayName));
      // response.status(200).json(limsAssays);
      // console.log(limsResponse);
      return limsResponse;
    })

    .catch((error) => {
      console.log(error);
      // return 'Could not retrieve a cat fact';

      throw error;
    })
    .then((response) => {
      return response;
    });
};

// gets all reports and samples in a request
exports.getQcReportSamples = async function (requestId, arrayOfSamples) {
  let data = { requestId: requestId, otherSampleIds: arrayOfSamples.join() };
  return axios
    .post(
      // 'https://tango.mskcc.org:8443/LimsRest/getPickListValues?list=ddPCR+Assay',
      process.env.LIMS_API_ROOT + '/postQcReportSamples',
      data,
      {
        auth: { ...LIMS_AUTH },
        httpsAgent: agent,
      }
    )
    .then((limsResponse) => {
      return limsResponse;
    })

    .catch((error) => {
      console.log(error);
      // return 'Could not retrieve a cat fact';

      throw error;
    })
    .then((response) => {
      return response;
    });
};

exports.getPicklistValues = async function (picklist) {
  return axios
    .get(process.env.LIMS_API_ROOT + '/getPickListValues?list=' + picklist, {
      auth: { ...LIMS_AUTH },
      httpsAgent: agent,
    })
    .then((limsResponse) => {
      // console.log(limsResponse);
      return limsResponse.data;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    })
    .then((response) => {
      return response;
    });
};
