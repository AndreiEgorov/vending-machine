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
        cola:{"price": 1.50,"quantity":10},
        fanta:{"price": 1.50,"quantity":10},
        pepsi:{"price": 1.50,"quantity":10},
        chips:{"price": 1.50,"quantity":10},
        dorito:{"price": 1.50,"quantity":10},
        gum:{"price": 1.50,"quantity":10},
        candy:{"price": 1.50,"quantity":10},
        jellybeans:{"price": 1.50,"quantity":10},
    }

    describe("inventory", ()=>{
        describe("When there is inventory in the machine", ()=>{
            it("Should print out a list of available inventory", ()=>{
              expect(new VendingMachine(change,inventory).printInventory(inventory)).toEqual(inventory)
            })
        })
        // describe("When there is no item", ()=>{
        //     it("Should return a message 'Sorry we are out of item'", ()=>{
        //         const vendingMachine = new VendingMachine(change, inventory)
        //         expect(vendingMachine.noLeftMessage()).toEqual(`Sorry we are out of ${cola}`)
        //     })
        //     it("Should refill the item in a slot", () => {
        //         vendingMachine.refillInventory()
        //         expect(vendingMachine.item.drink.count).toEqual(10)
        //     })
        // })

        // describe("When a change is provided and item selected", ()=> {
        //     it("It should dispense a selected item",()=>{
        //         result = new VendingMachine(change, inventory).printInventory()
        //         expect(result).toEqual(inventory)
        //     })
        // })
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












