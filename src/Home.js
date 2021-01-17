import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "firebase/database";
import { db } from './base';
import Button from 'react-bootstrap/Button';

class Home extends Component {
  constructor(props) {
    super(props);
    this.deleteImage = this.deleteImage.bind(this);
    this.editImage = this.editImage.bind(this);
    this.saveEdits = this.saveEdits.bind(this);
    this.cancelEdits = this.cancelEdits.bind(this);
    this.nameEdit = this.nameEdit.bind(this);
    this.descriptionEdit = this.descriptionEdit.bind(this);
    this.state = {
      imageData: null,
      selectedImagesToDelete: [],
      imageEdits: null,
      imageEditId: null
    }
  }

  componentDidMount() {
    db.ref('images').on('value', (snapshot) => {
      console.log(snapshot.val());
      this.setState({imageData: snapshot.val()})
    });
  }

  deleteImage(id){
    db.ref('images/' + id).remove();
    this.setState({imageEditId: null});
  }

  editImage(id){
    let imageToEdit = JSON.parse(JSON.stringify(this.state.imageData[id]))
    this.setState({
      imageEditId: id,
      imageEdits: imageToEdit
    });
  }

  nameEdit(e){
    let editedImage = this.state.imageEdits;
    editedImage.name = e.target.value;
    this.setState({imageEdits: editedImage})
  }

  descriptionEdit(e){
    let editedImage = this.state.imageEdits;
    editedImage.description = e.target.value;
    this.setState({imageEdit: editedImage})
  }

  saveEdits(){
    let imageEdit = this.state.imageEdits;
    delete imageEdit.edit;
    db.ref("images/" + this.state.imageEditId).set(imageEdit);
    this.cancelEdits()
  }

  cancelEdits(){
    this.setState({
        imageEdits: null,
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
                  <div className="ImageObject" key={id}>
                      <img alt={imageData.name} src={imageData.url} />
                      {id == this.state.imageEditId ?
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
                      {id == this.state.imageEditId ?
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
      </div>
    )
  };
}

export default Home;
