new Vue({
    el: '#app',
    data: {
        cart: [],
        showCart: false,
        currentPage:'home',
    },
    methods: {
        dragStart(productName, productPrice) {
            event.dataTransfer.setData('text/plain', JSON.stringify({ name: productName, price: productPrice }));
        },
        dragOver(event) {
            event.preventDefault();
        },
        drop(event) {
            event.preventDefault();
            const droppedData = JSON.parse(event.dataTransfer.getData('text/plain'));
            const existingItem = this.cart.find(item => item.name === droppedData.name);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                this.cart.push({ name: droppedData.name, price: droppedData.price, quantity: 1 });
            }
        },
        getTotal() {
            return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
        },
        removeFromCart(index) {
            if (this.cart[index].quantity > 1) {
                this.cart[index].quantity -= 1;
            } else {
                this.cart.splice(index, 1);
            }
        },
        getQuantity(productName) {
            const item = this.cart.find(item => item.name === productName);
            return item ? item.quantity : 0;
        },
        toggleCart() {
            this.showCart = !this.showCart;
        },
        showpage(page){
            this.currentPage = page
            this.resetContent();
            this.showCart = page === 'payment';
        },
        resetContent() {
            const pages = ['home', 'about', 'contact'];
            pages.forEach((page) => {
                const element = document.getElementById(page);
                if (element) {
                    element.style.display = page === this.currentPage ? 'block' : 'none';
                }
            });

        },
        handlePayment(){
            this.showCart = false;
            this.currentPage = 'paymentsuccessful';
            document.getElementById('feedback').style.display = 'block';
        },
    },
});
