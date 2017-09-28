var mainElement = document.querySelector('main');

var renderers = {};

function createModal() {
  var element = document.createElement('div');
  element.classList.add('modal');
  element.innerHTML = `<div class="body">
  <div class="controls">
    <button>close</button>
  </div>
  <div class="content"></div>
</div>
<div class="underlay"></div>`;
  return element;
}

function showModal(contentElement) {
  modalContentElement.innerHTML = '';
  modalContentElement.appendChild(contentElement);
  modalElement.classList.add('open');
}

function hideModal() {
  modalElement.classList.remove('open');
}

// you can copy that safely, just pay attention to where it has to be paste
var modalElement = createModal();
var modalContentElement = modalElement.querySelector('.content');
var modalCloseButton = modalElement.querySelector('.controls button');
modalCloseButton.addEventListener('click', hideModal);
document.body.appendChild(modalElement);

function loadData(url, done) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
    var response = JSON.parse(xhr.responseText);
    done(response);
  };
  xhr.open('get', url);
  xhr.send();
}

function loadPeople(done) {
  loadData('https://swapi.co/api/people', done);
}

function loadPlanet(url, done) {
  loadData(url, done);
}





//------------------People--------------------//


function renderPeople(people) {
  mainElement.textContent = '';
  var cardsElement = document.createElement('div');
  cardsElement.classList.add('cards');
  mainElement.appendChild(cardsElement);


  people.results.forEach(function(person) {
    var sectionElement = document.createElement('section');
    sectionElement.classList.add('person');

    var genderSymbol;
    switch (person.gender) {
      case 'male':
        genderSymbol = '♂';
        break;
      case 'female':
        genderSymbol = '♀';
        break;
      default:
        genderSymbol = '?';
    }

    sectionElement.innerHTML = `
    <header>
      <h1>
        ${person.name}
        <span class="gender" title="Gender: ${person.gender}">${genderSymbol}</span>
      </h1>
    </header>
    <div>
      <button>SHOW HOMEWORLD</button>
      <ul>
        <li>
          <span class="label">Birth Year:</span>
          <span class="value">${person.birth_year}</span>
        </li>
        <li>
          <span class="label">Eye Color:</span>
          <span class="value">${person.eye_color}</span>
        </li>
        <li>
          <span class="label">Skin Color:</span>
          <span class="value">${person.skin_color}</span>
        </li>
        <li>
          <span class="label">Hair Color:</span>
          <span class="value">${person.hair_color}</span>
        </li>
        <li>
          <span class="label">Height:</span>
          <span class="value">${(person.height / 100).toFixed(2)}m</span>
        </li>
        <li>
          <span class="label">Mass:</span>
          <span class="value">${person.mass}kg</span>
        </li>
      </ul>
    </div>
    `;


    sectionElement
      .querySelector('button')
      .addEventListener('click', function() {
        loadPlanet(person.homeworld, renderPlanet);
      });

    cardsElement.appendChild(sectionElement);
  });
}
renderers.people = renderPeople;

//-------------PLanets----------------//

function renderPlanets(data) {
  mainElement.textContent = '';
  var cardsElement = document.createElement('div');
  cardsElement.classList.add('cards');
  mainElement.appendChild(cardsElement);


  data.results.forEach(function(obj) {
    var sectionElement = document.createElement('section');
    sectionElement.innerHTML = `
    <header>
      <h1>
        ${obj.name}
      </h1>
    </header>
    <div>
      <ul>
        <li>
          <span class="label">Name:</span>
          <span class="value">${obj.name}</span>
        </li>
        <li>
          <span class="label">Diameter:</span>
          <span class="value">${obj.diameter}</span>
        </li>
        <li>
          <span class="label">Rotation Period:</span>
          <span class="value">${obj.rotation_period}</span>
        </li>
        <li>
          <span class="label">Orbital Period:</span>
          <span class="value">${obj.orbital_period}</span>
        </li>
        <li>
          <span class="label">Gravity:</span>
          <span class="value">${(obj.gravity)}</span>
        </li>
        <li>
          <span class="label">Population:</span>
          <span class="value">${obj.population}</span>
        </li>
        <li>
          <span class="label">Climate:</span>
          <span class="value">${obj.climate}</span>
        </li>
        <li>
          <span class="label">Terrain:</span>
          <span class="value">${obj.terrain}</span>
        </li>
        <li>
        <span class="label">Surface Water:</span>
        <span class="value">${obj.surface_water}</span>
        </li>
      </ul>
    </div>
    `;

    cardsElement.appendChild(sectionElement);
  });
}
renderers.planets = renderPlanets;


