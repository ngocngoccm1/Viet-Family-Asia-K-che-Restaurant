const menuTools=document.querySelector('.menu-tools');
const menuContent=document.querySelector('.menu-text-content');
const menuSearch=document.querySelector('#menu-search');
const menuStatus=document.querySelector('#menu-status');
const menuEmpty=document.querySelector('#menu-empty');
const menuFilters=[...document.querySelectorAll('[data-menu-filter]')];
const menuSections=[...document.querySelectorAll('.menu-category')];
let selectedGroup='vorspeisen';
const normalizeMenuText=value=>value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[đĐ]/g,'d').toLocaleLowerCase('de').trim();

function renderMenu(){
  const query=normalizeMenuText(menuSearch.value);
  let total=0;
  for(const section of menuSections){
    let visible=0;
    for(const entry of section.querySelectorAll('.menu-entry')){
      const matches=query ? normalizeMenuText(entry.textContent).includes(query) : section.dataset.group===selectedGroup;
      entry.hidden=!matches;
      if(matches)visible++;
    }
    section.hidden=visible===0;
    section.querySelector('[data-count]').textContent=`${visible} ${visible===1?'POSITION':'POSITIONEN'}`;
    total+=visible;
  }
  for(const filter of menuFilters)filter.setAttribute('aria-pressed',String(!query&&filter.dataset.menuFilter===selectedGroup));
  menuStatus.textContent=query?`${total} ${total===1?'Ergebnis':'Ergebnisse'} für „${menuSearch.value.trim()}“`:`${total} ${total===1?'Eintrag':'Einträge'}`;
  menuEmpty.hidden=total!==0;
}

for(const filter of menuFilters){
  filter.addEventListener('click',()=>{
    selectedGroup=filter.dataset.menuFilter;
    menuSearch.value='';
    renderMenu();
    const headerHeight=document.querySelector('.site-header')?.offsetHeight||0;
    const target=menuContent.getBoundingClientRect().top+window.scrollY-headerHeight-menuTools.offsetHeight-18;
    window.scrollTo(0,target);
  });
}
menuSearch?.addEventListener('input',renderMenu);
renderMenu();
