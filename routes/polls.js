var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var expressJwt = require('express-jwt');


var pollSchema = mongoose.Schema({
  title: String,
  options: [{ option: String, votes: Number }],
  authorName: String,
  authorUsername: String,
  authorId: String
});

pollSchema.plugin(timestamps);

var Poll = mongoose.model('Poll', pollSchema);


router.get('/polls', function(req, res, next) {
  const authorId = req.query.type === 'mypolls' ? JSON.parse(req.query.user)._id : null;
  const query = authorId ? { authorId } : {};

  Poll
    .find(query)
    .select({
      __v: 0,
      updatedAt: 0,
      createdAt: 0
    })
    .limit(100)
    .sort({
      createdAt: -1
    })
    .exec(function(err, polls) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: 'Could not retrieve polls'
        });
      }
      res.json(polls);
    });

});

router.post('/polls', function(req, res, next) {
  var user = req.user;
  if (!user) {
    return res.status(401).json({
      message: 'Permission Denied!'
    });
  }

  console.dir(req.user);

  var body = req.body;
  var title = body.title;
  var options = body.options
  .split(',')
  .filter(function(item, pos, self) {
    return self.indexOf(item) == pos;
  })
  .map(function(option) {
    return { option: option.trim(), votes: 0 };
  });

  if (!title || !options) {
    return res.status(400).json({
      message: 'Error title and options are required!'
    });
  }

  var poll = new Poll({
    title: title,
    options: options,
    authorUsername: req.user.username,
    authorId: req.user._id,
    authorImage: req.user.image
  });


  poll.save(function(err, poll) {
    if (err) {
      console.log(err);
      return res.status(500).json({
        message: 'Could not save poll'
      });
    }
    res.json(poll);
  });
});

router.get('/polls/:id', function(req, res, next) {
  Poll.findById({
    '_id': req.params.id
  }, function(err, poll) {
    if (err) {
      console.log(err);
      return res.status(500).json({
        message: 'Could not retrieve poll w/ that id'
      });
    }
    if (!poll) {
      return res.status(404).json({
        message: 'Poll not found'
      })
    }
    console.log(poll)
    res.json(poll);
  });
});

router.post('/polls/:id', function(req, res, next) {
  // var user = req.user;
  // if (!user) {
  //   return res.status(401).json({
  //     message: 'Permission Denied!'
  //   });
  // }

  var query = req.body.option.customOption ? {'_id': req.params.id} : {'_id': req.params.id, 'options.option': req.body.option};
  var update = req.body.option.customOption ? {$push:{'options': {'option': req.body.option.customOption.trim(), 'votes': 1}}} : {$inc:{'options.$.votes': 1}};

  Poll.findOneAndUpdate(
    query,
    update,
    {upsert: true, new: true},
    function(err, doc) {
      if (err) throw err;
      res.json(doc);
    })
  })

router.delete('/polls/:id', function(req, res, next) {
  if (!req.user) {
    return res.status(401).json({
      message: 'Permission Denied!'
    });
  }

  var id = req.params.id;
  if (id.length != 24) {
    return res.json({
      message: 'id must be a valid 24 char hex string'
    });
  }
  var id = mongoose.Types.ObjectId(req.params.id); //convert to objectid
  Poll.findByIdAndRemove(id, function(err, poll) {
    if (err)
      throw err;

    if (!poll) {
      return res.status(404).json({
        message: 'Could not delete poll'
      });
    }

    res.json({
      result: 'Poll was deleted'
    });

  });
});

router.post('/polls/validate/fields', function(req, res, next) {
  var body = req.body;
  var title = body.title ? body.title.trim() : '';

  Poll.findOne({
    'title': new RegExp(title, "i")
  }, function(err, poll) {
    if (err) {
      console.log(err);
      return res.status(500).json({
        message: 'Could not find poll for title uniqueness'
      });
    }
    if (poll) {
      res.json({
        title: 'Title "' + title + '" is not unique!'
      });
    } else {
      return res.json({});
    }

  });
});


module.exports = router;
