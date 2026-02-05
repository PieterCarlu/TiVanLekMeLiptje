const recipeListEl=document.getElementById("recipeList");
const searchInput=document.getElementById("searchInput");
const typeFilter=document.getElementById("typeFilter");
const cardTpl=document.getElementById("recipeCardTemplate");

let allRecipes=[];

async function loadRecipes(){
  try{
    const res=await fetch('recipes.json',{cache:'no-store'});
    if(!res.ok) throw new Error('Failed to load recipes.json');
    allRecipes=await res.json();
    renderRecipes(allRecipes);
  }catch(e){
    recipeListEl.innerHTML = `<p style="padding:20px;color:#900;">${e.message}</p>`;
  }
}

function renderRecipes(recipes){
  recipeListEl.innerHTML='';
  if(!recipes.length){
    recipeListEl.innerHTML='<p style="padding:20px;">No recipes found.</p>';
    return;
  }
  const frag=document.createDocumentFragment();
  recipes.forEach(r=>{
    const node=cardTpl.content.cloneNode(true);
    const card=node.querySelector('.recipe-card');
    const img=node.querySelector('img');
    const title=node.querySelector('h3');
    const summary=node.querySelector('.summary');
    const type=node.querySelector('.type');
    const time=node.querySelector('.time');

    card.href=`recipe.html?id=${encodeURIComponent(r.id)}`;
    img.src=r.image; img.alt=r.title;
    title.textContent=r.title;
    summary.textContent=r.summary||'';
    type.textContent=r.type||'';
    time.textContent = formatTime(r);

    frag.appendChild(node);
  });
  recipeListEl.appendChild(frag);
}

function formatTime(r){
  const prep=r.prepTime?`Prep: ${r.prepTime}`:'';
  const cook=r.cookTime?` • Cook: ${r.cookTime}`:'';
  return (prep||cook)?`${prep}${cook}`:'';
}

function applyFilters(){
  const q=(searchInput.value||'').toLowerCase().trim();
  const selected=(typeFilter.value||'').toLowerCase();
  const filtered=allRecipes.filter(r=>{
    const hay=[r.title,r.summary,(r.type||''),(r.tags||[]).join(' '),(r.ingredients||[]).join(' ')].join(' ').toLowerCase();
    const matchesQ = q? hay.includes(q):true;
    const matchesT = selected? (r.type||'').toLowerCase()===selected:true;
    return matchesQ && matchesT;
  });
  renderRecipes(filtered);
}

searchInput.addEventListener('input',applyFilters);
typeFilter.addEventListener('change',applyFilters);

loadRecipes();
