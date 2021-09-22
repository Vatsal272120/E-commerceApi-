// eslint-disable-next-line no-undef
const notAuthenticated = res.status(500).json('Not authenticated');
// eslint-disable-next-line no-undef
const notAllowed = res.status(403).json('You are not alowed to do that!');

// eslint-disable-next-line no-undef
const error = res.status(500).json(err);

module.exports = { notAuthenticated, notAllowed, error };
