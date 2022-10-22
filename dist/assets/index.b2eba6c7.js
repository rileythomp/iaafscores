(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))l(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const f of r.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&l(f)}).observe(document,{childList:!0,subtree:!0});function n(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerpolicy&&(r.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?r.credentials="include":o.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function l(o){if(o.ep)return;o.ep=!0;const r=n(o);fetch(o.href,r)}})();function x(){}function Le(e){return e()}function Ce(){return Object.create(null)}function N(e){e.forEach(Le)}function ze(e){return typeof e=="function"}function X(e,t){return e!=e?t==t:e!==t||e&&typeof e=="object"||typeof e=="function"}function qe(e){return Object.keys(e).length===0}function Ae(e,...t){if(e==null)return x;const n=e.subscribe(...t);return n.unsubscribe?()=>n.unsubscribe():n}function Te(e,t,n){e.$$.on_destroy.push(Ae(t,n))}function re(e){return e==null?"":e}function ve(e,t,n){return e.set(n),t}function u(e,t){e.appendChild(t)}function Y(e,t,n){e.insertBefore(t,n||null)}function O(e){e.parentNode.removeChild(e)}function Re(e,t){for(let n=0;n<e.length;n+=1)e[n]&&e[n].d(t)}function c(e){return document.createElement(e)}function ee(e){return document.createTextNode(e)}function T(){return ee(" ")}function A(e,t,n,l){return e.addEventListener(t,n,l),()=>e.removeEventListener(t,n,l)}function v(e,t,n){n==null?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function Ne(e){return Array.from(e.childNodes)}function ae(e,t){t=""+t,e.wholeText!==t&&(e.data=t)}function ie(e,t){e.value=t==null?"":t}function we(e,t){for(let n=0;n<e.options.length;n+=1){const l=e.options[n];if(l.__value===t){l.selected=!0;return}}e.selectedIndex=-1}function Oe(e){const t=e.querySelector(":checked")||e.options[0];return t&&t.__value}let be;function te(e){be=e}const Z=[],xe=[],ce=[],Me=[],Ie=Promise.resolve();let $e=!1;function Pe(){$e||($e=!0,Ie.then(je))}function me(e){ce.push(e)}const ge=new Set;let ue=0;function je(){const e=be;do{for(;ue<Z.length;){const t=Z[ue];ue++,te(t),Fe(t.$$)}for(te(null),Z.length=0,ue=0;xe.length;)xe.pop()();for(let t=0;t<ce.length;t+=1){const n=ce[t];ge.has(n)||(ge.add(n),n())}ce.length=0}while(Z.length);for(;Me.length;)Me.pop()();$e=!1,ge.clear(),te(e)}function Fe(e){if(e.fragment!==null){e.update(),N(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(me)}}const fe=new Set;let R;function Be(){R={r:0,c:[],p:R}}function Ke(){R.r||N(R.c),R=R.p}function S(e,t){e&&e.i&&(fe.delete(e),e.i(t))}function W(e,t,n,l){if(e&&e.o){if(fe.has(e))return;fe.add(e),R.c.push(()=>{fe.delete(e),l&&(n&&e.d(1),l())}),e.o(t)}else l&&l()}function _e(e){e&&e.c()}function ne(e,t,n,l){const{fragment:o,after_update:r}=e.$$;o&&o.m(t,n),l||me(()=>{const f=e.$$.on_mount.map(Le).filter(ze);e.$$.on_destroy?e.$$.on_destroy.push(...f):N(f),e.$$.on_mount=[]}),r.forEach(me)}function le(e,t){const n=e.$$;n.fragment!==null&&(N(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function Ve(e,t){e.$$.dirty[0]===-1&&(Z.push(e),Pe(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function oe(e,t,n,l,o,r,f,a=[-1]){const i=be;te(e);const s=e.$$={fragment:null,ctx:[],props:r,update:x,not_equal:o,bound:Ce(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(i?i.$$.context:[])),callbacks:Ce(),dirty:a,skip_bound:!1,root:t.target||i.$$.root};f&&f(s.root);let _=!1;if(s.ctx=n?n(e,t.props||{},(d,p,...b)=>{const m=b.length?b[0]:p;return s.ctx&&o(s.ctx[d],s.ctx[d]=m)&&(!s.skip_bound&&s.bound[d]&&s.bound[d](m),_&&Ve(e,d)),p}):[],s.update(),_=!0,N(s.before_update),s.fragment=l?l(s.ctx):!1,t.target){if(t.hydrate){const d=Ne(t.target);s.fragment&&s.fragment.l(d),d.forEach(O)}else s.fragment&&s.fragment.c();t.intro&&S(e.$$.fragment),ne(e,t.target,t.anchor,t.customElement),je()}te(i)}class se{$destroy(){le(this,1),this.$destroy=x}$on(t,n){if(!ze(n))return x;const l=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return l.push(n),()=>{const o=l.indexOf(n);o!==-1&&l.splice(o,1)}}$set(t){this.$$set&&!qe(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const U=[];function Se(e,t=x){let n;const l=new Set;function o(a){if(X(e,a)&&(e=a,n)){const i=!U.length;for(const s of l)s[1](),U.push(s,e);if(i){for(let s=0;s<U.length;s+=2)U[s][0](U[s+1]);U.length=0}}}function r(a){o(a(e))}function f(a,i=x){const s=[a,i];return l.add(s),l.size===1&&(n=t(o)||x),a(e),()=>{l.delete(s),l.size===0&&(n(),n=null)}}return{set:o,update:r,subscribe:f}}const de=Se([]),pe=Se("");function De(e){let t,n,l,o,r,f,a,i,s,_,d,p,b,m,h,y,C,$,M,E,g,k,z,j;return{c(){t=c("div"),n=c("select"),l=c("option"),l.textContent="100m",o=c("option"),o.textContent="200m",r=c("option"),r.textContent="400m",f=c("option"),f.textContent="800m",a=c("option"),a.textContent="1500m",i=c("option"),i.textContent="Mile",s=c("option"),s.textContent="3000m",_=c("option"),_.textContent="5000m",d=c("option"),d.textContent="10000m",p=c("option"),p.textContent="Half Marathon",b=c("option"),b.textContent="Marathon",m=c("option"),m.textContent="110mH",h=c("option"),h.textContent="400mH",y=c("option"),y.textContent="3000mSC",C=T(),$=c("input"),M=T(),E=c("input"),g=T(),k=c("button"),k.textContent="+",l.__value="100m",l.value=l.__value,o.__value="200m",o.value=o.__value,r.__value="400m",r.value=r.__value,f.__value="800m",f.value=f.__value,a.__value="1500m",a.value=a.__value,i.__value="Mile",i.value=i.__value,s.__value="3000m",s.value=s.__value,_.__value="5000m",_.value=_.__value,d.__value="10000m",d.value=d.__value,p.__value="HalfMarathon",p.value=p.__value,b.__value="Marathon",b.value=b.__value,m.__value="110mH",m.value=m.__value,h.__value="400mH",h.value=h.__value,y.__value="3000mSC",y.value=y.__value,v(n,"class","svelte-1t8i0rt"),e[2]===void 0&&me(()=>e[4].call(n)),v($,"type","text"),v($,"placeholder","Time"),v($,"class","svelte-1t8i0rt"),v(E,"type","text"),v(E,"placeholder","Points"),v(E,"class","svelte-1t8i0rt"),v(t,"id","event-input"),v(t,"class","container svelte-1t8i0rt")},m(w,H){Y(w,t,H),u(t,n),u(n,l),u(n,o),u(n,r),u(n,f),u(n,a),u(n,i),u(n,s),u(n,_),u(n,d),u(n,p),u(n,b),u(n,m),u(n,h),u(n,y),we(n,e[2]),u(t,C),u(t,$),ie($,e[0]),u(t,M),u(t,E),ie(E,e[1]),u(t,g),u(t,k),z||(j=[A(n,"change",e[4]),A($,"input",e[5]),A(E,"input",e[6]),A(k,"click",e[3])],z=!0)},p(w,[H]){H&4&&we(n,w[2]),H&1&&$.value!==w[0]&&ie($,w[0]),H&2&&E.value!==w[1]&&ie(E,w[1])},i:x,o:x,d(w){w&&O(t),z=!1,N(j)}}}function Ge(e,t,n){let l;Te(e,de,d=>n(7,l=d));let o="12",r="",f="100m";function a(){let d;if(o!=""&&r!=""){console.log("both fields are filled");return}else if(o==""&&r==""){console.log("both fields are empty");return}else o!=""?d=`time=${o}`:r!=""&&(d=`points=${r}`);fetch(`https://kaz3cn5qqtkrdwxnvpey7eex5q0mhokf.lambda-url.us-east-1.on.aws/?race=${f}&${d}`).then(p=>p.json()).then(p=>{if(o==""){let b=Math.floor(p/3600),m=Math.floor(p%3600/60),h=p%60;b>0?(h=Math.round(h),p=`${b}:${m<10?"0":""}${m}:${h<10?"0":""}${h}`):m>0?(h=Math.round(h),p=`${m}:${h<10?"0":""}${h}`):p=`${h.toFixed(2)}`,ve(de,l=[...l,{race:f,time:p,points:r}],l)}else r==""&&ve(de,l=[...l,{race:f,time:o,points:p}],l)}).catch(p=>{console.log(p)})}function i(){f=Oe(this),n(2,f)}function s(){o=this.value,n(0,o)}function _(){r=this.value,n(1,r)}return[o,r,f,a,i,s,_]}class Je extends se{constructor(t){super(),oe(this,t,Ge,De,X,{})}}function Qe(e){let t;return{c(){t=c("div"),t.innerHTML=`<div class="page-title svelte-1wfsf5s"><h1 class="svelte-1wfsf5s">IAAF Scores</h1></div> 
    <div class="page-links svelte-1wfsf5s"><div class="links svelte-1wfsf5s"><a href="/" class="svelte-1wfsf5s">Home</a> 
            <a href="/about" class="svelte-1wfsf5s">About</a></div></div>`,v(t,"id","header"),v(t,"class","container svelte-1wfsf5s")},m(n,l){Y(n,t,l)},p:x,i:x,o:x,d(n){n&&O(t)}}}class Ue extends se{constructor(t){super(),oe(this,t,null,Qe,X,{})}}function We(e){let t,n,l,o,r,f,a=e[0].race+"",i,s,_,d,p,b=e[0].points+"",m,h,y,C=e[0].time+"",$,M,E,g,k,z,j,w,H,I,P,F,B,K,V,D,G,J,Q,he,ye;return{c(){t=c("div"),n=c("table"),l=c("tr"),o=c("td"),o.textContent="Points",r=T(),f=c("td"),i=ee(a),_=T(),d=c("tr"),p=c("td"),m=ee(b),h=T(),y=c("td"),$=ee(C),E=T(),g=c("select"),k=c("option"),k.textContent="+",z=c("option"),z.textContent="100m",j=c("option"),j.textContent="200m",w=c("option"),w.textContent="400m",H=c("option"),H.textContent="800m",I=c("option"),I.textContent="1500m",P=c("option"),P.textContent="Mile",F=c("option"),F.textContent="3000m",B=c("option"),B.textContent="5000m",K=c("option"),K.textContent="10000m",V=c("option"),V.textContent="Half Marathon",D=c("option"),D.textContent="Marathon",G=c("option"),G.textContent="110mH",J=c("option"),J.textContent="400mH",Q=c("option"),Q.textContent="3000mSC",v(f,"class",s=re(e[0].race+"-"+e[0].points)+" svelte-193tzn6"),v(l,"class","svelte-193tzn6"),v(y,"class",M=re(e[0].race+"-"+e[0].points)+" svelte-193tzn6"),v(d,"class","svelte-193tzn6"),v(n,"class","svelte-193tzn6"),k.hidden=!0,k.__value="+",k.value=k.__value,z.__value="100m",z.value=z.__value,j.__value="200m",j.value=j.__value,w.__value="400m",w.value=w.__value,H.__value="800m",H.value=H.__value,I.__value="1500m",I.value=I.__value,P.__value="Mile",P.value=P.__value,F.__value="3000m",F.value=F.__value,B.__value="5000m",B.value=B.__value,K.__value="10000m",K.value=K.__value,V.__value="HalfMarathon",V.value=V.__value,D.__value="Marathon",D.value=D.__value,G.__value="110mH",G.value=G.__value,J.__value="400mH",J.value=J.__value,Q.__value="3000mSC",Q.value=Q.__value,v(g,"class","svelte-193tzn6"),v(t,"class","results-row container svelte-193tzn6")},m(L,q){Y(L,t,q),u(t,n),u(n,l),u(l,o),u(l,r),u(l,f),u(f,i),u(n,_),u(n,d),u(d,p),u(p,m),u(d,h),u(d,y),u(y,$),u(t,E),u(t,g),u(g,k),u(g,z),u(g,j),u(g,w),u(g,H),u(g,I),u(g,P),u(g,F),u(g,B),u(g,K),u(g,V),u(g,D),u(g,G),u(g,J),u(g,Q),he||(ye=[A(o,"click",Ye),A(f,"click",e[2]),A(g,"change",e[3])],he=!0)},p(L,[q]){q&1&&a!==(a=L[0].race+"")&&ae(i,a),q&1&&s!==(s=re(L[0].race+"-"+L[0].points)+" svelte-193tzn6")&&v(f,"class",s),q&1&&b!==(b=L[0].points+"")&&ae(m,b),q&1&&C!==(C=L[0].time+"")&&ae($,C),q&1&&M!==(M=re(L[0].race+"-"+L[0].points)+" svelte-193tzn6")&&v(y,"class",M)},i:x,o:x,d(L){L&&O(t),he=!1,N(ye)}}}function Xe(e){let t=e.target.parentElement.parentElement.children[1].children;for(let n=0;n<t.length;n++)if(t[n].classList.contains(e.target.classList[0])){t[n].remove();break}e.target.remove()}const Ye=e=>e.target.parentElement.parentElement.parentElement.remove();function Ze(e,t,n){let l;Te(e,pe,i=>n(4,l=i));let{result:o={race:"",time:"",points:""}}=t;function r(i){fetch(`https://kaz3cn5qqtkrdwxnvpey7eex5q0mhokf.lambda-url.us-east-1.on.aws/?race=${i.target.value}&points=${o.points}`).then(s=>s.json()).then(s=>{let _=`${i.target.value}-${o.points}`,d=i.target.parentElement.children[0].children[0];for(let $=0;$<d.children.length;$++)if(d.children[$].classList.contains(_)){ve(pe,l="This distance has already been added.",l),setTimeout(()=>{ve(pe,l="",l)},3e3),i.target.children[0].selected=!0;return}let p=document.createElement("td");i.target.value=="HalfMarathon"?p.innerHTML="Half Marathon":p.innerHTML=i.target.value,p.classList.add(_),p.addEventListener("click",function(){let $=p.parentElement.parentElement.children[1].children;for(let M=0;M<$.length;M++)if($[M].classList.contains(p.classList[0])){$[M].remove();break}p.remove()}),d.appendChild(p);let b=i.target.parentElement.children[0].children[1],m=document.createElement("td"),h=Math.floor(s/3600),y=Math.floor(s%3600/60),C=s%60;h>0?(C=Math.round(C),m.innerHTML=`${h}:${y<10?"0":""}${y}:${C<10?"0":""}${C}`):y>0?(C=Math.round(C),m.innerHTML=`${y}:${C<10?"0":""}${C}`):m.innerHTML=`${C.toFixed(2)}`,m.classList.add(_),b.appendChild(m),i.target.children[0].selected=!0}).catch(s=>{console.log(s)})}const f=i=>Xe(i),a=i=>r(i);return e.$$set=i=>{"result"in i&&n(0,o=i.result)},[o,r,f,a]}class et extends se{constructor(t){super(),oe(this,t,Ze,We,X,{result:0})}}function Ee(e,t,n){const l=e.slice();return l[1]=t[n],l}function ke(e){let t,n;return t=new et({props:{result:e[1]}}),{c(){_e(t.$$.fragment)},m(l,o){ne(t,l,o),n=!0},p(l,o){const r={};o&1&&(r.result=l[1]),t.$set(r)},i(l){n||(S(t.$$.fragment,l),n=!0)},o(l){W(t.$$.fragment,l),n=!1},d(l){le(t,l)}}}function tt(e){let t,n,l,o=e[0],r=[];for(let a=0;a<o.length;a+=1)r[a]=ke(Ee(e,o,a));const f=a=>W(r[a],1,1,()=>{r[a]=null});return{c(){t=c("div"),n=c("div");for(let a=0;a<r.length;a+=1)r[a].c();v(t,"id","results-table"),v(t,"class","container svelte-xj659f")},m(a,i){Y(a,t,i),u(t,n);for(let s=0;s<r.length;s+=1)r[s].m(n,null);l=!0},p(a,[i]){if(i&1){o=a[0];let s;for(s=0;s<o.length;s+=1){const _=Ee(a,o,s);r[s]?(r[s].p(_,i),S(r[s],1)):(r[s]=ke(_),r[s].c(),S(r[s],1),r[s].m(n,null))}for(Be(),s=o.length;s<r.length;s+=1)f(s);Ke()}},i(a){if(!l){for(let i=0;i<o.length;i+=1)S(r[i]);l=!0}},o(a){r=r.filter(Boolean);for(let i=0;i<r.length;i+=1)W(r[i]);l=!1},d(a){a&&O(t),Re(r,a)}}}function nt(e,t,n){let l=[];return de.subscribe(o=>{n(0,l=o)}),[l]}class lt extends se{constructor(t){super(),oe(this,t,nt,tt,X,{})}}function He(e){let t,n,l;return{c(){t=c("div"),n=c("p"),l=ee(e[0]),v(n,"class","svelte-1wsnojj"),v(t,"id","warning"),v(t,"class","svelte-1wsnojj")},m(o,r){Y(o,t,r),u(t,n),u(n,l)},p(o,r){r&1&&ae(l,o[0])},d(o){o&&O(t)}}}function ot(e){let t,n,l,o,r,f,a,i;n=new Ue({}),o=new Je({}),f=new lt({});let s=e[0]!=""&&He(e);return{c(){t=c("main"),_e(n.$$.fragment),l=T(),_e(o.$$.fragment),r=T(),_e(f.$$.fragment),a=T(),s&&s.c()},m(_,d){Y(_,t,d),ne(n,t,null),u(t,l),ne(o,t,null),u(t,r),ne(f,t,null),u(t,a),s&&s.m(t,null),i=!0},p(_,[d]){_[0]!=""?s?s.p(_,d):(s=He(_),s.c(),s.m(t,null)):s&&(s.d(1),s=null)},i(_){i||(S(n.$$.fragment,_),S(o.$$.fragment,_),S(f.$$.fragment,_),i=!0)},o(_){W(n.$$.fragment,_),W(o.$$.fragment,_),W(f.$$.fragment,_),i=!1},d(_){_&&O(t),le(n),le(o),le(f),s&&s.d()}}}function st(e,t,n){let l;return pe.subscribe(o=>{n(0,l=o)}),[l]}class rt extends se{constructor(t){super(),oe(this,t,st,ot,X,{})}}new rt({target:document.getElementById("app")});
