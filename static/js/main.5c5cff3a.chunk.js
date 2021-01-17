(this.webpackJsonpimage_repository=this.webpackJsonpimage_repository||[]).push([[0],{54:function(e,t,a){},62:function(e,t,a){},66:function(e,t,a){"use strict";a.r(t);var i=a(5),s=a(2),n=a.n(s),c=a(28),d=a.n(c),l=(a(54),a(19)),r=a(20),o=a(23),m=a(22),u=a(40),j=a(48),g=a(29),p=function(e){Object(o.a)(a,e);var t=Object(m.a)(a);function a(){return Object(l.a)(this,a),t.apply(this,arguments)}return Object(r.a)(a,[{key:"render",value:function(){return Object(i.jsxs)(u.a,{className:"Nav",bg:"dark",variant:"dark",children:[Object(i.jsx)(u.a.Brand,{href:"#home",children:"Navbar"}),Object(i.jsxs)(j.a,{className:"mr-auto",children:[Object(i.jsx)(g.b,{className:"links",to:"/",children:"Home"}),Object(i.jsx)(g.b,{className:"links",to:"/upload",children:"Upload"})]})]})}}]),a}(s.Component),h=(a(42),a(62),a(16)),b=(a(43),a(34)),v=(a(65),b.a.initializeApp({apiKey:"AIzaSyB5DOgKEJRorRjJJW6dXmp7a3j-YZP1uU0",authDomain:"shopify-image-repo-606fb.firebaseapp.com",databaseURL:"https://shopify-image-repo-606fb-default-rtdb.firebaseio.com",projectId:"shopify-image-repo-606fb",storageBucket:"shopify-image-repo-606fb.appspot.com",messagingSenderId:"6708771276",appId:"1:6708771276:web:7abab8943f1724fc400569",measurementId:"G-9FDP75EF88"}),b.a.database()),O=b.a.storage(),f=a(26),I=function(e){Object(o.a)(a,e);var t=Object(m.a)(a);function a(e){var i;return Object(l.a)(this,a),(i=t.call(this,e)).deleteImage=i.deleteImage.bind(Object(h.a)(i)),i.editImage=i.editImage.bind(Object(h.a)(i)),i.saveEdits=i.saveEdits.bind(Object(h.a)(i)),i.cancelEdits=i.cancelEdits.bind(Object(h.a)(i)),i.nameEdit=i.nameEdit.bind(Object(h.a)(i)),i.descriptionEdit=i.descriptionEdit.bind(Object(h.a)(i)),i.state={imageData:null,selectedImagesToDelete:[],imageEdit:null,imageEditId:null},i}return Object(r.a)(a,[{key:"componentDidMount",value:function(){var e=this;v.ref("images").on("value",(function(t){e.setState({imageData:t.val()})}))}},{key:"deleteImage",value:function(e){v.ref("images/"+e).remove(),this.setState({imageEditId:null})}},{key:"editImage",value:function(e){var t=this.state.imageData;t[e].edit=!0,null!=this.state.imageEditId&&(console.log(this.state.imageEditId),t[this.state.imageEditId].edit=!1),this.setState({imageData:t,imageEditId:e})}},{key:"nameEdit",value:function(e){var t=JSON.parse(JSON.stringify(this.state.imageData[this.state.imageEditId]));t.name=e.target.value,this.setState({imageEdit:t})}},{key:"descriptionEdit",value:function(e){var t=JSON.parse(JSON.stringify(this.state.imageData[this.state.imageEditId]));t.description=e.target.value,this.setState({imageEdit:t})}},{key:"saveEdits",value:function(){delete this.state.imageEdit.edit,v.ref("images/"+this.state.imageEditId).set(this.state.imageEdit),this.cancelEdits(this.state.imageEditId)}},{key:"cancelEdits",value:function(){var e=this.state.imageData;e[this.state.imageEditId].edit=!1,this.setState({imageData:e,imageEdit:null,imageEditId:null})}},{key:"render",value:function(){var e=this;return Object(i.jsx)("div",{className:"Home",children:Object(i.jsx)("div",{className:"ImageContainer",children:this.state.imageData&&Object.entries(this.state.imageData).map((function(t){var a=t[0],s=t[1];return Object(i.jsxs)("div",{className:"ImageObject",children:[Object(i.jsx)("img",{alt:s.name,src:s.url}),s.edit?Object(i.jsxs)("div",{className:"imageText",children:[Object(i.jsx)("div",{className:"title",children:Object(i.jsx)("input",{type:"text",placeholder:s.name,onChange:function(t){e.nameEdit(t)}})}),Object(i.jsx)("div",{className:"description",children:Object(i.jsx)("input",{type:"text",placeholder:s.description,onChange:function(t){return e.descriptionEdit(t)}})})]}):Object(i.jsxs)("div",{className:"imageText",children:[Object(i.jsx)("div",{className:"title",children:Object(i.jsx)("h3",{children:s.name})}),Object(i.jsx)("div",{className:"description",children:s.description})]}),s.edit?Object(i.jsxs)("div",{className:"buttonsEdit",children:[Object(i.jsx)(f.a,{onClick:e.saveEdits,variant:"success",children:"Save"}),Object(i.jsx)(f.a,{onClick:e.cancelEdits,variant:"secondary",children:"Cancel"}),Object(i.jsx)(f.a,{onClick:function(){e.deleteImage(a)},variant:"danger",children:"Delete"})]}):Object(i.jsxs)("div",{className:"buttonsNormal",children:[Object(i.jsx)(f.a,{className:"edit",onClick:function(){e.editImage(a)},variant:"primary",children:"Edit"}),Object(i.jsx)(f.a,{onClick:function(){e.deleteImage(a)},variant:"danger",children:"Delete"})]})]},a)}))})})}}]),a}(s.Component),x=a(10),E=function(e){Object(o.a)(a,e);var t=Object(m.a)(a);function a(e){var i;return Object(l.a)(this,a),(i=t.call(this,e)).uploadImage=i.uploadImage.bind(Object(h.a)(i)),i.selectImagesToUpload=i.selectImagesToUpload.bind(Object(h.a)(i)),i.state={selectedImagesToUpload:[],imageData:null,doneUploading:!1},i}return Object(r.a)(a,[{key:"uploadImage",value:function(){var e=this.state.selectedImagesToUpload;e.map((function(t,a){var i=O.ref("images/"+t.fileName).put(t.file);return i.on("state_changed",(function(e){var t=e.bytesTransferred/e.totalBytes*100;console.log("Upload is "+t+"% done")}),(function(e){alert("error uploading")}),(function(){e.length-1===a&&alert("Upload Complete, See Home Page"),i.snapshot.ref.getDownloadURL().then((function(e){console.log("File available at",e);var a=v.ref("images").push();t.url=e,a.set(t)}))})),null}))}},{key:"selectImagesToUpload",value:function(e){var t=this;this.setState({selectedImagesToUpload:[]}),Object.entries(e.target.files).map((function(e){var a=new FileReader;return a.onloadend=function(){var i={file:e[1],url:a.result,fileName:e[1].name,name:e[1].name.split(".")[0],description:""},s=t.state.selectedImagesToUpload.concat(i);t.setState({selectedImagesToUpload:s})},a.readAsDataURL(e[1]),null}))}},{key:"addImage",value:function(e){v.ref("images").push().set({title:e})}},{key:"addImageDescription",value:function(e,t){var a=this.state.selectedImagesToUpload;a[t].description=e.target.value,this.setState({selectedImagesToUpload:a})}},{key:"addImageName",value:function(e,t){var a=this.state.selectedImagesToUpload;a[t].name=e.target.value,this.setState({selectedImagesToUpload:a})}},{key:"render",value:function(){var e=this;return Object(i.jsxs)("div",{className:"Upload",children:[Object(i.jsx)("div",{className:"UploadArea",children:Object(i.jsxs)("div",{className:"UploadButtons",children:[Object(i.jsx)("input",{multiple:!0,type:"file",name:"file",onChange:this.selectImagesToUpload}),Object(i.jsx)(f.a,{onClick:function(){e.uploadImage()},children:"Upload Image"})]})}),this.state.selectedImagesToUpload.length>0&&Object(i.jsx)("div",{className:"UploadContainer",children:this.state.selectedImagesToUpload.map((function(t,a){return Object(i.jsxs)("div",{className:"UploadObject",children:[Object(i.jsx)("img",{alt:t.name,src:t.url}),Object(i.jsxs)("div",{className:"uploadText",children:[Object(i.jsx)("div",{className:"title",children:Object(i.jsx)("input",{type:"text",placeholder:t.name,onChange:function(t){e.addImageName(t,a)}})}),Object(i.jsx)("div",{className:"description",children:Object(i.jsx)("input",{type:"text",onChange:function(t){e.addImageDescription(t,a)}})})]})]})}))})]})}}]),a}(s.Component),y=function(e){Object(o.a)(a,e);var t=Object(m.a)(a);function a(){return Object(l.a)(this,a),t.apply(this,arguments)}return Object(r.a)(a,[{key:"render",value:function(){return Object(i.jsxs)(g.a,{children:[Object(i.jsx)(p,{}),Object(i.jsxs)(x.c,{children:[Object(i.jsx)(x.a,{path:"/upload",children:Object(i.jsx)(E,{})}),Object(i.jsx)(x.a,{path:"/",children:Object(i.jsx)(I,{})})]})]})}}]),a}(s.Component);d.a.render(Object(i.jsx)(n.a.StrictMode,{children:Object(i.jsx)(y,{})}),document.getElementById("root"))}},[[66,1,2]]]);
//# sourceMappingURL=main.5c5cff3a.chunk.js.map