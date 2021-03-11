const html = document.querySelector('html')
const checkbox = document.querySelector('input[name=theme]')

const getStyle = (element, style) => window.getComputedStyle(element).getPropertyValue(style)

const initialColors = {
  bg: getStyle(html, "--bg"),
  green: getStyle(html, "--green"),
  link: getStyle(html, "--link"),
  lightLink: getStyle(html, "--light-link"),
  whiteColor: getStyle(html, "--white-color"),
  headerColor: getStyle(html, "--header-color"),
  bodyColor: getStyle(html, "--body-color"),
  valueColor: getStyle(html, "--value-color"),
  footer: getStyle(html, "--footer"),
  cardColor: getStyle(html, "--card-color"),
  boxcolor: getStyle(html, "--box-color"),
  tColor: getStyle(html, "--tds-color"),
  aColor: getStyle(html, "--a-color"),
  linkAColor: getStyle(html, "--linkA-color"),
  saveButtonColor: getStyle(html, "--save-button"),
  texeColor: getStyle(html, "--texe-color"),
  newTransaction: getStyle(html, "--new-transaction"),
  buttonColor: getStyle(html, "--button-color")
}

const darkMode = {
  bg: '#292b33',
  green: '#3dd705',
  link: '#49aa26',
  lightLink: '#4da0ff',
  whiteColor: '#000000',
  headerColor: '#000000',
  bodyColor: '#1a191c',
  valueColor: '#000000',
  footer: '#8257e6',
  cardColor: '#ffffff',
  boxcolor: '#1b1629',
  tColor:'#212025',
  aColor: '#3dd705',
  linkAcolor: '#42e706',
  saveButton: '#3dd705',
  texeColor: '#3dd705',
  newTransaction: "#d3366f",
  buttonColor: "#3dd705",
}

const transformKey = key => 
    "--" + key.replace(/([A-Z])/g, "-$1").toLowerCase()

const changeColors = (colors) => {
    Object.keys(colors).map(key => 
        html.style.setProperty(transformKey(key), colors[key]) 
    )
}

checkbox.addEventListener("change", ({ target }) => {
    target.checked ? changeColors(darkMode) : changeColors(initialColors)
})

const isExistLocalStorage = (key) => 
  localStorage.getItem(key) != null

const createOrEditLocalStorage = (key, value) => 
  localStorage.setItem(key, JSON.stringify(value))

const getValeuLocalStorage = (key) =>
  JSON.parse(localStorage.getItem(key))

checkbox.addEventListener("change", ({target}) => {
  if (target.checked) {
    changeColors(darkMode) 
    createOrEditLocalStorage('modo', 'darkMode')
  } else {
    changeColors(initialColors)
    createOrEditLocalStorage('modo','initialColors')
  }
})

if(!isExistLocalStorage('modo'))
  createOrEditLocalStorage('modo', 'initialColors')

if (getValeuLocalStorage('modo') === "initialColors") {
  checkbox.removeAttribute('checked')
  changeColors(initialColors);
} else {
  checkbox.setAttribute('checked', "")
  changeColors(darkMode);
}

