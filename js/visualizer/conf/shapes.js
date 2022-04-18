// prettier-ignore
import { blend_modes, shape_types } from '../constants.js';
import { AdsrAnimation, InOutAnimation, SimpleAnimation } from './../Animation.js';
import { VelocityModulator } from './../Modulator.js';

export default {
    default: {
        shape_type: shape_types.plain,
        inner_size: .1,
        blend_mode: blend_modes.normal,
        scale: 1,
        opacity: 1,
        modulators: {
            opacity: note => new VelocityModulator(note.vel)
        }
    },
    "000": {
        shape_type: shape_types.blurry,
        scale: () => new AdsrAnimation(
            [200, 400, 800, 1400],
            [1, .5, .3, 0],
            'linear'
        ),
        opacity: 
            () => new AdsrAnimation(
                [100, 200, 5000, 2000],
                [1, .8, .6, 0],
                'linear'
            ),
        modulators: {
            opacity: note => new VelocityModulator(note.vel)
        }
    },
    "111": {
        opacity: () => new AdsrAnimation(
            [100, 200, 5000, 2000],
            [1, .8, .6, 0],
            'linear'
        ),
        modulators: {
            scale: (note) => new VelocityModulator(3*note.vel)
        }
    },
    "222": {
        shape_type: shape_types.texturized,
        blend_mode: blend_modes.difference,
        scale: () => new AdsrAnimation(
            [100, 400, 600, 5000],
            [0, 0.4, .8, 1],
            'linear'
        ),
        opacity: () => new AdsrAnimation(
            [100, 200, 1000, 2000],
            [0.8, 1, .5, 0],
            'linear'
        ),
        modulators: {
            scale: (note) => new VelocityModulator(5*note.vel)
        }
    },
};