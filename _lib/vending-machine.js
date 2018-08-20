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
        return this.inventory;
      }
    });
  }

  addMoney(changeToResupply) {
    Object.keys(changeToResupply).forEach(key => {
      let addingCoins = changeToResupply[key].quantity;
      while (addingCoins < 10) {
        addingCoins++;
      }
      return (changeToResupply[key].quantity += addingCoins);
    });
  }

  purchaseItem(cash, selection) {
    //not fihished. should return change and item
    if (cash > 10) {
      return "Bills up to $10 dollars are accepted only";
    }
    let allItems = [];

    Object.keys(this.inventory).forEach(key => {
      allItems.push(key);
    });

    if (!allItems.includes(selection)) {
      return "Item is not on sale, please make a different selection";
    }
    if (
      allItems.includes(selection) &&
      this.inventory[selection].price === cash
    ) {
      this.inventory[selection].quantity -= 1;
      return selection;
    }
    if (
      allItems.includes(selection) &&
      this.inventory[selection].price > cash
    ) {
      return "The item costs more than you provided";
    }

    let coinAmounts = [];

    Object.keys(this.change).forEach(key => {
      coinAmounts.push(this.change[key].value * this.change[key].quantity);
    });
    let totalChange = coinAmounts.reduce((a, b) => a + b);

    if (totalChange + this.inventory[selection].price < cash) {
      return "We don't have enought change, please insert a smaller bill";
    }
    if (totalChange + this.inventory[selection].price > cash) {
      this.inventory[selection].quantity -= 1;
      let amtOwed = cash - this.inventory[selection].price;
      let changeToReturn = {};

      let amt = 0;
      Object.keys(this.change).forEach(key => {
        let quant = 0;
        while (
          amtOwed >= amt &&
          this.change[key].quantity !== 0 &&
          amtOwed - amt >= this.change[key].value
        ) {
          quant += 1;
          amt += this.change[key].value;
          changeToReturn[key] = { quantity: quant };
          this.change[key].quantity--;
        }
      });
      return [selection, changeToReturn];
    }
  }
}

module.exports = VendingMachine;
