

module.exports = {
    async index(ctx) {
        try {
            const hero = await strapi.service('api::api-home.apihome').getHero();
            // const featured = await strapi.service('api::api-home.apihome').getFetured();
            const featured = await strapi.service('api::api-home.apihome').getFeatured();
            const months = await strapi.service('api::api-home.apihome').getMonths();
            const reviews = await strapi.service('api::api-home.apihome').getReviews();

            ctx.body = {
                hero,
                ...featured,
                months: [...months.months],
                reviews: [...reviews.reviews]
            }
        } catch (e) {
            ctx.status = 500;
            console.log(e);
            
            ctx.body = {error: "Failed to load homepage data"};
        }
    },


    async tour(ctx) {
        try {
            const tour = await strapi.service('api::api-home.apihome').getTour(ctx.params.slug);
            ctx.body = tour;
        } catch (e) {
            ctx.status = 500;
            console.log(e);
            
            ctx.body = {error: "Failed to load tour"};
        }
    },

    async destination(ctx) {
        try {
            const destination = await strapi.service('api::api-home.apihome').getDestination(ctx.params.slug);
            ctx.body = destination;
        } catch (e) {
            ctx.status = 500;
            console.log(e);
            
            ctx.body = {error: "Failed to load destination"};
        }
    },

    async month(ctx) {
        try {
            const month = await strapi.service('api::api-home.apihome').getMonth(ctx.params.month);
            ctx.body = month;
        } catch (e) {
            ctx.status = 500;
            console.log(e);

            ctx.body = {error: "Failed to load month " + ctx.params.month};
        }
    },


    async experience(ctx) {
        try {
            const experience = await strapi.service('api::api-home.apihome').getExperience(ctx.params.slug);
            ctx.body = experience;
        } catch (e) {
            ctx.status = 500;
            console.log(e);

            ctx.body = {error: "Failed to load experience " + ctx.params.slug};
        }
    },

    async slugs(ctx) {
        try {
            const slugsTours = await strapi.service('api::api-home.apihome').getSlugs(ctx.params.type);
            ctx.body = slugsTours;
        } catch (e) {
            ctx.status = 500;
            console.log(e);

            ctx.body = {error: "Failed to load slugs for type: " + ctx.params.type};
        }
    },

    async listDestinations(ctx) {
        try {
            const listDestination = await strapi.service('api::api-home.apihome').getListDestination();
            ctx.body = listDestination;
        } catch (e) {
            ctx.status = 500;
            console.log(e);

            ctx.body = {error: "Failed to load list destination"};
        }
    },

    async listExperience(ctx) {
        try {
            const listExperience = await strapi.service('api::api-home.apihome').getListExperience();
            ctx.body = listExperience;
        } catch (e) {
            ctx.status = 500;
            console.log(e);

            ctx.body = {error: "Failed to load list experience"};
        }
    },

    async listTour(ctx) {
        try {
            const listTour = await strapi.service('api::api-home.apihome').getListTour();
            ctx.body = listTour;
        } catch (e) {
            ctx.status = 500;
            console.log(e);

            ctx.body = {error: "Failed to load list tour"};
        }
    },

    async listMonths(ctx) {
        try {
            const listMonths = await strapi.service('api::api-home.apihome').getListMonths();
            ctx.body = listMonths;
        } catch (e) {
            ctx.status = 500;
            console.log(e);

            ctx.body = {error: "Failed to load list months"};
        }
    },

    async search(ctx) {
        try {
            const search = await strapi.service('api::api-home.apihome').getSearch(ctx.params.query);
            ctx.body = search;
        } catch (e) {
            ctx.status = 500;
            console.log(e);

            ctx.body = {error: "Failed to load search"};
            
        }
    },

    async lead(ctx) {
        const { 
            name, 
            email, 
            contact, 
            countryCode, 
            month, 
            year, 
            duration, 
            people, 
            budget, 
            comment, 
            source 
        } = ctx.request.body;

        // Basic validation for required fields
        if (!name || !contact || !countryCode || !people) {
            ctx.throw(400, "Missing required fields: name, contact, countryCode, and people are mandatory.");
        }

        // Additional validation based on schema constraints
        if (name.length < 2 || name.length > 200) {
            ctx.throw(400, "Name must be within 200 characters.");
        }
        if (contact < 100000 || contact > 9999999999999) {
            ctx.throw(400, "Contact number must be Valid.");
        }
        if (countryCode.length < 1 || countryCode.length > 6) {
            ctx.throw(400, "Country code must be between 1 and 6 characters.");
        }
        if (people < 1 || people > 500) {
            ctx.throw(400, "People must be between 1 and 15+.");
        }
        if (comment && (comment.length < 1 || comment.length > 999)) {
            ctx.throw(400, "Comment must be between within 999 characters.");
        }


        try {
            const createdLead = await strapi.service('api::api-home.apihome').createLead(name, email, contact, countryCode, month, year, duration, people, budget, comment, source);
            ctx.body = createdLead;
        } catch (e) {
            ctx.status = 500;
            console.log(e);

            ctx.body = {error: "Failed to create lead."};
        }
    },

    async blog(ctx) {
        try {
            const blog = await strapi.service('api::api-home.apihome').getBlog(ctx.params.slug);
            ctx.body = blog;
        } catch (e) {
            ctx.status = 500;
            console.log(e);

            ctx.body = {error: "Failed to load blog"};
        }
    },

}