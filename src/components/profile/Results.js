import React from 'react'

const Results = ({ results, addBook }) => {

  const resultsList = results.map((resultInfo, i) => {
    const result = resultInfo.volumeInfo;
    return (
      <li key={i} onClick={() => addBook(result)}>
        {result.title}
        <img src={result.imageLinks.smallThumbnail} alt={result.title} />
        <p>{result.authors ? result.authors.join(' ') : null}</p>
      </li>
    )
  });

  return (
    <div className="results">
    <ul>
      {resultsList}
    </ul>
    </div>
  )
}

export default Results
