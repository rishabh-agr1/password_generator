import { useState } from "react";
import "./index.css";
import { useCallback } from "react";
import { useEffect } from "react";
import { useRef } from "react";

function App() {
  const [length, updateLength] = useState(8); // by default, generate a password of length =8
  const [isNumberRequired, updateNumRequirment] = useState(false);
  const [isSpCharReq, updateSpCharReq] = useState(false); // SpCharReq -> special character reqiured
  const [password, updatePassword] = useState();

  const passwordRef = useRef(null);

  function func() {
    let pass = "";
    let possibility = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (isNumberRequired) {
      possibility += "0123456789";
    }
    if (isSpCharReq) {
      possibility += "!@#$%^&*()-_";
    }

    for (let i = 1; i <= length; i++) {
      let idx = Math.floor(Math.random() * possibility.length + 1);
      pass += possibility.charAt(idx);
    }

    updatePassword(pass);
  }


  const dependencies1 = [length, isNumberRequired, isSpCharReq];
  // dependencies -> changing this might cause change in output


  const passwordGenerator = useCallback(func, dependencies1);

  const dependencies2 = [length, isNumberRequired, isSpCharReq, passwordGenerator]
  useEffect(() => {passwordGenerator()}, dependencies2);

  function copyPasswordToClipboard(){
    passwordRef.current?.select() //if passwordRed is not empty then select it in website
    window.navigator.clipboard.writeText(password);
  }

  return (
    <div className="bg-black w-full h-screen flex-col justify-items-center items-center text-white p-20">
      <div className="text-5xl m-5 p-4 h-1/6 border-indigo-400 border-4 rounded-xl flex items-center justify-items-center">
        Password Generator!
      </div>
      <div className="w-full h-4/6 border-4 border-indigo-400 rounded-3xl flex-col flex-wrap justify-items-center items-center">
        <div className="h-1/6 w-3/5 flex p-2 m-3">
          <input
            type="text"
            value={password}
            ref = {passwordRef}
            readOnly
            className="h-full w-4/5 text-black text-2xl m-1 rounded-xl"
          />
          <button className="bg-red-300 w-1/5 h-full text-black text-2xl m-1 rounded-xl font-bold"
              onClick={copyPasswordToClipboard}>
            Copy Me
          </button>
        </div>
        <div className="m-10 flex justify-evenly">
          <input
            type="range"
            min={6}
            max={45}
            value={length}
            onChange={(e) => {
              updateLength(e.target.value);
            }}
            className="cursor-pointer"
          ></input>
          <label className="px-5 text-xl font-bold">Length: {length}</label>
        </div>
        <div className="m-10 flex justify-evenly">
          <input
            type="checkbox"
            defaultChecked={isNumberRequired}
            onChange={(e) => {
              updateNumRequirment((prev) => !prev);
            }}
            className="cursor-pointer"
          ></input>
          <label className="px-5 text-xl font-bold">Numbers</label>
        </div>
        <div className="m-10 flex justify-evenly">
          <input
            type="checkbox"
            defaultChecked={isSpCharReq}
            onChange={(e) => {
              updateSpCharReq((prev) => !prev);
            }}
            className="cursor-pointer"
          ></input>
          <label className="px-5 text-xl font-bold">Special Character</label>
        </div>
      </div>
    </div>
  );
}

export default App;
