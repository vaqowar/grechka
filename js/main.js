document.addEventListener("DOMContentLoaded",function(){var c,i,a="https://private-anon-f7dc74c6a3-grchhtml.apiary-mock.com",o=[],r=[],s=document.querySelector("body"),d=document.querySelector(".wrapper"),l=document.querySelector(".like__button"),u=document.querySelector(".like__counter-number"),m=document.querySelector(".modal"),t=document.querySelector(".modal__window"),e=document.querySelector(".modal__close"),p=document.querySelector(".modal__title"),v=document.querySelector(".modal__subtitle"),L=document.querySelector(".modal__text");function h(e){var t=document.createElement("div"),e=(t.classList.add("stub"),e.insertAdjacentElement("afterbegin",t),document.createElement("p")),e=(e.classList.add("stub__title"),e.innerHTML="error",t.appendChild(e),document.createElement("img"));e.classList.add("stub__img"),e.src="img/icons/machine_vector_01.svg",e.alt="machine vector",t.appendChild(e),setTimeout(function(){t.classList.add("active")},300)}function f(i,c){return new Promise(function(e,t){var n=new XMLHttpRequest;n.open(i,c),n.onreadystatechange=function(){4===this.readyState&&(200==this.status?e(n):(T(),t(n),console.error(n)))},n.send()})}function g(e,i){return new Promise(function(n,t){f("GET",a+"/slides?offset="+e+"&limit="+i).then(function(e){var t=JSON.parse(e.responseText);c=t.countAll,o.push(...t.data),console.log("carListTotal: ",c),console.log("carList: ",o),n(e)}).catch(function(e){t(e)})})}function T(e,t,n){m.classList.add("active"),s.style.overflow="hidden",e||t||n?(p.innerHTML=e,v.innerHTML=t,L.innerHTML=n):(p.innerHTML=e||"Ошибка",v.innerHTML=t||"Нет соединения с сервером!",L.innerHTML=n||"Вероятно у вас не включен VPN и данные не подгружаются с сервера.")}function n(){m.classList.remove("active"),s.removeAttribute("style"),setTimeout(function(){m.classList.contains("active")||(p.innerHTML="",v.innerHTML="",L.innerHTML="")},1e3)}function _(e,t){var c=document.querySelector(".swiper-wrapper");e.slice(t).forEach(function(e){var t=document.createElement("div"),n=(t.classList.add("swiper-slide"),c.appendChild(t),document.createElement("img")),i=(n.classList.add("swiper-slide__img"),n.src=e.imgUrl,n.alt=e.title,t.appendChild(n),n.addEventListener("error",function(){h(n.parentElement),this.remove()}),document.createElement("div")),t=(i.classList.add("swiper-slide__name"),0===e.id?(i.innerText="The Razorite",document.querySelector(".like__counter-number").innerText=e.likeCnt):0<e.id&&e.id<10?i.innerText="0"+e.id:i.innerText=e.id,t.appendChild(i),document.createElement("div"));t.classList.add("swiper-slide__desc"),t.innerText=e.desc,c.appendChild(t)})}function w(){i=new Swiper(".swiper",{direction:"horizontal",allowTouchMove:!1,speed:1200,effect:"creative",creativeEffect:{prev:{translate:["-55%",0,-1]},next:{translate:["100%",0,0]}},keyboard:!0,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},on:{init:function(t){var e;localStorage.getItem("carLikes")&&(e=(r=JSON.parse(localStorage.getItem("carLikes"))).find(function(e){return e.id===t.activeIndex}))&&(u.innerText=e.likeCnt,e.hasLike)&&l.classList.add("active")},slideChange:function(t){var e,n=r.find(function(e){return e.id===t.activeIndex});n?(l.classList.add("active"),u.innerText=n.likeCnt):(l.classList.remove("active"),u.innerText=o[t.activeIndex].likeCnt),t.isEnd&&o.length<c&&(console.log("last slide"),console.log("carList.length: ",o.length),e=o.length,g(o.length,3).then(function(){_(o,e),i.update()}).catch(function(){T("Ошибка","Нет соединения с сервером!","Не удалось загрузить дополнительный слайд(ы), вероятно у вас не включен VPN.")}))}}})}l.addEventListener("click",function(){var n;this.classList.contains("active")||(i?(n=i.activeIndex,f("POST",a+"/slides/"+n+"/like").then(function(e){var t=o[n],t=(t.hasLike=!0,t.likeCnt++,u.innerText=t.likeCnt,l.classList.add("active"),r.push({id:n,hasLike:!0,likeCnt:t.likeCnt}),JSON.stringify(r));localStorage.setItem("carLikes",t),console.log(e),T(JSON.parse(e.responseText).title,null,JSON.parse(e.responseText).desc)})):T())}),e.onclick=function(){n()},m.addEventListener("click",e=>{m.classList.contains("active")&&!t.contains(e.target)&&n()}),g(0,3).then(function(){var e=document.createElement("div"),t=(e.classList.add("swiper"),d.insertBefore(e,document.querySelector(".logo")),document.createElement("div")),n=(t.classList.add("swiper-wrapper"),e.appendChild(t),_(o,0),(t=document.createElement("div")).classList.add("swiper-button-img"),t.cloneNode(!0)),i=(n.classList.add("swiper-button-img_hover"),document.createElement("div"));i.classList.add("swiper-button-prev"),e.appendChild(i),i.appendChild(t.cloneNode(!0)),i.appendChild(n.cloneNode(!0)),(i=document.createElement("div")).classList.add("swiper-button-next"),e.appendChild(i),i.appendChild(t.cloneNode(!0)),i.appendChild(n.cloneNode(!0)),w()}).catch(function(){h(d)}).finally(function(){setTimeout(function(){document.querySelector(".preloader")?.classList.remove("active")},300)})});