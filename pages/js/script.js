$('.form-registration').find('input').attr('autocomplete', 'off');

$('body').on('click', '.password-control', function () {
    if ($('#exampleInputPassword1').attr('type') == 'password') {
        $(this).addClass('view');
        $('#exampleInputPassword1').attr('type', 'text');
    } else {
        $(this).removeClass('view');
        $('#exampleInputPassword1').attr('type', 'password');
    }
    return false;
});

$('body').on('click', '.password-control2', function () {
    if ($('#exampleInputPassword2').attr('type') == 'password') {
        $(this).addClass('view');
        $('#exampleInputPassword2').attr('type', 'text');
    } else {
        $(this).removeClass('view');
        $('#exampleInputPassword2').attr('type', 'password');
    }
    return false;
});

$('#registration').click(function () {
    let fields = [
        document.querySelector('#loginInput').value,
        document.querySelector('#emailInput').value,
        document.querySelector('#passwordInput').value
    ];
    registrationQuery(fields[0], fields[1], fields[2]);
});

$('#login').click(function () {
    let fields = [
        document.querySelector('#loginInput').value,
        document.querySelector('#passwordInput').value
    ];
    loginQuery(fields[0], fields[1]);
});

(function () {
    // Получите все формы, к которым мы хотим применить пользовательские стили проверки Bootstrap
    var forms = document.querySelectorAll('.needs-validation')

    // Зацикливайтесь на них и предотвращайте отправку
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('click', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
})()

function isNull(data) {
    if (Array.isArray(data)) {
        for (let i = 0; i < data.length; i++) {
            if (data[i] == undefined) {
                return true;
            }
        }
    } else {
        return data == undefined;
    }
    return false;
}

const calcPercents = (currentValue, maxValue) => {
    return `${(currentValue / maxValue) * 100}%`;
}

var owl = $("#owl-demo-2");
if (owl.length) {
    $("#owl-demo-2").owlCarousel({
        loop: true,
        nav: false,
        pagination: true,
        dots: false,
        center: false,
        rewind: false,
        mouseDrag: true,
        touchDrag: true,
        pullDrag: true,
        freeDrag: false,
        margin: 0,
        stagePadding: 0,
        merge: false,
        mergeFit: true,
        startPosition: 0,
        rtl: false,
        smartSpeed: 250,
        fluidSpeed: false,
        dragEndSpeed: false,
        responsive: {
            0: {
                items: 1,
                nav: false,
                loop: false
            },
            560: {
                items: 2,
                nav: false,
                loop: false
            },
            768: {
                items: 3,
                nav: false,
                loop: false
            },
            992: {
                items: 4,
                nav: false,
                loop: false
            },
            1200: {
                items: 4,
                nav: false,
                loop: false
            },
            1300: {
                items: 5,
                nav: false,
                loop: false
            }
        },
        responsiveRefreshRate: 200,
        responsiveBaseElement: window,
        fallbackEasing: "swing",
        info: false,
        nestedItemSelector: false,
        itemElement: "div",
        stageElement: "div",
        refreshClass: "owl-refresh",
        loadedClass: "owl-loaded",
        loadingClass: "owl-loading",
        rtlClass: "owl-rtl",
        responsiveClass: "owl-responsive",
        dragClass: "owl-drag",
        itemClass: "owl-item",
        stageClass: "owl-stage",
        stageOuterClass: "owl-stage-outer",
        grabClass: "owl-grab",
        autoHeight: false,
        lazyLoad: false
    });
}

var owl = $("#owl-demo-3");
if (owl.length) {
    $("#owl-demo-3").owlCarousel({
        animateOut: 'slideOutDown',
        animateIn: 'flipInX',
        center: true,
        nav: true,
        navText: ["<img src='/pages/img/arrow-left.png'>", "<img src='/pages/img/arrow-right.png'>"],
        items: 2,
        loop: true,
        autoWidth: true,
        responsive: {
            600: {
                items: 2
            }
        },
        responsiveRefreshRate: 200,
        responsiveBaseElement: window,
        fallbackEasing: "swing",
        info: false,
        nestedItemSelector: false,
        itemElement: "div",
        stageElement: "div",
        refreshClass: "owl-refresh",
        loadedClass: "owl-loaded",
        loadingClass: "owl-loading",
        rtlClass: "owl-rtl",
        responsiveClass: "owl-responsive",
        dragClass: "owl-drag",
        itemClass: "owl-item",
        stageClass: "owl-stage",
        stageOuterClass: "owl-stage-outer",
        grabClass: "owl-grab",
        autoHeight: false,
        lazyLoad: false
    });
}

$('.select').each(function () {
    const _this = $(this),
        selectOption = _this.find('option'),
        selectOptionLength = selectOption.length,
        selectedOption = selectOption.filter(':selected'),
        duration = 450; // длительность анимации 

    _this.hide();
    _this.wrap('<div class="select"></div>');
    $('<div>', {
        class: 'new-select',
        text: _this.children('option:disabled').text()
    }).insertAfter(_this);

    const selectHead = _this.next('.new-select');
    $('<div>', {
        class: 'new-select__list'
    }).insertAfter(selectHead);

    const selectList = selectHead.next('.new-select__list');
    for (let i = 1; i < selectOptionLength; i++) {
        $('<div>', {
            class: 'new-select__item',
            html: $('<span>', {
                text: selectOption.eq(i).text()
            })
        })
            .attr('data-value', selectOption.eq(i).val())
            .appendTo(selectList);
    }

    const selectItem = selectList.find('.new-select__item');
    selectList.slideUp(0);
    selectHead.on('click', function () {
        if (!$(this).hasClass('on')) {
            $(this).addClass('on');
            selectList.slideDown(duration);

            selectItem.on('click', function () {
                let chooseItem = $(this).data('value');

                $('select').val(chooseItem).attr('selected', 'selected');
                selectHead.text($(this).find('span').text());

                selectList.slideUp(duration);
                selectHead.removeClass('on');
            });

        } else {
            $(this).removeClass('on');
            selectList.slideUp(duration);
        }
    });
});

function renderNews(title, body, image) {
    let news = document.createElement("div");
    news.classList.add("container-news", "justify-content-center", "row");

    let colDiv = document.createElement("div");
    colDiv.classList.add("col-6");

    let imageDiv = document.createElement("div");
    imageDiv.classList.add("block-news");

    let img = document.createElement("img");
    img.src = image;
    img.setAttribute("alt", "news");

    imageDiv.appendChild(img);
    colDiv.appendChild(imageDiv);

    let titleDiv = document.createElement("div");
    titleDiv.classList.add("block-news-title", "col-6");

    let bodyUl = document.createElement("ul");
    bodyUl.classList.add("title-link-list");

    let titleH1 = document.createElement("h1");
    titleH1.classList.add("fresh");
    titleH1.innerText = title;

    let textLi = document.createElement("li");
    textLi.classList.add("title-link-news");
    textLi.innerHTML = body;

    bodyUl.appendChild(titleH1);
    bodyUl.appendChild(textLi);
    titleDiv.appendChild(bodyUl);

    news.appendChild(colDiv);
    news.appendChild(titleDiv);

    document.querySelector(".news>.container").appendChild(news);
}

function renderShopItem(name, price, money_type, image) {
    let item = document.createElement("div");
    item.classList.add("col-lg-4");

    let bodyDiv = document.createElement("div");
    bodyDiv.classList.add("card-fraction", "card");

    let bodyA = document.createElement("a");
    bodyA.href = "#";

    let itemCardDiv = document.createElement("div");
    itemCardDiv.classList.add("card-shop-6", "card-body", "coin-animate", "animate__animated", "animate__fadeInRight");

    let bgCardDiv = document.createElement("div");
    bgCardDiv.classList.add("bg-img-card-border");
    bgCardDiv.innerHTML = '<img src="/pages/img/bg-card-shop.png" alt="bg-card"';

    let imgDiv = document.createElement("div");
    imgDiv.classList.add("bg-img-card");
    imgDiv.innerHTML = `<img src="${image}" alt="item">`;

    let titleDiv = document.createElement("div");
    titleDiv.classList.add("title-card-fraction");

    let titleH1 = document.createElement("h1");
    titleH1.classList.add("title-card", "text-center");
    titleH1.innerText = name;

    titleDiv.appendChild(titleH1);

    let priceDiv = document.createElement("div");
    priceDiv.classList.add("coin-shop", "d-flex");

    let priceP = document.createElement("p");
    priceP.classList.add("coin");
    priceP.innerText = price;

    let priceImg = document.createElement("img");
    priceImg.src = money_type === "common" ? "/pages/img/coin-silver.png" : "/pages/img/coin-gold.png";
    priceImg.setAttribute("alt", money_type);

    priceDiv.appendChild(priceP);
    priceDiv.appendChild(priceImg);

    itemCardDiv.appendChild(bgCardDiv);
    itemCardDiv.appendChild(imgDiv);
    itemCardDiv.appendChild(titleDiv);
    itemCardDiv.appendChild(priceDiv);

    bodyA.appendChild(itemCardDiv);
    bodyDiv.appendChild(bodyA);
    item.appendChild(bodyDiv);
    document.querySelector("#other-items").appendChild(item);
}