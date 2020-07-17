const adminMiddleWare = require('../../utils/auth.js').adminMiddleWare
const User = require('../models/Users')
const Lead = require('../models/Leads')

module.exports = function (app, passport) {
  app.post('/api/admin/login', (req, res, next) => {
    passport.authenticate('local-admin-login', (err, user, info) => {
      if (err) {
        console.log(err)
        return res.status(500).json({ info })
      }
      if (!user) {
        console.log(info.message)
        return res.status(500).json({ info })
      }
      req.login(user, err => {
        if (err) {
          console.log(err)
          return res.status(500).json({ info: { message: err } })
        }
        return res.status(200).json({ success: 'Logged In' })
      })
    })(req, res, next);
  })

  app.get('/api/admin/auth', adminMiddleWare, (req, res) => {
    res.status(200).send({ user: req.user })
  })

  app.get('/api/admin/users', adminMiddleWare, (req, res) => {
    User.find()
      .then(users => {
        res.status(200).send({ users: users })
      })
      .catch(err => {
        return next(err)
      })
  })

  app.get('/api/admin/user/:userid', adminMiddleWare, (req, res, next) => {
    const userID = req.params.userid
    User.findById(userID)
      .then(user => {
        res.status(200).send({ user: user })
      })
      .catch(err => {
        return next(err)
      })
  })

  app.get('/api/admin/generatelinktoken/:userid', adminMiddleWare, (req, res, next) => {
    const userID = req.params.userid
    User.findById(userID)
      .then(user => {
        const linkToken = user.generateToken()
        user.links.push({
          link_token: linkToken
        })
        user.save()
          .then(() => {
            console.log(linkToken)
            return res.status(200).send({ success: 'Link Created' })
          })
          .catch(() => {
            let err = new Error('Unable to create link')
            return next(err)
          })
      })
  })

  app.post('/api/admin/addcontent/:token', adminMiddleWare, async (req, res, next) => {
    const token = req.params.token
    const link_content = req.body.link_content
    if (!validator.validURL(link_content)) {
      let err = new Error('Not a valid URL')
      err.status = 400
      return next(err)
    }
    User.findOneAndUpdate(
      { 'links.link_token': token },
      {
        '$set': {
          'links.$.link_content': link_content
        }
      },
      { new: true }
    )
      .then((user) => {
        const link = user.links.find(link => { return link.link_token === token })
        return res.status(200).send({ link: link })
      })
      .catch((err) => {
        return next(err)
      })
  })

  app.get('/api/admin/leads', adminMiddleWare, (req, res, next) => {
    Lead.find()
      .then(leads => {
        return res.status(200).send({ leads: leads })
      })
      .catch(err => {
        return next(err)
      })
  })
  app.get('/api/admin/resolvelead/:leadid', adminMiddleWare, (req, res, next) => {
    const leadID = req.params.leadid
    Lead.findByIdAndUpdate(leadID, { resolved: true })
      .then(() => {
        return res.status(200).send({ success: 'Lead Resolved' })
      })
      .catch(err => {
        return next(err)
      })
  })

  app.get('/api/admin/unresolvelead/:leadid', adminMiddleWare, (req, res, next) => {
    const leadID = req.params.leadid
    Lead.findByIdAndUpdate(leadID, { resolved: false })
      .then(() => {
        return res.status(200).send({ success: 'Lead Unresolved' })
      })
      .catch(err => {
        return next(err)
      })
  })
}

