import { collection, onSnapshot } from '@firebase/firestore';
import React, { useEffect, useState } from 'react';
import db from './firebase';

function Playground() {
    const [data, setData] = useState([{ idea: "Loading...", id: "initial" }]);

    useEffect(
      () =>
        onSnapshot(collection(db, "SDSlog"), (snapshot) =>
          // setColors(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
          // console.log(snapshot.docs.map(doc => doc.data()))
          setData(snapshot.docs.map(doc => doc.data()))
        ),
      []
    );

        return (
            <div>
                <h1>IDK</h1>
                {data.map(item => (
                    <h1>{item.idea}</h1>
                ))}
            </div>
        )
    }

export default Playground;