const DEFAULT_IMAGE = '/uploads/failed_bc13306774.png';

const transformBlog = (blog) => {
    if (!blog) return null;

    return {
        title: blog.title,
        description: blog.description,
        displayImg: blog.displayImg?.url || DEFAULT_IMAGE,
        body: blog.body,
        seo: {
            metaTitle: blog.seo?.metaTitle,
            metaDescription: blog.seo?.metaDescription,
            shareImage: blog.seo?.shareImage?.url || DEFAULT_IMAGE
        },
        author: `${blog.createdBy.firstname} ${blog.createdBy.lastname}` || "Unknown",
        createdAt: blog.createdAt,
        updatedAt: blog.updatedAt,
        slug: blog.slug,
    };
}

module.exports = {
    transformBlog
};