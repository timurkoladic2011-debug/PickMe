document.addEventListener("DOMContentLoaded", function(){
    loadComponent('../components/header.html', '.header')

    
    let all_product = loadData('../data/products.json')
    loadData('../data/products.json').then(function(data){
        all_product = data
    })
    console.log(all_product)
})
