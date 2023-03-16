import { sections } from "./constants.js";
import { enText } from "./en.js";
import { esText } from "./es.js";


function handleLang(lang) {
  localStorage.setItem("lang", lang)
  sections.forEach((sec, i) => {
    const items = sec.items
    tarnslateBySection(lang, sec.name, items)
  })
  selectedLang (lang)
}

function tarnslateBySection(lang, section = "header", items) {
  if (section === "aboutConference") {
    console.log(section);
  }
  // Selecciona todos los elementos que deseas traducir
  const elementosTraducidos = document.querySelectorAll(items);
  console.log("elementosTraducidos", elementosTraducidos);
  // Selecciona el diccionario correspondiente al lang elegido
  let diccionario = lang === 'es' ? esText : enText;
  diccionario = diccionario[section]
  const dicVal = Object.values(diccionario)
  const dicKey = Object.keys(diccionario)
  // Itera sobre cada elemento y reemplaza su contenido con la traducción correspondiente
  for (let i = 0; i < elementosTraducidos.length; i++) {
    const elId = elementosTraducidos[i].id
    for (let j = 0; j < dicKey.length; j++) {
      if (elId.includes(dicKey[j])) {
        console.log(dicKey[j],"----", elId);
        elementosTraducidos[i].textContent = dicVal[j];
      }
    }
  }

}

function selectedLang (currentLang) {
  if(currentLang==="es") {
    btnEs.style.backgroundColor = "white"
    btnEs.style.color = "black"
    btnEn.style.color = "white"
    btnEn.style.backgroundColor = "#0168FC"
    btnEs.textContent = "Español"
    btnEn.textContent = "Inglés"

  }else{
    btnEn.style.backgroundColor = "white"
    btnEn.style.color = "black"
    btnEs.style.color = "white"
    btnEs.style.backgroundColor = "#0168FC"
    btnEs.textContent = "Spanish"
    btnEn.textContent = "English"
  }
}

const btnEs = document.getElementById('btn-es');
const btnEn = document.getElementById('btn-en');

btnEs.addEventListener('click', () => handleLang('es'));
btnEn.addEventListener('click', () => handleLang('en'));
window.addEventListener('load', () => {
  const currentLang = !!localStorage.getItem("lang")
  selectedLang ("es")
  if(!currentLang)localStorage.setItem("lang", "es")
  handleLang("es")
});