// /lib/transform.js

const DEFAULT_IMAGE = '/uploads/failed_bc13306774.png';

// Blog transformation
const transformBlog = (blog) => ({
    slug: blog.slug,
    title: blog.title,
    description: blog.description || null,
    imgUrl: blog.displayImg?.url || DEFAULT_IMAGE
});

// Destination transformation
const transformDestination = (destination) => ({
    slug: destination.slug,
    title: destination.title,
    description: destination.description || null,
    imgUrl: destination.displayImg?.url || DEFAULT_IMAGE,
    tag: destination.startingPrice ? destination.startingPrice : 10000
});

// Experience transformation
const transformExperience = (experience) => ({
    title: experience.title,
    imgUrl: experience.heroImg?.url || DEFAULT_IMAGE,
    slug: experience.slug
});

// Spotlight transformation
const transformSpotlight = (spotlight) => ({
    title: spotlight.title,
    imgUrl: spotlight.displayImg?.url || DEFAULT_IMAGE,
    description: spotlight.description || null,
    link: spotlight.tour 
        ? `/tours/${spotlight.tour.slug}` 
        : spotlight.destination 
        ? `/destinations/${spotlight.destination.slug}` 
        : null
});

// Tour transformation
const transformTour = (tour) => ({
    slug: tour.slug,
    title: tour.title,
    imgUrl: tour.displayImg?.url || DEFAULT_IMAGE,
    nights: tour.priceTime ? tour.priceTime.nights || null : null,
    description: tour.description || null
});

// Months 
const transformMonth = (month) => ({
    month: month.month,
    imgUrl: month.displayImg?.url || DEFAULT_IMAGE
});

// Reviews
const transformReview = (review) => ({
    name: review.name,
    source: review.source,
    review: review.review,
});

// Generic transformation wrapper to apply the correct function based on entity type
const transformEntities = (items, type) => {
    if (!items || !Array.isArray(items)) return [];
    switch (type) {
        case 'blogs':
            return items.map(transformBlog);
        case 'destinations':
            return items.map(transformDestination);
        case 'experiences':
            return items.map(transformExperience);
        case 'spotlights':
            return items.map(transformSpotlight);
        case 'tours':
            return items.map(transformTour);
        case 'months':
            return items.map(transformMonth);
        case 'reviews':
            return items.map(transformReview);
        default:
            return [];
    }
};

module.exports = {
    transformEntities,
    transformBlog,
    transformDestination,
    transformExperience,
    transformSpotlight,
    transformTour
};
