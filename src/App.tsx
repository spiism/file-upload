import React from 'react';
import './App.css';
import FileUploadTracker from "./components/FileUploadTracker";

function App() {
  return (
      <div className="App">
        <h1 className="text-3xl font-bold underline text-red-200">
          Hello world!
        </h1>
          <FileUploadTracker/>
      </div>
  );
}

export default App;
