
const DEFAULT_IMAGE = '/uploads/failed_bc13306774.png';
const transformDestination = (destination) => {
    if (!destination) return null;

    return {
        title: destination.title,
        description: destination.description,
        displayImg: destination.displayImg?.url || DEFAULT_IMAGE,
        slug: destination.slug,
        highlight: destination.highlight ? {
            title: destination.highlight.title,
            brief: destination.highlight.brief,
            imgUrl: destination.highlight.img?.url || DEFAULT_IMAGE // Adjust if highlight has an image field
        } : null,
        heroImg: destination.heroImg?.url || DEFAULT_IMAGE
    };
}


module.exports = {
    transformDestination
}