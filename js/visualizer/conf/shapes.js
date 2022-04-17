// prettier-ignore
import * as CONST from './../constants.js';
import { AdsrAnimation, InOutAnimation, SimpleAnimation } from './../Animation.js';
import { VelocityModulator } from './../Modulator.js';

export default {
    "000": {
        color_style: 0,
        shape_type: CONST.shape_types.blurry,
        texture: "none",
        inner_size: 1,
        blend_mode: "normal",
        scale: 1,
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
        color_style: 1,
        shape_type: CONST.shape_types.plain,
        texture: "none",
        inner_size: 1,
        blend_mode: "normal",
        scale: 1,
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
        color_style: 2,
        shape_type: CONST.shape_types.texturized,
        texture: "none",
        inner_size: 1,
        blend_mode: "normal",
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