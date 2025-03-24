// module.exports = {
//     async getHero() {
//         const hero =  await strapi.db.query('api::hero.hero').findOne({
//             populate: {
//                 heroSlide: {
//                     populate: true
//                 }
//             }
//         });


//         const cleandData = hero.heroSlide.map(item => {

//             // if item.destination is thare then url is /destinations/slug
//             // else if item.tour is there then url is /tours/slug
            
//             let url = null;
//             if (item.destination) {
//                 url = `/destinations/${item.destination.slug}`;
//             } else if (item.tour) {
//                 url = `/tours/${item.tour.slug}`;
//             }

//             return {
//                 title: item.title,
//                 description: item.description,
//                 heroImgUrl: item.heroImg?.url || null,
//                 url: url
//             }
//         });

//         return cleandData;
//     },


//     async getFetured() {
//         const featuredData = await strapi.db.query('api::featured.featured').findOne({
//             populate: {
//                 blogs: {
//                     populate: {
//                         displayImg: {
//                             fields: ['url']
//                         }
//                     },
//                     fields: ['id', 'slug', 'title', 'description', 'body', 'createdAt', 'updatedAt', 'publishedAt', 'locale', 'documentId']
//                 },
//                 destinations: {
//                     populate: {
//                         displayImg: {
//                             fields: ['url']
//                         }
//                     },
//                     fields: ['id', 'slug', 'title', 'description', 'createdAt', 'updatedAt', 'publishedAt', 'locale', 'documentId']
//                 },
//                 experiences: {
//                     populate: {
//                         heroImg: {
//                             fields: ['url']
//                         }
//                     },
//                     fields: ['id', 'slug', 'title', 'createdAt', 'updatedAt', 'publishedAt', 'locale', 'documentId']
//                 },
//                 tours: {
//                     populate: {
//                         displayImg: {
//                             fields: ['url']
//                         },
//                         priceTime: {
//                             fields: ['nights']
//                         }
//                     },
//                     fields: ['id', 'slug', 'title', 'description']
//                 },
//             },
//             fields: ['id',],
//         });

//         if (!featuredData) {
//             return null;
//         }

//         const cleanedBlogs = featuredData.blogs.map(blog => ({
//             ...blog,
//             displayImgUrl: blog.displayImg?.url || null,
//             displayImg: undefined
//         }));

//         const cleanedDestinations = featuredData.destinations.map(destination => ({
//             ...destination,
//             displayImgUrl: destination.displayImg?.url || null,
//             displayImg: undefined
//         }));

//         const cleanedExperiences = featuredData.experiences.map(experience => ({
//             ...experience,
//             displayImgUrl: experience.heroImg?.url || null,
//             heroImg: undefined
//         }));

//         const cleanedTours = featuredData.tours.map(tour => ({
//             ...tour,
//             displayImgUrl: tour.displayImg?.url || null,
//             displayImg: undefined
//         }));

//         return {
//             blogs: cleanedBlogs,
//             destinations: cleanedDestinations,
//             experiences: cleanedExperiences,
//             tours: cleanedTours,
//         };
//     },

//     async getMonths() {

//         const months = await strapi.db.query('api::month.month').findMany({
//             status: 'published',
//             fields: ['id', 'month', 'documentId', 'displayImg'],
//             populate: {
//                 displayImg: {
//                     fields: ['url']
//                 }
//             },
//         });

//         const uniqueMonths = [];
//         const seenMonths = new Set();

//         for (const monthEntry of months) {
//             if (!seenMonths.has(monthEntry.month)) {
//                 uniqueMonths.push({
//                     ...monthEntry,
//                     displayImgUrl: monthEntry.displayImg?.url || null,
//                     displayImg: undefined
//                 });
//                 seenMonths.add(monthEntry.month);
//             }
//         }

//         const monthOrder = [
//             "january", "february", "march", "april", "may", "june",
//             "july", "august", "september", "october", "november", "december"
//         ];

//         const sortedUniqueMonths = uniqueMonths.sort((a, b) => {
//             const indexA = monthOrder.indexOf(a.month);
//             const indexB = monthOrder.indexOf(b.month);
//             return indexA - indexB;
//         });

//         return sortedUniqueMonths;

//     },

//     async getReviews() {

//         const reviewsData = await strapi.db.query('api::review.review').findMany({
//             status: 'published',
//             populate: true,
//         });

//         const uniqueReviews = [];
//         const seenDocumentIds = new Set();

//         for (const reviewEntry of reviewsData) {
//             if (!seenDocumentIds.has(reviewEntry.documentId)) {
//                 const {
//                     id,
//                     documentId,
//                     review,
//                 } = reviewEntry;

//                 uniqueReviews.push({
//                     id,
//                     documentId,
//                     review,
//                 });
//                 seenDocumentIds.add(documentId);
//             }
//         }

//         return [...uniqueReviews[0].review];

//     },

// };


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
            heroImgUrl: slide.heroImg?.url || null
        }));

        return result;
    },

    async getFeatured() {
        // Fetch the Featured document with relations and their images populated
        const featured = await strapi.documents("api::featured.featured").findOne({
            populate: "*",
        });

        console.log(featured);
        

        return featured;

       
    },



}