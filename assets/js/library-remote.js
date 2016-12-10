if ($ === undefined) {
    throw new Error('Core module not found');
}

(function($) {
    'use strict';

    var remote = $.package('pl.library.remote');

    function noop() {}

    function prepareSettings(providedSettings) {
        return $.mix(providedSettings, {
            method: 'GET',
            url: '',
            data: {},
            onSuccess: noop,
            onError: noop
        });
    }

    remote.request = function(config) {
        var settings = prepareSettings(config),
            xhr = new XMLHttpRequest();

        xhr.open(settings.method, settings.url);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status > 199 && xhr.status < 300) {
                    settings.onSuccess(JSON.parse(xhr.responseText), xhr);
                } else {
                    settings.onError(xhr);
                }
            }
        };
        xhr.send(settings.data);
    };

})($);