//---------------Film----------------//

function renderFilms(data) {
  mainElement.textContent = '';
  var cardsElement = document.createElement('div');
  cardsElement.classList.add('cards');
  mainElement.appendChild(cardsElement);


  data.results.forEach(function(obj) {
    var sectionElement = document.createElement('section');
    sectionElement.innerHTML = `
    <header>
      <h1>
        ${obj.title}
      </h1>
    </header>
    <div>
      <ul>
        <li>
          <span class="label">Title:</span>
          <span class="value">${obj.title}</span>
        </li>
        <li>
          <span class="label">Episode:</span>
          <span class="value">${obj.episode_id}</span>
        </li>
        <li>
          <span class="label">Opening:</span>
          <span class="value">${obj.opening_crawl}</span>
        </li>
        <li>
          <span class="label">Director:</span>
          <span class="value">${obj.director}</span>
        </li>
        <li>
          <span class="label">Producer:</span>
          <span class="value">${(obj.producer)}</span>
        </li>
        <li>
          <span class="label">Release Date:</span>
          <span class="value">${obj.release_date}</span>
        </li>
      </ul>
    </div>
    `;
    
    cardsElement.appendChild(sectionElement);
  });
}
renderers.films = renderFilms;

//-------------Species---------------//

function renderSpecies(data) {
  mainElement.textContent = '';
  var cardsElement = document.createElement('div');
  cardsElement.classList.add('cards');
  mainElement.appendChild(cardsElement);


  data.results.forEach(function(obj) {
    var sectionElement = document.createElement('section');
    sectionElement.innerHTML = `
    <header>
      <h1>
        ${obj.name}
      </h1>
    </header>
    <div>
      <ul>
        <li>
          <span class="label">Name:</span>
          <span class="value">${obj.name}</span>
        </li>
        <li>
          <span class="label">Classification:</span>
          <span class="value">${obj.classification}</span>
        </li>
        <li>
          <span class="label">Designation:</span>
          <span class="value">${obj.designation}</span>
        </li>
        <li>
          <span class="label">Avarage Height:</span>
          <span class="value">${obj.avarage_height}</span>
        </li>
        <li>
          <span class="label">Avarage Lifespan:</span>
          <span class="value">${(obj.avarage_lifespan)}</span>
        </li>
        <li>
          <span class="label">Eye Colors:</span>
          <span class="value">${obj.eye_colors}</span>
        </li>
        <li>
          <span class="label">Hair Colors:</span>
          <span class="value">${obj.hair_colors}</span>
        </li>
        <li>
          <span class="label">Skin Colors:</span>
          <span class="value">${obj.skin_colors}</span>
        </li>
        <li>
        <span class="label">Language:</span>
        <span class="value">${obj.language}</span>
        </li>
      </ul>
    </div>
    `;
    
    cardsElement.appendChild(sectionElement);
  });
}
renderers.species = renderSpecies;

//---------------------Vehicles-----------------//

function renderVehicles(data) {
  mainElement.textContent = '';
  var cardsElement = document.createElement('div');
  cardsElement.classList.add('cards');
  mainElement.appendChild(cardsElement);


  data.results.forEach(function(obj) {
    var sectionElement = document.createElement('section');
    sectionElement.innerHTML = `
    <header>
      <h1>
        ${obj.name}
      </h1>
    </header>
    <div>
      <ul>
        <li>
          <span class="label">Name:</span>
          <span class="value">${obj.name}</span>
        </li>
        <li>
          <span class="label">Model:</span>
          <span class="value">${obj.model}</span>
        </li>
        <li>
          <span class="label">Vehicles:</span>
          <span class="value">${obj.vehicles}</span>
        </li>
        <li>
          <span class="label">Manufacturer:</span>
          <span class="value">${obj.manufacturer}</span>
        </li>
        <li>
          <span class="label">Length:</span>
          <span class="value">${(obj.length)}</span>
        </li>
        <li>
          <span class="label">Crew:</span>
          <span class="value">${obj.crew}</span>
        </li>
        <li>
          <span class="label">Passengers:</span>
          <span class="value">${obj.passengers}</span>
        </li>
        <li>
          <span class="label">Max atmosphering Speed:</span>
          <span class="value">${obj.max_atmosphering_speed}</span>
        </li>
        <li>
        <span class="label">Cargo Capacity:</span>
        <span class="value">${obj.cargo_capacity}</span>
        </li>
      </ul>
    </div>
    `;
    
    cardsElement.appendChild(sectionElement);
  });
}
renderers.vehicles = renderVehicles;

