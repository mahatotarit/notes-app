const add_btn = document.querySelector("#add_note_btn");
const main  = document.querySelector(".main");
add_btn.addEventListener("click",function(){
    addnote();
})

const  savenote = () =>{
    const notes  = document.querySelectorAll(".note textarea");
    const data = [];
    notes.forEach (
        (note) =>{
       data.push(note.value);
    })

    if(data.length == 0){
        localStorage.removeItem("notes");
    }else{
        localStorage.setItem("notes",JSON.stringify(data));
    }

}

const addnote = (text = "") =>{
    const note  = document.createElement("div");
    note.classList.add("note");
    note.innerHTML = `
           <div class="toll">
           <i class="save ri-save-2-fill fw-bold fs-4"></i>
           <i class="delete bi bi-trash-fill fw-bold fs-4"></i>
          </div>
          <textarea>${text}</textarea>
    `;

    note.querySelector(".delete").addEventListener("click",function(){
         note.remove();
         savenote();
    })
    note.querySelector(".save").addEventListener("click",function(){
        savenote();
    })
    main.append(note);
    savenote();

    note.querySelector('textarea').addEventListener("focusout",function(){
        savenote();
        console.log("ok");
    })
}

const getnotes = () =>{
    const la_notes = JSON.parse(localStorage.getItem("notes"));
   if(la_notes==null){
     addnote();
   }else{
        la_notes.forEach(
            (lsnotes) => {
            addnote(lsnotes);
        })
   }
}

window.onload = () =>{
    getnotes();
}