let personInfo = document.querySelector(`.person__info`);
let returnBtn = document.querySelector(`.return`);
let container = document.querySelector(`.container`);

let renderTable = (person) => {
	let renderedTable = document.querySelector(`.table`);
	if (renderedTable) {
		renderedTable.remove();
	}
	let table = createElement(`table`,``,`table`);
	let tHead = createElement(`thead`, ``, `thead`);
	let tBody = createElement(`tbody`, ``, `tbody`);
	let trHead = createElement(`tr`, ``, `tr`);
	let trBody = createElement(`tr`, ``, `tr`);
	let trBody2 = createElement(`tr`, ``, `tr`);
	
	table.appendChild(tHead);
	table.appendChild(tBody);

	tHead.appendChild(trHead);
	tBody.appendChild(trBody);
	tBody.appendChild(trBody2);

	for (key in person) {
		if (key === `name`) {
			let tdHead = createElement(`td`, person[key], `tdHead`);
			trHead.appendChild(tdHead);
		} else if(key === `birth_year` || key === `gender` || key === `homeworld` || key === `films` || key === `species`) {
			let tdBody = createElement(`td`, key, `tdBody`);
			let tdBody2 = createElement(`td`, person[key], `tdBody`);
			
			trBody.appendChild(tdBody);
			trBody2.appendChild(tdBody2);
	
		}
	}
	personInfo.appendChild(table);
	returnBtn.addEventListener(`click`, ()=>{
		personInfo.removeChild(table);
		container.classList.remove(`invisible`);
		returnBtn.classList.add(`invisible`);				
	})


}







