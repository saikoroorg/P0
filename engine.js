var d1ce=d1ce||{};d1ce.name="d1ce",d1ce.version="0.6.190614+3",d1ce.identifier=d1ce.name+"-"+d1ce.version,d1ce.timestamp=d1ce.version.match(/\d+\+\d+$/),d1ce.Engine=class{static async Wait(t){await d1ce.Count.Instance().Wait(t)}static Time(){return d1ce.Count.Instance().Time()}static Random(t){return d1ce.Count.Instance().Random(t)}static Value(t){return d1ce.Params.Instance().Value(t)}static UpdateValue(t,e,s=!1){d1ce.Params.Instance().UpdateValue(t,e,s)}static Print(t){d1ce.Screen.Instance().Print(t)}static Clear(){d1ce.Screen.Instance().Clear()}static async UpdateDirs(){d1ce.Input.Instance().UpdateDirs()}static Dirs(t=!1){return d1ce.Input.Instance().Dirs(t)}},d1ce.Vec=class{constructor(t=0,e=0,s=0){this.x=t,this.y=e,this.z=s}Clone(){return new d1ce.Vec(this.x,this.y,this.z)}ToString(){return this.x.toString()+","+this.y.toString()+","+this.z.toString()}IsZero(){return 0==this.x&&0==this.y&&0==this.z}LenSq(){return this.x*this.x+this.y*this.y+this.z*this.z}Add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}Sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}Mul(t){return this.x=Math.round(this.x*t),this.y=Math.round(this.y*t),this.z=Math.round(this.z*t),this}Div(t){return 0!=t?(this.x=Math.round(this.x/t),this.y=Math.round(this.y/t),this.z=Math.round(this.z/t)):(this.x=0,this.y=0,this.z=0),this}Neg(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}Eq(t){return this.x==t.x&&this.y==t.y&&this.z==t.z}Ne(t){return this.x!=t.x||this.y!=t.y||this.z!=t.z}},d1ce.Vec.zero=new d1ce.Vec(0,0,0),d1ce.Vec.x=new d1ce.Vec(1,0,0),d1ce.Vec.y=new d1ce.Vec(0,1,0),d1ce.Vec.z=new d1ce.Vec(0,0,1),d1ce.Dirs=class{constructor(t=-1){t>=0&&t<d1ce.Dirs.bit_max?this.flags=1<<t:this.flags=0}Clone(){let t=new d1ce.Dirs;return t.flags=this.flags,t}ToString(){let t="";for(let e=0;e<d1ce.Dirs.bit_max;++e)t+=this.Test(new d1ce.Dirs(e))?e:"-";return t}ToVec(){const t=[d1ce.Vec.z.Clone().Neg(),d1ce.Vec.x.Clone().Neg(),d1ce.Vec.y.Clone().Neg(),d1ce.Vec.y,d1ce.Vec.x,d1ce.Vec.z];let e=new d1ce.Vec(0,0,0);for(let s=0;s<d1ce.Dirs.bit_max;++s)this.Test(new d1ce.Dirs(s))&&e.Add(t[s]);return e}Clear(){this.flags=0}IsEmpty(){return 0==this.flags}Count(){count=0;for(let t=0;t<Dirs.bit_max;++t)this.Test(new d1ce.Dirs(t))&&(count+=1);return count}Add(t){this.flags|=t.flags}Sub(t){this.flags&=~t.flags}Test(t){return(this.flags&t.flags)>0}Near(){return(1&this.flags)>0}Far(){return(32&this.flags)>0}Right(){return(16&this.flags)>0}Left(){return(2&this.flags)>0}Down(){return(4&this.flags)>0}Up(){return(8&this.flags)>0}},d1ce.Dirs.bit_max=6,d1ce.Dirs.empty=new d1ce.Dirs,d1ce.Dirs.near=new d1ce.Dirs(0),d1ce.Dirs.far=new d1ce.Dirs(5),d1ce.Dirs.right=new d1ce.Dirs(4),d1ce.Dirs.left=new d1ce.Dirs(1),d1ce.Dirs.down=new d1ce.Dirs(2),d1ce.Dirs.up=new d1ce.Dirs(3),d1ce.Board=class{constructor(t){let e=null!=t&&t.length>0?t[0].length:0,s=null!=t?t.length:0;this.values=new Array(s),this.objects=new Array(s);for(let i=0;i<s;++i){this.values[i]=new Array(e),this.objects[i]=new Array(e);for(let s=0;s<e;++s)this.values[i][s]=t[i]?t[i][s]:0,this.objects[i][s]=null}}Clone(){let t=new Clone,e=this.Width(),s=this.Height();t.values=new Array(s),t.objects=new Array(s);for(let i=0;i<s;++i){t.values[i]=new Array(e),t.objects[i]=new Array(e);for(let s=0;s<e;++s)t.values[i][s]=this.values[i][s],t.objects[i][s]=this.objects[i][s]}return t}Width(){return null!=this.values&&this.values.length>0?this.values[0].length:0}Height(){return null!=this.values?this.values.length:0}HasGrid(t,e){return t>=0&&t<this.Width()&&e>=0&&e<this.Height()}SetValue(t,e,s){this.HasGrid(t,e)&&(this.values[e][t]=s)}Value(t,e){return this.HasGrid(t,e)?this.values[e][t]:d1ce.Board.invalid_value}RemoveObjects(){let t=this.Width(),e=this.Height();for(let s=0;s<e;++s)for(let e=0;e<t;++e)this.objects[s][e]=null}AddObject(t,e,s){this.HasGrid(e,s)&&(this.objects[s][e]=t)}ToString(){let t=this.Width(),e=this.Height(),s="";for(let i=0;i<e;++i){for(let e=0;e<t;++e)null!=this.objects[i][e]?s+=" "+this.objects[i][e]:s+=" "+this.Value(e,i);s+="\n"}return s}},d1ce.Board.invalid_value=-1,d1ce.Piece=class{constructor(t,e=null){this.pos=t,this.dirs=new d1ce.Dirs,this.movement=e}Clone(){let t=new d1ce.Piece;return t.pos=this.pos.Clone(),t.dirs=this.dirs.Clone(),t.movement=this.movement,t}},d1ce.Count=class{constructor(t=0){this.time=Date.now(),this.seed=0!=t?t:this.time}async Wait(t){t>0&&await new Promise(e=>setTimeout(e,t))}Time(t=!1){let e=Date.now()-this.time;return this.time=Date.now(),t?e:this.time}Random(t){return this.seed=this.seed^this.seed<<13,this.seed=this.seed^this.seed>>>17,this.seed=this.seed^this.seed<<15,Math.abs(this.seed%t)}Seed(){return this.seed}SetSeed(t){this.seed=0!=t?t:Date.now()}static Instance(){return null==this.instance&&(this.instance=new d1ce.Count),this.instance}},d1ce.Params=class{constructor(t=null,e=!1){if(this.name=t,this.keyvalues={},this.global=e,this.updated=!1,null==this.name||""==this.name){let t=window.location.search;if(null!=t&&""!=t){let e=t.slice(1);this.ParseText(e)}}else if(this.global)null==d1ce.Params.global_params[t]?d1ce.Params.global_params[t]=this:this.keyvalues=d1ce.Params.global_params[t].keyvalues;else if(null!=this.name){let t=localStorage.getItem(this.name);null!=t&&this.ParseText(t)}}ParseText(t){if(this.keyvalues={},t.includes("&"))t.split("&").forEach(t=>{let e=t.split("=");null!=e[0]&&null!=e[1]&&(this.keyvalues[e[0]]=e[1])});else{let e=t.split("=");null!=e[0]&&null!=e[1]&&(this.keyvalues[e[0]]=e[1])}}Keys(){return Object.keys(this.keyvalues)}Value(t){return this.updated=!1,this.keyvalues[t]}UpdateValue(t,e,s=!1){if(null!=e?this.keyvalues[t]=e:delete this.keyvalues[t],s)return;let i=[];for(let t in this.keyvalues)null!=t&&null!=this.keyvalues[t]&&i.push(t+"="+this.keyvalues[t]);let n=i.join("&");if(""==this.name){let t="?"+n;window.history.replaceState(null,"",t)}else this.global?null!=window.parent&&("*"==this.name||this.name.match(new RegExp("^https?://")))&&window.parent.postMessage(n,this.name):null!=this.name&&localStorage.setItem(this.name,n);this.updated=!0}async WaitUpdatingValue(){for(;!this.updated;)await new Promise(t=>setTimeout(t,10))}static Instance(){return null==this.instance&&(this.instance=new d1ce.Params("*",!0)),this.instance}},d1ce.Params.global_params={},window.addEventListener("message",t=>{if("null"!=t.origin){let e=d1ce.Params.global_params[t.origin]||new d1ce.Params(t.origin,!0);e.ParseText(t.data),e.updated=!0}params=d1ce.Params.global_params["*"]||new d1ce.Params("*",!0),params.ParseText(t.data),params.updated=!0},!1),d1ce.Screen=class{constructor(t=null){if(this.root=null,null!=t){let e=document.getElementsByClassName(t);if(e.length>0)for(let t=0;t<e.length;++t)if(!d1ce.Screen.Instance().screens.includes(e[t])){this.root=e[t],d1ce.Screen.Instance().screens.push(this.root);break}}null==this.root&&(this.root=document.createElement("pre"),null!=t&&(this.root.setAttribute("class",t),d1ce.Screen.Instance().screens.push(this.root)),document.body.appendChild(this.root))}Print(t){null!=this.root&&this.root.appendChild(document.createTextNode(t+"\n"))}Clear(){null!=this.root&&(this.root.textContent=null)}static Instance(){return null==this.instance&&(this.instance=new d1ce.Screen,this.instance.screens=[]),this.instance}},d1ce.Sprite=class{constructor(t=null){this.root=null,this.sprite=null,this.frames=0,this.width=0,this.height=0,this.type=null,this.anime=null,this.pos=null,this.dir=null,this.angle=0,this.scale=1,this.alpha=1,this.root=document.createElement("div"),this.sprite=document.createElement("div"),this.root.appendChild(this.sprite),null!=t&&this.sprite.setAttribute("class",t)}LoadImage(t,e,s){if(null!=this.root&&null!=this.sprite){var i=new Image;i.onload=(()=>{this.width=e>0?e:i.naturalWidth,this.height=s>0?s:e>0?e:i.naturalHeight,this.frames=Math.floor(i.naturalWidth/this.width),this.sprite.style.width=this.width,this.sprite.style.height=this.height;let n=i.naturalWidth/this.width*100,h=i.naturalHeight/this.height*100;this.sprite.style.backgroundSize=n+"% "+h+"%";let l='url("'+t+'")';this.sprite.style.backgroundImage=l}),i.src=t}}async WaitLoadingImage(){for(;this.frames<=0;)await new Promise(t=>setTimeout(t,10))}Enable(t,e){null!=this.root&&null!=t.root&&(e?t.root.contains(this.root)||t.root.appendChild(this.root):t.root.contains(this.root)&&t.root.removeChild(this.root))}IsInRect(t){if(null!=this.root&&null!=t){let e=this.root.getBoundingClientRect();return t.x>e.left&&t.x<e.right&&t.y>e.top&&t.y<e.bottom}return!1}SetPos(t){null!=this.root&&(this.pos=t,this.root.style.position="fixed",this.root.style.top=this.pos.y-this.root.clientHeight/2,this.root.style.left=this.pos.x-this.root.clientWidth/2)}SetDir(t){if(null!=this.root){this.dir=t;const e=180/Math.PI;this.angle=Math.atan2(this.dir.y,this.dir.x)*e,this.root.style.transform="scale("+this.scale+")rotate("+this.angle+"deg)"}}SetAngle(t){null!=this.root&&(this.dir=null,this.angle=t,this.root.style.transform="scale("+this.scale+")rotate("+this.angle+"deg)")}SetScale(t){null!=this.root&&(this.scale=t,this.root.style.transform="scale("+this.scale+")rotate("+this.angle+"deg)",this.root.style.marginLeft=this.root.clientWidth*(t-1)/2,this.root.style.marginRight=this.root.clientWidth*(t-1)/2,this.root.style.marginTop=this.root.clientHeight*(t-1)/2,this.root.style.marginBottom=this.root.clientHeight*(t-1)/2)}SetAlpha(t){null!=this.root&&(this.alpha=t,this.root.style.opacity=this.alpha)}SetType(t){null!=this.root&&(null==this.sprite||this.sprite.classList.contains(t)||(this.sprite.classList.remove(this.type),this.sprite.classList.add(t),this.type=t))}SetFrame(t){if(null!=this.root&&null!=this.sprite&&this.frames>0){let e=t%this.frames*this.width,s=Math.floor(t/this.frames)*this.height;this.sprite.style.backgroundPosition=-e+" "+-s}}SetFrame2(t,e,s,i){if(null!=this.root&&null!=this.sprite&&null!=this.width&&null!=this.height){this.sprite.style.width=s,this.sprite.style.height=i,this.sprite.style.backgroundPosition=-t+" "+-e;let n=this.sprite.naturalWidth/s,h=this.sprite.naturalHeight/i;this.sprite.style.backgroundSize=n+" "+h}}SetAnime(t){null!=this.root&&(null==this.sprite||this.sprite.classList.contains(t)||(this.sprite.classList.remove(this.anime),this.sprite.classList.add(t),this.anime=t))}},d1ce.Input=class{constructor(t=null){this.dirs=[null,null],this.key_code=null,this.points=null,this.key_time=0,this.tap_time=0,this.flick_time=0,this.down_event=!1,this.up_event=!1,this.touches=null;let e=null!=t&&null!=t.root?t.root:document;document.addEventListener("keyup",t=>this.OnKeyUp(t)),document.addEventListener("keydown",t=>this.OnKeyDown(t)),e.addEventListener("mousedown",t=>this.OnMouseDown(t)),e.addEventListener("mousemove",t=>this.OnMouseMove(t)),document.addEventListener("mouseup",t=>this.OnMouseUp(t)),e.addEventListener("touchstart",t=>this.OnTouch(t),{passive:!1}),e.addEventListener("touchmove",t=>this.OnTouch(t),{passive:!1}),document.addEventListener("touchend",t=>this.OnTouch(t)),document.addEventListener("touchcancel",t=>this.OnTouch(t)),document.addEventListener("scroll",t=>this.OnScroll(t))}KeyCodeToDirs(t){return 39==t?d1ce.Dirs.right.Clone():38==t?d1ce.Dirs.up.Clone():37==t?d1ce.Dirs.left.Clone():40==t?d1ce.Dirs.down.Clone():new d1ce.Dirs}PointVecToDirs(t){const e=Math.PI/4,s=3*Math.PI/4;let i=Math.atan2(t.y,t.x);return-e<i&&i<=e?d1ce.Dirs.right.Clone():-s<i&&i<=-e?d1ce.Dirs.up.Clone():s<i||i<=-s?d1ce.Dirs.left.Clone():e<i&&i<=s?d1ce.Dirs.down.Clone():new d1ce.Dirs}async UpdateDirs(t=1e3,e=2500,s=.5){let i=Date.now();if(this.key_code<=0&&null==this.points)this.dirs[0]=null,this.key_time=i,this.tap_time=i,this.flick_time=i;else if(this.key_code>0)this.dirs[0]=this.KeyCodeToDirs(this.key_code),this.key_time<=i-t&&this.dirs[0].Add(d1ce.Dirs.far);else if(null!=this.points){let n=this.points[1].Clone().Sub(this.points[0]);e<=0||n.LenSq()>=e?(this.dirs[0]=this.PointVecToDirs(n),this.tap_time=i-t,(this.flick_time<=i-t||this.points[1].z-this.points[0].z>=s)&&(this.dirs[0].Add(d1ce.Dirs.far),this.flick_time=i-t)):(this.dirs[0]=new d1ce.Dirs,(this.tap_time<=i-t||this.points[1].z-this.points[0].z>=s)&&(this.dirs[0].Add(d1ce.Dirs.far),this.tap_time=i-t,this.flick_time=i-t))}this.down_event?(this.dirs[1]=null,this.down_event=!1):this.up_event?(this.dirs[1]=this.dirs[0],this.up_event=!1):null!=this.dirs[1]&&(this.dirs[0]=null,this.dirs[1]=null,this.key_code=null,this.points=null)}Dirs(t=!1){return null!=this.dirs[t?0:1]?this.dirs[t?0:1].Clone():null}Point(t=!1){return null!=this.points?this.points[t?0:1].Clone():null}SetDirs(t){this.dirs[0]=t,this.dirs[1]=t}OnKeyDown(t){(t=null!=t?t:window.event).preventDefault(),this.key_code=t.keyCode,this.down_event=!0}OnKeyUp(t){(t=null!=t?t:window.event).preventDefault(),this.key_code=t.keyCode,this.up_event=!0}UpdatePointOnDown(t){this.points=[t.Clone(),t.Clone()],this.down_event=!0}UpdatePointOnMove(t){null!=this.points&&(this.points[1]=t.Clone())}UpdatePointOnUp(t){null!=this.points&&(this.points[1]=t.Clone(),this.up_event=!0)}OnMouseDown(t){(t=null!=t?t:window.event).preventDefault();let e=new d1ce.Vec(t.pageX,t.pageY);this.UpdatePointOnDown(e)}OnMouseMove(t){(t=null!=t?t:window.event).preventDefault();let e=new d1ce.Vec(t.pageX,t.pageY);this.UpdatePointOnMove(e)}OnMouseUp(t){(t=null!=t?t:window.event).preventDefault();let e=new d1ce.Vec(t.pageX,t.pageY);this.UpdatePointOnUp(e)}OnTouch(t){if((t=null!=t?t:window.event).preventDefault(),null==this.touches&&t.touches.length>0){this.touches=[];let e=new d1ce.Vec;for(let s=0;s<t.touches.length;++s)this.touches.push(t.touches[s]),e.Add(new d1ce.Vec(t.touches[s].pageX,t.touches[s].pageY,t.touches[s].force));e.Div(t.touches.length),this.UpdatePointOnDown(e)}else{let e=[],s=new d1ce.Vec,i=0;for(let n=0;n<t.touches.length;++n){e.push(t.touches[n]);for(let e=0;e<this.touches.length;++e)t.touches[n].identifier==this.touches[e].identifier&&(s.x+=t.touches[n].pageX-this.touches[e].pageX,s.y+=t.touches[n].pageY-this.touches[e].pageY,s.z+=t.touches[n].force-this.touches[e].force,i+=1)}if(null!=this.points)if(i>0){let t=this.points[1].Add(s.Clone().Div(i));this.UpdatePointOnMove(t),this.touches=e}else{let t=this.points[1];this.UpdatePointOnUp(t),this.touches=null}}}OnScroll(t){(t=null!=t?t:window.event).preventDefault()}static Instance(){return null==this.instance&&(this.instance=new d1ce.Input),this.instance}};