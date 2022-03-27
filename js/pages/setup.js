$(function() {
    // init preview values
    $("[data-pref-preview]").each(function() {
        let key = $(this).attr('data-key')
        let value = preferences.get(key)
        $(this).attr('data-value', value)
    });
    
    // init all labels
    $("[data-pref-preview]").prefButtonLabel()
    $("button[data-pref-set]").prefButtonLabel()
});
$("[data-pref-preview]").click(function() {
    // hide preview, show popup
    let key = $(this).attr('data-key')
    $('.setup-popup[data-key="' + key + '"]').show()
    $(this).hide()
});
$("[data-pref-set]").click(function() {
    // set user preference
    preferences.set($(this).attr("data-key"), $(this).attr("data-value"));

    // hide popup, show preview, set new label for preview
    $(this).closest('.setup-popup').hide()
    $('[data-pref-preview]').prefButtonLabel()
    $('[data-pref-preview]').show()
});

$.fn.prefButtonLabel = function() {
    $(this).each(function() {
        let key = $(this).attr('data-key')
        let value = preferences.get(key)
        if ($(this).is('[data-pref-set]')) {
            value = $(this).attr('data-value')
        }
        let s = $(this).attr('data-format')
        let name = labels[key][value]
        console.log("name", name)
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