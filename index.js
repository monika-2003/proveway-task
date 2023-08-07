// dummy data for three boxes
const itemArr = [
    {
        id: 1,
        price: 195,
        discount: '50%',
    },
    {
        id: 2,
        price: 345,
        discount: '40%',
        popularTag: 'Most Popular',
        ppPrice: '195.00'
    },
    {
        id: 3,
        price: 528,
        discount: '60%',
    }
]

// select size dropdown
let selectSize = document.createElement('select');
selectSize.classList.add('dropdown')
let sizeOptions = ['S', '6', '7', '8', '9'];
const defaultSizeOption = sizeOptions[0];
defaultSizeOption.selected = true;
for (const option of sizeOptions) {
  const optionElement = document.createElement('option');
  optionElement.textContent = option;
  selectSize.appendChild(optionElement);
}

// select color dropdown
let selectColor = document.createElement('select');
selectColor.classList.add('dropdown')
let colorOptions = ['Colour','Red', 'Blue', 'Black', 'Pink'];
const defaultColourOption = colorOptions[0];
defaultColourOption.selected = true;
for (const option of colorOptions) {
  const optionElement = document.createElement('option');
  optionElement.textContent = option;
  selectColor.appendChild(optionElement);
}

// mapping dummy data and creating elements inside boxes
itemArr.map((ele)=> {

    // creating elements
    let itemContainer = document.createElement('div');
    let radioInput = document.createElement('input');
    let itemDetails = document.createElement('div');
    let productInfo = document.createElement('div');
    let leftContainer = document.createElement('div');
    let pricePerPair = document.createElement('span');
    let rightContainer = document.createElement('div');
    let pairTextContainer = document.createElement('span');
    let priceTextContainer = document.createElement('span');
    let popular = document.createElement('span');
    let discount = document.createElement('span');
    let selectOptionsContainer = document.createElement('div');
    let selectSizeOptions = document.createElement('div');
    let selectColorOptions = document.createElement('div');
    let sizeDDHeading = document.createElement('span');
    let colorDDHeading = document.createElement('span');
    let countContainer = document.createElement('div');

    
    // adding classes to created elements
    itemContainer.classList.add('item');
    radioInput.classList.add('radio__input')
    itemDetails.classList.add('item__details');
    productInfo.classList.add('product__info');
    leftContainer.classList.add('left__side');
    pricePerPair.classList.add('line__through__text')
    rightContainer.classList.add('right__side');
    popular.classList.add('popular__text');
    discount.classList.add(ele?.popularTag ? 'discount__text__sz1' : 'discount__text__sz2');
    selectOptionsContainer.classList.add('options__container')
    selectSizeOptions.classList.add('select__size');
    selectColorOptions.classList.add('select__color');
    countContainer.classList.add('count__container');


    // adding attributes
    radioInput.type = 'radio'
    radioInput.value = 'radio' + ele?.id
    radioInput.name = 'selectPair'

    // creating text nodes
    let pairText = document.createTextNode(ele?.id + ' Pair');
    let priceText = document.createTextNode('DKK ' + parseFloat(ele?.price).toFixed(2));
    let ppPriceText = document.createTextNode('DKK ' + parseFloat(ele?.ppPrice).toFixed(2));
    let popularityText = document.createTextNode(ele?.popularTag)
    let discountPrice = document.createTextNode(ele?.discount + ' OFF')
    let sizeText = document.createTextNode('Size')
    let colorText = document.createTextNode('Colour')

    // appending nodes to parent nodes
    document.getElementById('items__container').appendChild(itemContainer)
    itemContainer.appendChild(radioInput);
    itemContainer.appendChild(itemDetails);
    itemDetails.appendChild(productInfo);
    productInfo.appendChild(leftContainer);
    leftContainer.appendChild(pairTextContainer);
    leftContainer.appendChild(priceTextContainer);
    pairTextContainer.appendChild(pairText)
    priceTextContainer.appendChild(priceText)
    ele?.ppPrice && productInfo.appendChild(pricePerPair)
    pricePerPair.appendChild(ppPriceText);
    productInfo.appendChild(rightContainer);
    ele?.popularTag && rightContainer.appendChild(popular);
    popular.appendChild(popularityText);
    rightContainer.appendChild(discount);
    discount.appendChild(discountPrice);
    itemDetails.appendChild(selectOptionsContainer);
    selectOptionsContainer.appendChild(countContainer);
    selectOptionsContainer.appendChild(selectSizeOptions);
    selectSizeOptions.appendChild(sizeDDHeading);
    sizeDDHeading.appendChild(sizeText);
    selectColorOptions.appendChild(colorDDHeading);
    colorDDHeading.appendChild(colorText);
    selectOptionsContainer.appendChild(selectColorOptions);
    

    for(let i = 1 ; i <= ele?.id ; i++) {
        let selectInputsCount = document.createTextNode('# ' + i);
        let count = document.createElement('span');
        count.appendChild(selectInputsCount);
        countContainer.appendChild(count);
        
        selectSizeOptions.appendChild(selectSize.cloneNode(true))
        selectColorOptions.appendChild(selectColor.cloneNode(true))
    }
    selectOptionsContainer.classList.add('hide')
    
})

document.getElementById('items__container').addEventListener('click', function(e) {
    const itemContainer = e.target.parentElement;
    const optionsContainer = itemContainer.lastChild.lastChild;
    const nextElement = itemContainer.nextElementSibling;
    const previousElement = itemContainer.previousElementSibling;
    const totalPrice = itemContainer.lastChild.firstChild.firstChild.lastChild.textContent;

    if (e.target.tagName === 'INPUT') {
        itemContainer.classList.add('active__div');
        optionsContainer.classList.add('show');

        if(e.target.value === 'radio1') {
            nextElement.classList.remove('active__div');
            nextElement.nextElementSibling.classList.remove('active__div');
            nextElement.lastChild.lastChild.classList.remove('show');
            nextElement.nextElementSibling.lastChild.lastChild.classList.remove('show');
            document.getElementById('total__price').textContent = 'Total : ' + totalPrice
        } 
        else if(e.target.value === 'radio2') {
            previousElement.classList.remove('active__div');
            nextElement.classList.remove('active__div');
            previousElement.lastChild.lastChild.classList.remove('show');
            nextElement.lastChild.lastChild.classList.remove('show');
            document.getElementById('total__price').textContent = 'Total : ' + totalPrice
        } 
        else if(e.target.value === 'radio3') {
            previousElement.classList.remove('active__div');
            previousElement.previousElementSibling.classList.remove('active__div');
            previousElement.lastChild.lastChild.classList.remove('show');
            previousElement.previousElementSibling.lastChild.lastChild.classList.remove('show');
            document.getElementById('total__price').textContent = 'Total : ' + totalPrice
        }
    }
})