import React from "react";

function AllSolutions({ questions, answers }) {
  return (
    <>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {questions.map((q, index) => {
          const qId = q.id;
          const selectedIndex = answers[qId];

          return (
            <div
              key={qId}
              className="bg-white shadow-lg rounded-xl p-6 border border-gray-200"
            >
              <p className="text-lg font-semibold text-gray-800 mb-4">
                Q{index + 1}: {q.title}
              </p>

              {q.options.map((option, index) => {
                const isCorrect = option.text === q.answer;
                let style = "bg-gray-100 text-gray-700 border border-gray-300";

                if (isCorrect) {
                  style = "bg-green-100 text-green-700 border border-green-300";
                } else if (selectedIndex === index) {
                  style = "bg-red-100 text-red-700 border border-red-300";
                }

                return (
                  <p
                    key={index}
                    className={`px-4 py-2 rounded-md mb-2 ${style}`}
                  >
                    {option.text}
                  </p>
                );
              })}
            </div>
          );
        })}
      </ul>
    </>
  );
}

export default AllSolutions;
