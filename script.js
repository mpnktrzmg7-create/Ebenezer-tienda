// Configuración: reemplazar con el WhatsApp comercial de EBEN-EZER, con código de país y sin + ni espacios.
const WHATSAPP_NUMBER = ''; // Ejemplo de formato: 549370XXXXXXX
// Productos de DEMOSTRACIÓN. Reemplazar por fotos, talles, precios y stock reales antes de publicar.
const products = [
 {id:1,name:'Remera urbana (ejemplo)',category:'Remeras',price:23000,icon:'👕',sizes:['S','M','L']},
 {id:2,name:'Jean baggy (ejemplo)',category:'Jeans',price:0,icon:'👖',sizes:['38','40','42','44','46']},
 {id:3,name:'Bermuda baggy (ejemplo)',category:'Bermudas',price:0,icon:'🩳',sizes:['S','M','L']},
 {id:4,name:'Zapatillas (ejemplo)',category:'Zapatillas',price:0,icon:'👟',sizes:['38','39','40','41','42']},
 {id:5,name:'Perfume (ejemplo)',category:'Perfumes',price:0,icon:'✦',sizes:['Único']}
];
const money=n=>n.toLocaleString('es-AR',{style:'currency',currency:'ARS',maximumFractionDigits:0});
let cart=[];let currentFilter='all';
const $=s=>document.querySelector(s);
function renderProducts(){const visible=products.filter(p=>currentFilter==='all'||p.category===currentFilter);$('#products').innerHTML=visible.map(p=>`<article class="product"><div class="product-art" aria-hidden="true">${p.icon}</div><h3>${p.name}</h3><p>${p.category} · Producto de muestra</p><div class="product-bottom"><strong>${p.price?money(p.price):'Consultar precio'}</strong><button data-add="${p.id}">+ Agregar</button></div></article>`).join('');}
function add(id){const p=products.find(x=>x.id===id);const size=prompt('Elegí talle: '+p.sizes.join(' / '),p.sizes[0]);if(size===null)return;const chosen=size.trim().toUpperCase();if(!p.sizes.includes(chosen)){alert('Elegí un talle disponible: '+p.sizes.join(', '));return;}const item=cart.find(x=>x.id===id&&x.size===chosen);if(item)item.qty++;else cart.push({id,size:chosen,qty:1});renderCart();openCart();}
function renderCart(){const count=cart.reduce((s,x)=>s+x.qty,0);$('#cartCount').textContent=count;$('#cartItems').innerHTML=cart.length?cart.map((x,i)=>{const p=products.find(z=>z.id===x.id);return `<div class="cart-line"><strong>${p.name}</strong><small>Talle: ${x.size} · ${p.price?money(p.price):'Precio a consultar'}</small><div><button data-minus="${i}" aria-label="Quitar una unidad">−</button>${x.qty}<button data-plus="${i}" aria-label="Agregar una unidad">+</button></div></div>`}).join(''):'Tu bolsa está vacía ☁';$('#cartTotal').textContent=money(cart.reduce((s,x)=>s+products.find(p=>p.id===x.id).price*x.qty,0));}
function openCart(){$('#cart').classList.add('open');$('#cart').setAttribute('aria-hidden','false');$('#overlay').hidden=false;}function closeCart(){$('#cart').classList.remove('open');$('#cart').setAttribute('aria-hidden','true');$('#overlay').hidden=true;}
document.addEventListener('click',e=>{const add=e.target.closest('[data-add]');if(add)addProduct(add);const minus=e.target.closest('[data-minus]');if(minus){const i=Number(minus.dataset.minus);cart[i].qty--;if(cart[i].qty===0)cart.splice(i,1);renderCart();}const plus=e.target.closest('[data-plus]');if(plus){cart[Number(plus.dataset.plus)].qty++;renderCart();}const filter=e.target.closest('[data-filter]');if(filter){currentFilter=filter.dataset.filter;renderProducts();$('#products').scrollIntoView({behavior:'smooth'});}});
function addProduct(el){add(Number(el.dataset.add));}
$('#showAll').onclick=()=>{currentFilter='all';renderProducts();};$('#openCart').onclick=openCart;$('#closeCart').onclick=closeCart;$('#overlay').onclick=closeCart;
$('#checkout').onclick=()=>{if(!cart.length){$('#checkoutHelp').textContent='Agregá un producto antes de continuar.';return;}if(!/^\d{10,15}$/.test(WHATSAPP_NUMBER)){ $('#checkoutHelp').textContent='Falta configurar el número comercial de WhatsApp en script.js.';return;}const lines=cart.map(x=>{const p=products.find(z=>z.id===x.id);return `• ${p.name} | Talle: ${x.size} | Cantidad: ${x.qty} | ${p.price?money(p.price*x.qty):'Precio a consultar'}`;});const total=cart.reduce((s,x)=>s+products.find(p=>p.id===x.id).price*x.qty,0);const msg=`¡Hola, EBEN-EZER! ☁️ Quiero consultar por este pedido:\n\n${lines.join('\n')}\n\nSubtotal de productos con precio: ${money(total)}\n\n¿Me confirman disponibilidad, precios finales y envío?`;window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,'_blank','noopener');};
renderProducts();renderCart();
