import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, setDoc, updateDoc, doc, query, orderBy, serverTimestamp } from '@firebase/firestore';
import db from './firebase';
import { IdeasNotepad } from "./IdeasNotepad";

export default function Ideas() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ideasPerPage] = useState(20);

  const collectionRef = collection(db, "ideas");
  const q = query(collectionRef, orderBy("timestamp", "desc"));

  useEffect(() => {
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });

    return () => unsubscribe(); // Cleanup function to unsubscribe from snapshot listener
  }, []);

  const hideIdea = async (idea) => {
    const docRef = doc(db, "ideas", idea.id);
    updateDoc(docRef, { hide: 1 });
  };

  // Get current ideas
  const indexOfLastIdea = currentPage * ideasPerPage;
  const indexOfFirstIdea = indexOfLastIdea - ideasPerPage;
  const currentIdeas = data.slice(indexOfFirstIdea, indexOfLastIdea);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div id='Ideas'>
      <br />
      <details open>
        <summary class="clickable">
          <b style={{ fontSize: '2em' }}>
            💡<u> ideas:</u>
          </b>
        </summary>
        <ul>
          {currentIdeas.map((item) => (
            item.hide === 0 && (
              <li key={item.id}>
                <details style={{ display: 'inline-block' }}>
                  <summary class="clickable">
                    <h3>
                      {item.idea}{' '}
                      <button onClick={() => hideIdea(item)}>×</button>
                    </h3>
                  </summary>
                  <IdeasNotepad
                    dates={item.dates}
                    count={item.count}
                    keyword={item.id}
                    note={item.note}
                  />
                </details>
              </li>
            )
          ))}
        </ul>
      </details>

      <div>
        {/* Pagination */}
        <ul className="pagination">
          {Array(Math.ceil(data.length / ideasPerPage))
            .fill()
            .map((_, index) => (
              <li
                key={index}
                className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                style={{ display: 'inline-block', margin: '0 5px' }}              >
                <a
                  className="page-link clickable"
                  onClick={() => paginate(index + 1)}
                  style={{ textDecoration: currentPage === index + 1 ? 'underline' : 'none' }}
                >
                  {index + 1}
                </a>
              </li>
            ))}
        </ul>
      </div>

    </div>
  );
}
