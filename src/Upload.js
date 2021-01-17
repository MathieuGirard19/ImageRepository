import { Component } from 'react';
import "firebase/database";
import { db, storage } from './base';
import Button from 'react-bootstrap/Button';

class Upload extends Component {
    constructor(props) {
        super(props)
        this.uploadImage = this.uploadImage.bind(this);
        this.selectImagesToUpload = this.selectImagesToUpload.bind(this);
        this.state = {
            selectedImagesToUpload: [],
            imageData: null,
            doneUploading: false
        }
    }

    uploadImage(){
        let imagesToUpload = this.state.selectedImagesToUpload
        imagesToUpload.map(imageObj => {
          let uploadTask = storage.ref('images/' + imageObj.fileName).put(imageObj.file);
          uploadTask.on('state_changed', function(snapshot){
          let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
            }, function(error) {
                alert("error uploading");
            }, function() {
                alert("done uploading")
                uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                    console.log('File available at', downloadURL);
                    let newImage = db.ref('images').push();
                    imageObj.url = downloadURL
                    newImage.set(imageObj);
                })
            })
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
            <div className="Upload">
                <div className="UploadArea">
                    <div className="UploadButtons">
                        <input multiple type="file" name="file" onChange={this.selectImagesToUpload}/>
                        <Button onClick={() => {this.uploadImage()}}>Upload Image</Button>
                    </div>
                    {/* <div className="ProgressBar">
                        <ProgressBar now={this.state.uploadProgress} label={`${this.state.uploadProgress}%`}/>
                    </div> */}
                </div>
                {this.state.selectedImagesToUpload.length > 0 && 
                    <div className="UploadContainer">
                        {this.state.selectedImagesToUpload.map((fileObj, i) => {
                            return (
                                <div className="UploadObject">
                                    <img src={fileObj.url} />
                                    <div className="uploadText">
                                        <div className="title">
                                            <input type="text" placeholder={fileObj.name} onChange={(e) => {this.addImageName(e, i)}}/>
                                        </div>
                                        <div className="description">
                                            <input type="text" onChange={(e) => {this.addImageDescription(e, i)}}/>
                                        </div>
                                    </div>
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
