// prettier-ignore
import { blend_modes, shape_types } from '../constants.js';
import { NotePositions } from '../NotePositions.js';
import { AdsrAnimation, InOutAnimation, SimpleAnimation } from './../Animation.js';
import { LinearPositionModulator, VelocityModulator } from './../Modulator.js';

export default {
    default: {
        shape_type: shape_types.plain,
        inner_size: .1,
        blend_mode: blend_modes.normal,
        scale: 1,
        opacity: 1,
        position: (note) => NotePositions.getPosition(note),
        modulators: {
            opacity: (note) => new VelocityModulator(note.vel)
        },
    },
    // DETAILED, MELLOW, INTIMATE
    "000": {
        shape_type: shape_types.blurry,
        inner_size: 0.005,
        blend_mode: blend_modes.exclusion,
        scale: () => new AdsrAnimation(
            [200, 400, 800, 1400],
            [.8, .5, .2, 0],
            'linear'
        ),
        opacity: 
            () => new AdsrAnimation(
                [100, 200, 5000, 2000],
                [.8, .6, .4, 0],
                'linear'
            ),
        modulators: {
            opacity: note => new VelocityModulator(note.vel),
            position: () => new LinearPositionModulator({x: 50, y: 50}),
        }
    },
    // DETAILED, CLEAR, INTIMATE
    "010": {
        shape_type: shape_types.plain,
        blend_mode: blend_modes.normal,
        scale: () => new AdsrAnimation(
            [200, 400, 700, 900],
            [.6, .5, .2, 0],
            'linear'
        ),
        opacity: 
            () => new AdsrAnimation(
                [100, 200, 5000, 2000],
                [1, .8, .6, 0],
                'linear'
            ),
    },
    // DETAILED, EMBOSSED, INTIMATE
    "020": {
        shape_type: shape_types.texturized,
        blend_mode: blend_modes.exclusion,
        scale: () => new AdsrAnimation(
            [400, 800, 850, 1600],
            [2, 1, 0.9, 0],
            'linear'
        ),
        opacity: 
            () => new AdsrAnimation(
                [100, 200, 5000, 2000],
                [.8, .6, .4, 0],
                'linear'
            ),
    },

    /////////////////////////////////////////////
    // BRISK, MELLOW, INTIMATE
    "100": {
        shape_type: shape_types.blurry,
        inner_size: 0.01,
        scale: 3,
        blend_mode: blend_modes.normal,
        opacity: () => new AdsrAnimation(
            [100, 200, 5000, 2000],
            [1, .8, .6, 0],
            'linear'
        ),
        modulators: {
            //TODO SCALE VELOCITY
            scale: (note) => new VelocityModulator(note.vel)
        }
    },
    // BRISK, CLEAR, INTIMATE
    "110": {
        shape_type: shape_types.plain,
        blend_mode: blend_modes.normal,
        scale: 3,
        opacity: () => new AdsrAnimation(
            [100, 200, 5000, 2000],
            [1, .8, .6, 0],
            'linear'
        ),
        modulators: {
            //TODO SCALE VELOCITY
            scale: (note) => new VelocityModulator(note.vel)
        }
    },
    // BRISK, EMBOSSED, INTIMATE
    "120": {
        shape_type: shape_types.texturized,
        blend_mode: blend_modes.lightest,
        scale: 2,
        opacity: () => new AdsrAnimation(
            [100, 200, 800, 1500],
            [0.8, 1, .5, 0],
            'linear'
        ),
        modulators: {
            //TODO SCALE VELOCITY
            scale: (note) => new VelocityModulator(note.vel)
        }
    },

    /////////////////////////////////////////////
    // MASSIVE, MELLOW, INTIMATE
    "200": {
        shape_type: shape_types.blurry,
        inner_size: 0.02,
        scale: () => new AdsrAnimation(
            [100, 400, 600, 800],
            [0, 0.8, 2.5, 3],
            'linear'
        ),
        opacity: () => new AdsrAnimation(
            [100, 200, 800, 1500],
            [0.8, 1, .5, 0],
            'linear'
        ),
    },
    // MASSIVE, CLEAR, INTIMATE
    "210": {
        shape_type: shape_types.plain,
        scale: () => new AdsrAnimation(
            [100, 400, 600, 1000],
            [0, 0.8, 1.5, 2],
            'linear'
        ),
        opacity: () => new AdsrAnimation(
            [100, 200, 800, 900],
            [0.8, 1, .5, 0],
            'linear'
        ),
    },
    // MASSIVE, EMBOSSED, INTIMATE
    "220": {
        shape_type: shape_types.texturized,
        scale: () => new AdsrAnimation(
            [100, 400, 600, 800],
            [0, 0.8, 1.5, 2],
            'linear'
        ),
        opacity: () => new AdsrAnimation(
            [100, 200, 800, 1500],
            [0.8, 1, .5, 0],
            'linear'
        ),
    },
    /////////////////////////////////////////////
    /////////////////////////////////////////////

    // DETAILED, MELLOW, LUMINOUS
    "001": {
        inner_size: 0.1,
        shape_type: shape_types.blurry,
        scale: () => new AdsrAnimation(
            [200, 400, 800, 1400],
            [.8, .5, .2, 0],
            'linear'
        ),
        opacity: 
            () => new AdsrAnimation(
                [100, 200, 5000, 2000],
                [.8, .6, .4, 0],
                'linear'
            ),
    },
    // DETAILED, CLEAR, LUMINOUS
    "011": {
        blend_mode: blend_modes.screen,   
        scale: () => new AdsrAnimation(
            [200, 400, 800, 1600],
            [.8, .5, .2, 0],
            'linear'
        ),
        opacity: 
            () => new AdsrAnimation(
                [100, 200, 5000, 1500],
                [.8, .6, .4, 0],
                'linear'
            ),
    },
    // DETAILED, EMBOSSED, LUMINOUS
    "021": {
        shape_type: shape_types.texturized,
        scale: () => new AdsrAnimation(
            [200, 400, 800, 1400],
            [1.5, .8, .4, 0],
            'linear'
        ),
        opacity: 
            () => new AdsrAnimation(
                [100, 200, 5000, 2000],
                [.8, .6, .4, 0],
                'linear'
            ),
    },

    /////////////////////////////////////////////

    // BRISK, MELLOW, LUMINOUS
    "101": {
        inner_size: 0.2,
        shape_type:shape_types.blurry,
        blend_mode: blend_modes.lightest,
        scale: 2,
        opacity: () => new AdsrAnimation(
            [100, 200, 5000, 2000],
            [1, .8, .6, 0],
            'linear'
        ),
        modulators: {
            //TODO SCALE VELOCITY
            scale: (note) => new VelocityModulator(note.vel)
        }
    },
    // BRISK, CLEAR, LUMINOUS
    "111": {
        blend_mode: blend_modes.lightest,
        opacity: () => new AdsrAnimation(
            [100, 200, 5000, 2000],
            [1, .8, .6, 0],
            'linear'
        ),
        modulators: {
            //TODO SCALE VELOCITY
            scale: (note) => new VelocityModulator(note.vel),
        }
    },
    // BRISK, EMBOSSED, LUMINOUS
    "121": {
        shape_type:shape_types.texturized,
        blend_mode: blend_modes.lightest,
        scale: 2,
        opacity: () => new AdsrAnimation(
            [100, 200, 5000, 2000],
            [1, .8, .6, 0],
            'linear'
        ),
        modulators: {
            //TODO SCALE VELOCITY
            scale: (note) => new VelocityModulator(note.vel)
        }
    },

    /////////////////////////////////////////////

    // MASSIVE, MELLOW, LUMINOUS
    "201": {
        shape_type: shape_types.blurry,
        inner_size: 0.6,
        blend_mode: blend_modes.lightest,
        scale: () => new AdsrAnimation(
            [100, 400, 600, 1300],
            [0, 0.8, 2.5, 3],
            'linear'
        ),
        opacity: () => new AdsrAnimation(
            [100, 200, 800, 1200],
            [0.8, 1, .5, 0],
            'linear'
        ),
    },
    // MASSIVE, CLEAR, LUMINOUS
    "211": {
        blend_mode: blend_modes.lightest,
        scale: () => new AdsrAnimation(
            [100, 400, 600, 1000],
            [0, 0.8, 2.5, 3],
            'linear'
        ),
        opacity: () => new AdsrAnimation(
            [100, 200, 800, 900],
            [0.8, 1, .5, 0],
            'linear'
        ),
    },
    // MASSIVE, EMBOSSED, LUMINOUS
    "221": {
        shape_type: shape_types.texturized,
        blend_mode: blend_modes.lightest,
        scale: () => new AdsrAnimation(
            [100, 400, 600, 800],
            [0, 0.8, 2.5, 3],
            'linear'
        ),
        opacity: () => new AdsrAnimation(
            [100, 200, 800, 1500],
            [0.8, 1, .5, 0],
            'linear'
        ),

    },


    /////////////////////////////////////////////
    /////////////////////////////////////////////

    // DETAILED, MELLOW, GLOOM
    "002": {
        inner_size: 0.6,
        shape_type: shape_types.blurry,
        blend_mode: blend_modes.difference,
        scale: () => new AdsrAnimation(
            [200, 400, 800, 1400],
            [.8, .5, .2, 0],
            'linear'
        ),
        opacity: 
            () => new AdsrAnimation(
                [100, 200, 5000, 2000],
                [.8, .6, .4, 0],
                'linear'
            ),
    },
    // DETAILED, CLEAR, GLOOM
    "012": {
        blend_mode: blend_modes.difference,
        scale: () => new AdsrAnimation(
            [200, 400, 800, 1400],
            [.8, .5, .2, 0],
            'linear'
        ),
        opacity: 
            () => new AdsrAnimation(
                [100, 200, 5000, 2000],
                [.8, .6, .4, 0],
                'linear'
            ),
    },
    // DETAILED, EMBOSSED, GLOOM
    "022": {
        blend_mode: blend_modes.difference,
        shape_type: shape_types.texturized,
        scale: () => new AdsrAnimation(
            [200, 400, 800, 1400],
            [.8, .5, .2, 0],
            'linear'
        ),
        opacity: 
            () => new AdsrAnimation(
                [100, 200, 5000, 2000],
                [.8, .6, .4, 0],
                'linear'
            ),
    },

    /////////////////////////////////////////////

    // BRISK, MELLOW, GLOOM
    "102": {
        shape_type: shape_types.blurry,
        inner_size: 0.6,
        blend_mode: blend_modes.difference,
        opacity: () => new AdsrAnimation(
            [100, 200, 5000, 2000],
            [1, .8, .6, 0],
            'linear'
        ),
        scale:5,
        modulators: {
            //TODO SCALE VELOCITY
            scale: (note) => new VelocityModulator(note.vel)
        }
    },
    // BRISK, CLEAR, GLOOM
    "112": {
        blend_mode: blend_modes.difference,
        opacity: () => new AdsrAnimation(
            [100, 200, 5000, 2000],
            [1, .8, .6, 0],
            'linear'
        ),
        modulators: {
            //TODO SCALE VELOCITY
            scale: (note) => new VelocityModulator(note.vel)
        }
    },
    // BRISK, EMBOSSED, GLOOM
    "122": {
        shape_type: shape_types.texturized,
        blend_mode: blend_modes.difference,
        opacity: () => new AdsrAnimation(
            [100, 200, 5000, 2000],
            [1, .8, .6, 0],
            'linear'
        ),
        modulators: {
            //TODO SCALE VELOCITY
            scale: (note) => new VelocityModulator(note.vel)
        }
    },

    /////////////////////////////////////////////

    // MASSIVE, MELLOW, GLOOM
    "202": {
        shape_type: shape_types.blurry,
        blend_mode: blend_modes.difference,
        inner_size: 0.6,
        scale: () => new AdsrAnimation(
            [100, 400, 600, 800],
            [0, 0.8, 2.5, 3],
            'linear'
        ),
        opacity: () => new AdsrAnimation(
            [100, 200, 800, 1500],
            [0.8, 1, .5, 0],
            'linear'
        ),
    },
    // MASSIVE, CLEAR, GLOOM
    "212": {
        blend_mode: blend_modes.difference,
        scale: () => new AdsrAnimation(
            [100, 400, 600, 800],
            [0, 0.8, 2.5, 3],
            'linear'
        ),
        opacity: () => new AdsrAnimation(
            [100, 200, 800, 1500],
            [0.8, 1, .5, 0],
            'linear'
        ),
    },

    // MASSIVE, EMBOSSED, GLOOM
    "222": {
        shape_type: shape_types.texturized,
        blend_mode: blend_modes.difference,
        scale: () => new AdsrAnimation(
            [100, 400, 600, 800],
            [0, 0.8, 2.5, 3],
            'linear'
        ),
        opacity: () => new AdsrAnimation(
            [100, 200, 800, 1500],
            [0.8, 1, .5, 0],
            'linear'
        ),
    },
};