import React, { Component } from "react";
import ReactDropzone from "react-dropzone";
import classnames from "classnames";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

import Spinner from "../common/Spinner";
import "../../styles/Dropzone.css";

class ImageDropZone extends Component {
  state = {
    acceptedFiles: {},
    // if imageDropped is true and imageToBoCropped is null the modal will show the spinner
    imageDropped: false,
    imageToBeCropped: null
  };

  onDrop = acceptedFiles => {
    this.setState({ imageDropped: true, acceptedFiles: acceptedFiles[0] });

    // need to use a filereader to convert file to dataUrl so that the <Cropper /> can render it
    let tempImage;
    if (FileReader) {
      var fr = new FileReader();
      fr.onload = () => {
        tempImage = fr.result;
        this.setState({ imageToBeCropped: tempImage });
      };
      fr.readAsDataURL(acceptedFiles[0]);
    }
  };

  crop = () => {
    // after the user crops the image convert the canvas to blob and add some properties to make it a proper file
    this.refs.cropper.getCroppedCanvas().toBlob(blob => {
      let tempBlob = blob;
      tempBlob.lastModifiedDate = new Date().now;
      tempBlob.fileName = this.state.acceptedFiles.name;
      this.props.onImageDrop(tempBlob);
    });
  };

  render() {
    let { imageDropped, imageToBeCropped } = this.state;

    // Can't style the cropper from the stylesheet so manually have to check the innerWidth and innerHeight to
    // assign the cropper its width and height
    let cropperWidth = "100%";
    let cropperHeight = 500;
    if (window.innerWidth < 500) {
      cropperHeight = 250;
      cropperWidth = window.innerWidth - 80;
    } else if (window.innerWidth < 900) {
      cropperHeight = 350;
      cropperWidth = window.innerWidth - 100;
    }

    return (
      <div>
        {!imageDropped ? (
          <ReactDropzone accept="image/jpeg, image/png" onDrop={this.onDrop}>
            {({ getRootProps, getInputProps, isDragActive }) => (
              <div
                {...getRootProps()}
                className={classnames("dropzone", {
                  "drag-active": isDragActive
                })}
              >
                <input {...getInputProps()} />
                <p>
                  {isDragActive
                    ? "Drop the image"
                    : "Drop images here, or click to select files to upload."}
                </p>
                <p>Only *.jpeg and *.png images will be accepted</p>
              </div>
            )}
          </ReactDropzone>
        ) : (
          <div>
            {imageToBeCropped ? (
              <div>
                <h4>Crop Your Image</h4>
                <Cropper
                  style={{
                    height: cropperHeight,
                    width: cropperWidth
                  }}
                  className="image-cropper"
                  ref="cropper"
                  src={imageToBeCropped}
                  aspectRatio={10 / 10}
                  guides={true}
                />
                <button
                  onClick={this.crop}
                  style={{ width: "100%", marginTop: "15px" }}
                  className="waves-effect waves-light btn"
                >
                  Crop
                </button>
              </div>
            ) : (
              <div style={{ width: 250, height: 200 }}>
                <Spinner />
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default ImageDropZone;
