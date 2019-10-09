import React from "react";
import PropTypes from "prop-types";

function onChangeInputFileImage(input, id) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function(e) {
      document.getElementById(id).setAttribute("src", e.target.result);
    };

    reader.readAsDataURL(input.files[0]);
  }
}

const SelectSingleImage = props => {
  const { size, img_id, id, label, onChange, file } = props;
  const image_src = file && file.url ? file.url : "";
  return (
    <div className={`col ${size}`}>
      <div>
        <img
          id={img_id}
          src={image_src}
          alt=""
          className="responsive-img materialboxed single-materialboxed-image"
        />
      </div>
      <div className="file-field input-field overflow-x-hidden">
        <div className="btn">
          <span>{label}</span>
          <input
            type="file"
            accept="image/x-png,image/jpeg"
            id={id}
            name={id}
            onChange={() => {
              const input = document.getElementById(id);
              onChange(input);
              onChangeInputFileImage(input, img_id);
            }}
          />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>
    </div>
  );
};

SelectSingleImage.propTypes = {
  onChange: PropTypes.func.isRequired,
  size: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  img_id: PropTypes.string.isRequired,
  file: PropTypes.object
};

SelectSingleImage.defaultProps = {
  size: "s12"
};

export default SelectSingleImage;
