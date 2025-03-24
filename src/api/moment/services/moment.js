'use strict';

/**
 * moment service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::moment.moment');
