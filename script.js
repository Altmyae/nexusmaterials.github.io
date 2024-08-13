document.addEventListener('DOMContentLoaded', () => {
    const trainForm = document.getElementById('train-form');
    const trainResults = document.getElementById('train-results');
    const plotForm = document.getElementById('plot-form');
    const plotResults = document.getElementById('plot-results');
    const predictForm = document.getElementById('predict-form');
    const predictionResult = document.getElementById('prediction-result');

    trainForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const trainData = document.getElementById('train-data').value;
        
        try {
            const response = await fetch('http://127.0.0.1:5000/train', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: trainData
            });
            const result = await response.json();
            trainResults.textContent = `MSE: ${result.mean_squared_error}, MAE: ${result.mean_absolute_error}, R2: ${result.r2_score}`;
        } catch (error) {
            trainResults.textContent = `Error: ${error.message}`;
        }
    });

    plotForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const plotData = document.getElementById('plot-data').value;

        try {
            const response = await fetch('http://127.0.0.1:5000/plot', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: plotData
            });
            const result = await response.json();
            const img = `<img src="data:image/png;base64,${result.plot}" alt="Band Structure Plot"/>`;
            plotResults.innerHTML = img;
        } catch (error) {
            plotResults.textContent = `Error: ${error.message}`;
        }
    });

    predictForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const feature1 = document.getElementById('feature1').value;
        const feature2 = document.getElementById('feature2').value;
        const feature3 = document.getElementById('feature3').value;
        
        const inputData = JSON.stringify({ feature1: parseFloat(feature1), feature2: parseFloat(feature2), feature3: parseFloat(feature3) });

        try {
            const response = await fetch('http://127.0.0.1:5000/predict', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: inputData
            });
            const result = await response.json();
            predictionResult.textContent = `Prediction: ${result.prediction}`;
        } catch (error) {
            predictionResult.textContent = `Error: ${error.message}`;
        }
    });
});
