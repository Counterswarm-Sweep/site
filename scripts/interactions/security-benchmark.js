const host=document.querySelector('[data-security-benchmark]');
if(host){
  const examples=['detection','validation','differential'].flatMap((objective,k)=>[
    {name:'Example pipeline A',objective,cost:1.2+k*.3,recall:42+k*4},
    {name:'Example pipeline B',objective,cost:3.6+k*.5,recall:61+k*3},
    {name:'Example pipeline C',objective,cost:7.8+k*.8,recall:74+k*2},
    {name:'Example pipeline D',objective,cost:5.2+k*.4,recall:58+k*3},
    {name:'Example pipeline E',objective,cost:12+k,recall:82+k*2},
  ]);
  let data=examples,sortKey='recall',direction=-1;
  const objective=host.querySelector('[data-benchmark-objective]'),frontier=host.querySelector('[data-benchmark-frontier]'),body=host.querySelector('tbody'),svg=host.querySelector('svg'),status=host.querySelector('[data-benchmark-status]');
  const ns='http://www.w3.org/2000/svg';
  const selected=()=>{let rows=data.filter(r=>r.objective===objective.value);if(frontier.checked)rows=rows.filter(r=>!rows.some(o=>o!==r&&o.cost<=r.cost&&o.recall>=r.recall&&(o.cost<r.cost||o.recall>r.recall)));return rows.sort((a,b)=>direction*(sortKey==='name'?a.name.localeCompare(b.name):a[sortKey]-b[sortKey]));};
  function shape(tag,attrs,text){const n=document.createElementNS(ns,tag);for(const [k,v]of Object.entries(attrs))n.setAttribute(k,v);if(text!==undefined)n.textContent=text;svg.append(n);return n;}
  function draw(){
    const rows=selected();body.replaceChildren();svg.replaceChildren();
    const max=Math.max(1,...data.filter(r=>r.objective===objective.value).map(r=>r.cost))*1.15;
    for(let i=0;i<=4;i++){const y=330-i*70;shape('line',{x1:80,y1:y,x2:930,y2:y,stroke:'#e8e8ed'});shape('text',{x:60,y:y+5,'text-anchor':'end','font-size':14},String(i*25)+'%');const x=80+i*212.5;shape('text',{x,y:359,'text-anchor':'middle','font-size':14},'$'+(max*i/4).toFixed(1));}
    shape('text',{x:505,y:392,'text-anchor':'middle','font-size':15},'Cost per evaluated task (USD)');shape('text',{x:80,y:27,'font-size':15},'Task recall');
    for(const r of rows){const x=80+r.cost/max*850,y=330-r.recall/100*280;const c=shape('circle',{cx:x,cy:y,r:7,class:'benchmark-point',tabindex:0});const title=document.createElementNS(ns,'title');title.textContent=`${r.name}: ${r.recall}% recall, $${r.cost.toFixed(2)}`;c.append(title);shape('text',{x:x+12,y:y-10,'font-size':12},r.name);const tr=document.createElement('tr');for(const v of[r.name,'$'+r.cost.toFixed(2),r.recall.toFixed(1)+'%']){const td=document.createElement('td');td.textContent=v;tr.append(td);}body.append(tr);}
    for(const b of host.querySelectorAll('[data-sort]'))b.closest('th').setAttribute('aria-sort',b.dataset.sort===sortKey?(direction===1?'ascending':'descending'):'none');
  }
  objective.addEventListener('change',draw);frontier.addEventListener('change',draw);
  for(const b of host.querySelectorAll('[data-sort]'))b.addEventListener('click',()=>{direction=sortKey===b.dataset.sort?-direction:(b.dataset.sort==='recall'?-1:1);sortKey=b.dataset.sort;draw();});
  host.querySelector('[data-benchmark-reset]').addEventListener('click',()=>{data=examples;status.textContent='Illustrative sample data — not measured product results.';status.classList.add('benchmark-sample');draw();});
  function parseCSV(text){const records=[];let row=[],cell='',quoted=false;for(let i=0;i<text.length;i++){const c=text[i];if(c==='"'){if(quoted&&text[i+1]==='"'){cell+='"';i++;}else quoted=!quoted;}else if(!quoted&&(c===','||c==='\n')){row.push(cell.trim());cell='';if(c==='\n'){if(row.some(Boolean))records.push(row);row=[];}}else if(c!=='\r')cell+=c;}row.push(cell.trim());if(row.some(Boolean))records.push(row);return records;}
  host.querySelector('[data-benchmark-file]').addEventListener('change',async event=>{
    try{const file=event.target.files[0];if(!file)return;if(file.size>200000)throw new Error('Use a CSV smaller than 200 KB.');const records=parseCSV(await file.text());const fields=records.shift().map(x=>x.toLowerCase());const indexes=['name','objective','cost','recall'].map(x=>fields.indexOf(x));if(indexes.includes(-1))throw new Error('CSV needs name, objective, cost and recall columns.');const rows=records.map(r=>({name:r[indexes[0]],objective:r[indexes[1]]?.toLowerCase(),cost:Number(r[indexes[2]]),recall:Number(r[indexes[3]])}));if(!rows.length||rows.length>500||rows.some(r=>!r.name||r.name.length>80||!['detection','validation','differential'].includes(r.objective)||!Number.isFinite(r.cost)||r.cost<0||!Number.isFinite(r.recall)||r.recall<0||r.recall>100))throw new Error('Use 1–500 valid rows, nonnegative costs and recall from 0 to 100.');data=rows;objective.value=rows[0].objective;status.textContent=`Your local CSV: ${rows.length} rows. Provenance and accuracy have not been independently verified.`;status.classList.remove('benchmark-sample');draw();}catch(e){status.textContent=e.message;}
  });
  host.querySelector('[data-benchmark-export]').addEventListener('click',()=>{const quote=x=>'"'+String(x).replaceAll('"','""')+'"';const csv=['name,objective,cost,recall',...selected().map(r=>[r.name,r.objective,r.cost,r.recall].map(quote).join(','))].join('\n');const url=URL.createObjectURL(new Blob([csv],{type:'text/csv'}));const a=document.createElement('a');a.href=url;a.download='security-evaluation.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});
  draw();
}
