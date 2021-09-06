(function(){

  class PubSub {
    constructor () {
      // termékekkel kapcsolatos információk gyűjtésére:
      this.topics = {};
    }

      // így ellenőrizzük, hogy vannak -e már handler-ek az adott topic-hoz, témához
    hasHandler(topicName) {
      return this.topics.hasOwnProperty(topicName);
    }

    publish (topicName, data) {
      // ha nincs handler az adott témához,
      // nincs tennivaló
      if (!this.hasHandler(topicName)) {
        return;
      } else {
        // ha van handler (kezelőnk)
        // menjünk végig rajtuk és hívjuk meg őket a megadott adatokkal
        this.topics[topicName].forEach((item) => {
          item(data);
        });
      }
    }

    subscribe (topicName, handler) {
      // ha nincs handler(kezelőnk) az adott témához,
      // kezdjük egy lista létrehozásával
      if (!this.hasHandler(topicName)) {
        this.topics[topicName] = [];
      }
      // adja hozzá az új handlert a topic handler-listájához
      this.topics[topicName].push(handler);
    }

    
  } 

  // a script.js így tudja majd használni ezt az egyetlen PubSub példányt
  window.PubSub = new PubSub();

})();