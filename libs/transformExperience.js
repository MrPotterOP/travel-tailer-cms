
const DEFAULT_IMAGE = '/uploads/failed_bc13306774.png';

const transformExperience = (experience) => {
    if (!experience) return null;

    return {
        title: experience.title,
        heroImg: experience.heroImg?.url || DEFAULT_IMAGE,
        slug: experience.slug,
        highlight: experience.highlight ? {
            title: experience.highlight.title,
            brief: experience.highlight.brief,
            imgUrl: experience.highlight.img?.url || DEFAULT_IMAGE // Adjust if highlight has an image field
        } : null,
    };
}


module.exports = {
    transformExperience
}