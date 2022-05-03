$(function() {
    $('[data-rotate]').each(function() {
        let rotate_speed = $(this).attr('data-rotate-speed') || 500
        let fade_speed = $(this).attr('data-fade-speed') || 250
        let $first = $(this).find('[data-rotate-item]').first()
        $first.attr('data-active', '1')


        let $container = $(this)
        let $display = $("<div data-rotate-display></div>")
        let $new = $("<div></div>").html($first.contents().clone())
        $container.append($display)
        $container.css('position', 'relative')
        $display.append($new)

        let debug = 0
        window.setInterval(function() {
            // if (debug++ > 2) return
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
                $new = $("<div></div>").html($next.contents().clone())
                $old.css('opacity', 0)
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
                $display.height($old.height()).animate({ height: new_height }, fade_speed)
            });

        }, rotate_speed);

    });

});