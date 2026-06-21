const reference=new Date('2026-06-22');
const planning={S1:['09h-17h30','09h-12h','Repos','Repos','09h-17h','Repos','Repos'],S2:['Repos','09h-17h30','Repos','09h-12h','09h-17h','Repos','Repos'],S3:['Repos','09h-12h','Repos','09h-17h','09h-17h','Repos','Repos']};
let current=new Date();

function getWeekType(d){
  let diff=Math.floor((d-reference)/(1000*60*60*24));
  let w=Math.floor(diff/7);
  return ['S1','S2','S3'][((w%3)+3)%3];
}

// Affiche la date formatée (ex: "lundi 1 mars 2027 - Semaine S1")
// et construit le tableau de la semaine en mettant en évidence le jour sélectionné.
function render(d){
  const s = getWeekType(d);
  const dayIndex = (d.getDay() + 6) % 7; // 0 = lundi ... 6 = dimanche

  // Entête : "lundi 1 mars 2027 - Semaine Sx"
  const header = d.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  document.getElementById('resume').innerHTML = `<h2>${header} - Semaine ${s}</h2><p>${planning[s][dayIndex] || ''}</p>`;

  // Construire le tableau de la semaine (lundi -> dimanche)
  const startOfWeek = new Date(d);
  startOfWeek.setDate(d.getDate() - dayIndex); // date du lundi de la semaine

  // on applique la classe de semaine sur le tableau pour préserver vos styles .S1/.S2/.S3
  let html = `<table class="${s}"><thead><tr><th>Jour</th><th>Date</th><th>Planning</th></tr></thead><tbody>`;
  for (let i = 0; i < 7; i++) {
    const dayDate = new Date(startOfWeek);
    dayDate.setDate(startOfWeek.getDate() + i);

    const isToday = dayDate.toDateString() === d.toDateString();
    const dayName = dayDate.toLocaleDateString('fr-FR', { weekday: 'long' }); // "lundi"
    const dateShort = dayDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' }); // "1 mars"
    const slot = planning[s][i] || '';

    html += `<tr class="${isToday ? 'today' : ''}"><td>${dayName}</td><td>${dateShort}</td><td>${slot}</td></tr>`;
  }
  html += '</tbody></table>';

  document.getElementById('calendar').innerHTML = html;
}

function goToday(){
  current=new Date();
  document.getElementById('datePicker').value=current.toISOString().split('T')[0];
  render(current);
}

function changeWeek(n){
  current.setDate(current.getDate()+7*n);
  document.getElementById('datePicker').value=current.toISOString().split('T')[0];
  render(current);
}

// Ligne "Semaine suivante :" commentée car inutile
// document.getElementById('nextWeekLabel').textContent = 'Semaine suivante : (commentée)';

document.getElementById('datePicker').addEventListener('change',e=>{current=new Date(e.target.value);render(current)});goToday();
