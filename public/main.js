var check = document.getElementsByClassName("fa-check");
var trash = document.getElementsByClassName("fa-trash");
var result = document.querySelector('.result')

Array.from(check).forEach(function(element) {
      element.addEventListener('click', function(){
        alert('note saved')
        const name = this.parentNode.parentNode.childNodes[3].innerText
        const author = this.parentNode.parentNode.childNodes[7].innerText
        const notes = this.parentNode.parentNode.childNodes[15].innerText
        const score = this.parentNode.parentNode.childNodes[11].innerText
        console.log(name,author,notes,score)
        fetch('/books/check', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'name': name,
            'author': author,
            'score' : score,
            'notes': notes,
          })
          
        })
        .then(response => {
          if (response.ok) {
          
          return response.json()}
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[3].innerText
        const author = this.parentNode.parentNode.childNodes[7].innerText

        fetch('books', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'name': name,
            'author': author
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});

