module.exports = function(app) {
  var ContactsController = {
    index: function(req, res) {
      var user = req.session.user
        , contacts = user.contacts
        , params = {user: user, contacts: contacts};

      res.render('contacts/index', params);
    },

    create: function(req, res) {
      var contact = req.body.contact
        , user = req.session.user;

      user.contacts.push(contact);
      res.redirect('/contacts')
    },

    show: function(req, res) {
      var id = req.params.id
        , contact = req.session.user.contacts[id]
        , params = {contact: contact, id: id};

      res.render('contacts/show', params);
    },

    edit: function(req, res) {
      var id = req.params.id
        , user = req.session.user
        , contact = user.contacts[id]
        , params = {user: user, contact: contact, id: id}

      res.render('contacts/edit', params);
    },

    update: function(req, res) {
      var contact = req.body.contact
        , user = req.session.user;

      user.contacts[req.params.id] = contact;
      res.redirect('/contacts');
    },

    destroy: function(req, res) {
      var id = req.params.id
        , user = req.session.user;

      user.contacts.splice(id, 1);
      res.redirect('/contacts');
    }
  };

  return ContactsController;
};
