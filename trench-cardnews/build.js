const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs');
const MINT = '#5CF2C8';
const css = `
*{margin:0;padding:0;box-sizing:border-box}
body{width:1080px;height:1350px;overflow:hidden;background:#0b0b0b;color:#fff;
 font-family:"Liberation Sans","WenQuanYi Zen Hei",sans-serif;position:relative}
.bg{position:absolute;inset:0;background-size:cover}
.shade{position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.55) 0%,rgba(0,0,0,0) 22%,rgba(0,0,0,0) 40%,rgba(0,0,0,.92) 100%)}
.top{position:absolute;top:56px;left:64px;right:64px;display:flex;justify-content:space-between;
 font-size:22px;letter-spacing:4px;font-weight:700;text-transform:uppercase}
.top b{color:${MINT}}
.bottom{position:absolute;left:64px;right:64px;bottom:72px}
.num{font-size:200px;line-height:.8;font-weight:700;color:${MINT};letter-spacing:-8px;margin-bottom:28px}
.tag{display:inline-block;background:${MINT};color:#000;font-weight:700;font-size:24px;letter-spacing:3px;padding:10px 20px;margin-bottom:26px}
h1{font-size:128px;line-height:.95;font-weight:700;letter-spacing:-4px;text-transform:uppercase}
h2{font-size:84px;line-height:1.08;font-weight:700;letter-spacing:-2px}
p{font-size:38px;line-height:1.5;margin-top:26px;color:#f1f1f1;max-width:860px}
p em{font-style:normal;color:${MINT};font-weight:700}
.rule{height:6px;width:96px;background:${MINT};margin-bottom:28px}
.swipe{position:absolute;right:64px;bottom:72px;font-size:26px;letter-spacing:4px;font-weight:700;color:${MINT}}
`;
const slide = (inner, extra='') => `<html><head><meta charset="utf-8"><style>${css}${extra}</style></head><body>${inner}</body></html>`;
const photo = (img,pos) => `<div class="bg" style="background-image:url(${img});background-position:${pos}"></div><div class="shade"></div>`;
const top = (n) => `<div class="top"><span>Trench Coat <b>Guide</b></span><span>${n}</span></div>`;
const swipe = `<div class="swipe">SWIPE →</div>`;

const items = [
 ['black-boots.jpg','50% 8%','올블랙','ALL BLACK','기본 베이지는 지겨워요.<br>시크한 <em>블랙 컬러</em>에<br><em>블랙 롱부츠</em>를 매치해보세요.'],
 ['half-beige.jpg','50% 30%','하프 트렌치','HALF TRENCH','클래식한 롱 기장이 부담스러울 땐<br><em>가벼운 하프 기장</em>이 정답.'],
 ['brown-ivory.jpg','50% 20%','브라운','BROWN','가을 분위기 제대로 내려면<br><em>브라운</em>으로 고르세요.<br><em>아이보리 팬츠</em>랑 매치하면 끝.'],
 ['brown-bag.webp','50% 20%','가방 매칭','BAG MATCH','분위기 맞춘 <em>스웨이드 백</em> 하나면<br>어떤 룩이든 매치 OK,<br>바로 <em>가을룩 완성</em>.'],
];
const slides = [];
slides.push(slide(`${photo('black-boots.jpg','50% 5%')}
 <div class="top"><span>Hypebeast Style <b>Card News</b></span><span>00 / 04</span></div>
 <div class="bottom"><div class="tag">FALL 2026 · 4 WAYS</div>
 <h1>How to<br>wear a<br><span style="color:${MINT}">trench</span><br>coat</h1>
 <p style="font-size:46px;font-weight:700;color:#fff;margin-top:34px">요즘 트렌치코트 입는 방법</p>
 <p style="font-size:30px;margin-top:8px;color:#cfcfcf">딱 네 가지만 기억하세요</p></div>${swipe}`));
items.forEach(([img,pos,ko,en,body],i)=>{
 slides.push(slide(`${photo(img,pos)}${top('0'+(i+1)+' / 04')}
 <div class="bottom"><div class="num">0${i+1}</div><div class="rule"></div>
 <h2>${ko}</h2><div style="font-size:26px;letter-spacing:6px;color:${MINT};font-weight:700;margin-top:10px">${en}</div>
 <p>${body}</p></div>${i<3?swipe:''}`));
});
slides.push(slide(`
 <div class="top" style="color:#000"><span>Trench Coat <b style="color:#000">Guide</b></span><span>END</span></div>
 <div style="position:absolute;inset:0;background:${MINT}"></div>
 <div style="position:absolute;inset:0;padding:150px 64px 72px;color:#000;display:flex;flex-direction:column">
  <div style="font-size:26px;letter-spacing:6px;font-weight:700">RECAP</div>
  <div style="font-size:64px;font-weight:700;line-height:1.2;margin-top:34px;letter-spacing:-1px">01 올블랙<br>02 하프 트렌치<br>03 브라운<br>04 가방 매칭</div>
  <div style="height:6px;background:#000;margin:56px 0 44px"></div>
  <h1 style="font-size:104px">Save<br>this post</h1>
  <p style="color:#000;font-size:40px;margin-top:30px">나중에 코디할 때 꺼내보게 <b>저장</b>하고,<br>더 많은 가을룩은 <b>팔로우</b>로 확인하세요.</p>
  <div style="margin-top:auto;display:flex;gap:16px;font-size:28px;font-weight:700;letter-spacing:2px">
   <span style="background:#000;color:${MINT};padding:16px 28px">♡ LIKE</span><span style="background:#000;color:${MINT};padding:16px 28px">SAVE</span><span style="background:#000;color:${MINT};padding:16px 28px">+ FOLLOW</span></div>
 </div>`, `.top{z-index:5}`));
(async()=>{
 const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
 const pg = await b.newPage({viewport:{width:1080,height:1350}});
 for (let i=0;i<slides.length;i++){
  fs.writeFileSync(`src/slide${i}.html`, slides[i]);
  await pg.goto(`file://${process.cwd()}/src/slide${i}.html`);
  await pg.waitForTimeout(300);
  await pg.screenshot({path:`slide_0${i+1}.png`});
 }
 await b.close();
})();
