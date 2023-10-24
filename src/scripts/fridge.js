class Fridge {

    constructor(ele) {
        this.ele = ele;
        this.ingredientsModal = document.getElementsByClassName("ing-modal")[0]
        this.ingredientsForm = document.getElementById("ing-form")
        this.ingredientList = document.querySelector('.ingredients');
        this.ingredientItems = ''
        this.button = document.getElementById("clearButton")
        this.button.addEventListener('click', this.clearIngredients.bind(this))
        this.ele.addEventListener('click', this.displayModal.bind(this))
        this.ingredientsForm.addEventListener('submit', this.addIngredient.bind(this))
        this.ingredientList.addEventListener('click', this.deleteIngredient.bind(this))
        this.closeModalButton = document.getElementById("closeIngModal")
        this.closeModalButton.addEventListener('click', this.closeModal.bind(this));
    }

    displayModal() {
            this.ingredientsModal.style.display = "flex" // Show the ingredients page
    };

    closeModal() {
        this.ingredientsModal.style.display = "none"
    };

    //event handler to add to ingredient list 
    addIngredient(e) {
        e.preventDefault();
        let input = document.querySelector("input[name='add-ingredient']");
        let value = input.value;
        if (this.ingredientItems) {
            localStorage.setItem('ingredientList', this.ingredientItems.concat(`, ${value}`));
            this.ingredientItems = localStorage.getItem('ingredientList');
        } else {
            localStorage.setItem('ingredientList', value);
        }
        this.ingredientItems = localStorage.getItem('ingredientList');
    this.updateList();
    this.ingredientsForm.reset()

    }

    
    deleteIngredient(e) {
        e.preventDefault()
        let ele = e.target;
        let itemText = ele.innerText;
        this.ingredientList.removeChild(ele);
        this.ingredientItems = this.ingredientItems.split(', ')
        .filter(item => item !== itemText)
        .join(', ');
    }

    //renders ingredientItems
    updateList() {
        let iL = this.ingredientList
        iL.innerHTML = '';
        this.ingredientItems.split(', ').forEach(function(item) {
            let newEle = document.createElement('li');
            newEle.innerText = item;
            iL.append(newEle);
        });
    }

    clearIngredients() {
        while(this.ingredientList.firstChild) this.ingredientList.removeChild(this.ingredientList.firstChild);
        this.ingredientItems = ""
    }







}

export default Fridge;