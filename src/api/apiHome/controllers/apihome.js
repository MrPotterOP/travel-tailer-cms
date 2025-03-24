

module.exports = {
    async index(ctx) {
        try {
            const hero = await strapi.service('api::api-home.apihome').getHero();
            const featured = await strapi.service('api::api-home.apihome').getFeatured();
            // const months = await strapi.service('api::api-home.apihome').getMonths();
            // const reviews = await strapi.service('api::api-home.apihome').getReviews();

            ctx.body = {
                hero,
                featured
            }
        } catch (e) {
            ctx.status = 500;
            console.log(e);
            
            ctx.body = {error: "Failed to load homepage data"};
        }
    }
}