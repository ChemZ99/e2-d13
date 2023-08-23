const repository = document.getElementById("cardcontainer");

const createcard = function (bookobj) {
  const cardElem = document.createElement("div");
  cardElem.classList.add("col-sm-12");
  cardElem.classList.add("col-md-6");
  cardElem.classList.add("col-lg-4");
  cardElem.classList.add("col-xl-3");
  cardElem.innerHTML = `
    
        <div class="card">
            
            <img src=${bookobj.img} class="card-img-top img-fluid img-size" alt="book photo">
            
                <div class="card-body">
                    <h5 class="card-title text-truncate">${bookobj.title}</h5>
                    <p class="card-text">Category: ${bookobj.category}</p>
                    <p class="card-text">Price: ${bookobj.price}</p>
                    <button onclick="cartAdd(${bookobj.asin})" class="btn btn-primary">Add to Cart</button>
                    <button onclick="deleteCard(event)" class="btn btn-primary">Delete</button>
                </div>
        </div>
    `;
  repository.appendChild(cardElem);
};

const cartAdd = function (asin) {
  fetch("https://striveschool-api.herokuapp.com/books")
    .then(data => data.json())
    .then(bookarr => {
      bookarr.forEach(element => {
        if (element.asin === JSON.stringify(asin)) {
          console.log("success");
          sessionStorage.setItem(`${element.title}`, `${element.asin}`);
        }
      });
    })
    .catch(error => console.log(error));
};

const deleteCard = function (ev) {
  const target = ev.target;
  target.closest(".card").remove();
  console.log("success");
};

fetch("https://striveschool-api.herokuapp.com/books")
  .then(data => data.json())
  .then(bookarr => {
    bookarr
      .forEach(element => {
        createcard(element);
      })
      .catch(error => console.log(error));
  });
