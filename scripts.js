
document.addEventListener("DOMContentLoaded", function () {
    // spinner
    const spinnerWrapperEl = document.querySelector('.spinner-wrapper');
    setTimeout(() => {
        spinnerWrapperEl.style.opacity = '0';
        spinnerWrapperEl.style.display = 'none';
    }, 1000);

    // script fetch menu
    fetch('db/menu.json')
        .then(response => response.json())
        .then(data => {
            const menu = document.getElementById('menu');

            data.forEach(item => {
                const menuItem = document.createElement('li');
                menuItem.className = 'nav-item';

                const link = document.createElement('a');
                link.className = 'nav-link';
                link.href = item.link;
                link.textContent = item.text;

                if (link.href === window.location.href) {
                    link.classList.add('active');
                }

                menuItem.appendChild(link);
                menu.appendChild(menuItem);
            });
        })
        .catch(error => {
            console.error('Error fetching menu data:', error);
        });
});
