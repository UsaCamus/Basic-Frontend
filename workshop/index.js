let products = [];
const cart = {};

const updateCart = () => {
    let totalPrice = 0;
    document.querySelector('#cartSummary_items').replaceChildren([]);

    for ( const key of Object.keys(cart)){
        const item = products.find((product) => {
            return `${product.id}` === key;
        });

        const quantity = cart[key];
        const price = item.price;

        const itemRow = document.createElement('tr');

        const itemName = document.createElement('th');
        itemName.innerText = item.title;

        const itemQuantity = document.createElement('td');
        itemQuantity.innerText = quantity;

        const itemPrice = document.createElement('td');
        itemPrice.innerText = '$' + quantity * price;

        const itemDelete = document.createElement('button');
        itemDelete.className = 'DeleteItem';
        itemDelete.innerHTML = 'Delete';

        // เพิ่ม Event Listener ให้กับปุ่ม Delete
        itemDelete.addEventListener('click', () => {
            cart[key]--; // ลดจำนวนสินค้าลง 1
            if (cart[key] === 0) {
                delete cart[key]; // ลบสินค้าออกจากตะกร้าถ้าจำนวนเป็น 0
            }
            updateCart(); // อัพเดตตะกร้าสินค้าที่แสดงผล
        });

        itemRow.append(itemName , itemQuantity , itemPrice , itemDelete);
        document.querySelector('#cartSummary_items').append(itemRow);
        
        totalPrice = totalPrice + price * quantity;
    }
    document.querySelector('#cartSummary_total').innerText = '$' + totalPrice.toFixed(2);
}

const createCard = (product) => {
    const productCard = document.createElement('div');
    productCard.className = 'productCard';

    const productThumbnail = document.createElement('img');
    productThumbnail.className = 'productThumbnail';
    productThumbnail.src = product.thumbnail;

    const productBottomSheet = document.createElement('div');
    productBottomSheet.className = 'productBottomSheet';
    
    const productInfoContainer = document.createElement('div');
    productInfoContainer.className = 'productInfoContainer';

    const productName = document.createElement('strong');
    productName.className = 'productName';
    productName.innerText = product.title;

    const productPrice = document.createElement('div');
    productPrice.className = 'productPrice';
    productPrice.innerText = '$'+product.price;

    const addToCart = document.createElement('button');
    addToCart.className = 'addToCart';
    addToCart.innerText = '+';

    addToCart.addEventListener('click' , () => {
        if(cart[product.id] === undefined) cart[product.id] = 0;
        cart[product.id] = cart[product.id] + 1;
        updateCart();
    });

    productInfoContainer.append(productName , productPrice);
    productBottomSheet.append(productInfoContainer , addToCart);
    productCard.append(productThumbnail , productBottomSheet);

    document.querySelector('#productList').appendChild(productCard);
};

const hookviewCart = () => {
    const viewCartButton = document.querySelector('#viewCart');
    viewCartButton.addEventListener('click' , () => {
        const cartSummary = document.querySelector('#cartSummary');
        const display = cartSummary.style.display;

        if(display === 'none') {
            cartSummary.style.display = 'block';
        }else{
            cartSummary.style.display = 'none';
        }
    });
}

const fetchProduct = () => {
    fetch('https://dummyjson.com/products')
        .then(res => res.json())
        .then((productResponse) => {
            products = productResponse.products;
            // console.log(products);
            products.forEach(product => {
                createCard(product);
            });

        });
}

// for(let i = 0; i <= 10; i++){
//     createCard();
// }
fetchProduct();
hookviewCart();