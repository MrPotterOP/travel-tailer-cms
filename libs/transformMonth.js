
const DEFAULT_IMAGE = '/uploads/failed_bc13306774.png';

const transformMonth = (month) => {
    if (!month) return null;

    return {
        title: month.month,
        heroImg: month.heroImg?.url || DEFAULT_IMAGE,
        highlight: month.highlight ? {
            title: month.highlight.title,
            brief: month.highlight.brief,
            imgUrl: month.highlight?.img?.url || DEFAULT_IMAGE
        } : null,
    };
}


module.exports = {
    transformMonth
}