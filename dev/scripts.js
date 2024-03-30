var slider = document.getElementById("slider");
document.getElementById("nib").value = 21.615;

noUiSlider.create(slider, {
    orientation: "vertical",
    direction: "rtl",
    start: [2.1, 75],
    connect: [true, true, false],
    tooltips: [
        wNumb({ suffix: '%', decimals: 2 }),
        wNumb({ suffix: '%', decimals: 1 })
    ],
    range: {
        "min": [0, 0.05],
        "65%": [5],
        "70%": [51, 0.5],
        "max": [100]
    },
    pips: {
        mode: "values",
        values: [0, 1, 2, 3, 4, 50, 75, 100],
        density: 2.5,
        stepped: true,
    }
});
slider.noUiSlider.on('update', function (values, handle) {
    handle === 1 && values[handle] < 50 ? slider.noUiSlider.set([null, 50]) : null;
    handle === 0 && values[handle] > 5 ? slider.noUiSlider.set([5, null]) : null;

    calculate()
});
var pips = slider.querySelectorAll('.noUi-value');
function clickOnPip() {
    var value = Number(this.getAttribute('data-value'));
    slider.noUiSlider.set(value < 10 ? [value, null] : [null, value]);
}
for (var i = 0; i < pips.length; i++) {
    //TODO what the docs say: For this example. Do this in CSS!
    pips[i].style.cursor = 'pointer';
    pips[i].addEventListener('click', clickOnPip);
    if (pips[i].getAttribute('data-value') === '0') {
        pips[i].textContent += '%';
    }
}
function calculate() {
    var sugarContent = 100 - slider.noUiSlider.get(true)[1];
    var butterContent = slider.noUiSlider.get(true)[0];
    var nibQuantity = document.getElementById("nib").value;

    var totalQuantity = 100 * (nibQuantity / (100 - sugarContent - butterContent));
    var sugarQuantity = totalQuantity * (sugarContent / 100);
    var butterQuantity = totalQuantity * (butterContent / 100);

    document.getElementById("total").value = totalQuantity.toFixed(3);
    document.getElementById("sugar").value = sugarQuantity.toFixed(3);
    document.getElementById("butter").value = butterQuantity.toFixed(3);
}

// Validation for nibs input box.
document.getElementById('nib').addEventListener('input', function (e) {
    // Numbers only, one decimal place (optional), three numbers after it (optional)
    var validPattern = /^\d*\.?\d{0,3}$/;

    if (!validPattern.test(e.target.value)) {
        var newValue = e.target.value.substring(0, e.target.value.length - 1);
        e.target.value = newValue;
    }
});

calculate();