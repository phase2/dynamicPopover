# Dynamic Popovers

Takes the Bootstrap Popover class and adds a parameter to pass a query selector, object or a DOM element as an option.  The first element in this set will be used as the content for the popover, this allows consistently manipulable content with events.

## Usage
Simply initialize like

    $('trigger').dynamicPopover({
        selector: '.popover' // Where the content will be derived from
        // Any desired bootstrap popover options are supported also
    })

## Requires

* jQuery
* Twitter Bootstrap with ToolTip javascript