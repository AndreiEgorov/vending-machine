class VendingMachine {
  constructor(change, inventory) {
    this.change = change;
    this.inventory = inventory;
  }
  printInventory(inventory) {
    return inventory;
  }
  noItemMessage(cash, choice) {
    const selection = this.inventory[choice];
    if (selection.quantity === 0) {
      return `Sorry we are out of ${choice}`;
    }
  }

  refillInventory(cash, choice) {
    Object.keys(this.inventory).forEach(key => {
      if (
        this.inventory[key] === this.inventory[choice] &&
        this.inventory.pepsi.quantity === 0
      ) {
        return (this.inventory.pepsi.quantity += 10);
      }
    });
  }

  replaceItem(removableItem, newItem, newItemValues) {
    Object.keys(this.inventory).forEach(key => {
      if (removableItem === key) {
        delete this.inventory[key];
       this.inventory[newItem] = newItemValues;
       return this.inventory
      }
    });
  }



  purchaseItem(inventory, cash) {
    consle.log("return item");
  }
}

module.exports = VendingMachine;
