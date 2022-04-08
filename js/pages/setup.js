let visualizer_setup = {
    preferences: new Preferences()
}

$(function() {
    // init preview values
    $("[data-pref-preview]").each(function() {
        let key = $(this).attr('data-key')
        let value = setup.preferences.get(key)
        $(this).attr('data-value', value)
    });
    
    // init all labels
    $("[data-pref-preview]").prefButtonLabel()
    $("[data-pref-preview-and-set]").prefButtonLabel()
    $("button[data-pref-set]").prefButtonLabel()
});
$("[data-pref-preview]").click(function() {
    // hide preview, show popup
    let key = $(this).attr('data-key')
    $('.setup-popup[data-key="' + key + '"]').addClass('show')
});
$("[data-pref-set]").click(function() {
    // set user preference
    visualizer_setup.preferences.set($(this).attr("data-key"), $(this).attr("data-value"));

    // hide popup, show preview, set new label for preview
    $(this).closest('.setup-popup').removeClass('show')
    $('[data-pref-preview]').prefButtonLabel()
    $('[data-pref-preview]').show()
});
$("[data-pref-preview-and-set]").click(function() {
    // hide preview, show popup
    let key = $(this).attr('data-key')

    // set next value
    visualizer_setup.preferences.set(key, (visualizer_setup.preferences.get(key) + 1) % 3)

    // update label
    $(this).prefButtonLabel()
});

$.fn.prefButtonLabel = function() {
    $(this).each(function() {
        let key = $(this).attr('data-key')
        let value = visualizer_setup.preferences.get(key)
        if ($(this).is('[data-pref-set]')) {
            value = $(this).attr('data-value')
        }
        let s = $(this).attr('data-format')
        let name = labels[key][value]
        s = s.replace('key', name)
        $(this).text(s)
    });
    return this
}

const labels = {
    shape_style: {
        0: 'mellow',
        1: 'clear',
        2: 'embossed',
    },
    animation_style: {
        0: 'detailed',
        1: 'brisk',
        2: 'massive',
    },
    color_style: {
        0: 'intimate',
        1: 'luminous',
        2: 'gloom',
    }
};

// VIGNETTE //////////////////////////////////////////////////////////////////////////////////////

$(function () {
  $("[data-vignette-selector]").click(function () {
    let val = $(this).attr("data-vignette-selector");

    $("[data-vignette-selector]").removeClass("selected");
    $(this).addClass("selected");

    $("[data-vignette]").removeClass("selected");
    $('[data-vignette="' + val + '"]').addClass("selected");
  });

  // preselect vignette I
  $("[data-vignette-selector]").first().click();
});