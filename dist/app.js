const repos = [
  {name:'api-gateway',lang:'TypeScript',score:94,debt:'1.2h',coverage:'88.4%',issues:2,docs:'96%',scan:'8 min ago',summary:'Production-ready with strong test coverage and only minor maintenance work.',actions:['Update 2 minor dependencies','Add examples to the authentication guide']},
  {name:'core-sdk',lang:'Go',score:87,debt:'2.8h',coverage:'81.1%',issues:4,docs:'54%',scan:'12 min ago',summary:'Healthy codebase with documentation gaps across public APIs.',actions:['Document 23 exported functions','Add a migration guide for v3']},
  {name:'web-app',lang:'TypeScript',score:76,debt:'4.3h',coverage:'72.8%',issues:8,docs:'78%',scan:'18 min ago',summary:'Stable overall, but recent coverage regression needs attention.',actions:['Restore payments module coverage','Upgrade 3 major dependencies']},
  {name:'order-service',lang:'Python',score:64,debt:'8.7h',coverage:'58.2%',issues:14,docs:'65%',scan:'23 min ago',summary:'Elevated complexity and test gaps are increasing change risk.',actions:['Refactor processOrder()','Add integration tests for refunds']},
  {name:'legacy-admin',lang:'JavaScript',score:42,debt:'12.4h',coverage:'31.6%',issues:19,docs:'31%',scan:'1 hour ago',summary:'Critical modernization work is required before feature development.',actions:['Resolve 4 critical vulnerabilities','Create baseline test suite','Write deployment runbook']}
];
const rows = document.querySelector('#repoRows');
let activeFilter='all', searchTerm='';
function filteredRepos(){return repos.filter(r=>(activeFilter==='all'||r.score<70)&&r.name.toLowerCase().includes(searchTerm.toLowerCase()))}
function render(){
  const list=filteredRepos(); document.querySelector('#visibleCount').textContent=list.length;
  rows.innerHTML = list.map(r=>`<tr data-repo="${r.name}" tabindex="0"><td><div class="repo-name"><span class="repo-icon">${r.name[0].toUpperCase()}</span><span>${r.name}<small class="lang">${r.lang}</small></span></div></td><td><span class="score ${r.score>=80?'good':r.score>=65?'mid':'bad'}">${r.score}</span></td><td>${r.debt}</td><td>${r.coverage}</td><td><span class="issues-badge ${r.issues>10?'hot':''}">${r.issues}</span></td><td>${r.scan}</td></tr>`).join('');
  rows.querySelectorAll('tr').forEach(row=>{const open=()=>openRepo(row.dataset.repo);row.addEventListener('click',open);row.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open()}})});
}
render();
document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));btn.classList.add('active');activeFilter=btn.dataset.filter;render()}));
const search=document.querySelector('#repoSearch');search.addEventListener('input',()=>{searchTerm=search.value;render()});
document.addEventListener('keydown',e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();search.focus()}});
document.querySelector('#reviewIssues').addEventListener('click',()=>document.querySelector('#issues').scrollIntoView({behavior:'smooth'}));
document.querySelector('#exportBtn').addEventListener('click',()=>{const header='repository,language,health,debt,coverage,issues,last_scan';const body=filteredRepos().map(r=>[r.name,r.lang,r.score,r.debt,r.coverage,r.issues,r.scan].join(',')).join('\n');const blob=new Blob([header+'\n'+body],{type:'text/csv'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='repolens-health-report.csv';a.click();URL.revokeObjectURL(a.href)});
const detail=document.querySelector('#repoDetail');
function openRepo(name){const r=repos.find(item=>item.name===name);if(!r)return;document.querySelector('#detailIcon').textContent=r.name[0].toUpperCase();document.querySelector('#detailName').textContent=r.name;document.querySelector('#detailLang').textContent=r.lang+' · scanned '+r.scan;document.querySelector('#detailScore').textContent=r.score;document.querySelector('#detailSummary').textContent=r.summary;document.querySelector('#detailDebt').textContent=r.debt;document.querySelector('#detailCoverage').textContent=r.coverage;document.querySelector('#detailIssues').textContent=r.issues;document.querySelector('#detailDocs').textContent=r.docs;document.querySelector('#detailActions').innerHTML=r.actions.map(a=>`<li><span>✓</span>${a}</li>`).join('');detail.showModal()}
const themeBtn=document.querySelector('#themeBtn');
function applyTheme(theme){document.documentElement.dataset.theme=theme;themeBtn.textContent=theme==='dark'?'☀':'☾';localStorage.setItem('repolens-theme',theme)}
applyTheme(localStorage.getItem('repolens-theme')||'light');themeBtn.addEventListener('click',()=>applyTheme(document.documentElement.dataset.theme==='dark'?'light':'dark'));
const modal=document.querySelector('#connectModal');
document.querySelector('#connectBtn').addEventListener('click',()=>modal.showModal());
document.querySelector('#analyzeBtn').addEventListener('click',e=>{const input=document.querySelector('#repoUrl');if(!input.checkValidity()){e.preventDefault();input.reportValidity();return}setTimeout(()=>{document.querySelector('#toast').classList.add('show');setTimeout(()=>document.querySelector('#toast').classList.remove('show'),3500)},200)});
document.querySelector('.menu').addEventListener('click',()=>document.querySelector('.sidebar').classList.toggle('open'));
document.querySelectorAll('.nav-item').forEach(a=>a.addEventListener('click',()=>{document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));a.classList.add('active');document.querySelector('.sidebar').classList.remove('open')}));
