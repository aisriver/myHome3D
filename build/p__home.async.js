(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[1],{"6ddB":function(t,e,i){t.exports=i.p+"static/tree-01.6a1e85f2.jpg"},"9lp8":function(t,e,i){t.exports=i.p+"static/\u4e94\u8054\u4e2d\u5802\u753b.16795bb8.jpg"},Dk45:function(t,e,i){t.exports={"canvas-gl":"canvas-gl___1AHbe",blocker:"blocker___2UPEp",instructions:"instructions___3IBsa",title:"title___3IJjE",info:"info___22BwA"}},ENPo:function(t,e,i){t.exports=i.p+"static/brick_bump.18cbaac6.jpg"},EXLO:function(t,e,i){t.exports=i.p+"static/soil.6290640f.png"},FCkD:function(t,e,i){"use strict";i.r(e);var o=i("p0pE"),n=i.n(o),s=i("gWZ8"),r=i.n(s),a=i("qIgq"),c=i.n(a),d=i("q1tI"),l=i.n(d),p=i("Womt"),h=i("sxfH"),u=i("7yBH"),f=function(t){if(!t)return{};function e(t){var e=t.scrollTop,i=t.parentElement;while(null!==i)e+=i.scrollTop,i=i.parentElement;return e}function i(t){var e=t.scrollLeft,i=t.parentElement;while(null!==i)e+=i.scrollLeft,i=i.parentElement;return e}var o={x:t.offsetLeft-i(t),y:t.offsetTop-e(t),width:t.clientWidth,height:t.clientHeight};return o},y=i("Dk45"),w=i.n(y),m=i("NK00"),x=function(){var t,e=1e-5,i=0,o=1,n=2,s=3;return t=function(t){this.matrix=new p["T"],this.create(t)},t.prototype.subtract=function(e){var i=this.tree.clone(),o=e.tree.clone();return i.invert(),i.clipTo(o),o.clipTo(i),o.invert(),o.clipTo(i),o.invert(),i.build(o.allPolygons()),i.invert(),i=new t(i),i.matrix=this.matrix,i},t.prototype.union=function(e){var i=this.tree.clone(),o=e.tree.clone();return i.clipTo(o),o.clipTo(i),o.invert(),o.clipTo(i),o.invert(),i.build(o.allPolygons()),i=new t(i),i.matrix=this.matrix,i},t.prototype.intersect=function(e){var i=this.tree.clone(),o=e.tree.clone();return i.invert(),o.clipTo(i),o.invert(),i.clipTo(o),o.clipTo(i),i.build(o.allPolygons()),i.invert(),i=new t(i),i.matrix=this.matrix,i},t.prototype.create=function(e){if(e instanceof p["z"])this.fromGeometry(e);else if(e instanceof p["j"])this.fromBufferGeometry(e);else{if(!(e instanceof p["U"])){if(e instanceof t.Node)return this.tree=e,this;throw new Error("ThreeBSP: is unable to create a BSP for the given input")}this.fromMesh(e)}},t.prototype.fromMesh=function(t){var e=t.geometry;t.updateMatrix(),this.matrix=t.matrix.clone(),this.create(e)},t.prototype.toGeometry=function(){var t,e,i,o,n,s,r,a,c,d,l=(new p["T"]).getInverse(this.matrix),h=new p["z"],u=this.tree.allPolygons(),f=u.length,y={};for(t=0;t<f;t++)for(i=u[t],o=i.vertices.length,e=2;e<o;e++)d=[],a=i.vertices[0],d.push(new p["Fb"](a.uv.x,a.uv.y)),a=new p["Gb"](a.x,a.y,a.z),a.applyMatrix4(l),"undefined"!==typeof y[a.x+","+a.y+","+a.z]?n=y[a.x+","+a.y+","+a.z]:(h.vertices.push(a),n=y[a.x+","+a.y+","+a.z]=h.vertices.length-1),a=i.vertices[e-1],d.push(new p["Fb"](a.uv.x,a.uv.y)),a=new p["Gb"](a.x,a.y,a.z),a.applyMatrix4(l),"undefined"!==typeof y[a.x+","+a.y+","+a.z]?s=y[a.x+","+a.y+","+a.z]:(h.vertices.push(a),s=y[a.x+","+a.y+","+a.z]=h.vertices.length-1),a=i.vertices[e],d.push(new p["Fb"](a.uv.x,a.uv.y)),a=new p["Gb"](a.x,a.y,a.z),a.applyMatrix4(l),"undefined"!==typeof y[a.x+","+a.y+","+a.z]?r=y[a.x+","+a.y+","+a.z]:(h.vertices.push(a),r=y[a.x+","+a.y+","+a.z]=h.vertices.length-1),c=new p["u"](n,s,r,new p["Gb"](i.normal.x,i.normal.y,i.normal.z)),h.faces.push(c),h.faceVertexUvs[0].push(d);return h},t.prototype.toBufferGeometry=function(){var t,e,i,o,n,s,r,a,c=(new p["T"]).getInverse(this.matrix),d=new p["j"],l=[],h=[],u=[],f=[],y=[],w=this.tree.allPolygons(),m=w.length,x={},v=0;for(t=0;t<m;t++)for(i=w[t],o=i.vertices.length,e=2;e<o;e++)[],a=i.vertices[0],a.clone().applyMatrix4(c),y.push(a.uv.x,a.uv.y),"undefined"!==typeof x[a.x+","+a.y+","+a.z]?n=x[a.x+","+a.y+","+a.z]:(h.push(a.x,a.y,a.z),n=v,f.push(i.normal.x,i.normal.y,i.normal.z),v++),a=i.vertices[e-1],a.clone().applyMatrix4(c),y.push(a.uv.x,a.uv.y),"undefined"!==typeof x[a.x+","+a.y+","+a.z]?s=x[a.x+","+a.y+","+a.z]:(h.push(a.x,a.y,a.z),s=v,f.push(i.normal.x,i.normal.y,i.normal.z),v++),a=i.vertices[e],a.clone().applyMatrix4(c),y.push(a.uv.x,a.uv.y),"undefined"!==typeof x[a.x+","+a.y+","+a.z]?r=x[a.x+","+a.y+","+a.z]:(h.push(a.x,a.y,a.z),r=v,f.push(i.normal.x,i.normal.y,i.normal.z),v++),l.push(n,s,r);return d.addAttribute("uv",new p["i"](new Float32Array(y),2)),d.addAttribute("position",new p["i"](new Float32Array(h),3)),d.addAttribute("normal",new p["i"](new Float32Array(f),3)),d.addAttribute("color",new p["i"](new Float32Array(u),3)),d.setIndex(new p["i"](new Uint32Array(l),1)),d},t.prototype.toMesh=function(t){var e=this.toGeometry(),i=new p["U"](e,t);return i.position.setFromMatrixPosition(this.matrix),i.rotation.setFromRotationMatrix(this.matrix),i},t.prototype.fromGeometry=function(e){var i,o,n,s,r,a,c,d=[];for(i=0,o=e.faces.length;i<o;i++)n=e.faces[i],r=e.faceVertexUvs[0][i],c=new t.Polygon,s=e.vertices[n.a],a=r?new p["Fb"](r[0].x,r[0].y):null,s=new t.Vertex(s.x,s.y,s.z,n.vertexNormals[0],a),s.applyMatrix4(this.matrix),c.vertices.push(s),s=e.vertices[n.b],a=r?new p["Fb"](r[1].x,r[1].y):null,s=new t.Vertex(s.x,s.y,s.z,n.vertexNormals[1],a),s.applyMatrix4(this.matrix),c.vertices.push(s),s=e.vertices[n.c],a=r?new p["Fb"](r[2].x,r[2].y):null,s=new t.Vertex(s.x,s.y,s.z,n.vertexNormals[2],a),s.applyMatrix4(this.matrix),c.vertices.push(s),c.calculateProperties(),d.push(c);this.tree=new t.Node(d)},t.prototype.fromIndexedBufferGeometry=function(e){var i,o,n,s,r,a=e.index.array,c=e.attributes.position.array,d=[];for(i=0,o=a.length;i<o;i+=3)r=new t.Polygon,n=a[i],s=new t.Vertex(c[3*n],c[3*n+1],c[3*n+2]),s.applyMatrix4(this.matrix),r.vertices.push(s),n=a[i+1],s=new t.Vertex(c[3*n],c[3*n+1],c[3*n+2]),s.applyMatrix4(this.matrix),r.vertices.push(s),n=a[i+2],s=new t.Vertex(c[3*n],c[3*n+1],c[3*n+2]),s.applyMatrix4(this.matrix),r.vertices.push(s),r.calculateProperties(),d.push(r);this.tree=new t.Node(d)},t.prototype.fromNonIndexedBufferGeometry=function(e){var i,o,n,s,r=e.attributes.position.array,a=[];for(i=0,o=r.length;i<o;i+=9)s=new t.Polygon,n=new t.Vertex(r[i],r[i+1],r[i+2]),n.applyMatrix4(this.matrix),s.vertices.push(n),n=new t.Vertex(r[i+3],r[i+4],r[i+5]),n.applyMatrix4(this.matrix),s.vertices.push(n),n=new t.Vertex(r[i+6],r[i+7],r[i+8]),n.applyMatrix4(this.matrix),s.vertices.push(n),s.calculateProperties(),a.push(s);this.tree=new t.Node(a)},t.prototype.fromBufferGeometry=function(t){null===t.index?this.fromNonIndexedBufferGeometry(t):this.fromIndexedBufferGeometry(t)},t.Polygon=function(t,e,i){t instanceof Array||(t=[]),this.vertices=t,t.length>0?this.calculateProperties():this.normal=this.w=void 0},t.Polygon.prototype.calculateProperties=function(){var t=this.vertices[0],e=this.vertices[1],i=this.vertices[2];return this.normal=e.clone().subtract(t).cross(i.clone().subtract(t)).normalize(),this.w=this.normal.clone().dot(t),this},t.Polygon.prototype.clone=function(){var e,i,o=new t.Polygon;for(e=0,i=this.vertices.length;e<i;e++)o.vertices.push(this.vertices[e].clone());return o.calculateProperties(),o},t.Polygon.prototype.flip=function(){var t,e=[];for(this.normal.multiplyScalar(-1),this.w*=-1,t=this.vertices.length-1;t>=0;t--)e.push(this.vertices[t]);return this.vertices=e,this},t.Polygon.prototype.classifyVertex=function(t){var s=this.normal.dot(t)-this.w;return s<-e?n:s>e?o:i},t.Polygon.prototype.classifySide=function(t){var e,r,a,c=0,d=0,l=t.vertices.length;for(e=0;e<l;e++)r=t.vertices[e],a=this.classifyVertex(r),a===o?c++:a===n&&d++;return c>0&&0===d?o:0===c&&d>0?n:0===c&&0===d?i:s},t.Polygon.prototype.splitPolygon=function(e,r,a,c,d){var l=this.classifySide(e);if(l===i)(this.normal.dot(e.normal)>0?r:a).push(e);else if(l===o)c.push(e);else if(l===n)d.push(e);else{var p,h,u,f,y,w,m,x,v,g=[],b=[];for(h=0,p=e.vertices.length;h<p;h++)u=(h+1)%p,w=e.vertices[h],m=e.vertices[u],f=this.classifyVertex(w),y=this.classifyVertex(m),+f!==n&&g.push(w),+f!==o&&b.push(w),(f|y)===s&&(x=(this.w-this.normal.dot(w))/this.normal.dot(m.clone().subtract(w)),v=w.interpolate(m,x),g.push(v),b.push(v));g.length>=3&&c.push(new t.Polygon(g).calculateProperties()),b.length>=3&&d.push(new t.Polygon(b).calculateProperties())}},t.Vertex=function(t,e,i,o,n){this.x=t,this.y=e,this.z=i,this.normal=o||new p["Gb"],this.uv=n||new p["Fb"]},t.Vertex.prototype.clone=function(){return new t.Vertex(this.x,this.y,this.z,this.normal.clone(),this.uv.clone())},t.Vertex.prototype.add=function(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this},t.Vertex.prototype.subtract=function(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this},t.Vertex.prototype.multiplyScalar=function(t){return this.x*=t,this.y*=t,this.z*=t,this},t.Vertex.prototype.cross=function(t){var e=this.x,i=this.y,o=this.z;return this.x=i*t.z-o*t.y,this.y=o*t.x-e*t.z,this.z=e*t.y-i*t.x,this},t.Vertex.prototype.normalize=function(){var t=Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z);return this.x/=t,this.y/=t,this.z/=t,this},t.Vertex.prototype.dot=function(t){return this.x*t.x+this.y*t.y+this.z*t.z},t.Vertex.prototype.lerp=function(t,e){return this.add(t.clone().subtract(this).multiplyScalar(e)),this.normal.add(t.normal.clone().sub(this.normal).multiplyScalar(e)),this.uv.add(t.uv.clone().sub(this.uv).multiplyScalar(e)),this},t.Vertex.prototype.interpolate=function(t,e){return this.clone().lerp(t,e)},t.Vertex.prototype.applyMatrix4=function(t){var e=this.x,i=this.y,o=this.z,n=t.elements;return this.x=n[0]*e+n[4]*i+n[8]*o+n[12],this.y=n[1]*e+n[5]*i+n[9]*o+n[13],this.z=n[2]*e+n[6]*i+n[10]*o+n[14],this},t.Node=function(e){var i,o,n=[],s=[];if(this.polygons=[],this.front=this.back=void 0,e instanceof Array&&0!==e.length){for(this.divider=e[0].clone(),i=0,o=e.length;i<o;i++)this.divider.splitPolygon(e[i],this.polygons,this.polygons,n,s);n.length>0&&(this.front=new t.Node(n)),s.length>0&&(this.back=new t.Node(s))}},t.Node.isConvex=function(t){var e,i;for(e=0;e<t.length;e++)for(i=0;i<t.length;i++)if(e!==i&&t[e].classifySide(t[i])!==n)return!1;return!0},t.Node.prototype.build=function(e){var i,o,n=[],s=[];for(this.divider||(this.divider=e[0].clone()),i=0,o=e.length;i<o;i++)this.divider.splitPolygon(e[i],this.polygons,this.polygons,n,s);n.length>0&&(this.front||(this.front=new t.Node),this.front.build(n)),s.length>0&&(this.back||(this.back=new t.Node),this.back.build(s))},t.Node.prototype.allPolygons=function(){var t=this.polygons.slice();return this.front&&(t=t.concat(this.front.allPolygons())),this.back&&(t=t.concat(this.back.allPolygons())),t},t.Node.prototype.clone=function(){var e=new t.Node;return e.divider=this.divider.clone(),e.polygons=this.polygons.map((function(t){return t.clone()})),e.front=this.front&&this.front.clone(),e.back=this.back&&this.back.clone(),e},t.Node.prototype.invert=function(){var t,e,i;for(t=0,e=this.polygons.length;t<e;t++)this.polygons[t].flip();return this.divider.flip(),this.front&&this.front.invert(),this.back&&this.back.invert(),i=this.front,this.front=this.back,this.back=i,this},t.Node.prototype.clipPolygons=function(t){var e,i,o,n;if(!this.divider)return t.slice();for(o=[],n=[],e=0,i=t.length;e<i;e++)this.divider.splitPolygon(t[e],o,n,o,n);return this.front&&(o=this.front.clipPolygons(o)),n=this.back?this.back.clipPolygons(n):[],o.concat(n)},t.Node.prototype.clipTo=function(t){this.polygons=t.clipPolygons(this.polygons),this.front&&this.front.clipTo(t),this.back&&this.back.clipTo(t)},t}(),v=x,g=i("DKVj"),b={size:{x:10,y:10,z:10}},z=16777215*Math.random(),P=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:b,e=t.size,i=t.color,o=t.material,n=t.position,s=e.x,r=e.y,a=e.z,c=new p["g"](s,r,a),d=new p["U"](c,o||new p["W"]({color:i||z}));return n?d.position.set(n.x+s/2,n.y+r/2,n.z+a/2):d.position.set(0,0,0),d},k=new p["Ab"],N=k.load(i("6ddB")),M=function(t){var e=t.startPosition,i=t.endPosition,o=t.startWidth,n=void 0===o?.2:o,s=t.endWidth,r=void 0===s?.6:s,a=new p["Gb"](e.x,e.y,e.z),c=new p["Gb"](i.x,i.y,i.z),d=(new p["Gb"]).subVectors(c,a),l=d.clone(),h=new p["d"](l.normalize(),a),u=new p["o"](n,r,d.length(),6,4),f=new p["W"]({map:N}),y=new p["U"](u,f);y.rotation.copy(h.rotation);var w=(new p["Gb"]).addVectors(a,d.multiplyScalar(.5));return y.position.set(w.x,w.y,w.z),y},I=function(t){var e=t.width,i=t.height,o=t.position,n=void 0===o?{x:0,y:.001,z:0}:o,s=t.scale,r=void 0===s?{x:1,y:1,z:1}:s,a=t.color,c=void 0===a?16777215*Math.random():a,d=t.img,l=t.repeatU,h=void 0===l?1:l,u=t.repeatV,f=void 0===u?1:u,y=t.material,w={color:c};if(d){var m=k.load(d);m.wrapS=p["qb"],m.wrapT=p["qb"],m.repeat.set(h,f),w={map:m}}var x=new p["U"](new p["g"](e,i,.4),y||new p["W"](w));return x.rotation.x=-Math.PI/2,x.position.set(n.x+e/2,n.y-.2,n.z+i/2),x.scale.set(r.x,r.y,r.z),x.castShadow=!0,x.receiveShadow=!0,x},_=function(t){var e=t.u,i=void 0===e?2:e,o=t.v,n=void 0===o?2:o,s=t.mapTexture.clone(),r=t.bumpMapTexture.clone();s.needsUpdate=!0,r.needsUpdate=!0,s.wrapS=p["qb"],s.wrapT=p["qb"],s.repeat.set(i,n),r.wrapS=p["qb"],r.wrapT=p["qb"],r.repeat.set(i,n);var a=new p["Y"]({map:s,bumpMap:r,bumpScale:.3,reflectivity:.2});return a.roughness=1,a.roughness=.6,a},j=new p["W"]({color:14540253}),T=function(t){var e=t.width,i=t.height,o=t.depth,n=void 0===o?.2:o,s=t.position,r=void 0===s?{x:0,y:0,z:0}:s,a=t.insideIndex,c=void 0===a?[]:a,d=t.withRoot,l=void 0===d||d,h=t.mapTexture,u=t.bumpMapTexture,f=t.bspConfig,y=!(e<1),w=.4,m=function(t,e,i){return{x:r.x+t/2,y:r.y+e/2,z:r.z+i/2}},x=new p["g"](e,i,n),v=[],g=[],b=new p["W"]({color:5461330});x.groups.forEach((function(t,o){var s=[2,3].includes(o),r=function(t){return _(y?{u:[0,1].includes(o)?n/2:e/2,v:s?n/2:t/2,mapTexture:h,bumpMapTexture:u}:{u:[2,3,4,5].includes(o)?e/2:n/2,v:s?n/2:t/2,mapTexture:h,bumpMapTexture:u})};c.includes(o)?(v.push(j),g.push(b)):(v.push(r(i)),s?g.push(b):g.push(r(w)))}));var z=new p["U"](x,v);z.castShadow=!0,z.receiveShadow=!0;var P=m(e,i,n);z.position.set(P.x,P.y,P.z);var k=new p["B"];if(k.add(f?E(z,[f]):z),l){var N=m(e,w,n),M=new p["g"](e,w,n),I=new p["U"](M,g);I.position.set(N.x,N.y,N.z),I.scale.set(y?1.02:1.5,1,y?1.5:1),k.add(f?E(I,[f]):I)}return k},E=function(t,e,i){var o=new p["V"]({opacity:0,wireframeLinewidth:.5});o.wireframe=!0,o.wireframe=!0;var n=new v(B(t)),s=n;e.forEach((function(t){var e=t.geometry,i=t.position,n=t.rotateX,r=t.rotateY,a=t.rotateZ,c=new p["U"](e,o);c.position.set(i.x,i.y,i.z),n&&c.rotateX(n),r&&c.rotateY(r),a&&c.rotateZ(a);var d=new v(c);s=s["subtract"](d)}));var r=s["toMesh"](i);return r.castShadow=!0,r.receiveShadow=!0,r.material=i||t.material,r.geometry.computeFaceNormals(),r.geometry.computeVertexNormals(),r},B=function(t){if(/BufferGeometry/.test(t.geometry.type)){var e=new p["z"];e.fromBufferGeometry(t.geometry),t.geometry=e}return t},F=function(t){var e=t.tips,i=t.loaded,o=t.total,n=t.type,s=document.getElementById("loadingTips");if(s&&document.body.removeChild(s),!document.getElementById("loadingMask")){var r=document.createElement("div");r.setAttribute("id","loadingMask");var a={position:"fixed",width:"100%",height:"100%",top:0,left:0,background:"rgba(0,0,0,0.5)"};document.getElementById("root").style.filter="blur(1px)",Object.keys(a).forEach((function(t){r.style[t]=a[t]})),document.body.appendChild(r)}var c=document.createElement("div");c.setAttribute("id","loadingTips");var d={position:"fixed",width:"400px",bottom:"50px",left:"50px",background:"rgba(0,0,0,0.2)",padding:"20px",color:"#fff"};Object.keys(d).forEach((function(t){c.style[t]=d[t]})),c.innerHTML='\n  <div style="width: 100%;">\n    <div style="font-size: 14px; font-weight: 500; margin-bottom: 16px; overflow-x: hidden;">'.concat(e,'</div>\n    <div style="width: 100%; height: 20px; background: rgba(255,255,255,0.3); margin-bottom: 16px;"><div style="width: ').concat(i/o*100,'%; height: 100%; background: rgba(255,255,255,0.7);"></div></div>\n  </div>\n  '),document.body.appendChild(c),["endWithSuccess","endWithError"].includes(n)&&setTimeout((function(){var t=document.getElementById("loadingTips"),e=document.getElementById("loadingMask");t&&document.body.removeChild(t),e&&document.body.removeChild(e),document.getElementById("root").style.filter=""}),500)},S=new p["Q"];S.onStart=function(t,e,i){F({tips:"Started loading file: "+t+".\nLoaded "+e+" of "+i+" files.",loaded:e,total:i,type:"start"})},S.onLoad=function(){F({tips:"Loading complete!",type:"endWithSuccess"})},S.onProgress=function(t,e,i){F({tips:"Loading file: "+t+".\nLoaded "+e+" of "+i+" files.",loaded:e,total:i,type:"start"})},S.onError=function(t){F({tips:"There was an error loading "+t,type:"endWithError"})};var R=new m["a"](S),O=new g["a"];O.setDecoderPath("/myHome3D/build/draco/gltf/"),O.setDecoderConfig({type:"js"}),O.preload(),R.setDRACOLoader(O);var V,A,W,G,C,D,U,Y=function(t,e){R.load(t,(function(t){return e(t)}))},q=function(t){var e=t.width,i=t.height,o=t.insideIndex,n=t.withRoot,s=void 0!==n&&n,r=t.windowWidth,a=void 0===r?1:r,c=t.windowHeight,d=void 0===c?1:c,l=t.offsetX,h=t.offsetY,u=t.mapTexture,f=t.bumpMapTexture,y=t.windowGroup,w=new p["B"];l=void 0===l?(e-a)/2:l,h=void 0===h?(i-d)/2:h;var m=T({width:a,height:h,depth:.2,position:{x:l,y:0,z:0},insideIndex:o,withRoot:s,mapTexture:u,bumpMapTexture:f}),x=T({width:a,height:i-d-h,depth:.2,position:{x:l,y:h+d,z:0},insideIndex:o,withRoot:!1,mapTexture:u,bumpMapTexture:f}),v=T({width:l,height:i,depth:.2,position:{x:0,y:0,z:0},insideIndex:o,withRoot:s,mapTexture:u,bumpMapTexture:f}),g=T({width:e-l-a,height:i,depth:.2,position:{x:l+a,y:0,z:0},insideIndex:o,withRoot:s,mapTexture:u,bumpMapTexture:f});if(y){var b=y.clone();b.position.set(l+a/2-.01,h+d/2,.13),w.add(b)}return w.add(x,v,g),h>0&&w.add(m),w},L=(new p["x"],function(t,e){Object.keys(e).forEach((function(i){t[i]=e[i]}))}),H=function(t,e){L(t,e);var i=function t(i){i.length>0&&i.forEach((function(i){L(i,e),t(i.children)}))};i(t.children)},Z=i("2Taf"),X=i.n(Z),J=i("vZ4D"),K=i.n(J),Q=function(){function t(){X()(this,t),this._timerIdMap={timeout:{},interval:{}}}return K()(t,[{key:"run",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"interval",i=arguments.length>1?arguments[1]:void 0,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:16.7,n=Date.now,s=n(),r=s,a=Symbol(),c=function c(){t.setIdMap(a,e,c),r=n(),r-s>=o&&("interval"===e&&(s=n(),r=s),i(),"timeout"===e&&t.clearTimeout(a))};return this.setIdMap(a,e,c),a}},{key:"setIdMap",value:function(t,e,i){var o=requestAnimationFrame(i);this._timerIdMap[e][t]=o}},{key:"setTimeout",value:function(t,e){return this.run("timeout",t,e)}},{key:"clearTimeout",value:function(t){cancelAnimationFrame(this._timerIdMap.timeout[t])}},{key:"setInterval",value:function(t,e){return this.run("interval",t,e)}},{key:"clearInterval",value:function(t){cancelAnimationFrame(this._timerIdMap.interval[t])}}]),t}(),$=function(t,e){return{x:t.x+e.x/2,y:t.y+e.y/2,z:t.z+e.z/2}},tt=I({width:5,height:5,img:i("R6yP")}),et=new p["W"]({map:(new p["Ab"]).load(i("R6yP"))}),it=function(t,e){var o=new p["B"],n=tt.clone();Y("gltf/object/mainDesk/sceneDraco.gltf",e((function(t){var e=t.scene,i=(new p["f"]).setFromObject(e),n=i.max;if(!isNaN(n.y)){var s=.5,r=s/n.y;e.rotateY(Math.PI/2),e.scale.set(r,r,r),e.position.set(0,0,0);var a=e.clone();a.scale.set(-r,r,r),a.position.set(0,0,.57);var c=new p["B"];c.add(e,a),c.position.set(.8,.45,2.5),o.add(c)}}))),Y("gltf/object/squareTable/scene.gltf",e((function(t){var e=t.scene,i=(new p["f"]).setFromObject(e),n=i.max;if(!isNaN(n.y)){var s=1,r=s/n.y;e.rotateY(Math.PI/2),e.scale.set(r,r,r),e.position.set(.8,0,4.5),o.add(e)}})));var s=new p["W"]({map:(new p["Ab"]).load(i("9lp8"))}),r=P({size:{x:.1,y:2.14,z:3},material:s});r.position.set(.2,1.7,2.6),r.castShadow=!0,r.receiveShadow=!0,o.add(n,r),o.position.set(0,.002,5),t.add(o)},ot=function(t,e){var i=new p["B"],o=tt.clone();Y("gltf/object/bed1/scene.gltf",e((function(t){var e=t.scene,o=(new p["f"]).setFromObject(e),n=o.max;if(!isNaN(n.y)){var s=1.5,r=s/n.y;e.rotateY(-Math.PI/2),e.scale.set(r,r,r),e.position.set(4,0,.6),i.add(e)}}))),Y("gltf/object/wardrobe/sceneDraco.gltf",e((function(t){var e=t.scene,o=(new p["f"]).setFromObject(e),n=o.max;if(!isNaN(n.y)){var s=1,r=s/n.y;e.scale.set(r,r,r),e.position.set(4.3,1,.6),i.add(e)}}))),Y("gltf/object/tvCabinet/scene.gltf",e((function(t){var e=t.scene,o=(new p["f"]).setFromObject(e),n=o.max;if(!isNaN(n.y)){var s=.5,r=s/n.y;e.rotateY(Math.PI),e.scale.set(r,r,r),e.position.set(3,.5,.6),i.add(e)}}))),Y("gltf/object/tv/scene.gltf",e((function(t){var e=t.scene,o=(new p["f"]).setFromObject(e),n=o.max;if(!isNaN(n.y)){var s=.6,r=s/n.y;e.scale.set(r,r,r),e.position.set(3,1,.6),i.add(e)}}))),Y("gltf/object/bed2/scene.gltf",e((function(t){var e=t.scene,o=(new p["f"]).setFromObject(e),n=o.max;if(!isNaN(n.y)){var s=1,r=s/n.y;e.rotateY(Math.PI/2),e.scale.set(r,r,r),e.position.set(4.95,0,4.8),i.add(e)}}))),i.add(o),i.position.set(0,.002,0),t.add(i)},nt=function(t,e,o){var n=new p["B"],s=I({width:4,height:5,img:i("EXLO")}),a=et.clone(),c=new p["B"],d=P({size:{x:.2,y:.3,z:2.2},material:a,position:{x:2,y:0,z:2.6}}),l=P({size:{x:2.2,y:1.2,z:1.4},material:a,position:{x:0,y:0,z:1.2}}),h=P({size:{x:1,y:1.2,z:1.2},material:a,position:{x:0,y:0,z:0}}),u=P({size:{x:.4,y:2.4,z:.4},material:a,position:{x:0,y:1.2,z:0}}),f=new p["W"]({map:(new p["Ab"]).load(i("UCZR"))}),y=new p["xb"](.8,32,32),w=new p["U"](y,f);w.position.set(.6,1.9,1.9);var m=E(w,[{geometry:new p["h"](1.6,1.6,1.6),position:{x:.6,y:2.05,z:1.1+.8}},{geometry:y,position:{x:.6,y:1.92,z:1.9}}]),x=[{size:{x:2.2,y:.6,z:.2},position:{x:0,y:.5,z:2.45}},{size:{x:.3,y:.4,z:2},position:{x:.45,y:.5,z:1}},{size:{x:.3,y:.4,z:1.6},position:{x:1.45,y:.5,z:1.4}},{size:{x:1.8,y:.68,z:.9},position:{x:.2,y:.5,z:1.4}},{size:{x:1.8,y:.3,z:1},position:{x:.2,y:.1,z:1.4}},{size:{x:.5,y:.35,z:.3},position:{x:1.8,y:.05,z:1.75}}],v=new p["xb"](.8,32,32),g=E(l,[].concat(r()(x.map((function(t){return{geometry:new p["h"](t.size.x,t.size.y,t.size.z),position:$(t.position,t.size)}}))),[{geometry:v,position:{x:.2+.4,y:1.9,z:1.9}},{geometry:v,position:{x:1.6,y:1.9,z:1.9}}])),b=[{size:{x:.96,y:1.16,z:1.3},position:{x:.02,y:.02,z:.02}}],z=E(h,[].concat(r()(b.map((function(t){return{geometry:new p["h"](t.size.x,t.size.y,t.size.z),position:$(t.position,t.size)}}))),[{geometry:v,position:{x:.5,y:1.94,z:.75}}]));Y("gltf/object/oldTable/scene.gltf",e((function(t){var e=t.scene,i=(new p["f"]).setFromObject(e),o=i.max;if(!isNaN(o.y)){var n=.8,s=n/o.y;e.scale.set(s-.004,s,s),e.position.set(3.6,0,1.6),c.add(e)}}))),Y("gltf/object/bucket/scene.gltf",e((function(t){var e=t.scene,i=(new p["f"]).setFromObject(e),o=i.max;if(!isNaN(o.y)){var n=.8,s=n/o.y;e.scale.set(s,s,s),e.position.set(3.4,0,3.4),c.add(e)}}))),Y("gltf/object/gasTank/scene.gltf",e((function(t){var e=t.scene,i=(new p["f"]).setFromObject(e),o=i.max;if(!isNaN(o.y)){var n=.7,s=n/o.y;e.scale.set(s,s,s),e.position.set(3.4,0,.4),c.add(e)}}))),Y("gltf/object/doorWood/scene.gltf",e((function(t){var e=t.scene,i=(new p["f"]).setFromObject(e),n=i.max;if(!isNaN(n.y)){var s=2,r=s/n.y;e.scale.set(1.1*-r,r,r),e.position.set(3,0,5);var a=e.clone();a.scale.set(1.1*r,r,r),a.position.set(4.6,0,5);var d=new p["c"](e),l=new p["c"](a);t.animations.forEach((function(t){d.clipAction(t).setDuration(6).play(),l.clipAction(t).setDuration(6).play()})),o.push(d,l),c.add(e,a)}})));var k=m.clone(),N=m.clone();k.position.set(1.6,1.9,1.9),N.position.set(.5,1.73,.76),N.scale.set(.75,.75,.75),c.add(d,g,z,u,m,k,N),c.position.set(.1,0,.2),n.add(s,c),n.position.set(6.5,.002,0),t.add(n)},st=function(t,e){var o=new p["B"],n=I({width:4,height:5,color:7369072,img:i("R6yP")});Y("gltf/object/southBed/sceneDraco.gltf",e((function(t){var e=t.scene,i=(new p["f"]).setFromObject(e),n=i.max;if(!isNaN(n.y)){var s=.7,r=s/n.y;e.rotateY(-Math.PI),e.scale.set(r,r,r),e.position.set(2.42,.68,1.2),o.add(e)}}))),o.add(n),o.position.set(10.5,.002,0),t.add(o)},rt=function(t,e){var i=new p["B"],o={startWidth:.15,endWidth:.15},s={startWidth:.1,endWidth:.1},r={startWidth:.06,endWidth:.06},a={startWidth:.04,endWidth:.04},c=3,d=2,l=c+d,h=new p["B"];[n()({},o,{startPosition:{x:0,y:c,z:0},endPosition:{x:2.6,y:l,z:0}}),n()({},o,{startPosition:{x:5,y:c,z:0},endPosition:{x:2.4,y:l,z:0}}),n()({},s,{startPosition:{x:1.1,y:l-1.2,z:0},endPosition:{x:3.9,y:l-1.2,z:0}}),n()({},r,{startPosition:{x:2.5,y:l,z:0},endPosition:{x:2.5,y:l-1.2,z:0}}),n()({},a,{startPosition:{x:1.9,y:l-.5,z:0},endPosition:{x:1.9,y:l-1.2,z:0}}),n()({},a,{startPosition:{x:1.9,y:l-.5,z:0},endPosition:{x:2.5,y:l-1.2,z:0}}),n()({},a,{startPosition:{x:3.1,y:l-.5,z:0},endPosition:{x:3.1,y:l-1.2,z:0}}),n()({},a,{startPosition:{x:3.1,y:l-.5,z:0},endPosition:{x:2.5,y:l-1.2,z:0}})].forEach((function(t){h.add(M(t))}));var u=h.clone(),f=h.clone(),y=h.clone();h.position.set(0,0,.2),u.position.set(0,0,5),f.position.set(0,0,10),y.position.set(0,0,14.8);var w=M(n()({},s,{startPosition:{x:2.5,y:l,z:.2},endPosition:{x:2.5,y:l,z:14.8}}));i.add(h,u,f,y,w);var m=new p["B"];Y("gltf/object/tileRoof/scene.gltf",e((function(t){var e=t.scene,i=(new p["f"]).setFromObject(e),o=i.max;if(!isNaN(o.y)){var n=.05,s=n/o.y;e.scale.set(1.1*s,1.3*s,1.8*s),e.rotateZ(Math.PI/4.65),e.position.set(1.1,4.1,2.5);var r=e.clone();r.rotateZ(-Math.PI/4.65*2),r.position.set(4,4.1,2.5);var a=new p["B"];a.add(e,r);var c=a.clone(),d=a.clone();c.position.set(0,0,5),d.position.set(0,0,10),m.add(a,c,d)}}))),t.add(i,m)},at=function(t,e){var o=new p["B"],s=3,a=2.5,c=1.8,d=2,l=new p["B"];Y("gltf/object/windowFrame/scene.gltf",e((function(t){var e=t.scene,i=(new p["f"]).setFromObject(e),o=i.max;if(!isNaN(o.y)){var n=1,s=n/o.y;e.rotateY(Math.PI/2),e.scale.set(s,s/1.9,s),l.add(e)}}))),Y("gltf/object/fence/scene.gltf",e((function(t){var e=t.scene,i=(new p["f"]).setFromObject(e),o=i.max;if(!isNaN(o.y)){var n=.5,s=n/o.y;e.scale.set(s,s,s),l.add(e)}}))),(new p["Ab"]).load(i("UXH7"),(function(e){(new p["Ab"]).load(i("ENPo"),(function(i){var h={mapTexture:e,bumpMapTexture:i},u=T(n()({width:5,height:s,insideIndex:[4]},h)),f=gt.clone(),y=P({size:{x:5.2,y:2.5,z:.2},material:f});y.position.set(2.6,s+1.25,.1);var w=[{size:{x:8,y:8,z:.2},position:{x:1.4,y:s+1,z:0},rotateZ:Math.PI/3.5},{size:{x:8,y:8,z:.2},position:{x:-4.4,y:s+1,z:0},rotateZ:-Math.PI/3.5}],m=E(y,r()(w.map((function(t){return n()({},t,{geometry:new p["h"](t.size.x,t.size.y,t.size.z),position:$(t.position,t.size)})}))));m.material=_({u:2.5,v:1.25,mapTexture:e,bumpMapTexture:i});var x=new p["B"];m.scale.set(1,1,.5);var v=m.clone();v.position.set(2.6,4.2,.15),v.material=j,x.add(m,v);var g=T(n()({width:5.5,height:a,position:{x:5,y:0,z:0},insideIndex:[4],withRoot:!1},h)),b=T(n()({width:4,height:a,position:{x:10.5,y:0,z:0},insideIndex:[4],withRoot:!1},h)),z=new p["B"],k=q(n()({width:2.5,height:a,insideIndex:[5],withRoot:!1,windowGroup:l},h));k.position.set(0,0,0);var N=q(n()({width:1.8,height:a,insideIndex:[5],withRoot:!1,windowWidth:1,windowHeight:2,offsetX:.25,offsetY:0},h));N.position.set(2.5,0,0),z.add(k,N),z.position.set(6.4,0,5);var M=z.clone();M.scale.set(-1,1,1),M.position.set(14.5,0,5);var I=T(n()({width:.2,height:s+.2,depth:5,insideIndex:[0]},h)),B=I,F=I.clone();F.position.set(0,0,5);var S=I.clone();S.position.set(0,0,10);var R=T(n()({width:5,height:s,position:{x:0,y:0,z:15},insideIndex:[5]},h)),O=T(n()({width:9.5,height:d,position:{x:5,y:0,z:15},withRoot:!1},h)),V=x.clone();V.scale.set(1,1,-1),V.position.set(0,0,15.2);var A=q(n()({width:5,height:a,insideIndex:[5],withRoot:!1,windowGroup:l},h));A.rotateY(Math.PI/2),A.position.set(14.3,0,5);var W=T(n()({width:.2,height:a,depth:5,position:{x:6.4,y:0,z:0},insideIndex:[0],withRoot:!1},h)),G=T(n()({width:.2,height:a,depth:5,position:{x:10.5,y:0,z:0},insideIndex:[0,1],withRoot:!1},h)),C=T(n()({width:.2,height:d,depth:.5,position:{x:14.3,y:0,z:5},withRoot:!1,bspConfig:{geometry:new p["h"](.3,.2,.2),position:{x:14.4,y:.1,z:5.25}}},h)),D=T(n()({width:.2,height:d,depth:5.5,position:{x:14.3,y:0,z:9.5},withRoot:!1},h)),U=q(n()({width:5.2,height:s,insideIndex:[5],withRoot:!0,windowGroup:l},h));U.rotateY(Math.PI/2),U.position.set(5,0,5.2);var Y=U.clone();Y.position.set(5,0,15.2);var L=q(n()({width:5.2,height:s,insideIndex:[5],withRoot:!0,windowWidth:2,windowHeight:2,offsetX:1.5,offsetY:0},h));L.rotateY(Math.PI/2),L.position.set(5,0,10);var H=T(n()({width:3,height:s,position:{x:0,y:0,z:5},insideIndex:[0,4,5]},h)),Z=T(n()({width:1,height:s,position:{x:4,y:0,z:5},insideIndex:[1,4,5]},h)),X=T(n()({width:1,height:s-c,position:{x:3,y:c,z:5},insideIndex:[3,4,5],withRoot:!1},h)),J=T(n()({width:.5,height:a,position:{x:11.5,y:0,z:5.5},withRoot:!1},h)),K=T(n()({width:1.5,height:a,position:{x:13,y:0,z:5.5},withRoot:!1},h)),Q=T(n()({width:3,height:.5,position:{x:11.5,y:d,z:5.5},withRoot:!1},h)),tt=T(n()({width:3,height:a,position:{x:11.5,y:0,z:9.5},withRoot:!1},h)),et=T(n()({width:.2,height:.5,depth:4,position:{x:14,y:d,z:5.5},withRoot:!1},h)),it=T(n()({width:.2,height:a,depth:.4,position:{x:14,y:0,z:8.5},withRoot:!1},h)),ot=T(n()({width:.2,height:a,depth:.4,position:{x:14,y:0,z:9.1},withRoot:!1},h)),nt=T(n()({width:.2,height:a-.2,depth:.2,position:{x:14,y:.2,z:8.9},withRoot:!1},h)),st=T(n()({width:.2,height:d,depth:1,position:{x:14,y:0,z:5.5},withRoot:!1},h)),rt=(new p["B"]).add(H,Z,X),at=rt.clone();at.position.set(0,0,5),o.add(u,x,g,b,z,M,B,F,S,R,O,V,A,W,G,C,D,U,L,Y,rt,at,J,K,Q,tt,et,it,ot,nt,st),t.add(o)}))}))},ct={0:48,1:49,2:50,3:51,4:52,5:53,6:54,7:55,8:56,9:57,backspace:8,tab:9,enter:13,shift:16,ctrl:17,alt:18,pause_break:19,caps_lock:20,escape:27,space:32,page_up:33,page_down:34,end:35,home:36,left_arrow:37,up_arrow:38,right_arrow:39,down_arrow:40,insert:45,delete:46,a:65,b:66,c:67,d:68,e:69,f:70,g:71,h:72,i:73,j:74,k:75,l:76,m:77,n:78,o:79,p:80,q:81,r:82,s:83,t:84,u:85,v:86,w:87,x:88,y:89,z:90,left_window_key:91,right_window_key:92,select_key:93,numpad_0:96,numpad_1:97,numpad_2:98,numpad_3:99,numpad_4:100,numpad_5:101,numpad_6:102,numpad_7:103,numpad_8:104,numpad_9:105,multiply:106,add:107,subtract:109,decimal_point:110,divide:111,f1:112,f2:113,f3:114,f4:115,f5:116,f6:117,f7:118,f8:119,f9:120,f10:121,f11:122,f12:123,num_lock:144,scroll_lock:145,semi_colon:186,equal_sign:187,comma:188,dash:189,period:190,forward_slash:191,grave_accent:192,open_bracket:219,back_slash:220,close_braket:221,single_quote:222};i.d(e,"cementMaterial",(function(){return gt}));var dt,lt=[],pt=new p["m"],ht=!1,ut=!1,ft=!1,yt=!1,wt=!1,mt=performance.now(),xt=new p["Gb"],vt=new p["Gb"],gt=new p["W"]({map:(new p["Ab"]).load(i("R6yP"))}),bt=new Q,zt=!1,Pt=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:3e3;zt=!0,bt.clearTimeout(dt),dt=bt.setTimeout((function(){zt=!1}),t)},kt=function(){var t=Object(d["useRef"])(null),e=Object(d["useState"])(!1),o=c()(e,2),s=o[0],a=o[1],y=function(){var e=t.current,i=f(e),o=i.width,n=i.height;V=new p["Jb"]({antialias:!0}),V.setSize(o,n),V.shadowMapEnabled=!0,V.gammaFactor=2,e.appendChild(V.domElement),V.setClearColor(16777215,1)},m=function(){var e=t.current,i=f(e),o=i.width,n=i.height;A=new p["hb"](45,o/n,1,1e3),A.position.set(20,1.5,0),A.lookAt(0,2,7.5),U=new u["a"],e.appendChild(U.dom),D=new h["a"](A,document.body),D.addEventListener("lock",(function(){a(!0)})),D.addEventListener("unlock",(function(){a(!1)})),W.add(D.getObject()),e.appendChild(V.domElement)},x=function(){W=new p["rb"],W.background=new p["n"](13426943),W.fog=new p["w"](13426943,15,30)},v=function(){G=new p["jb"](16777215,1,0),G.position.set(100,100,200),G.castShadow=!0,G.shadow.camera.near=8,G.shadow.camera.far=1e3,G.shadow.mapSize.width=1024,G.shadow.mapSize.height=1024,C=new p["a"](6710886),W.add(C),W.add(G)},g=function(t){var e=new p["B"],o=gt.clone(),s=.002,a=I({width:5,height:5,position:{x:0,y:s,z:10},color:7369072,img:i("R6yP")}),c=P({size:{x:1,y:1,z:1},material:o});c.position.set(10.5,s,9.5);var d=[{size:{x:.8,y:.8,z:.8},position:{x:10.1,y:s+.1,z:9.1}}],l=E(c,r()(d.map((function(t){return n()({},t,{geometry:new p["h"](t.size.x,t.size.y,t.size.z),position:$(t.position,t.size)})})))),h=I({width:14.55,height:15.2,position:{x:0,y:.001,z:0},color:6710886,img:i("x9vC"),repeatU:4,repeatV:5});e.add(a,l,h),t.add(e)},b=function(t){var e=3.5,i=4.5,o=gt.clone(),n=new p["B"],s=P({size:{x:e,y:.2,z:i},material:o}),r=P({size:{x:e,y:.3,z:.3},material:o});r.position.set(0,0,-i/2);var a=r.clone();a.position.set(0,0,i/2);var c=P({size:{x:.3,y:.3,z:i+.3},material:o});c.position.set(-e/2,0,0);var d=c.clone();d.position.set(e/2,0,0),n.position.set(11.2+e/2,2.5,5.3+i/2),n.add(s,r,a,c,d);var l=P({size:{x:8.4,y:.3,z:5.6},position:{x:6.2,y:2.4,z:-.2},material:o});t.add(n,l)},z=function(t){return function(e){t(e),Pt()}},k=function(t){it(t,z),ot(t,z),nt(t,z,lt),st(t,z),rt(t,z)},N=function(t){Y("gltf/object/cherryTree/sceneDraco.gltf",z((function(e){var i=e.scene,o=(new p["f"]).setFromObject(i),n=o.max;if(!isNaN(n.y)){var s=3.5,r=s/n.y;i.scale.set(r,r,r),i.position.set(7.5,0,10),H(i,{castShadow:!0,receiveShadow:!0}),t.add(i)}}))),Y("gltf/object/ground_moss_fores_square/scene.gltf",z((function(e){var i=e.scene,o=(new p["f"]).setFromObject(i),n=o.max;if(!isNaN(n.y)){var s=.15,r=s/n.y;i.scale.set(r,r,r),i.position.set(7.4,0,9.9),t.add(i)}}))),Y("gltf/object/tree_scan_free/sceneDraco.gltf",z((function(e){var i=e.scene,o=(new p["f"]).setFromObject(i),n=o.max;if(!isNaN(n.y)){var s=1.8,r=s/n.y;i.scale.set(r,r,r),i.position.set(10.8,1.1,9),H(i,{castShadow:!0,receiveShadow:!0}),t.add(i)}})))},M=function(t){var e=new p["B"],i=new p["B"];Y("gltf/object/doorFrame/scene.gltf",z((function(t){var o=t.scene,n=(new p["f"]).setFromObject(o),s=n.max;if(!isNaN(s.y)){var r=2,a=r/s.y;o.scale.set(1.3*a,a,1.6*a),o.position.set(0,0,0),e.add(o),i.add(o.clone())}}))),Y("gltf/object/mainDoor2/scene.gltf",z((function(t){var i=t.scene,o=(new p["f"]).setFromObject(i),n=o.max;if(!isNaN(n.y)){var s=1.8,r=s/n.y;i.rotateY(Math.PI/2),i.scale.set(r,r,r),i.position.set(0,0,.96);var a=i.clone();a.scale.set(-r,r,r),a.position.set(0,0,-1),i.rotateY(Math.PI/3),a.rotateY(-Math.PI/2.5),e.add(i,a)}}))),Y("gltf/object/mainDoor/scene.gltf",z((function(t){var e=t.scene,o=(new p["f"]).setFromObject(e),n=o.max;if(!isNaN(n.y)){var s=1.8,r=s/n.y;e.rotateY(Math.PI/2),e.scale.set(r,r,r),e.position.set(0,0,.96);var a=e.clone();a.scale.set(-r,r,r),a.position.set(0,0,-1),e.rotateY(Math.PI/1.5),a.rotateY(-Math.PI/2),i.add(e,a)}}))),e.position.set(14.15,0,7.5),i.position.set(5.15,0,7.5),t.add(e,i)},_=function(){var t=new p["Ab"],e=t.load(i("r8cw"));e.wrapS=e.wrapT=p["qb"],e.repeat.set(25,25),e.anisotropy=16;var o=new p["W"]({map:e}),n=new p["U"](new p["ib"](80,80),o);n.rotation.x=-Math.PI/2,n.receiveShadow=!0,W.add(n);var s=new p["B"];g(s),at(s,z),k(s),N(s),M(s),b(s),s.position.set(-5,0,-7.5),W.add(s)},j=function t(){if(requestAnimationFrame(t),zt){for(var e=pt.getDelta(),i=0;i<lt.length;i++)lt[i].update(e);if(D.isLocked){var o=performance.now(),n=(o-mt)/1e3;xt.x-=10*xt.x*n,xt.z-=10*xt.z*n,vt.z=Number(ht)-Number(ut),vt.x=Number(yt)-Number(ft),vt.normalize(),(ht||ut)&&(xt.z-=100*vt.z*n),(ft||yt)&&(xt.x-=100*vt.x*n),D.moveRight(-xt.x*n),D.moveForward(-xt.z*n),D.getObject().position.y+=xt.y*n,D.getObject().position.y<=1.5?(xt.y=0,D.getObject().position.y=1.5,wt=!0):xt.y-=90*n,mt=o}D.update&&D.update(pt.getDelta()),V.render(W,A)}U.update()},T=function(){y(),x(),m(),v(),_(),V.clear(),V.render(W,A),j()};Object(d["useEffect"])((function(){T(),p["p"].onLoad=function(){Pt()},document.body.onmousemove=function(){Pt()},document.body.onkeydown=function(t){switch(+t.keyCode){case ct.escape:D.unlock();break;case ct.w:case ct.up_arrow:ht=!0;break;case ct.s:case ct.down_arrow:ut=!0;break;case ct.a:case ct.left_arrow:ft=!0;break;case ct.d:case ct.right_arrow:yt=!0;break;case ct.space:wt&&(xt.y+=30),wt=!1;break}Pt()},document.body.onkeyup=function(t){switch(+t.keyCode){case ct.w:case ct.up_arrow:ht=!1;break;case ct.s:case ct.down_arrow:ut=!1;break;case ct.a:case ct.left_arrow:ft=!1;break;case ct.d:case ct.right_arrow:yt=!1;break}Pt()}}),[]);var B=function(){D.lock()};return l.a.createElement("div",null,l.a.createElement("div",{ref:t,className:w.a["canvas-gl"]}),!s&&l.a.createElement("div",{className:w.a.blocker,onClick:B},l.a.createElement("div",{className:w.a.instructions},l.a.createElement("div",{className:w.a.title},"Click to visit"),l.a.createElement("div",{className:w.a.info},"Move: WASD"),l.a.createElement("div",{className:w.a.info},"Jump: SPACE"),l.a.createElement("div",{className:w.a.info},"Look: MOUSE"))))};e["default"]=kt},R6yP:function(t,e,i){t.exports=i.p+"static/cement.826fdaa5.png"},UCZR:function(t,e,i){t.exports=i.p+"static/\u94c1\u76ae2.b8c7d18f.png"},UXH7:function(t,e,i){t.exports=i.p+"static/brick_diffuse.76673804.jpg"},r8cw:function(t,e,i){t.exports=i.p+"static/grasslight-big.930b1271.jpg"},x9vC:function(t,e,i){t.exports=i.p+"static/brick.1a577e11.png"}}]);