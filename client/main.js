import { Meteor } from 'meteor/meteor'
import Auth from './src/scripts/Auth'

Meteor.startup(() => {
    new Auth();
});