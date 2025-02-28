import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid/dist/index.js';

export default function FormBuilder() {
  const [questions, setQuestions] = useState([]);
  const [formLink, setFormLink] = useState(null);

  const addQuestion = (type) => {
    setQuestions([...questions, { id: uuidv4(), type, text: '', options: [] }]);
  };

  const updateQuestion = (id, text) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, text } : q));
  };

  const addOption = (id) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, options: [...q.options, ''] } : q
    ));
  };

  const updateOption = (qId, index, text) => {
    setQuestions(questions.map(q => 
      q.id === qId ? {
        ...q,
        options: q.options.map((opt, i) => i === index ? text : opt)
      } : q
    ));
  };

  const generateFormLink = () => {
    const formId = uuidv4();
    localStorage.setItem(formId, JSON.stringify(questions));
    setFormLink(`${window.location.origin}/form/${formId}`);
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-xl font-bold">Decentralized Form Builder</h1>
      <button onClick={() => addQuestion('text')} className="bg-blue-500 text-white px-4 py-2 m-2 rounded">Add Text Question</button>
      <button onClick={() => addQuestion('multiple-choice')} className="bg-green-500 text-white px-4 py-2 m-2 rounded">Add Multiple Choice</button>
      
      {questions.map((q, index) => (
        <div key={q.id} className="border p-2 my-2">
          <input
            type="text"
            placeholder="Enter question"
            value={q.text}
            onChange={(e) => updateQuestion(q.id, e.target.value)}
            className="border p-1 w-full"
          />
          {q.type === 'multiple-choice' && (
            <div>
              {q.options.map((opt, i) => (
                <input
                  key={i}
                  type="text"
                  placeholder="Option"
                  value={opt}
                  onChange={(e) => updateOption(q.id, i, e.target.value)}
                  className="border p-1 w-full my-1"
                />
              ))}
              <button onClick={() => addOption(q.id)} className="bg-gray-500 text-white px-2 py-1 mt-2">Add Option</button>
            </div>
          )}
        </div>
      ))}
      <button onClick={generateFormLink} className="bg-purple-500 text-white px-4 py-2 rounded">Generate Form</button>
      {formLink && (
        <div className="mt-4">
          <p>Share this link: <a href={formLink} className="text-blue-500 underline">{formLink}</a></p>
        </div>
      )}
    </div>
  );
}
