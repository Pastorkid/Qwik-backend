exports.requireAuth = async (req, res, next) => {
  if (!req.session.userId) {
    return res.redirect("/login");
  }
  next();
};
