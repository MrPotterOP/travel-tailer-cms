
const DEFAULT_IMAGE = '/uploads/failed_bc13306774.png';

const transformTour = (tour) => {
    if (!tour) return null;


    // parse timeline fn, where timeline.from: 2022-01-01, timeline.to: 2022-12-31 get parsed as a string like "Jan to Dec"
    const parseTimeline = (timeline) => {
        const monthsShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const monthsLong = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const from = new Date(timeline.from).toLocaleString('default', { month: 'short' });
        const to = new Date(timeline.to).toLocaleString('default', { month: 'short' });

        return `${from} to ${to}`;
    };
    

    return {
        hero: (tour.feturedPlaces || []).map(place => ({
            title: place.title,
            imgUrl: place.img?.url || DEFAULT_IMAGE // Assuming featuredPlaces might have an image field; adjust if needed
        })),
        info: {
            title: tour.title,
            place: tour.place,
            timeline: parseTimeline(tour.priceTime?.timeline || "Jan to Dec"),
            price: tour.priceTime?.pricePerPerson || null,
            nights: tour.priceTime?.nights || null
        },
        brief: tour.brief || null,
        displayImg: tour.displayImg?.url || DEFAULT_IMAGE,
        days: (tour.days || []).map(day => ({
            brief: day.briefAboutTheDay,
            imgUrl: day.representiveImg?.url || DEFAULT_IMAGE // Assuming days might have an image; adjust if not present
        })),
        inclusions: tour.inclusions ? {
            included: (tour.inclusions.included || []).map(item => item.included),
            excluded: (tour.inclusions.excluded || []).map(item => item.excluded)
        } : { included: [], excluded: [] },
        title: tour.title,
        description: tour.description
    };
}


module.exports = {
    transformTour
};