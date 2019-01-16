import React from 'react'

const Results = ({ results, addItem }) => {

  const resultsList = results.map((resultInfo, i) => {
    const result = resultInfo.volumeInfo;
    return (
      <li key={i} onClick={() => addItem(result)}>
        <p>{result.title}</p>
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
