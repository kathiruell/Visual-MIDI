let shapes_array = {
    "000": {
        color_style: 0,
        shape_type: SHAPE_TYPE_BLURRY,
        texture: "none",
        inner_size: 1,
        blend_mode: "normal",
        scale: 1.2,
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
        shape_type: SHAPE_TYPE_PLAIN,
        texture: "none",
        inner_size: 1,
        blend_mode: "normal",
        scale: () => new AdsrAnimation(
            [100, 200, 500, 1000],
            [1, .8, .5, 0.1],
            'linear'
        ),
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
        shape_type: SHAPE_TYPE_3D,
        texture: "none",
        inner_size: 1,
        blend_mode: "normal",
        scale: () => new AdsrAnimation(
            [100, 200, 500, 2000],
            [0, 0.4, .8, 1],
            'linear'
        ),
        opacity: () => new AdsrAnimation(
            [100, 200, 5000, 2000],
            [0.8, 1, .6, 0],
            'linear'
        ),
        modulators: {
            scale: (note) => new VelocityModulator(5*note.vel)
        }
    },
};