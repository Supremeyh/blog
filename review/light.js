
function red() {
    console.log('red');
}
function green() {
    console.log('green');
}
function yellow() {
    console.log('yellow');
}

var light = function(cb, timer){
    return new Promise((resolve,reject) => {
        setTimeout(function(){
            cb()
            resolve()
        }, timer)
    })
}

var step = function(){
    Promise.resolve()
        .then(function(){
            return light(red, 3000)
        })
        .then(function(){
            return light(green, 1000)
        })
        .then(function(){
            return light(yellow, 2000)
        })
        .then(function(){
            step()
        })
        
}

step()

