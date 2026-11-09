const inventory = [
  {id:1,name:"M4A1 — CYBER RED",type:"Rifles",rarity:"LEGENDARY",code:"M4"},
  {id:2,name:"AKR — NEON",type:"Rifles",rarity:"EPIC",code:"AK"},
  {id:3,name:"AWM — PHANTOM",type:"Rifles",rarity:"LEGENDARY",code:"AWM"},
  {id:4,name:"FAMAS — CIRCUIT",type:"Rifles",rarity:"RARE",code:"FA"},
  {id:5,name:"USP — PIXEL",type:"Pistols",rarity:"EPIC",code:"USP"},
  {id:6,name:"G22 — SCARLET",type:"Pistols",rarity:"RARE",code:"G22"},
  {id:7,name:"DESERT EAGLE — FLARE",type:"Pistols",rarity:"LEGENDARY",code:"DE"},
  {id:8,name:"BUTTERFLY — VORTEX",type:"Knives",rarity:"MYTHIC",code:"BF"},
  {id:9,name:"KARAMBIT — CRIMSON",type:"Knives",rarity:"MYTHIC",code:"K"},
  {id:10,name:"M9 — NIGHTFALL",type:"Knives",rarity:"LEGENDARY",code:"M9"},
  {id:11,name:"TACTICAL — ASH",type:"Gloves",rarity:"EPIC",code:"GL"},
  {id:12,name:"SPORT — INFERNO",type:"Gloves",rarity:"LEGENDARY",code:"SP"}
];
let category="All", query="", favorites=new Set(JSON.parse(localStorage.getItem("sv-favorites")||"[]"));
const $=s=>document.querySelector(s);
function render(){
 const filtered=inventory.filter(x=>(category==="All"||x.type===category)&&(`${x.name} ${x.type} ${x.rarity}`).toLowerCase().includes(query));
 $("#items").innerHTML=filtered.map(x=>`<article class="item"><div class="art"><span class="art-tag">${x.rarity}</span><span class="weapon-icon">${x.code}</span><button class="fav ${favorites.has(x.id)?"on":""}" data-fav="${x.id}" aria-label="Toggle favourite">${favorites.has(x.id)?"★":"☆"}</button></div><div class="item-info"><small>${x.type.toUpperCase()}</small><h3>${x.name}</h3><p>Concept preview · catalogue entry</p></div></article>`).join("")||'<div class="favorites-empty">No matching items found.</div>';
 $("#shownCount").textContent=`${filtered.length} RESULTS`;
 $("#itemCount").textContent=inventory.length;
 $("#savedCount").textContent=favorites.size;
 $("#favLabel").textContent=`${favorites.size} SAVED`;
 const saved=inventory.filter(x=>favorites.has(x.id));
 $("#favorites").className=saved.length?"fav-list":"favorites-empty";
 $("#favorites").innerHTML=saved.length?saved.map(x=>`<span class="fav-chip">${x.name}</span>`).join(""):"Tap the ☆ on any card to save it here.";
}
$("#filters").addEventListener("click",e=>{const b=e.target.closest("[data-category]");if(!b)return;category=b.dataset.category;document.querySelectorAll(".filter").forEach(x=>x.classList.toggle("active",x===b));render()});
$("#search").addEventListener("input",e=>{query=e.target.value.toLowerCase().trim();render()});
$("#items").addEventListener("click",e=>{const b=e.target.closest("[data-fav]");if(!b)return;const id=Number(b.dataset.fav);favorites.has(id)?favorites.delete(id):favorites.add(id);localStorage.setItem("sv-favorites",JSON.stringify([...favorites]));render();$("#toast").textContent=favorites.has(id)?"Added to favourites":"Removed from favourites";$("#toast").classList.add("show");setTimeout(()=>$("#toast").classList.remove("show"),1400)});
$("#installHint").addEventListener("click",()=>{alert("To add SkinVault to your Home Screen: open this page in Safari, tap Share, then choose “Add to Home Screen”.")});
if("serviceWorker" in navigator)window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));
render();