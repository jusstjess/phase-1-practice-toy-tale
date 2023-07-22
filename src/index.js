let addToy = false;

function createCardElement(toy) {
  // creates div & sets its class name to "card"
  let toyCard = document.createElement("div");
  toyCard.setAttribute("class", "card");

  //creates h2 element & sets name
  let h2 = document.createElement("h2");
  h2.textContent = toy.name;

  //creates image element & sets image
  let image = document.createElement("img");
  image.src = toy.image;
  image.classList.add("toy-avatar");

  //creates p element & attach amt of likes
  let p = document.createElement("p");
  p.innerText = `${toy.likes} likes`;

  //creates button & sets class  name to "like-btn" & id to toy id number
  let btn = document.createElement("button");
  btn.classList.add("like-btn");
  btn.setAttribute("id", `${toy.id}`);
  btn.innerText = "like";

  //append elements to card div
  toyCard.appendChild(h2);
  toyCard.appendChild(image);
  toyCard.appendChild(p);
  toyCard.appendChild(btn);
  //get toyCollection
  toyCollection = document.getElementById("toy-collection");
  //append card to toyCollection
  toyCollection.appendChild(toyCard);

  const likeButton = document.getElementById(`${toy.id}`);
  likeButton.addEventListener("click", updateLikes);

  function updateLikes() {
    let numberOfLikes = (toy.likes += 1);
    p.innerText = `${numberOfLikes} likes`;

    const data = { likes: numberOfLikes };

    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      // Handle any errors
      .catch((error) => {
        console.log(error);
      });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/toys")
    .then((resp) => resp.json())
    .then((toys) => {
      toys.forEach((toy) => createCardElement(toy));
    });

  const form = document.querySelector("form.add-toy-form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = Object.fromEntries(new FormData(event.target));
    sendItOut(formData);
  });
});
//function for creating a POST request and updating the DOM
function sendItOut(newToy) {
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...newToy,
      likes: 0,
    }),
  })
    .then((response) => response.json())
    //takes the response and passes into our createCardElement function to create a new card for the new Toy
    .then((responseToy) => createCardElement(responseToy));
}

//
//
//

//add event listener to like button

const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
addBtn.addEventListener("click", () => {
  // hide & seek with the form
  addToy = !addToy;
  if (addToy) {
    toyFormContainer.style.display = "block";
  } else {
    toyFormContainer.style.display = "none";
  }
});
