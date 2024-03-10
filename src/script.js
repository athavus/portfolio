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

function topFunction() {
    document.body.scrollTop = 0; // Para navegadores da web
    document.documentElement.scrollTop = 0; // Para navegadores móveis
}

// Mostrar o botão quando o usuário rolar para baixo 20 pixels da parte superior da página
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("btnVoltarAoTopo").style.display = "block";
    } else {
        document.getElementById("btnVoltarAoTopo").style.display = "none";
    }
}

async function fetchData(ghLogin) {
    let response = await fetch(`https://lengthylyova.pythonanywhere.com/api/gh-contrib-graph/fetch-data/?githubLogin=${ghLogin}`, {method: "GET"});
    let data = await response.json();
    return data['data']['user']
}

function init_table() {
    let table = document.createElement("table"); table.className = "ghCalendarTable";
    let thead = table.createTHead();
    let tbody = table.createTBody();
    let row = thead.insertRow();
    cell = row.insertCell();
    cell.style.width = "28px";
    for (let i = 0; i < 7; i++) {
        const row = tbody.insertRow();
        const cell = row.insertCell();
        switch (i) {
            case 1: cell.innerHTML = '<span class="ghCalendarLabel">Mon</span>'; break;
            case 3: cell.innerHTML = '<span class="ghCalendarLabel">Wed</span>'; break;
            case 5: cell.innerHTML = '<span class="ghCalendarLabel">Fri</span>'; break;
        };
    };
    return [table, thead, tbody];
};

function addMonths(thead, months) {
    for (let i = 0; i < months.length; i++) {
        const total_weeks = months[i]["totalWeeks"];
        if (total_weeks => 2) {
            let cell = thead.rows[0].insertCell();
            let label = document.createElement("span");
            label.textContent = months[i]["name"];
            label.className = "ghCalendarLabel";
            cell.appendChild(label);
            cell.colSpan = months[i]["totalWeeks"];
        };
    };
};

function addWeeks(tbody, weeks, colors) {
    for (let i = 0; i < weeks.length; i++) {
        const days = weeks[i]["contributionDays"];
        for (let j = 0; j < days.length; j++) {
            const day = days[j]
            const data = document.createElement("span");
            date = new Date(day["date"]);
            data.textContent = `${day["contributionCount"]} contributions on ${date.toDateString()}`;
            const cell = tbody.rows[day["weekday"]].insertCell();
            cell.appendChild(data);
            cell.className = "ghCalendarDayCell";
            cell.dataset.date = day["date"];
            cell.dataset.count = day["contributionCount"];
            cell.dataset.level = day["contributionLevel"]
        }
    };
};

function init_card() {
    const card = document.createElement("div");
    card.className = "ghCalendarCard";
    return card;
}

function init_card_footer() {
    const footer = document.createElement("div");
    const link = document.createElement("a");
    const colors = document.createElement("div");
    footer.className = "ghCalendarCardFooter";
    link.className = "ghCalendarCardFooterLink";
    link.innerHTML = `<a href="https://github.com/lengthylyova/gh-contrib-graph">Module source</a>`;
    colors.className = "ghCalendarCardFooterColors";
    let less = document.createElement("span");
    less.textContent = "Less";
    let more = document.createElement("span");
    more.textContent = "More";
    colors.appendChild(less);
    let levels = ["NONE", "FIRST_QUARTILE", "SECOND_QUARTILE", "THIRD_QUARTILE", "FOURTH_QUARTILE"]
    for (let i = 0; i < 5; i++) {
        let cell = document.createElement("div");
        cell.className = "ghCalendarDayCell";
        cell.dataset.level = levels[i];
        colors.appendChild(cell);
    };
    colors.appendChild(more);
    footer.appendChild(link);
    footer.appendChild(colors);
    return footer
}

function init_canvas() {
    const canvas = document.createElement("div");
    canvas.className = "ghCalendarCanvas";
    return canvas;
}

function init_header(total_contribs, ghLogin, avatarUrl) {
    const header = document.createElement("div");
    const total = document.createElement("span");
    const profile = document.createElement("div");
    profile.innerHTML = `<a href="https://github.com/${ghLogin}" target=")_blank">${ghLogin}</a><img src="${avatarUrl}">`
    header.className = "ghCalendarHeader";
    total.textContent = `${total_contribs} contributions in the last year`;
    header.appendChild(total);
    header.appendChild(profile);
    return header
}

async function main() {
    const container = document.getElementById("gh");
    const ghLogin = container.dataset.login;
    const data = await fetchData(ghLogin);
    const calendar = data["contributionsCollection"]["contributionCalendar"];
    const [table, thead, tbody] = init_table();
    const card = init_card();
    const canvas = init_canvas();
    const header = init_header(calendar["totalContributions"], ghLogin, data["avatarUrl"]);
    const footer = init_card_footer();

    addWeeks(tbody, calendar["weeks"], calendar["colors"]);
    addMonths(thead, calendar["months"]);
    canvas.appendChild(table);
    canvas.appendChild(footer);
    card.appendChild(canvas);
    container.appendChild(header);
    container.appendChild(card);
}

main()