import { collection, onSnapshot } from '@firebase/firestore';
import React, { useEffect, useState } from 'react';
import db from './firebase';
// import firebase from 'firebase/compat/app';

export default function Shit() {
    // useEffect(
    //     () =>
    //       onSnapshot(collection(db, "colors"), (snapshot) =>
    //         // setColors(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    //         console.log(snapshot)
    //       ),
    //     []
    //   );
        // const [SDSlog, setSDSlog] = useState([]);
        // const [loading, setLoading] = useState(false);

        // const ref = firebase.firestore().collection('SDSlog');

        // if(loading) {
        //     return <p>Loading...</p>;
        // }

        return (
            // <div>
                <h1>IDK</h1>
            //     {ref.map((idk) => (
            //         <div key={idk.day}>
            //             {idk.day}
            //         </div>
            //     ))}
            // </div>
        )
    }

