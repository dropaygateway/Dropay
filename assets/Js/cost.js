import {wait,alert,dismiss} from './utils.js';
import { OnGen } from './pay.js';
let cancelBtn=document.querySelector('#cancel');
let glory=document.querySelector('#glory');
let crd=document.querySelector('#crd');
let itemlay=document.querySelector('#itemlay');
let itemlist=document.querySelector('#itemlist');
let sbprice=document.querySelector('#sbprice');
let sbdel=document.querySelector('#sbdel');
let sbdis=document.querySelector('#sbdis');
let sbTotal=document.querySelector('#sbTotal');
let pbtn=document.querySelector('#paybtn');
let yA=document.querySelector('#yA');
let yB=document.querySelector('#yB');
let j1=document.querySelector('#j1');
let j2=document.querySelector('#j2');
let dollp=document.querySelector('#dollp');
let suip=document.querySelector('#suip');
let tsum=document.querySelector('#tsum');
let disp=document.querySelector('#disp');
let suirate=2.45;



let ordcosts=[];
let order={
  subtotal:0,
  delivery:0,
  discount:0,
  total:0
};

function loadD(){
    
    setTimeout(()=>{
        crd.classList.add("viz");
        setTimeout(()=>{
            glory.style.display="none";
            itemlay.style.display="flex";
            loaditems();
        },2000);
    },5000);
}

document.addEventListener("DOMContentLoaded",loadD);
function increm(type,eid,priceID,price,n){
  let elt=document.getElementById(eid);
  let plt=document.getElementById(priceID);
  let curq=Number(elt.innerHTML);
  let cost=Number(price);
  if(type==="add")elt.innerHTML=++curq;
  else{
    if(curq>0)elt.innerHTML=--curq;
    else{
      alert("You have reached the minimum quantity","");
    }
  }
  let ttcost=curq*cost;
  ordcosts[n]=ttcost;
  calcOrder(ordcosts.reduce((a,b)=>a+b),20,10,false);
  plt.innerHTML=`$${ttcost}`;
}
window.increm=increm;
class item {
    constructor(title,type,price,origin,src,id,pid) {
        this.title=title;
        this.type=type;
        this.price=Number(price);
        this.origin=origin;
        this.src=src;
        this.pid=pid;
        this.quantity=1;
        this.quantityID=`quan${id}`;
        this.priceID=`cost${id}`;
        this.render=()=>{
            return `<div class="item">
            <div class="pic" id="src${id}" style="background-image: url('${this.src}');"></div>
            <div class="content">
              <div class="title" id="item-title${id}"><div class="txt">${this.title||"Item not found"}</div><div class="costp" id="${this.priceID}">$${this.price*this.quantity}</div></div>
              <div class="extra" id="extra${id}">${this.type||""} from <b>${this.origin||""}</b></div>
              <div class="quantity">
                <div class="txt">Quantity</div>
                <div class="ins">
                  <div class="icon"  onclick="increm('add','${this.quantityID}','${this.priceID}',${this.price},${this.pid})">add</div>
                  <div class="txt" id="${this.quantityID}">${this.quantity}</div>
                  <div class="icon" onclick="increm('sub','${this.quantityID}','${this.priceID}',${this.price},${this.pid})">remove</div>
                </div>
            </div>
            </div>
          </div>`;
        }
    }
}

let picarray=['tomatoes.jpg','hamburger.jpg','icecream.jpg','onion.jpg','pizza.jpg'];
let titles=['Tomatoes','Cheese burger','Ice cream','Onion','Pizza'];
let prices=[1.5,25,5,2,4.5];
let sources=["Kove farms","Dangote Farms","OBJ farms","GM market","Miley's store"];

function loaditems(){
  let items="";
  ordcosts=[];
  let costs=0;
  wait("Loading items",true);
  for(let i=0; i<picarray.length; i++){
    let picx=`assets/Img/${picarray[i]}`;
    let tix=titles[i];
    let source=sources[i];
    let objx= new item(tix,"Large",prices[i],source,picx,(Date.now()+i).toString(12),i);
    items+=`${objx.render()}`;
    costs+=objx.price;
    ordcosts.push(objx.price);
  }
calcOrder(costs,20,10,true);
pbtn.addEventListener('click',pay);
cancelBtn.onclick=()=>dismiss();
  itemlist.innerHTML=items;
}

function calcOrder(subt,del,dis,bool){
  wait("Calculating your order",bool);
  let disx=subt*toPercent(dis);
  disx=disx.toFixed(1);
  order.subtotal=subt;
  order.delivery=del;
  order.discount=disx;

  sbprice.innerHTML=`$${subt}`;
  sbdel.innerHTML=`$${del}`;
  sbdis.innerHTML=`$${disx}`;
  disp.innerHTML=` ${dis}% `;

  const totala=subt+del-disx;
  const suit=(totala/suirate).toFixed(2);
  order.total=totala;
  sbTotal.innerHTML=`$${totala}`;
  dollp.innerHTML=`$${totala}`;
  suip.innerHTML=`${suit} SUI - 1 SUI = $${suirate}`;
  tsum.innerHTML=`${suit} SUI`;
  setTimeout(()=>wait("",false),4500);
return totala;
}

function toPercent(per){
  const percent=per/100;
  return percent;
}

function pay(){
  pbtn.classList.add("inactive");
  wait("Creating wallet",true);
  yA.style.display="none";
  yB.style.display="flex";
  if(window.innerWidth<768){
j2.style.display="none";
j1.style.display="block";
  }else{
    j1.style.display="block";
  }
  OnGen();
}
