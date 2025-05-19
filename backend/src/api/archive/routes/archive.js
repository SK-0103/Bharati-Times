"use strict";

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/archives",
      handler: "archive.find",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/archives/:id",
      handler: "archive.findOne",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
