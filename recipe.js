function getParam(name){return new URL(window.location.href).searchParams.get(name);} 

async function loadRecipeById(id){
  const res=await fetch('recipes.json',{cache:'no-store'});
  if(!res.ok) throw new Error('Failed to load recipes');
  const data=await res.json();
  return data.find(r=>r.id===id);
}

function fillList(el,items){
  el.innerHTML='';
  (items||[]).forEach(i=>{ const li=document.createElement('li'); li.textContent=i; el.appendChild(li); });
}

function formatTimes(r){
  const parts=[]; if(r.prepTime) parts.push(`Prep: ${r.prepTime}`); if(r.cookTime) parts.push(`Cook: ${r.cookTime}`); return parts.join(' • ');
}

(async function init(){
  const id=getParam('id');
  const titleEl=document.getElementById('recipeTitle');
  if(!id){ titleEl.textContent='Recipe not found'; return; }
  try{
    const r=await loadRecipeById(id);
    if(!r){ titleEl.textContent='Recipe not found'; return; }

    titleEl.textContent=r.title;
    const img=document.getElementById('recipeImage'); img.src=r.image; img.alt=r.title;
    document.getElementById('recipeType').textContent=r.type||'';
    document.getElementById('recipeTimes').textContent=formatTimes(r);
    document.getElementById('recipeServings').textContent=r.servings?`Servings: ${r.servings}`:'';
    fillList(document.getElementById('ingredientsList'), r.ingredients);
    fillList(document.getElementById('instructionsList'), r.instructions);

    const tagsSection=document.getElementById('tagsSection');
    const tagsEl=document.getElementById('tags');
    if(r.tags && r.tags.length){
      tagsSection.style.display='';
      tagsEl.innerHTML='';
      r.tags.forEach(t=>{ const span=document.createElement('span'); span.className='chip'; span.textContent=t; tagsEl.appendChild(span); });
    }

    const refSection = document.getElementById("referencesSection");
    const refEl = document.getElementById("references");

    if (r.references) {
        refSection.style.display = "";
        refEl.innerHTML = "";

        const iconMap = {
            youtube: "images/references/youtube.svg",
            tiktok: "images/references/tiktok.svg",
            instagram: "images/references/instagram.svg",
            dagelijksekost: "images/references/dagelijksekost.svg"
        };

        Object.keys(r.references).forEach(platform => {
            if (!iconMap[platform]) return;

            const a = document.createElement("a");
            a.href = r.references[platform];
            a.target = "_blank";

            const img = document.createElement("img");
            img.src = iconMap[platform];
            img.alt = platform;
            img.className = "reference-icon";

            a.appendChild(img);
            refEl.appendChild(a);
        });
    }

  }catch(e){ titleEl.textContent='Error loading recipe'; console.error(e); }
})();