const VendingMachine = require("../_lib/vending-machine.js")

describe("VendingMachine", () => {

   const change = {
        "toonie":{
            "value":2,
            "quantity":10
        }, 
        "loonie":{
            "value":1,
            "quantity":10
        },
        "quarter":{
            "value":0.25,
            "quantity":10
        },
        "dime":{
            "value":0.10,
            "quantity":10
        },
        "nickel": {
            "value":0.05,
            "quantity":10
        }  },

    inventory = {
        "cola":{"price": 1.50,"quantity":5},
        fanta:{"price": 1.50,"quantity":9},
        pepsi:{"price": 1.50,"quantity":0},
        chips:{"price": 2.25,"quantity":4},
        dorito:{"price": 3.50,"quantity":3},
        gum:{"price": 0.50,"quantity":6},
        candy:{"price": 1.20,"quantity":2},
        jellybeans:{"price": 1.10,"quantity":8},
    }
    inventoryAfterReplacement = {
        cola: { price: 1.5, quantity: 5 },
      pepsi: { price: 1.5, quantity: 10 },
      chips: { price: 2.25, quantity: 4 },
      dorito: { price: 3.5, quantity: 3 },
      gum: { price: 0.5, quantity: 6 },
      candy: { price: 1.2, quantity: 2 },
      jellybeans: { price: 1.1, quantity: 8 },
      rootbeer: { price: 1, quantity: 13 } }
   


    describe("inventory", ()=>{
        describe("When there is inventory in the machine", ()=>{
            it("Should print out a list of available inventory", ()=>{
              expect(new VendingMachine(change,inventory).printInventory(inventory)).toEqual(inventory)
            })
        })
        describe("When there is no item", ()=>{
            it("Should return a message 'Sorry we are out of item'", ()=>{
                const vendingMachine = new VendingMachine(change, inventory)
                expect(vendingMachine.noItemMessage(5, "pepsi")).toEqual("Sorry we are out of pepsi")
            })
            it("Should refill the item in a slot", () => {
                const vendingMachine = new VendingMachine(change, inventory)
                vendingMachine.refillInventory(5, "pepsi")
                expect(vendingMachine.inventory.pepsi.quantity).toEqual(10)
            })
        })
            describe("When an inventory item needs to be replaced", () => {
                it("Should replace the item with the one provided", () => {
                    const vendingMachine =  new VendingMachine(change, inventory)
                    const newItem = "rootbeer"
                    const newItemValues = {"price": 1.00,"quantity":13}
                   
                    vendingMachine.replaceItem("fanta",newItem, newItemValues)
                    expect(vendingMachine.inventory).toEqual(inventoryAfterReplacement)
                })
            })
        
        describe("When item is being purchased", ()=> {
           
           describe("When cash exceeds $10", ()=>{
               it("Should should ask for smaller amount", ()=> {
                const vendingMachine = new VendingMachine(change, inventory)
                expect(vendingMachine.purchaseItem).toEqual("Bills up to $10 dollars are accepted only")
               })
           })
        })

    })
    



});


// describe("change", ()=> {
//     describe("When there is no item", ()=> {
//         it("Should return a message 'Sorry we are out of item'", () => {
//             const vendingMachine = new VendingMachine(change, inventory)
//             expect(vendingMachine.noLeftMessage()).toEqual(`Sorry we are out of ${cola}`)
//             vendingMachine.addmoney()
//             expect(vendingMachine.change.dollar.count).toEqual(10)
//         })
//     })
// }),












