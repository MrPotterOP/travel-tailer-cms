
const DEFAULT_IMAGE = '/uploads/failed_bc13306774.png';

const transformDestinationList = (listDestination) => {
    if (!listDestination || !Array.isArray(listDestination)) return [];

    // Map over each listDestination entry and extract groups
    return listDestination.flatMap(list => 
        (list.group || []).map(group => ({
            title: group.title,
            destinations: (group.destinations || []).map(destination => ({
                title: destination.title,
                slug: destination.slug,
                imgUrl: destination.displayImg?.url || DEFAULT_IMAGE
            }))
        }))
    );
};

const transformExperienceList = (listExperience) => {
    if (!listExperience || !Array.isArray(listExperience)) return [];

    // Map over each listExperience entry and extract groups
    return listExperience.flatMap(list => 
        (list.group || []).map(group => ({
            title: group.title,
            experiences: (group.experiences || []).map(experience => ({
                title: experience.title,
                slug: experience.slug,
                imgUrl: experience.heroImg?.url || DEFAULT_IMAGE
            }))
        }))
    );
};

const transformTourList = (listTour) => {
    if (!listTour || !Array.isArray(listTour)) return [];

    // Map over each listTour entry and extract groups
    return listTour.flatMap(list => 
        (list.group || []).map(group => ({
            title: group.title,
            tours: (group.tours || []).map(tour => ({
                title: tour.title,
                slug: tour.slug,
                imgUrl: tour.displayImg?.url || DEFAULT_IMAGE
            }))
        }))
    );
}




module.exports = {
    transformDestinationList,
    transformExperienceList,
    transformTourList
}
