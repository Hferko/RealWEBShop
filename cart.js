// Kezdjük egy IIFE -vel, hogy tisztán tartsuk a globális névteret
(function () {
  // UI osztály a felhasználói felület megváltoztatásához
  class CartView {
    // csak egy cart van,
    // így már nem kell klónoznunk egy sablont és
    // a body-hoz fűzni
    constructor(element) {
      // itt csak a cart table-re van szükségünk
      // ahhoz, hogy lehessen sorokat hozzáfűzni,
      // tehát csak egy elem hivatkozás tárolásra:
      this.container = element;
      // iratkozz fel az updateCart topic-ra
      PubSub.subscribe("updateCart", (products) => this.updateCart(products));
    }

    // ez egy "privát" metódus, amelyet más metódusoktól elkülönítve kell használni
    // ezért a _
    _rowTemplate(productData) {
      return `<tr><td>${productData.name}</td><td class="has-text-right">${productData.price}</td></tr>`;
    }

    // készítse el HTML-t a termékadatok és a sablonok alapján
    _buildCartHTML(productList) {
      let cartContent = "";
      for (const product of productList) {
        cartContent += this._rowTemplate(product);
      }
      return cartContent;
    }

    // ez a nyílvános API a felhasználói felület objektumainak cart-jához :
    // methódus a felhasználói felület megváltoztatására, csak a cart table tartalma
    updateCart(products) {
      this.container.innerHTML = this._buildCartHTML(products);
    }
  }

  // így a többi JS fájl is használhatja ezt az osztályt
  window.CartView = CartView;

  // Cart class for adding items to cart
  class CartModel {
    constructor() {
      this.items = [];

      // subscribe to the addToCart topic
      PubSub.subscribe("addToCart", (item) => this.addItem(item));
    }

    // API for Cart object
    addItem(item) {
      this.items.push(item);
      // tegye közzé a frissített elemek listáját, hogy frissítse a Cart topic-ot
      // amikor a cart tartalma frissült
      PubSub.publish("updateCart", this.getItems());
    }
    getItems() {
      return this.items;
    }
  }

  // így a többi JS fájl is használhatja ezt az osztályt
  window.CartModel = CartModel;
})();
