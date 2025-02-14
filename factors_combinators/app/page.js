"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [theme, setTheme] = useState("light");
  const [inputs, setInputs] = useState(Array(45).fill(""));
  const [results, setResults] = useState(Array(45).fill(""));
  const [factor, setFactor] = useState(2);

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

  const handleInputChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  const handleCalculate = () => {
    const numArray = inputs.map((n) => parseInt(n)).filter((n) => !isNaN(n));
    if (numArray.length < factor) {
      alert(`Enter at least ${factor} valid numbers.`);
      return;
    }

    const resultArray = [];
    let sum = numArray.slice(0, factor).reduce((acc, val) => acc + val, 0);
    resultArray.push(sum);

    for (let i = factor; i < numArray.length; i++) {
      sum += numArray[i];
      resultArray.push(sum);
    }

    const newResults = Array(45).fill("");
    for (let i = 0; i < resultArray.length && i < 45; i++) {
      newResults[i] = resultArray[i];
    }
    setResults(newResults);
  };

  const handleClear = () => {
    setInputs(Array(45).fill(""));
    setResults(Array(45).fill(""));
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white p-8 flex flex-col items-center">
      {/* Centered Header with Theme Button below */}
      <div className="w-full flex flex-col items-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Factor Combinator Project</h1>
        <button
          onClick={handleThemeToggle}
          className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white py-2 px-4 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
      </div>
      
      <div className="grid grid-cols-5 sm:grid-cols-9 xs:grid-cols-3 gap-2 mb-8">
        {inputs.map((value, index) => (
          <input
            key={index}
            type="number"
            className="w-12 h-12 text-center border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600"
            value={value}
            onChange={(e) => handleInputChange(index, e.target.value)}
            placeholder="0"
          />
        ))}
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
      </div>

      <div className="grid grid-cols-5 sm:grid-cols-9 xs:grid-cols-3 gap-2">
        {results.map((value, index) => (
          <input
            key={index}
            type="text"
            className="w-12 h-12 text-center border border-gray-300 bg-gray-200 rounded-md dark:bg-gray-800 dark:border-gray-600"
            value={value}
            readOnly
          />
        ))}
      </div>
    </div>
  );
}
