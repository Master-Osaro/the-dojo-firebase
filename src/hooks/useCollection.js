import { useEffect, useRef, useState } from "react"
import { projectFirestore } from "../firebase/config"

export const useCollection =(collection,_query, _orderBy)=> {
    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState(null);

    //if we don't use a ref --> infinite loop in react
    //when you wrap a reference type in useRef it doesn't see it as a diff eveluation
    const query = useRef(_query).current
    const orderBy = useRef(_orderBy).current

    useEffect(() => {
      let ref = projectFirestore.collection(collection)

      if (query) {
        ref = ref.where(...query)
      }
      if (orderBy) {
        ref = ref.orderBy(...orderBy)
      }
        
        const unsubscribe = ref.onSnapshot((snapshot)=>{
            let results = []
            snapshot.docs.forEach(doc => {
                results.push({...doc.data(), id: doc.id})
            })

            //update state
            setDocuments(results)
            setError(null)
        }, (error => {
            console.log(error)
            setError('Could not fetch the data')
        }))

        
    
      return () => {
        unsubscribe()
      }
    }, [collection, query])
    return { documents, error }
}