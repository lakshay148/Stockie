document.getElementById('date').innerText = new Date().toDateString();

const matchesUrl = 'https://allmatches-qrlnbon4ia-uc.a.run.app/';

fetch(matchesUrl)
  .then(response => response.json())
  .then(data => {
    // Handle the data (update your extension UI, etc.)

    const matchesList = document.createElement('ul');

    data.forEach(match => {
      const listItem = document.createElement('li');
      let scoreLine = '';
      match.score.forEach(score => {
        scoreLine += "\n" + score.inning + " : " + score.r + "/" + score.w + " in " + score.o + " overs"+ "\n";
      });
      listItem.textContent = match.name + " : " + scoreLine;
      const lineItem = document.createElement('br');
      matchesList.appendChild(lineItem);
      matchesList.appendChild(listItem);
    });

    // Append the list to the 'matches' element
    const matchesContainer = document.getElementById('matches');
    matchesContainer.innerHTML = ''; // Clear previous content
    matchesContainer.appendChild(matchesList);
    
  })
  .catch(error => console.error('Error:', error));
