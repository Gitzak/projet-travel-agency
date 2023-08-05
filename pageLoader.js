function loadSection(sectionId, fileName) {
    fetch(fileName)
        .then(response => response.text())
        .then(content => {
            document.getElementById(sectionId).innerHTML = content;
        })
        .catch(error => {
            console.error('Error fetching ' + fileName + ':', error);
        });
}