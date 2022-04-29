"use strict";

const _ = require("lodash");
const { getPluginService } = require("./utils/getPluginService");

module.exports = ({ strapi }) => {
  const settingsService = getPluginService(strapi, "settingsService");
  const settings = settingsService.get();
  // build settings structure
  const normalizedSettings = settingsService.build(settings);
  // reset plugin settings
  settingsService.set(normalizedSettings);
  // set up lifecycles
  const subscribe = {
    models: _.map(normalizedSettings.models, (m) => m.uid),
  };

  strapi.db.lifecycles.subscribe(subscribe);
};
