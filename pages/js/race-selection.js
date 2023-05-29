var activeBlock = undefined;
var fraction = undefined;

// Здесь мы вызываем событие загрузки страницы
document.addEventListener("DOMContentLoaded", function() {
    // Здесь мы к каждому блоку цепляем событие клика
    document.querySelectorAll('.card').forEach(block => block.addEventListener('click', function() {
        // Меняем состояние блока
        changeState(block);
    }));
});

function yesno1(thecheckbox, thelabel) {

    var checkboxvar = document.getElementById(thecheckbox);
    var labelvar = document.getElementById(thelabel);
    if (!checkboxvar.checked) {
    labelvar.innerHTML = "Выключить звуковые эффекты";
    }
    else {
    labelvar.innerHTML = "Включить звуковые эффекты";
    }
}

function yesno2(thecheckbox, thelabel) {

    var checkboxvar = document.getElementById(thecheckbox);
    var labelvar = document.getElementById(thelabel);
    if (!checkboxvar.checked) {
    labelvar.innerHTML = "Выключить музыку";
    }
    else {
    labelvar.innerHTML = "Включить музыку";
    }
}

// Здесь мы меняем состояние блока
function changeState(block) {
    if (activeBlock != undefined) {
        if (block.id == activeBlock.id) {
            return;
        }
    } else {
        activeBlock = document.querySelector('.card');
    }

    // Для текущего активного блока (который станет сейчас неактивным) ставим изображение, что он неактивный
    activeBlock.style.backgroundImage = 'url("/pages/img/card-background.png")';

    if (block.id == 'castle') {
        // Если раса первая, то ставим фон для первой расы
        document.body.style.backgroundImage = 'url("/pages/img/castle.jpg")';
        // Ставим изображение активного блока
        block.style.backgroundImage = 'url("/pages/img/active-card-castle.png")';
        document.getElementById('border').src = '/pages/img/border-castle.png'
        document.getElementById('border-444').srcset = '/pages/img/border-castle-444.png';
        document.getElementById('border-767').srcset = '/pages/img/border-castle-767.png';
        fraction = 'castle';
    } else if (block.id == 'stronghold') {
        // Если раса вторая, то ставим фон для второй расы
        document.body.style.backgroundImage = 'url("/pages/img/stronghold.jpg")';
        // Ставим изображение активного блока
        block.style.backgroundImage = 'url("/pages/img/active-card-stronghold.png")';
        document.getElementById('border').src = '/pages/img/border-stronghold.png';
        document.getElementById('border-444').srcset = '/pages/img/border-stronghold-444.png';
        document.getElementById('border-767').srcset = '/pages/img/border-stronghold-767.png';
        fraction = 'stronghold';
    } else if (block.id == 'tower') {
        // Если раса вторая, то ставим фон для второй расы
        document.body.style.backgroundImage = 'url("/pages/img/tower.jpg")';
        // Ставим изображение активного блока
        block.style.backgroundImage = 'url("/pages/img/active-card-tower.png")';
        document.getElementById('border').src = '/pages/img/border-tower.png';
        document.getElementById('border-444').srcset = '/pages/img/border-tower-444.png';
        document.getElementById('border-767').srcset = '/pages/img/border-tower-767.png';
        fraction = 'tower';
    } else if (block.id == 'inferno') {
        // Если раса вторая, то ставим фон для второй расы
        document.body.style.backgroundImage = 'url("/pages/img/inferno.jpg")';
        // Ставим изображение активного блока
        block.style.backgroundImage = 'url("/pages/img/active-card-inferno.png")';
        document.getElementById('border').src = '/pages/img/border-inferno.png';
        document.getElementById('border-444').srcset = '/pages/img/border-inferno-444.png';
        document.getElementById('border-767').srcset = '/pages/img/border-inferno-767.png';
        fraction = 'tower';
    } else if (block.id == 'dungeon') {
        // Если раса вторая, то ставим фон для второй расы
        document.body.style.backgroundImage = 'url("/pages/img/dungeon.jpg")';
        // Ставим изображение активного блока
        block.style.backgroundImage = 'url("/pages/img/active-card-dungeon.png")';
        document.getElementById('border').src = '/pages/img/border-dungeon.png';
        document.getElementById('border-444').srcset = '/pages/img/border-dungeon-444.png';
        document.getElementById('border-767').srcset = '/pages/img/border-dungeon-767.png';
        fraction = 'dungeon';
    } else if (block.id == 'fortress') {
        // Если раса вторая, то ставим фон для второй расы
        document.body.style.backgroundImage = 'url("/pages/img/fortress.jpg")';
        // Ставим изображение активного блока
        block.style.backgroundImage = 'url("/pages/img/active-card-fortress.png")';
        document.getElementById('border').src = '/pages/img/border-fortress.png';
        document.getElementById('border-444').srcset = '/pages/img/border-fortress-444.png';
        document.getElementById('border-767').srcset = '/pages/img/border-fortress-767.png';
        fraction = 'fortress';
    } else if (block.id == 'citadel') {
        // Если раса вторая, то ставим фон для второй расы
        document.body.style.backgroundImage = 'url("/pages/img/citadel.jpg")';
        // Ставим изображение активного блока
        block.style.backgroundImage = 'url("/pages/img/active-card-citadel.png")';
        document.getElementById('border').src = '/pages/img/border-citadel.png';
        document.getElementById('border-444').srcset = '/pages/img/border-citadel-444.png';
        document.getElementById('border-767').srcset = '/pages/img/border-citadel-767.png';
        fraction = 'citadel';
    } else if (block.id == 'necropolis') {
        // Если раса вторая, то ставим фон для второй расы
        document.body.style.backgroundImage = 'url("/pages/img/necropolis.jpg")';
        // Ставим изображение активного блока
        block.style.backgroundImage = 'url("/pages/img/active-card-necropolis.png")';
        document.getElementById('border').src = '/pages/img/border-necropolis.png';
        document.getElementById('border-444').srcset = '/pages/img/border-necropolis-444.png';
        document.getElementById('border-767').srcset = '/pages/img/border-necropolis-767.png';
        fraction = 'necropolis';
    }
    // Записываем текущий блок, как активный
    activeBlock = block;
}