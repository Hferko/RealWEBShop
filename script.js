// itt lesznek a termékek megvalósítása  valódi adatokkal,
// a ShopController, benne a pruduclist konstruktor meghívásával
(function(){
  class ShopController {
    constructor(productList) {
      this.productList = productList;
      this.UITemplate = document.querySelector(".js-product");
      this.ProductListElement = document.querySelector(".js-product-list");
      // a sablont (template) változóban tároljuk
      // így most eltávolíthatjuk a temlate-t web lapról
      this.UITemplate.remove();

      // inicializáljuk a termékeket
      for (let product of this.productList) {
        this._initProduct(product);
      }

      // initialize cart
      this.cartContainer = document.querySelector(".js-cart");
      this.cartUI = new CartView(this.cartContainer);
      this.cart = new CartModel();
    }

    _initProduct(productData) {
      const newProduct = new ProductModel(productData);
      const productInfo = newProduct.getInfo();
      const newProductUI = new ProductView(
        this.UITemplate,
        this.ProductListElement
      );
      newProductUI.setUp(productInfo);
    }
  }

  // Ha ez valós lenne valószínűleg valamilyen adatbázisból 
  //származna valamilyen API -n keresztül,
  // de egyelőre minden termékünk megtalálható ebben a listában:
  const productList = [
    {
      name: "Szolovjov D–30",
      category: " Gázturbina",
      description:
        " szovjet kétáramú gázturbinás sugárhajtómű. Két tengelyes, kétrészes axiálkompresszorral. A kisnyomású kompresszor ötfokozatú, a nagynyomású kompresszor tíz kompresszor-fokozattal rendelkezik.",
      imageSrc: "img/Soloviev_D-30.jpg",
      thumbSrc: "img/IMG_1318.jpg",
      price: 399,
    },

    {
      name: "Bristol Mercury",
      category: " Csillag motor",
      description:
        "Nagy-Britanniában kifejlesztett egykoszorús, mechanikus feltöltővel ellátott kilenc hengeres csillagmotor.",
      imageSrc: "img/BristolMercury.jpg",
      thumbSrc: "img/Bristol_Mercury.jpg",
      price: 148,
    },

    {
      name: "V-46 dízelmotor",
      category: " Harckocsi motor",
      description:
        "12 hengeres motor, Hengerek űrtartalma: 38000 cm3, Teljesítménye: 27979 kW, indítható levegővel, elektromosan akkumulátorról, vagy külső áramforrásról.",
      imageSrc: "img/dvigatelya-v-46.jpg",
      thumbSrc: "img/3.jpg",
      price: 99,
    },

  ];

  // indítsuk el a bolt inicializálását egy új ShopController példány létrehozásával
  const ferkoShop = new ShopController(productList);
})();
