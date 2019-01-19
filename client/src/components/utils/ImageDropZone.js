import React, { Component } from "react";
import ReactDropzone from "react-dropzone";
import classnames from "classnames";

import "../../styles/Dropzone.css";

class ImageDropZone extends Component {
  state = { accepted: [], rejected: [] };
  onDrop = (acceptedFiles, rejectedFiles) => {
    this.props.onImageDrop(acceptedFiles);
  };

  render() {
    return (
      <ReactDropzone accept="image/jpeg, image/png" onDrop={this.onDrop}>
        {({ getRootProps, getInputProps, isDragActive }) => (
          <div
            {...getRootProps()}
            className={classnames("dropzone", { "drag-active": isDragActive })}
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
    );
  }
}

export default ImageDropZone;
