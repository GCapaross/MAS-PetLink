$(document).ready(function(){
    $("#pais").on('change',function(){
        $(".data").hide();
        $("#" + $(this).val()).fadeIn(700);

    }).change();
});


let inputPrecoTotal = $('#total');
let inputQtdTotal = $('#quantidades');
let precoTotal = 0;
let qtdTotal = 0;

// Modified addProduct function to include adding items to the cart
function addProduct(number) {
  let quantidadeProdutoSelecionado = $('#qty' + number);
  quantidadeProdutoSelecionado.val(parseInt(quantidadeProdutoSelecionado.val()) + 1);
  calculate();

  // Add item to the shopping cart
  addItemToCart(number);
}

// New function to add an item to the cart
function addItemToCart(number) {
  // Check if the item is already in the cart
  let itemInCart = $('#cart-item-' + number);
  if (itemInCart.length) {
    // If the item is already in the cart, increase its quantity
    let currentQty = parseInt(itemInCart.find('.cart-item-qty').text());
    itemInCart.find('.cart-item-qty').text(currentQty + 1);
  } else {
    // If the item is not in the cart, add it
    let itemName = $('#name' + number).val();
    let itemPrice = parseFloat($('#price' + number).val()).toFixed(2);

    
    
    let itemHtml = '<div id="cart-item-' + number + '" class="cart-item">';
    itemHtml += '<span class="cart-item-name">' + itemName + '</span>';
    itemHtml += '</br>'
    itemHtml += '<span class="cart-item-price">' + itemPrice + '€' + '</span>';
    itemHtml += '</br>'
    itemHtml += '<span "> Quantidade: </span>';
    itemHtml += '<span class="cart-item-qty">1</span>';
    itemHtml += '</br>'
    itemHtml += '<button class="cart-item-remove" onclick="removeItemFromCart(' + number + ')">Remove</button>';
    itemHtml += '</div>';
    $('#cart').append(itemHtml);
  }
}

// New function to remove an item from the cart
function removeItemFromCart(number) {
  let itemInCart = $('#cart-item-' + number);
  let currentQty = parseInt(itemInCart.find('.cart-item-qty').text());
  if (currentQty > 1) {
    // If the item has a quantity greater than 1, decrease its quantity
    itemInCart.find('.cart-item-qty').text(currentQty - 1);
  } else {
    // If the item has a quantity of 1, remove it from the cart
    itemInCart.remove();
  }
}

function calculate() {
  let precAtual, qtdAtual;
  precoTotal = 0;
  qtdTotal = 0;

  for (let i = 1; i <= 12; i++) {
    precAtual = parseFloat($('#price' + i).val());
    qtdAtual = parseFloat($('#qty' + i).val());
    precoTotal += precAtual * qtdAtual;
    qtdTotal += qtdAtual;
  }



  inputQtdTotal.text(qtdTotal);
  inputPrecoTotal.text(precoTotal.toFixed(2));
}

function valid() {
  if (precoTotal <= 0 && qtdTotal <= 0) {
    alert("Erro o carrinho está vazio");
    return false;
  } else {
    return true;
  }
}

function clean() {
  for (let i = 1; i <= 12; i++) {
    qtdAtual = $('#qty' + i).val(0);
  }
  precoTotal = 0;
  qtdTotal = 0;
  inputPrecoTotal.text("0.00");
  inputQtdTotal.text(0);

  // Clear the shopping cart
  $('#cart').empty();
}

