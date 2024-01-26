import React, { useState } from 'react';

const InputFile = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    // Update the state with the selected file
    setSelectedFile(event.target.files[0]);
  };

  const resetFileInput = () => {
    // Reset the input by setting the selected file to null
    setSelectedFile(null);
    // Clear the value of the input to allow selecting the same file again
    document.getElementById('fileInput').value = null;
  };

  return (
    <div>
      <label htmlFor="fileInput">Choose a file:</label>
      <input
        type="file"
        id="fileInput"
        name="fileInput"
        onChange={handleFileChange}
      />
      <br />
      <button type="button" onClick={resetFileInput}>
        Reset File Input
      </button>

      {selectedFile && (
        <div>
          <p>Selected File: {selectedFile.name}</p>
          <p>File Size: {selectedFile.size} bytes</p>
        </div>
      )}
    </div>
  );
};

export default InputFile;
