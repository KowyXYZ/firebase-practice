import { useEffect, useState } from "react";
import Auth from "./components/Auth";

import {auth} from './config/firebase'
import { db } from "./config/firebase";
import { storage } from "./config/firebase";
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { ref, uploadBytes } from "firebase/storage";

function App() {  

  const [movielist, setMovielist] = useState([])


  //new movie state

  const [newMovieTitle, setNewMovieTitle] = useState('')
  const [newReleseDate, setNewReleseDate] = useState(0)
  const [isNewMovieOscar, setisNewMovieOscar] = useState(false)

  //file upload states

  const [fileUpload, setFileUpload] = useState(null)

  const [updateTitle, setUpdateTitle] = useState('')

  const moviesCollectionRef = collection(db, "movies")

  const getMovieList = async() => {
    try {
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
         id:doc.id
      }))
      console.log(filteredData)
      setMovielist(filteredData)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
   

    getMovieList()
  }, [])
  

  const onSubmitMovie = async() => {

    try {
      await addDoc(moviesCollectionRef, 
        {title: newMovieTitle,
           releaseDate: newReleseDate,
            receivedOscar: isNewMovieOscar,
            userId: auth?.currentUser?.uid,
        })
        getMovieList()
    } catch (error) {
      console.log(error)
    }
    
  }
 

  const deleteMovie = async(id) => {
    const moviedoc = doc(db, 'movies', id)
    await deleteDoc(moviedoc)
    getMovieList()
  }


  const updateMovieTitle = async(id) => {
    const moviedoc = doc(db, 'movies', id)
    await updateDoc(moviedoc, {title: updateTitle})
    getMovieList()
  }

  const uploadFile = async() => {
    if(!fileUpload) return
    const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
    try {
      await uploadBytes(filesFolderRef, fileUpload)
    } catch (error) {
      console.log(error)
    }

  }


  return (
    <div className="w-full">
      <Auth/>

      <div className="container mx-auto flex  justify-center items-center my-12 gap-4">
        <input placeholder="movie title" onChange={(e) => setNewMovieTitle(e.target.value)}/>
        <input placeholder="release date" type="number" onChange={(e) => setNewReleseDate(Number(e.target.value))}/>
        <input type="checkbox" checked={isNewMovieOscar} onChange={(e) => setisNewMovieOscar(e.target.checked)}/>
        <label>receivedOscar</label>
        <button className="border-2 border-red" onClick={onSubmitMovie}>Submit </button>
      </div>

      <div className="container mx-auto flex flex-col w-[300px] gap-10">
        {movielist.map((movie,index) => {
          return(
            <div className="flex flex-col justify-center items-center gap-2 border-2 p-2">
              <h1>Name: {movie.title}</h1>
              <p>Release Date: {movie.releaseDate}</p>
              <p>Oscar: {movie.receivedOscar === true ? <span>yep</span> : <span>no</span>}</p>
              <button className="border-2 border-red-600 w-full" onClick={() => deleteMovie(movie.id)}>Delete Movie</button>
              <input className="border-2 w-full text-center" placeholder="new title..." onChange={(e) => setUpdateTitle(e.target.value)}/>
              <button onClick={() => updateMovieTitle(movie.id)} className="border-green-500 border-2 w-full">Update Title</button>
            </div>
          )
        })}
      </div>

      <div className="flex justify-center items-center gap-4 my-12">
        <input type="file" onChange={(e) => setFileUpload(e.target.files[0])}/>
        <button onClick={uploadFile} className="border-2 ">Upload File</button>
      </div>
    </div>
  );
}

export default App;
