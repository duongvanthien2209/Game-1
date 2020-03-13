setInterval(() => {
    var value = 50 + Math.round(parseFloat(Math.random()).toFixed(3)*1000/9);
    console.log(value);
}, 1000);