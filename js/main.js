var cardName = document.getElementById('siteName');
var cardTitle = document.getElementById('card-url');

var sites = [];

if (localStorage.getItem('products') !== null) {
    sites = JSON.parse(localStorage.getItem('products'));
    displaySites(sites);
}

function addSite() {
    let name = cardName.value;
    let url = cardTitle.value;

    // Validate the URL
    try {
        new URL(url);
    } catch (error) {
        // Handle the case where the URL is not valid
        console.error('Invalid URL:', url);
        alert('Invalid URL. Please enter a valid URL.');
        return; // Stop execution if URL is not valid
    }

    let site = {
        name: name,
        url: url
    };

    sites.push(site);
    localStorage.setItem('products', JSON.stringify(sites));

    displaySites();
}

function displaySites() {
    var sitesBag = "";
    for (let i = 0; i < sites.length; i++) {
        sitesBag += `
        <tr>
            <td>${sites[i].name}</td>
            <td><button class="btn btn-primary" onclick="visitSite('${sites[i].url}')"><i class="fas fa-link"></i> Visit website</button></td>
            <td><button class="btn btn-danger float-right remove-btn" onclick="removeSite(${i})"><i class="fas fa-trash-alt"></i> Remove</button></td>
        </tr>`;
    }
    document.getElementById('products').innerHTML = sitesBag;
}

function removeSite(index) {
    sites.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(sites));
    displaySites();
}

function visitSite(url) {
    try {
        var parsedUrl = new URL(url);
        window.open(parsedUrl.href, '_blank');
    } catch (error) {
        console.error('Invalid URL:', url);
        alert('Invalid URL. Please enter a valid URL.');
    }
}

function clearForm() {
    cardName.value = "";
    cardTitle.value = "";

    sites = [];
    localStorage.setItem('products', JSON.stringify(sites));

    displaySites();
}


