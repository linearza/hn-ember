import Ember from 'ember';
import DS from 'ember-data';
import Model from 'ember-data/model';

const {
  computed
} = Ember;

const ITEM_TYPE_JOB = 'job',
  ITEM_TYPE_STORY = 'story',
  ITEM_TYPE_COMMENT = 'comment',
  ITEM_TYPE_POLL = 'poll',
  ITEM_TYPE_POLLOPT = 'pollopt';

export {
  ITEM_TYPE_JOB,
  ITEM_TYPE_STORY,
  ITEM_TYPE_COMMENT,
  ITEM_TYPE_POLL,
  ITEM_TYPE_POLLOPT
};

export default Model.extend({

  type: DS.attr('string'), // "job", "story", "comment", "poll", or "pollopt"
  title: DS.attr('string'), // The title of the story, poll or job; not for comment
  url: DS.attr('string'),

  // by: DS.belongsTo('user', { async: true }),
  by: DS.attr('string'),

  text: DS.attr('string'),
  score: DS.attr('number'),
  time: DS.attr('number'),

  dead: DS.attr('boolean', {
    defaultValue: false
  }),

  deleted: DS.attr('boolean', {
    defaultValue: false
  }),

  parent: DS.belongsTo('item', {
    inverse: 'kids',
    async: true
  }), // story, comment or poll

  kids: DS.hasMany('item', {
    inverse: 'parent',
    async: true
  }), // the ids of the item's comments, in ranked display order
  // parts: DS.belongsTo('item', { inverse: 'root', async: true }),     // pollopts

  descendants: DS.attr('number'), //  In the case of stories or polls, the total comment count.
  hasDescendants: computed.bool('descendants'),

  username: computed.alias('by'),

  numKids: computed.alias('kids.length'),

  hasKids: computed.bool('numKids'),
  isParent: computed.alias('hasKids'),

  isJob: computed.equal('type', ITEM_TYPE_JOB),
  isStory: computed.equal('type', ITEM_TYPE_STORY),
  isComment: computed.equal('type', ITEM_TYPE_COMMENT),
  isPoll: computed.equal('type', ITEM_TYPE_POLL),
  isPollOpt: computed.equal('type', ITEM_TYPE_POLLOPT),

});