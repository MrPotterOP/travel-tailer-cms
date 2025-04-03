const { transformEntities } = require('../../../../libs/transformCards.js');
const { transformTour } = require('../../../../libs/transformTour.js');
const { transformDestination } = require('../../../../libs/transformDestination.js');
const { transformMonth } = require('../../../../libs/transformMonth.js');
const { destination } = require('../controllers/apihome.js');
const { transformExperience } = require('../../../../libs/transformExperience.js');
const { transformDestinationList, transformExperienceList, transformTourList, transformMonthList } = require('../../../../libs/transformLists.js');
const { serchCardBlog, serchCardDestination, serchCardExperience, serchCardTour } = require('../../../../libs/transformSearch.js');
const { transformBlog } = require('../../../../libs/transformBlog.js');

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

    async getListMonths() {
        const listMonths = await strapi.documents('api::month.month').findMany({
            limit: 12,
            populate: {
                displayImg: {
                    fields: ["url"]
                },
                fields: ["month"]
            },
            status: 'published'
        });
        
        if (!listMonths) {
            throw new Error("List months not found.");
        }
        return {
            list: transformMonthList(listMonths)
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

            // --- Build the HTML Content Dynamically ---

            // Helper function to format contact number nicely
            const formatContact = (code, number) => {
                if (!number) return ''; // If no number, return empty string
                return `${code ? code + ' ' : ''}${number}`; // Add code if it exists
            }
            
            // Helper function to format date nicely
            const formatTravelDate = (m, y) => {
                if (!m && !y) return '';
                let parts = [];
                if (m) parts.push(m);
                if (y) parts.push(y);
                return parts.join(' / ');
            }
            
            const htmlContent = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>New Website Submission</title>
                <style>
                                /* Basic Reset & Body Styling */
                body { margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 1.6; color: #333333; background-color: #f4f7f6; }
                /* Container */
                .container { width: 100%; max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); border: 1px solid #e0e0e0;}
                /* Header */
                .header { background-color: #D35400; /* Rich Orange */ color: #ffffff; padding: 25px; text-align: center; }
                .header h1 { margin: 0; font-size: 24px; font-weight: 500; }
                /* Content Area */
                .content { padding: 30px; }
                .content h2 { font-size: 20px; color: #D35400; margin-top: 0; margin-bottom: 20px; border-bottom: 2px solid #f0f0f0; padding-bottom: 10px;}
                /* Data Table */
                .data-table { width: 100%; border-collapse: collapse; margin-bottom: 25px; }
                .data-table th, .data-table td { text-align: left; padding: 12px 0; border-bottom: 1px solid #eeeeee; vertical-align: top; }
                .data-table th { color: #555555; font-weight: 600; width: 120px; /* Fixed width for labels */ }
                .data-table td { color: #333333; }
                /* Comment Section */
                .comment-section { margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-left: 4px solid #D35400; border-radius: 4px; }
                .comment-label { font-weight: 600; color: #D35400; margin-bottom: 8px; display: block; font-size: 16px;}
                .comment-text { margin: 0; color: #555; white-space: pre-wrap; /* Preserve line breaks */ word-wrap: break-word;}
                /* Footer */
                .footer { text-align: center; padding: 20px; font-size: 12px; color: #999999; background-color: #f4f7f6;}
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>New Website Enquiry</h1>
                    </div>
                    <div class="content">
                        <h2>Submitter Details</h2>
                        <table class="data-table">
                            ${name ? `<tr><th>Name</th><td>${name}</td></tr>` : ''}
                            ${email ? `<tr><th>Email</th><td><a href="mailto:${email}" style="color: #4A90E2; text-decoration: none;">${email}</a></td></tr>` : ''}
                            ${contact ? `<tr><th>Contact</th><td>${formatContact(countryCode, contact)}</td></tr>` : ''}
                        </table>
            
                        ${month || year || duration || people || budget ? `<h2>Request Details</h2>` : ''}
                        <table class="data-table">
                            ${month || year ? `<tr><th>Travel Time</th><td>${formatTravelDate(month, year)}</td></tr>` : ''}
                            ${duration ? `<tr><th>Duration</th><td>${duration}</td></tr>` : ''}
                            ${people ? `<tr><th>People</th><td>${people}</td></tr>` : ''}
                            ${budget ? `<tr><th>Budget</th><td>${budget}</td></tr>` : ''}
                            ${source ? `<tr><th>Source</th><td>${source}</td></tr>` : ''}
                        </table>
            
                        ${comment ? `
                        <div class="comment-section">
                            <span class="comment-label">Message/Details:</span>
                            <p class="comment-text">${comment}</p>
                        </div>
                        ` : ''}
                    </div>
                    <div class="footer">
                        This is an automated notification from your website.
                    </div>
                </div>
            </body>
            </html>
            `;
            

            const sendEmail = await fetch(`${process.env.MAIL_API_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'api-key': process.env.MAIL_API_KEY,
                    'accept': 'application/json'
                },
                body: JSON.stringify({
                    "sender":{  
                        "name":"Sender AlexS",
                        "email": process.env.MAIL_SENDER
                    },
                    "to":[  
                        {  
                            "email":"shubham.ubarhande69@gmail.com",
                            "name":"John Doe"
                        }
                    ],
                    "subject":"Website Contact Form | New Enquiry | " + name,
                    "htmlContent": htmlContent
                })
            });

            if (!sendEmail.ok) {
                console.log(sendEmail);
                throw new Error("Failed to send email");
            }

            return response;
        } catch (error) {
            throw(error.status || 500, error.message);
        }

    },

    async getBlog(slug) {
        const blog = await strapi.documents("api::blog.blog").findFirst({
            filters: { slug },
            populate: {
                displayImg: {
                    fields: ["url"]
                }, 
                seo: {
                    populate: {
                        shareImage: {
                            fields: ["url"]
                        }
                    },
                    fields: ["metaTitle", "metaDescription"]
                },
                blogs: {
                    populate: {
                        displayImg: {
                            fields: ["url"]
                        }
                    },
                    fields: ["title", "description", "slug"]
                },
                tours: {
                    populate: {
                        displayImg: {
                            fields: ["url"]
                        },
                        priceTime: "*",
                    },
                    fields: ["title", "description", "slug"]
                },
                createdBy: {
                    fields: ["firstname", "lastname", "createdAt", "updatedAt"]
                }
            }
        });
        if (!blog) {
            throw new Error("Blog not found.");
        }
        return {
            ...transformBlog(blog),
            blogs: transformEntities(blog.blogs, 'blogs'),
            tours: transformEntities(blog.tours, 'tours')
        };
    },


}