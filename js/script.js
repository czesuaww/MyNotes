const addBtn = document.querySelector(".menu__buttons-add");
const saveBtn = document.querySelector(".notePanel__buttons-save");
const cancelBtn = document.querySelector(".notePanel__buttons-cancel");
const deleteBtns = document.getElementsByClassName(
  "noteArea__note-noteHeader-deleteNote"
);
//żywe kolekcje
//gdybyśmy użyli tutaj querySelectonAll to podczas ładowania strony
//pobierze te elementy które mają te kiedy pierwszy raz wejdziemy na strone.
//później jadk dynamicznie będziemy dodawać elementy/notatki, to tych delete note
//będzie więcej. <button class="menu__buttons-delete icon">
//wtedy nie bylibyśmy w stanie wyłapać tych nowych elementów.
//dlatego używamy getElementByClassName - i te elementy się wyłapią
const deleteAllBtn = document.querySelector(".menu__buttons-deleteAll");

const noteArea = document.querySelector(".noteArea");
const notePanel = document.querySelector(".notePanel");
const category = document.querySelector("#category");
const textarea = document.querySelector("#text");
const error = document.querySelector(".notePanel__error");

let selectedValue; //reprezentacja naszego wybranego option. Domyślnie przechowuje 0 - wybierz kategorie -. Możemy sprawdzać dzięki tej zmiennej jaki tekst jest wybrany. Jaka jest jego zawartość albo jaka jest wartosć. 0,1,2,3 itd
let cardID = 1; //przechowuje unikalne ID każdej notatki - jest potrzebne żeby usunąć jakąś notatke.

const openPanel = () => {
  notePanel.style.display = "flex";
};

const closePanel = () => {
  notePanel.style.display = "none";
  error.style.visibility = "hidden";
  textarea.value = "";
  category.selectedIndex = 0;
};

const addNote = () => {
  //sprawdzamy czy textare nie jest pusty i czy option nie jest wybrane 0 - wybierz kategorie -
  if (
    textarea.value !== "" &&
    category.options[category.selectedIndex].value !== "0" // przeszukujemy całą listę rozwijalną no i sprawdzamy czy wybrana przez nas opcja nie ma value 0.
  ) {
    createNote(); //wywołujemy funkcje createNote();
    error.style.visibility = "hidden";
  } else {
    error.style.visibility = "visible";
  }
};

const createNote = () => {
  const newNote = document.createElement("div"); //tworzymy diva.
  newNote.classList.add("noteArea__note"); //nadajemy klase z noteArea__note, to co tworzyłęm wcześniej na sztywno
  newNote.setAttribute("id", cardID); //ustawiamy atrybut id oraz id jakie teraz ma pierwsza notatka
  //za pomocą innerHTML dodajemy tą całą strukture i dynamicznie dodajemy selectedValue, który przechwytuje co teraz wybraliśmy oraz nasze cardID żeby wyświetliło która to notatka stworzona jest
  //oraz jeszcze raz cardID linia 55. jako parametr przekazujemy cardID które kliknęliśmy w option, selected. Przechowywana jest ta cyfra, zależnie co wybraliśmy z opcji. Pobierana jest ta cyfra.
  newNote.innerHTML = ` 
  <div class="noteArea__note-noteHeader">
    <h3 class="noteArea__note-noteHeader-noteTitle">${selectedValue} #${cardID}</h3>
    <button class="noteArea__note-noteHeader-deleteNote icon" onclick="deleteNote(${cardID})"> 
      <i class="fas fa-times"></i>
    </button>
  </div>
  <div class="noteArea__note-noteBody">
    ${textarea.value}
  </div>`;
  //textarea.value = przechwytuje to co wpisane jest w notatce. TO co tam wpiszemy.
  noteArea.appendChild(newNote);
  cardID++;
  textarea.value = "";
  category.selectedIndex = "0";
  notePanel.style.display = "none";
  changeColor(newNote);
};

const selectValue = () => {
  selectedValue = category.options[category.selectedIndex].text;
};

const changeColor = (newNote) => {
  switch (selectedValue) {
    //sprawdza co przechowuje nasza zmienna selectedValue
    case "Shooping":
      newNote.style.backgroundColor = "rgb(67, 121, 46)";
      break;
    case "Work":
      newNote.style.backgroundColor = "rgb(179, 173, 69)";
      break;
    case "Different":
      newNote.style.backgroundColor = "rgb(42, 94, 121)";
      break;
  }
};

const deleteNote = (id) => {
  //przekazujemy tutaj to ID. tę funkcję wywołujemy na onClick w buttonie- linia55. Jak wybraliśmy z listy pierwszą opcję, to argument to będzie 1.TUtaj jest ta cyfra wstawiana.
  const noteToDelete = document.getElementById(id); //pobieramy cały element który ten ID posiada. ID === cardID. Wyszukujemy element który ten ID posiada
  noteArea.removeChild(noteToDelete); // z noteArea usuwamy całą tą notatkę. Jedną.
};

const deleteAllNotes = () => {
  noteArea.textContent = "";
};

addBtn.addEventListener("click", openPanel);
cancelBtn.addEventListener("click", closePanel);
saveBtn.addEventListener("click", addNote);
deleteAllBtn.addEventListener("click", deleteAllNotes);
