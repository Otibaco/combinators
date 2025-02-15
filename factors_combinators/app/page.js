"use client";

import { useState, useEffect } from "react";
import { FaRandom } from "react-icons/fa"; // Import shuffle icon

export default function Home() {
  const [theme, setTheme] = useState("light");
  const [inputs, setInputs] = useState(Array(45).fill(""));
  const [results, setResults] = useState(Array(45).fill(0));
  const [factor, setFactor] = useState(2);
  const [occurrences, setOccurrences] = useState({});

  //theme here
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleThemeToggle = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

    // Function to handle input changes
    const handleInputChange = (index, value) => {
      const newInputs = [...inputs]; // Copy existing inputs
      newInputs[index] = value; // Update specific input value
      setInputs(newInputs); // Update state with new values
    };
  
    // Function to perform the calculation based on user input
    const handleCalculate = () => {
      const numArray = inputs.map((n) => parseInt(n)).filter((n) => !isNaN(n)); // Convert inputs to numbers and filter out invalid values
      if (numArray.length < factor) { // Check if enough numbers are entered
        alert(`Enter at least ${factor} valid numbers.`);
        return;
      }
  
      const resultArray = []; // Array to store calculated results
      let sum = numArray.slice(0, factor).reduce((acc, val) => acc + val, 0); // Initial sum of first 'factor' numbers
      resultArray.push(sum > 90 ? sum % 90 : sum); // Apply modulo operation if sum is greater than 90
  
      for (let i = factor; i < numArray.length; i++) { // Iterate through remaining numbers
        sum += numArray[i];
        resultArray.push(sum > 90 ? sum % 90 : sum);
      }
  
      const newResults = Array(45).fill(0); // Create an array of 45 elements initialized to 0
      for (let i = 0; i < resultArray.length && i < 45; i++) {
        newResults[i] = resultArray[i]; // Store results in new array
      }
      setResults(newResults); // Update state with calculated results
  
      const count = {}; // Object to track occurrences of numbers
      numArray.forEach((n) => {
        count[n] = (count[n] || 0) + 1; // Count how many times each number appears
      });
      setOccurrences(count); // Update state with occurrences
    };
  
    // Function to clear all inputs and results
    const handleClear = () => {
      setInputs(Array(45).fill(""));  // Reset all input fields
      setResults(Array(45).fill(0));  // Reset the results table
      setOccurrences({});  // Reset occurrences
    
      // Force re-render by updating factor (this may help refresh the UI)
      setFactor(2);
    };
    
  // the shuffle function
  const handleShuffle = () => {
    const shuffledInputs = [...inputs].sort(() => Math.random() - 0.5);
    setInputs(shuffledInputs);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white p-8 flex flex-col items-center">
      <div className="w-full flex flex-col items-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Factor Combinator Project</h1>
        <button
          onClick={handleThemeToggle}
          className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white py-2 px-4 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-12 gap-2 mb-8">
        {inputs.map((value, index) => {
          const count = occurrences[value] || 0;
          const borderColor =
            value === ""
              ? "border-gray-300 dark:border-gray-600"
              : count > 1
                ? "border-red-500"
                : "border-green-500";

          return (
            <input
              key={index}
              type="number"
              className={`w-full h-12 text-center border rounded-md dark:bg-gray-800 ${borderColor}`}
              value={value}
              onChange={(e) => handleInputChange(index, e.target.value)}
              placeholder="0"
            />
          );
        })}
      </div>

      <div className="mb-4 flex justify-center items-center w-full max-w-xs sm:max-w-md">
        <label className="mr-4">Choose Factor:</label>
        <select
          className="border border-gray-300 rounded-md p-2 dark:bg-gray-800 dark:border-gray-600"
          value={factor}
          onChange={(e) => setFactor(parseInt(e.target.value))}
        >
          <option value={2}>2-Factor Combination</option>
          <option value={3}>3-Factor Combination</option>
          <option value={4}>4-Factor Combination</option>
        </select>
      </div>

      <div className="flex space-x-4 mb-8">
        <button
          onClick={handleCalculate}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Calculate
        </button>
        <button
          onClick={handleClear}
          className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
        >
          Reset
        </button>
        <button
          onClick={handleShuffle}
          className="bg-purple-500 text-white py-2 px-4 rounded-md flex items-center space-x-2 hover:bg-purple-600"
        >
          <FaRandom />
          <span>Shuffle</span>
        </button>
      </div>

      <div className="flex flex-col lg:flex-row w-full">
        {/* Result Table */}
        <div className="w-full lg:w-3/4 mb-4 lg:mb-0 lg:mr-4 overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600">
            <thead>
              <tr>
                <th
                  className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white p-2 border border-gray-300 dark:border-gray-600"
                  colSpan="12"
                >
                  Result
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: Math.ceil(results.length / 12) }, (_, rowIndex) => (
                <tr key={rowIndex}>
                  {Array.from({ length: 12 }, (_, colIndex) => {
                    const value = results[rowIndex * 12 + colIndex];
                    return (
                      <td
                        key={colIndex}
                        className="border border-gray-300 dark:border-gray-600 text-center p-2 text-sm"
                        style={{ minWidth: "40px" }}
                      >
                        {value || "-"}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Occurrence Box */}
        <div className="w-full lg:w-1/4 bg-white dark:bg-gray-800 p-4 rounded-md shadow-md">
          <h2 className="text-lg font-bold mb-2">Occurrences</h2>
          <ul className="text-sm">
            {Object.entries(occurrences)
              .filter(([_, count]) => count > 1)
              .map(([num, count]) => (
                <li key={num}>
                  {num} → {count} times
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
