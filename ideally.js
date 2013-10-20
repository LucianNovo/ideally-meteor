if (Meteor.isClient) {

  Meteor.Router.add({
    '/': 'index',
    '/index': 'index',
    '/idea_submission': 'idea_submission',
    '/listIdeas': 'listIdeas',
    '*': '404',
  });

  Template.listIdeas.singIdea = function () {
    console.log('list Ideas');
    return Ideas.find({}, {sort: { timestamp : -1 }}).fetch();
    // return Ideas.find({}, {sort: { _id : 1 }}).fetch();
  };

  Template.listIdeas.ideaOutput = function () {
      var statusTable={0:"Not acknowledged",1:"Acknowledged",2:"In Progress", 3:"Done"}; 
      return statusTable[(this.status+0)];
  };

  Template.idea_submission.greeting = function () {
    return "Welcome to ideally.";
  };

  Template.idea_submission.events({
    'click .submit-idea' : function () {
      var title       = $('.idea-title').val();
      var description = $('.idea-description').val();
      Ideas.insert({ description: description, relatedIdeas: [],timestamp:Date.now() }); //#TODO dates server side

      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        // console.log("idea-submitted");
      var text = $('idea_submission').val();

      if(text)
      {
        addNewIdea(text);
      }
    }
  });

}

if (Meteor.isServer) {
    // Meteor.startup(function () {});
    // code to run on server at startup

    Meteor.methods({
      addIdea: function (doc) {
        doc.timestamp = new Date;
        return Ideas.insert(doc);
      }
      //,
      // updateIdeaServer: function (selDoc) {
      //   doc.timestamp = new Date;
      //   console.log(selDoc.doc.text)
      //   return Ideas.update(selDoc.sel,selDoc.doc);
      // }
    });
}