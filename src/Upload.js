import { Component } from 'react';
import "firebase/database";
import { app, db, storage } from './base';
import firebase from 'firebase';

class Upload extends Component {
    constructor(props) {
        super(props)
        this.uploadImage = this.uploadImage.bind(this);
        this.selectImagesToUpload = this.selectImagesToUpload.bind(this);
        this.state = {
            selectedImagesToUpload: [],
            imageData: null,
        }
    }

    uploadImage(){
        this.state.selectedImagesToUpload.map(imageObj => {
          let uploadTask = storage.ref('images/' + imageObj.fileName).put(imageObj.file);
          uploadTask.on('state_changed', function(snapshot){
          let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running');
              break;
          }
            }, function(error) {
                alert("error uploading");
            }, function() {
                alert("done uploading")
                uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                    console.log('File available at', downloadURL);
                    let newImage = db.ref('images').push();
                    imageObj.url = downloadURL
                    newImage.set(imageObj);
                });
            });
        })
    }

    selectImagesToUpload(e){
        this.setState({selectedImagesToUpload: []})
        Object.entries(e.target.files).map(file => {
            let reader = new FileReader();
            reader.onloadend = () => {
                let newImageFile = {
                    file: file[1],
                    url: reader.result,
                    fileName: file[1].name,
                    name: file[1].name.split('.')[0],
                    description: ""
                }
                let selectedImages = this.state.selectedImagesToUpload.concat(newImageFile);
                this.setState({selectedImagesToUpload: selectedImages});
            }
            reader.readAsDataURL(file[1]);
        })
        // let reader = new FileReader();
        // reader.onloadend = () => {
        //     let url = reader.result;
        //     this.setState({test: url})
        // }
        // reader.readAsDataURL(e.target.files[0]);
    }

    addImage(title) {
        let imagesRef = db.ref('images');
        let newImage = imagesRef.push();
        newImage.set({
          title: title
        });
    }

    addImageDescription(e, i){
        let selectedImages = this.state.selectedImagesToUpload;
        selectedImages[i].description = e.target.value;
        this.setState({selectedImagesToUpload: selectedImages})
    }

    addImageName(e, i){
        let selectedImages = this.state.selectedImagesToUpload;
        selectedImages[i].name = e.target.value;
        this.setState({selectedImagesToUpload: selectedImages})
    }

    render() {
        return (
            <div>
                <input multiple type="file" name="file" onChange={this.selectImagesToUpload}/>
                <button onClick={this.uploadImage}>Upload Image</button>
                {this.state.selectedImagesToUpload.length > 0 && 
                    <div style={{display: "flex"}}>
                        {this.state.selectedImagesToUpload.map((fileObj, i) => {
                            console.log(i);
                            return (
                                <div style={{display: "flex", flexDirection: "column", width: "100%", height: "100%"}}>
                                    <img style={{ maxWidth: "250px", maxHeight: "250px" }} src={fileObj.url} />
                                    <label>Change Name:</label>
                                    <input type="text" placeholder={fileObj.name} onChange={(e) => {this.addImageName(e, i)}}/>
                                    <label>Add Description:</label>
                                    <input type="text" onChange={(e) => {this.addImageDescription(e, i)}}/>
                                </div>
                            )
                        })}
                    </div>
                }
            </div>
        )
    }
}

export default Upload;
