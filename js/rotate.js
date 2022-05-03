$(function() {
    $('[data-rotate]').each(function() {
        let rotate_speed = $(this).attr('data-rotate-speed') ?? 4000
        let fade_speed = parseInt( $(this).attr('data-fade-speed') ?? 250 )
        let fixed_height = $(this).is('[data-fixed-height]')
        let $first = $(this).find('[data-rotate-item]').first()
        $first.attr('data-active', '1')

        let $container = $(this)
        let $display = $("<div data-rotate-display></div>")
        // let $new = $("<div></div>").html($first.contents().clone())
        let $new = rotateGetContents($first)
        $container.append($display)
        $container.css('position', 'relative')
        $display.append($new)

        $container.rotateInitHeight()

        window.setInterval(function() {
            
            if (!$container.isInViewport()) return

            $container.find('[data-rotate-item][data-active="1"]').each(function() {
                $(this).attr('data-active', '0')
                let $next = $(this).next('[data-rotate-item]')
                if (!$next.length) {
                    // start at the beginning
                    $next = $container.find('[data-rotate-item]').first()
                }

                // pointer to old contents
                $old = $display.contents()
                $old.css('opacity', 1)

                // add new contents
                $new = rotateGetContents($next)
                $new.css('opacity', 0)
                $display.append($new)
                $next.attr('data-active', '1')

                // save browser computed height before setting position absolute
                let new_height = $new.height()
                $new.css({
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                });

                // fade contents
                $new.animate({ opacity: 1 }, fade_speed)
                $old.animate({ opacity: 0 }, fade_speed, () => {
                    $old.remove()
                })

                // animate height 
                if (!fixed_height) {
                    $display.height($old.height()).animate({ height: new_height }, fade_speed)
                }
            });

        }, rotate_speed);

    });

});

$.fn.rotateInitHeight = function() {
    let fixed_height = $(this).is('[data-fixed-height]')
    if (!fixed_height) return

    // secretly render all items and find max height
    let $display = $(this).find('[data-rotate-display]')
    let max_height = 0
    $(this).find('[data-rotate-item]').each(function() {
        $item = rotateGetContents($(this))
        $item.css('opacity', 0)
        $display.append($item)
        if ($item.height() > max_height) max_height = $item.height()
        $item.remove()
    });
    $display.height(max_height)
};

function rotateGetContents($template) {
    return $('<div></div>').html($template.contents().clone())
}

$.fn.isInViewport = function() {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();
    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();
    return elementBottom > viewportTop && elementTop < viewportBottom;
};