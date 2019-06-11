const self = this;
const doc = self.document;

(function () {
    let inaccessibleElements = doc.getElementsByClassName("ia");
    let comingSoonElements = doc.getElementsByClassName("cs");

    Array.from(inaccessibleElements).forEach(function (element, index, array) {
        element.addEventListener('click', function () {
            alert("Coming Soon!");
        });
    });

    Array.from(comingSoonElements).forEach(function (element, index, array) {
        element.addEventListener('click', function () {
            alert("Coming Soon!");
        });
    });
})();