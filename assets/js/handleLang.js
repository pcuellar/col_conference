import { sections } from "./constants.js";
import { enText } from "./en.js";
import { esText } from "./es.js";


function handleLang(lang) {
  localStorage.setItem("lang", lang)
  sections.forEach((sec, i) => {
    const items = sec.items
    tarnslateBySection(lang, sec.name, items)
  })
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

const btnEs = document.getElementById('btn-es');
const btnEn = document.getElementById('btn-en');

btnEs.addEventListener('click', () => handleLang('es'));
btnEn.addEventListener('click', () => handleLang('en'));
window.addEventListener('load', () => {
  const currentLang = !!localStorage.getItem("lang")
  console.log(currentLang);
  if(!currentLang)localStorage.setItem("lang", "es")
  
});