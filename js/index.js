document.addEventListener("DOMContentLoaded", async function(){
    await loadComponent('../components/header.html', '.header')


    let all_product = await loadData("../data/product.json")
    console.log(all_product)


    const achievements = []


    for(let name in all_product){
        let pr = choice(all_product[name])
        pr["name_pr"] = name
        achievements.push(pr)
    }

    let activeIndex = 0;
    const total = achievements.length;
    const stage = document.getElementById("carousel-stage");
    const dotsContainer = document.getElementById("pagination-dots");

    // 1. Initial Render (Run Once)
    function init() {
    achievements.forEach((item, index) => {
        // Create the card
        const card = document.createElement("div");
        card.className = "carousel-card";
        card.id = `card-${index}`;
        card.onclick = () => {
        activeIndex = index;
        update();
        };

        card.innerHTML = `
        <div class="card-image" style="background-image: url('${item.image}')">
        </div>
        <div class="card-content">
            <div class="card-header">
            <h3>${item.name}</h3>
            <span class="tag-pill">${item.price}</span>
            </div>
            <p>${item.aboutshort}</p>
            <div class="card-footer"><small>${item.name_pr}</small></div>
        </div>
        `;
        stage.appendChild(card);

        // Create the dot
        const dot = document.createElement("div");
        dot.className = "dot";
        dot.id = `dot-${index}`;
        dot.onclick = () => {
        activeIndex = index;
        update();
        };
        dotsContainer.appendChild(dot);
    });

    update(); // First placement
    }

    // 2. The "Update" function (Triggers the smooth transition)
    function update() {
    achievements.forEach((_, index) => {
        const card = document.getElementById(`card-${index}`);
        const dot = document.getElementById(`dot-${index}`);

        // Circular Offset Math
        let offset = index - activeIndex;
        if (offset > Math.floor(total / 2)) offset -= total;
        if (offset < -Math.floor(total / 2)) offset += total;

        // Apply classes based on offset
        let positionClass = "hidden";
        if (offset === 0) positionClass = "active";
        else if (offset === -1) positionClass = "left";
        else if (offset === 1) positionClass = "right";
        else if (offset < -1) positionClass = "far-left";
        else if (offset > 1) positionClass = "far-right";

        card.className = `carousel-card ${positionClass}`;
        dot.className = `dot ${index === activeIndex ? "active" : ""}`;
    });
    }

    // Navigation
    const next = () => {
    activeIndex = (activeIndex + 1) % total;
    update();
    };
    const prev = () => {
    activeIndex = (activeIndex - 1 + total) % total;
    update();
    };

    document.getElementById("next-btn").onclick = next;
    document.getElementById("prev-btn").onclick = prev;

    // Keyboard Support
    window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
    });

    init();
})


// карточки продавців

let sellers = await loadData("../data/sellers.json")
let main = document.querySelector('.main')
for (let i = 0; i < sellers.length; i++) {
    main.innerHTML += `   <div class="wrap wrap--${i+1}">
    <div class="container container--${i+1}">
      <p>${sellers[i].name} <br>${sellers[i].sellers}</p>
    </div>
  </div>`
}

var x;
var $cards = $(".card");
var $style = $(".hover");

$cards
  .on("mousemove touchmove", function(e) { 
    // normalise touch/mouse
    var pos = [e.offsetX,e.offsetY];
    e.preventDefault();
    if ( e.type === "touchmove" ) {
      pos = [ e.touches[0].clientX, e.touches[0].clientY ];
    }
    var $card = $(this);
    // math for mouse position
    var l = pos[0];
    var t = pos[1];
    var h = $card.height();
    var w = $card.width();
    var px = Math.abs(Math.floor(100 / w * l)-100);
    var py = Math.abs(Math.floor(100 / h * t)-100);
    var pa = (50-px)+(50-py);
    // math for gradient / background positions
    var lp = (50+(px - 50)/1.5);
    var tp = (50+(py - 50)/1.5);
    var px_spark = (50+(px - 50)/7);
    var py_spark = (50+(py - 50)/7);
    var p_opc = 20+(Math.abs(pa)*1.5);
    var ty = ((tp - 50)/2) * -1;
    var tx = ((lp - 50)/1.5) * .5;
    // css to apply for active card
    var grad_pos = `background-position: ${lp}% ${tp}%;`
    var sprk_pos = `background-position: ${px_spark}% ${py_spark}%;`
    var opc = `opacity: ${p_opc/100};`
    var tf = `transform: rotateX(${ty}deg) rotateY(${tx}deg)`
    // need to use a <style> tag for psuedo elements
    var style = `
      .card:hover:before { ${grad_pos} }  /* gradient */
      .card:hover:after { ${sprk_pos} ${opc} }   /* sparkles */ 
    `
    // set / apply css class and style
    $cards.removeClass("active");
    $card.removeClass("animated");
    $card.attr( "style", tf );
    $style.html(style);
    if ( e.type === "touchmove" ) {
      return false; 
    }
    clearTimeout(x);
  }).on("mouseout touchend touchcancel", function() {
    // remove css, apply custom animation on end
    var $card = $(this);
    $style.html("");
    $card.removeAttr("style");
    x = setTimeout(function() {
      $card.addClass("animated");
    },2500);
  });