import { useState } from "react";

export default function App() {
  const [userInput, setuserInput] = useState([]);
  const [passNum, setpassNum] = useState([]);

  function handleAddNumber(addNum) {
    const newuserInput = [...userInput, addNum];
    setuserInput(newuserInput);
  }

  function handleTransfer(index) {
    const newuserInput = [...userInput];
    newuserInput.splice(index, 1);
    setuserInput(newuserInput);
    const newpassNum = [...passNum, userInput[index]];
    setpassNum(newpassNum);
  }

  function handleDelete(index) {
    const newpassNum = [...passNum];
    newpassNum.splice(index, 1);
    setpassNum(newpassNum);
  }

function PrepareTable({ numbers, onTransfer }) {
  return (
    <div className="text-black w-1/2">
      <table>
        <thead className="prepare">Now Preparing...</thead>
        <tbody> 
          {numbers.map((number, index) => (
            <tr key={`source-${index}`}>
              <td>{number} 
                <button onClick={() => onTransfer(index)}>
                  ↶
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ServingTable({ numbers, onDelete }) {
  return (
    <div className="text-green-600">
      <table>
        <thead className="serving">Now Serving...</thead>
        <tbody>  
          
          {numbers.map((number, index) => (
            <tr key={`target-${index}`}>
              <td>{number}
                <button onClick={() => onDelete(index)}>
                ✘
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

  return (
    <div className="main">
      <div className="col-12">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const numberInput = event.target.elements.number;
            const addNum = parseInt(numberInput.value, 10);
            numberInput.value = "";
            handleAddNumber(addNum);
          }}
        >
          <label className="numberform">
            <input type="number" name="number" />
          </label>
          <button
            className="ml-2 px-3 py-1 bg-green-500 hover:bg-green-700 text-white rounded"
            type="submit"
          >
            Add
          </button>
        </form>
      </div>
    
    <div className="tables">
      <PrepareTable numbers={userInput} onTransfer={handleTransfer} /> 
      <ServingTable numbers={passNum} onDelete={handleDelete} /> 
      
   </div>
    </div>
  );
}