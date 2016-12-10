$.onPageReady(function () {
    var server = $.package('pl.library.remote'),
        cardTemplate = document.querySelector('#card-template').innerHTML,
        cardsElement = document.querySelector('#cards');

    function showContacts(contacts) {
        var cards = '';
        $.forEach(contacts, function (contact) {
            cards += $.evaluate(cardTemplate, contact);
        });
        cardsElement.innerHTML = cards;
    }

    server.request({url: 'http://213.32.66.195:3000/contacts', onSuccess: showContacts});
});