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
  // Selecciona todos los elementos que deseas traducir
  const elementosTraducidos = document.querySelectorAll(items);
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
        elementosTraducidos[i].textContent = dicVal[j];
      }
    }
  }

}

function selectedLang (currentLang) {
  btnEs.style.backgroundColor = currentLang === "es" ? "white" : "#0168FC";
  btnEs.style.color = currentLang === "es" ? "black" : "white";
  btnEn.style.backgroundColor = currentLang === "es" ? "#0168FC" : "white";
  btnEn.style.color = currentLang === "es" ? "white" : "black";
  btnEs.textContent = currentLang === "es" ? "Español" : "Spanish";
  btnEn.textContent = currentLang === "es" ? "Inglés" : "English";
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