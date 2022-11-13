const apiUrl = 'https://rolz.org/api/?2d6.json'
const root = document.getElementById('app')
const btn = root.querySelector('.btn')
const diceContainer = root.querySelector('.dice')
const countContainer = root.querySelector('.count-container')
const graphContainer = root.querySelector('.graph-container')
let resultObj = {}
let count = 0

const rollDice = async () => {
	const req = await fetch(apiUrl)
	const res = await req.json()
	const details = res.details.split('')

	displayCount(++count)
	displayDice(details[2], details[5])
	createObj(res.result)
}

const displayDice = (firstNo, secondNo) => {
	const resultDiv = document.createElement('div')
	resultDiv.className = 'result'

	const firstDice = document.createElement('img')
	firstDice.setAttribute('src', `/src/assets/dice-${firstNo}.png`)
	firstDice.setAttribute('alt', `${firstNo}`)

	const secondDice = document.createElement('img')
	secondDice.setAttribute('src', `/src/assets/dice-${secondNo}.png`)
	secondDice.setAttribute('alt', `${secondNo}`)

	diceContainer.innerHTML = ''
	diceContainer.appendChild(firstDice)
	diceContainer.appendChild(secondDice)
}

const displayCount = amount => {
	countContainer.textContent =
		amount === 1 ? `Rolled 1 time!` : `Rolled ${amount} times!`
}

const createObj = result => {
	if (resultObj[result]) {
		resultObj[result] += 1
	} else {
		resultObj[result] = 1
	}

	loadValues(resultObj)
}

const loadValues = values => {
	const keys = Object.keys(values)
	const unitHeight = 100 / count

	graphContainer.innerHTML = ''

	keys.forEach(key => {
		const graphBar = document.createElement('div')
		graphBar.className = 'graph-bar'

		const xValue = document.createElement('div')
		xValue.className = 'x-value'
		xValue.innerHTML = key

		const value = values[key]
		const valueHeight = value * unitHeight
		graphBar.style.height = `${valueHeight}%`

		graphBar.appendChild(xValue)
		graphContainer.appendChild(graphBar)
	})
}

btn.addEventListener('click', rollDice)
