const DEFAULT_IMAGE = '/uploads/failed_bc13306774.png';


const serchCardBlog = (blog) => {
    return {
        title: blog.title,
        slug: blog.slug,
        imgUrl: blog.displayImg?.url || DEFAULT_IMAGE
    }
}

const serchCardDestination = (destination) => {
    return {
        title: destination.title,
        slug: destination.slug,
        imgUrl: destination.displayImg?.url || DEFAULT_IMAGE
    }
}

const serchCardExperience = (experience) => {
    return {
        title: experience.title,
        slug: experience.slug,
        imgUrl: experience.heroImg?.url || DEFAULT_IMAGE
    }
}

const serchCardTour = (tour) => {
    return {
        title: tour.title,
        slug: tour.slug,
        imgUrl: tour.displayImg?.url || DEFAULT_IMAGE
    }
}

module.exports = {
    serchCardBlog,
    serchCardDestination,
    serchCardExperience,
    serchCardTour
}