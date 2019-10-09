import React from "react";
import PropTypes from "prop-types";

function onChangeInputFile(input, id) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function(e) {
      document.getElementById(id).setAttribute("src", e.target.result);
    };

    reader.readAsDataURL(input.files[0]);
  }
}

const inputFile = props => {
  const { onChange, input_size, id, audio_id, label, file, src } = props;
  const fileIsEmpty = file === null && src === "";
  return (
    <div className={`input-field col ${input_size}`}>
      <div className="file-field input-field ">
        <div className="btn">
          <span>{label}</span>
          <input
            id={id}
            name={id}
            type="file"
            accept="mp3,audio/*"
            multiple={true}
            onChange={() => {
              const input = document.getElementById(id);
              onChange(input);
              onChangeInputFile(input, audio_id);
            }}
          />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
        <div className={fileIsEmpty ? "d-none" : "dark"}>
          <audio controls preload="none" id={audio_id} alt="" src={src} />
        </div>
      </div>
    </div>
  );
};
inputFile.propTypes = {
  id: PropTypes.string.isRequired,
  multiple: PropTypes.bool.isRequired,
  input_size: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  audio_id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  file: PropTypes.object,
  src: PropTypes.string
};

inputFile.defaultProps = {
  audio_id: "audio_id_inputfield",
  input_size: "s12",
  categoria: "musica",
  src: ""
};
export default inputFile;
