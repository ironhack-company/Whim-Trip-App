const { Schema, model } = require('mongoose');
const PLM = require('passport-local-mongoose');

const userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    username: String,
    profileImg: {type: String, default:"/images/profile-icon-9.png"},
    trips: [{type: Schema.Types.ObjectId, ref: "Trip"}],
    flights: [],
    admin: {type: Boolean, default: false}
  },
  {
    timestamps: true,
    versionKey: false
  }
);

userSchema.plugin(PLM, { usernameField: 'username' });

module.exports = model('User', userSchema);
