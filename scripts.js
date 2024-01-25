document.addEventListener('DOMContentLoaded', function () {
    // Call calculateRefine when the DOM is fully loaded
    calculateRefine();
});

var chart;

function updateSliderValue(inputId, sliderId) {
    var inputValue = document.getElementById(inputId);
    var sliderValue = document.getElementById(sliderId);
    inputValue.value = sliderValue.value;

    calculateRefine();
}

function calculateRefine() {
    var nibsQuantity = parseFloat(document.getElementById("nibsQuantity").value);
    var butterQuantity = parseFloat(document.getElementById("butterQuantity").value);
    var sugarQuantity = parseFloat(document.getElementById("sugarQuantity").value);

    // Perform the calculation
    var batchWeight = nibsQuantity + butterQuantity + sugarQuantity;
    var chocolateContent = ((nibsQuantity + butterQuantity) / batchWeight) * 100;
    var sugarContent = (sugarQuantity / batchWeight) * 100;
    var butterPercentage = (butterQuantity / batchWeight) * 100;

    // Display the results
    document.getElementById("batchResult").innerText = batchWeight.toFixed(2);
    document.getElementById("butterPercentageResult").innerText = butterPercentage.toFixed(2);
    document.getElementById("sugarContentResult").innerText = sugarContent.toFixed(2);
    document.getElementById("chocolateContentResult").innerText = chocolateContent.toFixed(2);

    updateChart(nibsQuantity, butterQuantity, sugarQuantity);
}

function updateChart(nibsQuantity, butterQuantity, sugarQuantity) {
    if (!chart) {
        var ctx = document.getElementById("contentsChart").getContext("2d");
        chart = new Chart(ctx, {
            type: "pie",
            data: {
                labels: ["Nibs", "Butter", "Sugar"],
                datasets: [
                    {
                        data: [nibsQuantity, butterQuantity, sugarQuantity],
                        backgroundColor: ["#b7410e", "#d69c00", "#e48400"],
                    },
                ],
            },
        });
    } else {
        chart.data.datasets[0].data = [nibsQuantity, butterQuantity, sugarQuantity];
        chart.update();
    }
}