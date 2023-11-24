document.getElementById('date').innerText = new Date().toDateString();

const stocksUrl = 'https://stockprices-qrlnbon4ia-uc.a.run.app';

fetch(stocksUrl)
  .then(response => response.json())
  .then(data => {

    const stocksList = document.createElement('ul');

    data.forEach(stock => {
      const listItem = document.createElement('li');
      listItem.textContent = stock.symbol + " : " + stock.closePrice.toFixed(2) + " : " + stock.priceChange.toFixed(2) + " : " + stock.priceChangePercentage.toFixed(2) ;
      if (stock.priceChange < 0) {
        listItem.classList.add('negative');
      } else {
        listItem.classList.add('positive');
      }
      const lineItem = document.createElement('br');
      stocksList.appendChild(lineItem);
      stocksList.appendChild(listItem);
    });

    const stocksContainer = document.getElementById('matches');
    stocksContainer.innerHTML = ''; // Clear previous content
    stocksContainer.appendChild(stocksList);
  })
  .catch(error => console.error('Error:', error));
