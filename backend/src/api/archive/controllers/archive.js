"use strict";

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::archive.archive", ({ strapi }) => ({
  async find(ctx) {
    try {
      const entries = await strapi.entityService.findMany(
        "api::archive.archive",
        {
          populate: {
            englishPdfLink: true,
            hindiPdfLink: true,
          },
        }
      );

      // Transform the entries to include full URLs
      const transformedEntries = entries.map(entry => ({
        ...entry,
        englishPdfLink: entry.englishPdfLink ? {
          ...entry.englishPdfLink,
          url: entry.englishPdfLink.url.startsWith('http') 
            ? entry.englishPdfLink.url 
            : `${strapi.config.server.url}${entry.englishPdfLink.url}`
        } : null,
        hindiPdfLink: entry.hindiPdfLink ? {
          ...entry.hindiPdfLink,
          url: entry.hindiPdfLink.url.startsWith('http')
            ? entry.hindiPdfLink.url
            : `${strapi.config.server.url}${entry.hindiPdfLink.url}`
        } : null
      }));

      return ctx.send(transformedEntries);
    } catch (error) {
      strapi.log.error("Error fetching archives:", error);
      return ctx.internalServerError(
        "An error occurred while fetching archives"
      );
    }
  },

  async findOne(ctx) {
    const { id } = ctx.params;

    if (isNaN(Number(id))) {
      return ctx.badRequest("Invalid archive ID");
    }

    try {
      const entry = await strapi.entityService.findOne(
        "api::archive.archive",
        id,
        {
          populate: {
            englishPdfLink: true,
            hindiPdfLink: true,
          },
        }
      );

      if (!entry) {
        return ctx.notFound("Archive not found");
      }

      // Transform the entry to include full URLs
      const transformedEntry = {
        ...entry,
        englishPdfLink: entry.englishPdfLink ? {
          ...entry.englishPdfLink,
          url: entry.englishPdfLink.url.startsWith('http')
            ? entry.englishPdfLink.url
            : `${strapi.config.server.url}${entry.englishPdfLink.url}`
        } : null,
        hindiPdfLink: entry.hindiPdfLink ? {
          ...entry.hindiPdfLink,
          url: entry.hindiPdfLink.url.startsWith('http')
            ? entry.hindiPdfLink.url
            : `${strapi.config.server.url}${entry.hindiPdfLink.url}`
        } : null
      };

      return ctx.send(transformedEntry);
    } catch (error) {
      strapi.log.error("Error fetching archive:", error);
      return ctx.internalServerError(
        "An error occurred while fetching the archive"
      );
    }
  },
}));
