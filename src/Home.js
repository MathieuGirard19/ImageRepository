import React, { Component } from 'react';
import Navigation from './Navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FirebaseDatabaseProvider, FirebaseDatabaseNode } from "@react-firebase/database";
import "firebase/database";
import { app, db, storage } from './base';
import Button from 'react-bootstrap/Button';
import firebase from 'firebase';

class Home extends Component {
  constructor(props) {
    super(props);
    this.deleteImage = this.deleteImage.bind(this);
    this.clearCheckBoxes = this.clearCheckBoxes.bind(this);
    this.editImage = this.editImage.bind(this);
    this.saveEdits = this.saveEdits.bind(this);
    this.cancelEdits = this.cancelEdits.bind(this);
    this.nameEdit = this.nameEdit.bind(this);
    this.descriptionEdit = this.descriptionEdit.bind(this);
    this.state = {
      imageData: null,
      selectedImagesToDelete: [],
      imageEdit: null,
      imageEditId: null
    }
  }

  componentDidMount() {
    db.ref('images').on('value', (snapshot) => {
      this.setState({imageData: snapshot.val()})
    });
  }

  deleteImage(id){
    db.ref('images/' + id).remove();
    this.setState({imageEditId: null});
  }

  clearCheckBoxes(){
    let checkboxes = document.getElementsByClassName('checkboxes');
    Object.entries(checkboxes).map(checkbox => {
      checkbox[1].checked = false;
    })
    this.setState({selectedImagesToDelete: []})
  }

  editImage(id){
    let newImageData = this.state.imageData;
    newImageData[id].edit = true;
    if(this.state.imageEditId != null){
        //used to turnoff any other images in edit mode
        console.log(this.state.imageEditId);
        newImageData[this.state.imageEditId].edit = false;
    }
    this.setState({
        imageData: newImageData,
        imageEditId: id
    });
  }

  nameEdit(e){
    let editedImage = JSON.parse(JSON.stringify(this.state.imageData[this.state.imageEditId]));
    editedImage.name = e.target.value;
    this.setState({imageEdit: editedImage})
  }

  descriptionEdit(e){
    let editedImage = JSON.parse(JSON.stringify(this.state.imageData[this.state.imageEditId]));
    editedImage.description = e.target.value;
    this.setState({imageEdit: editedImage})
  }

  saveEdits(){
    let imageEdit = this.state.imageEdit;
    delete imageEdit.edit;
    db.ref("images/" + this.state.imageEditId).set(this.state.imageEdit);
    this.cancelEdits(this.state.imageEditId);
  }

  cancelEdits(){
    let newImageData = this.state.imageData;
    newImageData[this.state.imageEditId].edit = false;
    this.setState({
        imageData: newImageData,
        imageEdit: null,
        imageEditId: null
    });
  }

  render() {
    return (
      <div className="Home">
        <div className="ImageContainer">
          {this.state.imageData &&
            Object.entries(this.state.imageData).map((data) => {
              let id = data[0];
              let imageData = data[1];
              return (
                  <div className="ImageObject">
                      <img src={imageData.url} />
                      {imageData.edit ?
                          <div className="imageText">
                            <div className="title">
                                <input type="text" placeholder={imageData.name} onChange={(e) => {this.nameEdit(e)}}/>
                            </div>
                            <div className="description">
                                <input type="text" placeholder={imageData.description} onChange={(e) => this.descriptionEdit(e)}/>
                            </div>
                          </div>
                          :
                          <div className="imageText">
                            <div className="title">
                              <h3>{imageData.name}</h3>
                            </div>
                            <div className="description">
                                {imageData.description}
                            </div>
                          </div>
                      }
                      {imageData.edit ?
                        <div className="buttonsEdit">
                            <Button onClick={this.saveEdits} variant="success">Save</Button>
                            <Button onClick={this.cancelEdits} variant="secondary">Cancel</Button>
                            <Button onClick={() => {this.deleteImage(id)}} variant="danger">Delete</Button>
                        </div>
                        :
                        <div className="buttonsNormal">
                            <Button className="edit" onClick={() => {this.editImage(id)}} variant="primary">Edit</Button>
                            <Button onClick={() => {this.deleteImage(id)}} variant="danger">Delete</Button>
                        </div>
                      }
                  </div>
              )
            })
          }
        </div>
        {/* <button onClick={this.deleteImages}>Delete</button>
        <input id="checkAll" type="checkbox" onClick={(e) => {this.checkAll(e)}}></input>
        <label for="checkAll">Select All</label> */}
      </div>
    )
  };
}

export default Home;
