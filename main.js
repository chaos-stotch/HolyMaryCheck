async function classifyImage(imageElement) {
    const model = await tf.loadGraphModel('model.json', './public');
  
    const img = new Image(180, 180);
    img.src = imageElement.src;
  
    const tensor = tf.browser.fromPixels(img).toFloat();
    const inputTensor = tensor.reshape([-1, 180, 180, 3]);
  
    const prediction = model.predict(inputTensor);
  
    const probabilities = tf.softmax(prediction);
  
    const values = probabilities.dataSync();
  
    const confidenceTipo1 = values[0];
    const confidenceTipo2 = values[1];
  
    const predictedClass = confidenceTipo1 > confidenceTipo2 ? "fatima" : "guadalupe";
  
    // const percentageConfidence = Math.max(confidenceTipo1, confidenceTipo2) * 100;
  
    var apparition_name = document.querySelector('.apparition_name');
    var apparition_imagem = document.querySelector('.apparition_details img');
    var apparition_witness = document.querySelector('.witnesses');
    var apparition_description = document.querySelector('.apparition_details p');
    var apparition_link = document.querySelector('.apparition_details a');
    var learn_more_button = document.querySelector('.Learn_more');
    learn_more_button.style.visibility = 'visible';

    if (predictedClass == 'fatima'){
        apparition_name.textContent = 'Our Lady of Fátima'
        apparition_imagem.src = 'fatima_apparition.jpg'
        apparition_witness.textContent = 'Witness: Lúcia dos Santos, Francisco and Jacinta Marto'
        apparition_link.setAttribute("href", "https://formacao.cancaonova.com/nossa-senhora/devocao-nossa-senhora/a-mensagem-de-fatima-para-o-nosso-tempo/")
        apparition_description.textContent = 'In 1917, Our Lady appeared in Fátima to three children: Lúcia, Francisco and Jacinta, to reveal to the world a message that was significant for that time, but which has not lost its importance in our days. In his book “Light of the World”, Pope Emeritus Benedict XVI said that the message of Fátima helps us “understand a critical moment in history: the one in which all the force of evil that crystallized in the great dictatorships is unleashed and that, otherwise, it still acts today.” These two great dictatorships, Nazism and Communism, which together killed hundreds of millions of people, devastated Europe and Asia, and, after the “fall”, spread their errors throughout the world.'
    } else if (predictedClass == 'guadalupe'){
        apparition_name.textContent = 'Our Lady of Guadalupe'
        apparition_imagem.src = 'guadalupe_apparition.jpeg'
        apparition_witness.textContent = 'Witness: Juan Diego, Juan Bernardino'
        apparition_link.setAttribute("href", "https://santo.cancaonova.com/santo/nossa-senhora-de-guadalupe-a-padroeira-da-america-latina/")
        apparition_description.textContent = 'On a Saturday, in the year 1531, the Blessed Virgin appeared to an indigenous man who, from his village, was walking to Mexico City, in order to participate in catechesis and Holy Mass, while he was on the hill of Tepeyac, near the capital. This converted Indian was called Juan Diego (canonized by Pope John Paul II in 2002).'
    }
  }
  
  const fileInput = document.getElementById('inputFile');
  
  fileInput.addEventListener('change', (event) => {
    const selectedFile = event.target.files[0];
  
    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
  
      const imageElement = document.createElement('img');
      imageElement.src = imageUrl;
  
      classifyImage(imageElement);
    }
});
