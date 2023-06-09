import { useState, useEffect } from "react";
import { projectAuth, projectStorage, projectFirestore } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";


export const useSignup =()=> {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(null);
  const {dispatch} = useAuthContext()

  const signup = async (email, password, displayName, thumbnail) => {
    setError(null);
    setIsPending(true);

    try {
        const res = await projectAuth.createUserWithEmailAndPassword(email, password);
        console.log(res.user)
        if(!res){
            throw new Error('Could not complete signup')
        }

        //upload user thumbnail
        const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`;
        const img = await projectStorage.ref(uploadPath).put(thumbnail);
        const imgUrl = await img.ref.getDownloadURL()

        //add display name to use it like so
        await res.user.updateProfile({displayName, photoURL: imgUrl})

        //create a user document
        // await projectFirestore.collection('users').doc(res.user.uid) at this point a new user doc with ref is created

        //now we set these data from that document
        await projectFirestore.collection('users').doc(res.user.uid).set({
          online: true,
          displayName,
          photoURL: imgUrl
        })

        //dispatch login action
        dispatch({type: 'LOGIN', payload: res.user})

         //update state
        if(!isCancelled){
          setIsPending(false)
          setError(null)
      }
    } catch (error) {
        //update state
        if(!isCancelled){
          console.log(error.message)
          setError(error.message)
          setIsPending(false)
      }

    }
  }

  useEffect(()=>{
    return () => setIsCancelled(true);
}, [])

  return {error, isPending, signup}
}
