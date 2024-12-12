const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Achievement = require('./achievementModel');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    description: {
        type: String,
        default: ''
    },
    profileColor: {
        hex: {
            type: String,
            default: '#FF5722'
        },
        rgb: {
            type: String,
            default: 'rgb(255, 87, 34)'
        },
        isDark: {
            type: Boolean,
            default: false
        }
    },
    notification: {
        like: {
            type: Boolean,
            default: true
        },
        comment: {
            type: Boolean,
            default: true
        },
        follow: {
            type: Boolean,
            default: true
        },
        newMessage:{
            type: Boolean,
            default: true
        },
    },
    profileImage: {
        type: String,
        default: 'default.jpg'
    },
    rights: {
        type: Number,
        default: 0
    },
    level: {
        type: Number,
        default: 0
    },
    xp: {
        type: Number,
        default: 0
    },
    xpTotal: {
        type: Number,
        default: 0
    },
    followedCount: {
        type: Number,
        default: 0
    },
    followerCount: {
        type: Number,
        default: 0
    },
    maxFollow: {
        type: Number,
        default: 100
    },
    achievements: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Achievement',
    }],
    messagesLiked: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }]
}, {timestamps: true});

userSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.addingAchievement = async function(achievementId){
    const achievement = await Achievement.findOne({_id: achievementId});
    if(achievement && this.achievements.indexOf(achievementId) === -1){
        this.achievements.push(achievement);
        await this.save();
    }
    return this;
}

userSchema.methods.addXp = async function(xp = 2){
    if(xp > 0){
        this.xpTotal = this.xpTotal + xp;
        let i = xp;
        while(i > 0){
            this.xp = this.xp + 1;
            // Level up
            const newLevel = this.level + 1;
            if(this.xp >= newLevel){
                this.level = newLevel;
                // Checking if new level is a multiple of 5
                if(newLevel % 5 === 0){
                    // Adding 1 to maxFollow
                    this.maxFollow = this.maxFollow + 10;
                }
                this.xp = 0;
            }
            i -= 1;
        }
    }
    await this.save();
}

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('User', userSchema);