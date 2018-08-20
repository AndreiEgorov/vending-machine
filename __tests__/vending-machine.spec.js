const VendingMachine = require("../_lib/vending-machine.js");

describe("VendingMachine", () => {
  (change = {
    toonie: {
      value: 2,
      quantity: 1
    },
    loonie: {
      value: 1,
      quantity: 3
    },
    quarter: {
      value: 0.25,
      quantity: 8
    },
    dime: {
      value: 0.1,
      quantity: 10
    },
    nickel: {
      value: 0.05,
      quantity: 10
    }
  }),
    (changeToResupply = {
      toonie: {
        value: 2,
        quantity: 0
      },
      loonie: {
        value: 1,
        quantity: 0
      },
      quarter: {
        value: 0.25,
        quantity: 0
      },
      dime: {
        value: 0.1,
        quantity: 0
      },
      nickel: {
        value: 0.05,
        quantity: 0
      }
    }),
    (inventory = {
      cola: { price: 1.5, quantity: 5 },
      fanta: { price: 1.5, quantity: 9 },
      pepsi: { price: 1.5, quantity: 0 },
      chips: { price: 2.25, quantity: 4 },
      doritos: { price: 3.5, quantity: 3 },
      gum: { price: 0.5, quantity: 6 },
      candy: { price: 1.2, quantity: 2 },
      jellybeans: { price: 1.1, quantity: 8 }
    });

  inventoryAfterReplacement = {
    cola: { price: 1.5, quantity: 5 },
    pepsi: { price: 1.5, quantity: 10 },
    chips: { price: 2.25, quantity: 4 },
    doritos: { price: 3.5, quantity: 3 },
    gum: { price: 0.5, quantity: 6 },
    candy: { price: 1.2, quantity: 2 },
    jellybeans: { price: 1.1, quantity: 8 },
    rootbeer: { price: 1, quantity: 13 }
  };

  describe("inventory", () => {
    describe("When there is inventory in the machine", () => {
      it("Should print out a list of available inventory", () => {
        expect(
          new VendingMachine(change, inventory).printInventory(inventory)
        ).toEqual(inventory);
      });
    });
    describe("When there is no item", () => {
      it("Should return a message 'Sorry we are out of item'", () => {
        const vendingMachine = new VendingMachine(change, inventory);
        expect(vendingMachine.noItemMessage(5, "pepsi")).toEqual(
          "Sorry we are out of pepsi"
        );
      });
      it("Should refill the item in a slot", () => {
        const vendingMachine = new VendingMachine(change, inventory);
        vendingMachine.refillInventory(5, "pepsi");
        expect(vendingMachine.inventory.pepsi.quantity).toEqual(10);
      });
    });
    describe("When an inventory item needs to be replaced", () => {
      it("Should replace the item with the one provided", () => {
        const vendingMachine = new VendingMachine(change, inventory);
        const newItem = "rootbeer";
        const newItemValues = { price: 1.0, quantity: 13 };

        vendingMachine.replaceItem("fanta", newItem, newItemValues);
        expect(vendingMachine.inventory).toEqual(inventoryAfterReplacement);
      });
    });

    describe("When item is being purchased", () => {
      const vendingMachine = new VendingMachine(change, inventory);
        describe("When cash exceeds $10", () => {
          it("Should should tell that the amt is too big", () => {
            expect(vendingMachine.purchaseItem(20, "doritos")).toEqual(
              "Bills up to $10 dollars are accepted only"
            );
          });
        });
        describe("When item selected is not on sale", () => {
          it("Should should ask for different input", () => {
            expect(vendingMachine.purchaseItem(2, "bounty")).toEqual(
              "Item is not on sale, please make a different selection"
            );
          });
        });

        describe("When even amt of cash is provided and item selected",() => {
            it("Should return an item purchased and give change", ()=>{
                expect(vendingMachine.purchaseItem(3.5,"doritos")).toEqual(
                    "doritos"
                )
            })
        })
        describe("When not enought cash is provided", ()=> {
            it("Should return an error", ()=>{
                expect(vendingMachine.purchaseItem(2,"chips")).toEqual(
                    "The item costs more than you provided"
                )
            })
        })

        describe("When not enought cash is provided", ()=> {
          it("Should return an error", ()=>{
              expect(vendingMachine.purchaseItem(2,"chips")).toEqual(
                  "The item costs more than you provided"
              )
          })
      })
      describe("When  cash is provided and existing item selected", () => {
        it("If there is not enough change, ask for smaller bill", ()=>{
            expect(vendingMachine.purchaseItem(10,"gum",)).toEqual(
                "We don't have enought change, please insert a smaller bill"
            )
        })

        it("Should return an item and change, (return change as coins of different types)", () => {
          expect(vendingMachine.purchaseItem(6, "chips")).toEqual([
            "chips",
            {
              toonie: { quantity: 1 },
              loonie: { quantity: 1 },
              quarter: { quantity: 3 }
            }
          ]);
        });
      });
    });
  });

    describe("change", () => {
      const vendingMachine = new VendingMachine(change, inventory);

      describe("When change type runs out", () => {
        it("Should re-supply change", () => {
          vendingMachine.addMoney(changeToResupply)
          Object.keys(changeToResupply).forEach(key => {
             expect(changeToResupply[key].quantity).toEqual(10)
          })

        });
      });
    });
});
