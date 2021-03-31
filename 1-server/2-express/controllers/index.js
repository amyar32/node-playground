exports.notFound = (req, res, next) => {
    res.status(404).render("404", { path: "/", pageTitle: "Page Not Found" });
};
