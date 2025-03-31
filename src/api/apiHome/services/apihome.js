
const { transformEntities } = require('../../../../libs/transformCards.js');
const { transformTour } = require('../../../../libs/transformTour.js');
const { transformDestination } = require('../../../../libs/transformDestination.js');
const { transformMonth } = require('../../../../libs/transformMonth.js');
const { destination } = require('../controllers/apihome.js');
const { transformExperience } = require('../../../../libs/transformExperience.js');
const { transformDestinationList, transformExperienceList, transformTourList } = require('../../../../libs/transformLists.js');
const { serchCardBlog, serchCardDestination, serchCardExperience, serchCardTour } = require('../../../../libs/transformSearch.js');

const DEFAULT_IMAGE = '/uploads/failed_bc13306774.png';

module.exports = {
    async getHero() {
        // Fetch hero documents with heroSlide populated
        const heroDocuments = await strapi.documents("api::hero.hero").findMany({
            populate: {
                heroSlide: {
                    populate: "*"
                }
            },
        });

        // Flatten all heroSlide arrays into a single array, defaulting to empty array if heroSlide is missing
        const allSlides = heroDocuments.flatMap(hero => hero.heroSlide || []);

        // Map each slide to the desired format
        const result = allSlides.map(slide => ({
            title: slide.title,
            description: slide.description,
            imgUrl: slide.heroImg?.url || DEFAULT_IMAGE
        }));

        return result;
    },

    async getFeatured() {

        const featured = await strapi.documents("api::featured.featured").findMany({
            populate: {
                blogs: {
                    populate: "*"
                },
                destinations: {
                    populate: "*"
                },
                experiences: {
                    populate: "*"
                },
                tours: {
                    populate: "*"
                },
                spotlights: {
                    populate: "*"
                }
            },
        });
    
        if (!featured) {
            throw new Error("Featured document not found.");
        }
    
        const response = {
            blogs: transformEntities(featured[0].blogs, 'blogs'),
            destinations: transformEntities(featured[0].destinations, 'destinations'),
            experiences: transformEntities(featured[0].experiences, 'experiences'),
            tours: transformEntities(featured[0].tours, 'tours'),
            spotlights: transformEntities(featured[0].spotlights, 'spotlights')
        };

        return response;
    },

    async getMonths() {
        const months = await strapi.documents("api::month.month").findMany({
            populate: "*",
        });

        const response = {
            months: transformEntities(months, 'months')
        };

        // sort months like january, february, march ans so on
        response.months.sort((a, b) => {
            const monthOrder = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
            return monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month);
        });

        return response;
    },

    async getReviews() {
        const reviews = await strapi.documents("api::review.review").findMany({
            populate: "*",
        });

        const response = {
            reviews: transformEntities(reviews[0].review, 'reviews')
        };

        console.log(reviews);
        

        return response;
    },

    //Tours API
    async getTour(slug) {
        
        const tour = await strapi.documents("api::tour.tour").findFirst({
            populate: {
            displayImg: {
                populate: "*"
            },
            feturedPlaces: {
                populate: "*"
            },
            priceTime: {
                populate: "*"
            },
            days: {
                populate: "*"
            },
            inclusions: {
                populate: "*"
            },
            moments: {
                populate: "*"
            },
            blogs: {
                populate: "*"
            },
            experiences: {
                populate: "*"
            },
            months: {
                populate: "*"
            },
            spotlights: {
                populate: "*"
            },
            tours: {
                populate: "*"
            },
         },

            filters: {
                slug: slug
            }
        });

        if (!tour) {
            throw new Error("Tour not found.");
        }

        
        return {
            ...transformTour(tour),
            blogs: transformEntities(tour.blogs, 'blogs'),
            tours: transformEntities(tour.tours, 'tours'),
        };
    },

    //Destinations API
    async getDestination(slug) {
        const destination = await strapi.documents("api::destination.destination").findFirst({
            
            populate: {

                highlight: {
                    populate: "*"
                },
                heroImg: {
                    populate: "*"
                },
                experiences: {
                    populate: "*"
                },
                spotlights: {
                    populate: "*"
                },
                blogs: {
                    populate: "*"
                },
                tours: {
                    populate: "*"
                },
                displayImg: {
                    fields: ["url"]
                }

            },

            filters: {
                slug: slug
            },
        });

        if (!destination) {
            throw new Error("Destination not found.");
        }

        return {
            ...transformDestination(destination),
            tours: transformEntities(destination.tours, 'tours'),
            spotlights: transformEntities(destination.spotlights, 'spotlights'),
            blogs: transformEntities(destination.blogs, 'blogs'),
            experiences: transformEntities(destination.experiences, 'experiences')
        };
    },

    //Month API
    async getMonth(month) {
        
        const monthDoc = await strapi.documents("api::month.month").findFirst({
            populate: {
                heroImg: {
                    populate: "*"
                },
                experiences: {
                    populate: "*"
                },
                blogs: {
                    populate: "*"
                },
                tours: {
                    populate: "*"
                },
                highlight: {
                    populate: "*"
                },
                destinations: {
                    populate: "*"
                },
            },
            filters: {
                month: month
            }
        });

        if (!monthDoc) {
            throw new Error("Month not found.");
        }

        return {
            ...transformMonth(monthDoc),
            tours: transformEntities(monthDoc.tours, 'tours'),
            experiences: transformEntities(monthDoc.experiences, 'experiences'),
            blogs: transformEntities(monthDoc.blogs, 'blogs'),
            destinations: transformEntities(monthDoc.destinations, 'destinations')
        };
    },

    //Experience API
    async getExperience(slug) {
        const experienceDoc = await strapi.documents("api::experience.experience").findFirst({
            populate: {
                heroImg: {
                    populate: "*"
                },
                blogs: {
                    populate: "*"
                },
                destinations: {
                    populate: "*"
                },
                spotlights: {
                    populate: "*"
                },
                highlight: {
                    populate: "*"
                },
            },
            filters: {
                slug: slug
            }
        });
        if (!experienceDoc){
            throw new Error("Experience not found.");
        }
        return {
            ...transformExperience(experienceDoc),
            destinations: transformEntities(experienceDoc.destinations, 'destinations'),
            spotlights: transformEntities(experienceDoc.spotlights, 'spotlights'),
            blogs: transformEntities(experienceDoc.blogs, 'blogs'),
        }
    },

    async getSlugs(type) {
        const allowedTypes = ['destination', 'tour', 'experience', 'month', 'blog'];
        if (!allowedTypes.includes(type)) {
            throw new Error(`Invalid type provided: "${type}"`);
        }
    
        let docs; 
        const fieldToFetch = type === 'month' ? 'month' : 'slug'; // Determine the field name
    
        try {
            // Single API call using the determined field
            docs = await strapi.documents(`api::${type}.${type}`).findMany({
                fields: [fieldToFetch], 
            });
    

            if (!docs) {
               console.warn(`No documents found for type: ${type}`);
               return []; // Return empty array if nothing found
            }
    

            const slugs = docs.map((doc) => ({
                slug: doc[fieldToFetch],
            }));
    
            return slugs;
    
        } catch (error) { 
            console.error(`Failed to load slugs for type: ${type}. Original error:`, error); // Log original error
            // Re-throw a more informative error or handle it as needed
            throw new Error(`Failed to load slugs for type "${type}". Reason: ${error.message}`);
        }
    },

    async getListDestination() {
        const listDestination = await strapi.documents("api::list-destination.list-destination").findMany({
            populate: {
                group: {
                    populate: {
                        destinations: {
                            fields: ["title", "slug"], 
                            populate: {
                                displayImg: {
                                    fields: ["url"]
                                }
                            }
                        }
                    }
                }
            },
        });

        if (!listDestination) {
            throw new Error("List destination not found.");
        }

        return {
            list: transformDestinationList(listDestination)
        };
    },

    async getListExperience() {
        const listExperience = await strapi.documents("api::list-experience.list-experience").findMany({
            populate: {
                group: {
                    populate: {
                        experiences: {
                            fields: ["title", "slug"], 
                            populate: {
                                heroImg: {
                                    fields: ["url"]
                                }
                            }
                        }
                    }
                }
            },
        });

        if (!listExperience) {
            throw new Error("List experience not found.");
        }

        return {
            list: transformExperienceList(listExperience)
        };
    },

    async getListTour() {
        const listTour = await strapi.documents("api::list-tour.list-tour").findMany({
            populate: {
                group: {
                    populate: {
                        tours: {
                            fields: ["title", "slug"], 
                            populate: {
                                displayImg: {
                                    fields: ["url"]
                                }
                            }
                        }
                    }
                }
            },
        });

        if (!listTour) {
            throw new Error("List tour not found.");
        }
        return {
            list: transformTourList(listTour)
        };
    },


    async getSearch(query) {

        // regex to validate query
        const queryRegex = /^[a-zA-Z0-9\s]+$/;
        if (!query || typeof query !== 'string' || !queryRegex.test(query)) {
            ctx.throw(400, "Search query is required and must be a string.");
        }

        const searchFilter = { title: { $containsi: query } };

        try {
            const rawBlogs = await strapi.documents("api::blog.blog").findMany({
                filters: searchFilter,
                fields: ["title", "slug"],
                populate: { displayImg: {
                    fields: ["url"]
                } },
                limit: 8
            });

            const rawDestinations = await strapi.documents("api::destination.destination").findMany({
                filters: searchFilter,
                fields: ["title", "slug"],
                populate: { displayImg: {
                    fields: ["url"]
                } },
                limit: 8
            });

            const rawExperiences = await strapi.documents("api::experience.experience").findMany({
                filters: searchFilter,
                fields: ["title", "slug"],
                populate: { heroImg: {
                    fields: ["url"]
                } },
                limit: 8
            });

            const rawTours = await strapi.documents("api::tour.tour").findMany({
                filters: searchFilter,
                fields: ["title", "slug"],
                populate: { displayImg: {
                    fields: ["url"]
                } },
                limit: 8
            });

            const response = {
                blogs: transformEntities(rawBlogs, 'blogs'),
                destinations: transformEntities(rawDestinations, 'destinations'),
                experiences: transformEntities(rawExperiences, 'experiences'),
                tours: transformEntities(rawTours, 'tours'),
            };

            return response;
        } catch (error) {
            ctx.throw(500, "Failed to load search.");
        }
    },

    async createLead(name, email, contact, countryCode, month, year, duration, people, budget, comment, source) {

        try {
            // Create the lead entry in the database
            const lead = await strapi.documents("api::lead.lead").create({
                data: {
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
                    source,
                    publishedAt: new Date(),
                }
            });

            // Return the created lead (or just a success message if preferred)
            response = {
                message: "Lead created successfully",
                id: lead.id,
                documentId: lead.documentId
            };

            return response;
        } catch (error) {
            throw(error.status || 500, error.message);
        }

    }


}