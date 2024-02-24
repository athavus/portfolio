function socialMedia(name) {
    const id = name;
    if (id == 'instagram') {
        window.open("https://www.instagram.com/1mrzin/")
    } else if (id == 'linkedin') {
        window.open("https://www.linkedin.com/in/miguel-ryan-freitas-914504245/")
    } else if (id == 'whatsapp') {
        window.open("https://wa.me/5583988864397")
    } else if (id == 'github') {
        window.open("https://github.com/athavus")
    }
}

function abrir(link) {
    window.open(link);
}

document.addEventListener("DOMContentLoaded", () => {
    function checkVisibility(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('triggered');
                observer.unobserve(entry.target); 
            }
        });
    }
    var observer = new IntersectionObserver(checkVisibility);

    var boxes = document.querySelectorAll('.sec1');
    boxes.forEach(box => {
        observer.observe(box);
    });

    var myCertificates = document.querySelectorAll('.myCertificates')
    myCertificates.forEach(certificate => {
        observer.observe(certificate);
    })

    var myCompletedProjects = document.querySelectorAll('.myCompletedProjects')
    myCompletedProjects.forEach(projects => {
        observer.observe(projects);
    }) 
    var myOnGoingProjects = document.querySelectorAll('.myOnGoingProjects')
    myOnGoingProjects.forEach(projects => {
        observer.observe(projects);
    })

    document.getElementById('acessarLajedo').addEventListener('click', function() {
        var url = './documents/patentelajedo.pdf';
        var filename = 'Patente - Lajedo do Marinho.pdf';
        var link = document.createElement('a');
        link.style.display = 'none';
        document.body.appendChild(link);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.click();
        document.body.removeChild(link);
    });
});