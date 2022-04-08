$(function() {

    if (!navigator.requestMIDIAccess) {
        rendererWarning('no_midi_browser')
    } else {
        navigator.requestMIDIAccess()
            .then(
                (access) => {
                    if (access.inputs.size == 0) rendererWarning('no_midi_device')
                },
                () => rendererWarning('no_midi_device'))
    }
});

function rendererWarning(type) {
    $('body').addClass('browser-error')
    $('[data-browser-error="'+type+'"]').addClass('show')
}