//---------------------Starships-----------------//

function renderStarships(data) {
  mainElement.textContent = '';
  var cardsElement = document.createElement('div');
  cardsElement.classList.add('cards');
  mainElement.appendChild(cardsElement);


  data.results.forEach(function(starship) {
    var sectionElement = document.createElement('section');
    sectionElement.innerHTML = `
    <header>
      <h1>
      ${starship.name}
      </h1>
    </header>
    <div>
      <ul>
        <li>
          <span class="label">Name:</span>
          <span class="value">${starship.name}</span>
        </li>
        <li>
          <span class="label">Model:</span>
          <span class="value">${starship.model}</span>
        </li>
        <li>
          <span class="label">Starship:</span>
          <span class="value">${starship.starship_class}</span>
        </li>
        <li>
          <span class="label">Manufacturer:</span>
          <span class="value">${starship.manufacturer}</span>
        </li>
        <li>
          <span class="label">Length:</span>
          <span class="value">${(starship.length)}</span>
        </li>
        <li>
          <span class="label">Crew:</span>
          <span class="value">${starship.crew}</span>
        </li>
        <li>
          <span class="label">Passengers:</span>
          <span class="value">${starship.passengers}</span>
        </li>
        <li>
          <span class="label">Max atmosphering Speed:</span>
          <span class="value">${starship.max_atmosphering_speed}</span>
        </li>
        <li>
        <span class="label">Hyperdrive Rating:</span>
        <span class="value">${starship.hyperdrive_rating}</span>
        </li>
        <li>
        <span class="label">MGLT:</span>
        <span class="value">${starship.MGLT}</span>
        </li>
      </ul>
    </div>
    `;
    
    cardsElement.appendChild(sectionElement);
  });
}
renderers.starships = renderStarships;

//--------------------------------------


function renderPlanet(planet) {
  var sectionElement = document.createElement('section');
  sectionElement.classList.add('planet');
  sectionElement.innerHTML = `<header>
    <h1>${planet.name}</h1>
  </header>
  <div>
    <ul>
      <li>
        <span class="label">Climate:</span>
        <span class="value">${planet.climate}</span>
      </li>
      <li>
        <span class="label">Diameter:</span>
        <span class="value">${planet.diameter}</span>
      </li>
      <li>
        <span class="label">Gravity:</span>
        <span class="value">${planet.gravity}</span>
      </li>
      <li>
        <span class="label">Orbital Period:</span>
        <span class="value">${planet.orbital_period}</span>
      </li>
    </ul>
    <ul>
      <li>
        <span class="label">Population:</span>
        <span class="value">${planet.population}</span>
      </li>
      <li>
        <span class="label">Rotation Period:</span>
        <span class="value">${planet.rotation_period}</span>
      </li>
      <li>
        <span class="label">Surface Water:</span>
        <span class="value">${planet.surface_water}</span>
      </li>
      <li>
        <span class="label">Terrain:</span>
        <span class="value">${planet.terrain}</span>
      </li>
    </ul>
  </div>`;
  showModal(sectionElement);
}


loadPeople(renderPeople);

function renderUnimplemented() {
  mainElement.textContent = 'Doh! Not done yet';
}

function renderMenu(data) {
  var menuListElement = document.querySelector('body > header ul');
  var keys = Object.keys(data);
  keys.forEach(function(key){
    var liElement = document.createElement('li');
    var aElement = document.createElement('a');
    aElement.textContent = key;
    aElement.addEventListener('click', function() {
      if (!renderers[key]) return renderUnimplemented();
      loadData(data[key], renderers[key]);
    });

    liElement.appendChild(aElement);

    menuListElement.appendChild(aElement);
  });
}

loadData('https:/swapi.co/api/', renderMenu);