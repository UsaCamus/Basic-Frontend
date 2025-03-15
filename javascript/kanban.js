// สร้างแต่ละ Task แบบสุ่มใน 3 swimlane
const attachCard = (card) => {
    const swimlanes = document.querySelectorAll('.swimlane');
    const randomSwimlane = Math.floor(Math.random() * swimlanes.length);

    swimlanes[randomSwimlane].appendChild(card);
}

// สร้าง div card 
const createCard = (index) => {
    const cardElement = document.createElement('div');
    cardElement.className = 'card';
    cardElement.innerText = `Card #${index}`;
    cardElement.draggable = 'true';

    cardElement.addEventListener('dragstart', (e) => {
        e.target.id = 'dragged'; // คลิก card เพื่อสร้าง id
    });

    cardElement.addEventListener('dragend', (e) => {
        e.target.id = undefined; // ปล่อย card เพื่อลบ id เป็น undefined
    });

    attachCard(cardElement);
}

// สร้าง Task เท่าไหร่
const createCards = (amount) => {
    for (let i = 0; i < amount; i++) {
        createCard(i);
    }
}

const addEventListenersToSwimLanes = () => {
    const swimlanes = document.querySelectorAll('.swimlane'); // ค้นหามีกี่ชิ้น

    for (let i = 0; i < swimlanes.length; i++) {
        swimlanes[i].addEventListener('dragover', (e) => {
            e.preventDefault(); // ป้องกันไม่ให้ผ่านตัวอื่น
        });

        swimlanes[i].addEventListener('drop', (e) => {
            e.preventDefault(); //ป้องกันตัวอื่นมา

            const draggedCard = document.querySelector('#dragged'); // หาว่าcardไหนถูกลากอยู่
            draggedCard.parentNode.removeChild(draggedCard); // ลบตัวมันเอง            
            e.currentTarget.appendChild(draggedCard); // ใส่ช่องใหม่
        });
    }
}

createCards(15);
addEventListenersToSwimLanes();