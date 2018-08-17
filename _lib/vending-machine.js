class VendingMachine{
    constructor(change, inventory){
        this.change = change
        this.inventory = inventory
    }
    printInventory(inventory){
        return inventory
    

    }
    noItemsMessage(inventory){
        console.log("Sorry no Items left")
    }
    refillInventory(inventory){
        console.log("Have to refill that Item(s)")
    }
    dispenseInventory(inventory, cash){
        consle.log("return item")
    }
}

    console.log("LLODLOD")

module.exports =  VendingMachine