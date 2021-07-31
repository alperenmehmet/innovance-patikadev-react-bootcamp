import productList from './productList';

class BillGatesApp {
  constructor(productArray) {
    //Store your variables that could change somewhere in app
    this.store = {
      products: productArray.map((product) => ({ ...product, amount: 0 })),
      money: Number.MAX_SAFE_INTEGER,
    };

    this.root = document.getElementById('js-root');
    this.cards = document.getElementById('cards');

    this.calculateApp();
  }

  createTotalMoney() {
    const totalMoney = document.createElement('h1');
    totalMoney.classList.add('totalMoney');
    totalMoney.innerText = `Current money ${this.store.money} ₺`;
    return totalMoney;
  }

  calculateApp() {
    //First clean out your element. Otherwise you will have a lots of product card in your page
    this.root.innerHTML = '';
    this.cards.innerHTML = '';
    const products = this.store.products.map((product) =>
      this.createCard(product)
    );
    const totalMoney = this.createTotalMoney();

    this.root.appendChild(totalMoney);

    products.forEach((product) => {
      this.cards.appendChild(product);
    });
    this.root.appendChild(this.cards);
  }

  createCard(product) {
    //With these ways you don't need to write product.id, product.name, product.price ...
    const { money } = this.store;
    const { id, name, price, img, amount } = product;

    //Create basi DOM elements.
    const cardContainer = document.createElement('div');
    const cardTitle = document.createElement('h6');
    const productPrice = document.createElement('h6');
    const cardImg = document.createElement('img');
    const imgDiv = document.createElement('div');
    const addButton = document.createElement('button');
    const possibleAmount = document.createElement('div');

    imgDiv.classList.add('img-div');
    addButton.classList.add('btn');
    cardContainer.classList.add('card');
    possibleAmount.classList.add('possibleAmount');

    cardTitle.innerText = name;
    // event if type of price is a number that way conver it to string.
    productPrice.innerText = `${price} ₺`;
    possibleAmount.innerText = `${Math.floor(money / price)} adet alınabilir`;

    cardImg.src = img;

    addButton.innerText = amount > 0 ? `Adet: ${amount}` : 'Sepete Ekle';
    addButton.addEventListener('click', () => {
      //If the money smaller than price it won't be nothing
      if (money < price) {
        alert('you cant');
        return;
      }
      //Find the product that you pressed the button in products list.
      const productOnStore = this.store.products.find(
        (product) => product.id === id
      );
      //When button clicked increase the amount in the same product
      productOnStore.amount++;
      this.store.money -= productOnStore.price;

      //Trigger calculateApp function which means your root element will be rerender.
      this.calculateApp();
    });

    //Basic DOM append operations
    imgDiv.appendChild(cardImg);
    cardContainer.appendChild(cardTitle);
    cardContainer.appendChild(imgDiv);
    cardContainer.appendChild(productPrice);
    cardContainer.appendChild(addButton);
    cardContainer.appendChild(possibleAmount);

    return cardContainer;
  }
}

//If you want to prevent some execution order problems you can use this method.
//Or just open your index.html and move your javascript script tag to just before closing body tag.
window.addEventListener('DOMContentLoaded', () => {
  new BillGatesApp(productList);
});
