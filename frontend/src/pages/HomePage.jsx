import { useState, useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import RateLimitedUI from "../components/RateLimitedUI";
import api from "../lib/axio.js";
import  toast  from "react-hot-toast";
import NoteCard from "../components/NoteCard.jsx";
import NotesNotFound from "../components/NotesNotFound.jsx";

const HomePage = () => {
     const [isRateLmited, setIsRateLimited]=useState(false);
     const [notes,setNotes]=useState([]);
     const [loading, setLoading] = useState(true); 

     useEffect(() => {
        const fetchNotes = async () => {
            try {
              const res= await api.get("/notes");
              console.log(res.data);
              setNotes(res.data);
              setIsRateLimited(false);
            } catch (error) {
              console.log("Error fetching notes:");
              console.log(error);
              if (error.response?.status === 429) {
                setIsRateLimited(true);
            } else {
              toast.error("Failed to fetch notes");
            }
            } finally {
              setLoading(false);
            } 
        }; 

        fetchNotes();
     }, []);

   return (
    <div className="min-h-screen">
      

      {isRateLmited && <RateLimitedUI />}

      <div className="mx-auto max-w-7xl p-4 mt-6">
       {loading && <div className="text-center text-primary py-10">Loading notes...</div>}
       
        {notes.length === 0 && !isRateLmited && <NotesNotFound />}


       {notes.length >0 && !isRateLmited && (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {notes.map((note) => (
            <NoteCard key={note._id} note={note} setNotes={setNotes} />
           ) )}
         </div> 
       )
      }
       
       </div>
    </div>
  );
};

export default HomePage;