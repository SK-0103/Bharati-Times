"use strict";

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/articles",
      handler: "article.find",
      config: {
        auth: false, // Allow public access to the list of articles (adjust based on your requirements)
      },
    },
    {
      method: "GET",
      path: "/articles/:id",
      handler: "article.findOne",
      config: {
        auth: false, // Allow public access to individual articles (adjust based on your requirements)
      },
    },
    {
      method: "GET",
      path: "/articles/category/:category",
      handler: "article.filterByCategory",
      config: {
        auth: false,
      },
    },
  ],
};
