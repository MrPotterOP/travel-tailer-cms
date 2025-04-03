module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/apiHome',
            handler: 'apihome.index'
        },
        {
            method: 'GET',
            path: '/apiHome/tour/:slug',
            handler: 'apihome.tour'
        },
        {
            method: 'GET',
            path: '/apiHome/destination/:slug',
            handler: 'apihome.destination'
        },
        {
            method: 'GET',
            path: '/apiHome/month/:month',
            handler: 'apihome.month'
        },
        {
            method: 'GET',
            path: '/apiHome/experience/:slug',
            handler: 'apihome.experience'
        },
        {
            method: 'GET',
            path: '/apiHome/blog/:slug',
            handler: 'apihome.blog'
        },
        {
            method: 'GET',
            path: '/apiHome/slugs/:type',
            handler: 'apihome.slugs'
        },
        {
            method: 'GET',
            path: '/apiHome/destinations',
            handler: 'apihome.listDestinations'
        },
        {
            method: 'GET',
            path: '/apiHome/experiences',
            handler: 'apihome.listExperience'
        },
        {
            method: 'GET',
            path: '/apiHome/months',
            handler: 'apihome.listMonths'
        },
        {
            method: 'GET',
            path: '/apiHome/tours',
            handler: 'apihome.listTour'
        },
        {
            method: 'GET',
            path: '/apiHome/search/:query',
            handler: 'apihome.search'
        },
        {
            method: 'POST',
            path: '/apiHome/lead',
            handler: 'apihome.lead'
        },
        
    ]
}