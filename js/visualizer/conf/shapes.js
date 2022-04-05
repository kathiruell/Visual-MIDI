let shapes_array = {
    "000": {
        color_style: 2,
        shape_type: SHAPE_TYPE_PLAIN,
        texture: "none",
        inner_size: 1,
        blend_mode: "normal",
        scale: 1.2,
        opacity: 1,
    },
    "010": {
        color_style: 2,
        shape_type: SHAPE_TYPE_PLAIN,
        texture: "none",
        inner_size: 1,
        blend_mode: "normal",
        scale: () => new AdsrAnimation(
            [100, 200, 500, 1000],
            [1, .8, .8, .5],
            'linear'
        ),
        opacity: () => new AdsrAnimation(
            [100, 200, 5000, 2000],
            [1, .8, .6, 0],
            'linear'
        ),
    },
};