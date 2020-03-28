window.addEventListener(`DOMContentLoaded`, ()=> {
	
	let url = `https://swapi.co/api/people/?page=4`;
	let personListElement = document.querySelector(`.person__list`);
	let next = document.querySelector(`.next`);
	let prev = document.querySelector(`.prev`);
	let returnBtn = document.querySelector(`.return`);
	let personInfo = document.querySelector(`.person__info`);
	let container = document.querySelector(`.container`);
	let dataJson = null;
	let myObj = null;

	
	


	let renderListItem = function(data) {
		dataJson = data;
		let personList = data.results;
		personList.forEach(person=>{
			let li = createElement(`li`, person.name, `person__item`);
			renderItem(li, personListElement);
			myObj = person;
			li.addEventListener(`click`, function() {
				container.classList.add(`invisible`);
				personInfo.classList.remove(`invisible`);
				returnBtn.classList.remove(`invisible`);
				setDataToObj(person, renderTable);
			})

		});
	}
	
		getData(url, renderListItem);
		


		next.addEventListener(`click`,()=>{
			if (dataJson.next) {
				personListElement.innerHTML = ``;
				getData(dataJson.next, renderListItem);
			}
		});
		prev.addEventListener(`click`,()=>{
			if (dataJson.previous) {
				personListElement.innerHTML = ``;
				getData(dataJson.previous, renderListItem);
			}
		});

let setDataToObj = (person, callBack) => {
	let mainDataObj = Object.create(null);
	mainDataObj.name = person.name;
	mainDataObj.birth_year = person.birth_year;
	mainDataObj.gender = person.gender;
	mainDataObj.species = [];
	mainDataObj.films = [];
	
	let urlList = [...person.films, ...person.species, person.homeworld];
	let promiseList = urlList.map(url=>fetch(url));


	Promise.all(promiseList)
		.then(responses=>{
			return Promise.all(responses.map(item=>item.json()))
		})
		.then(arr=>{
			// console.log(arr);
			arr.forEach(item=>{
				if (item.url.match(/planets/)) {
					// console.log(item.name, `planet`);
					mainDataObj.homeworld = item.name
				} else if (item.url.match(/species/)) {
					// console.log(item.name, `species`);
					
					mainDataObj.species.push(item.name);
				} else if (item.url.match(/films/)) {
					// console.log(item.title, `film`);

					mainDataObj.films.push(item.title);
				}
			})
			console.log(mainDataObj);
			callBack(mainDataObj);
		});


}

});	


let getData = (url, callBack)=> {
		fetch(url)
			.then(response=>{
				if (response.ok) {
					return response.json();
				}
			}).then(data=>{
				if (data !== null) {
					callBack(data);
				}
			});
	} 	

let createElement = (elType, text, ...classList) => {
        let element = document.createElement(elType);
        
    	element.textContent = text;
        
        
        classList.forEach((className)=>{
                element.classList.add(className);
        });
        return element;
	}
	

	let renderItem = (element, parentElement) => {
		parentElement.appendChild(element);
	}









