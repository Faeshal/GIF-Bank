document.getElementById("search").addEventListener("click", getGif);

function getLoader() {
  document.getElementById("result").style.display = "none";
  var loading = "";
  loading += `
  <div class="loading mt-4">
  <div class="d-flex mt-4 justify-content-center">
    <div
      class="spinner-border mt-4"
      style="width: 4rem; height: 4rem;"
      role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</div>`;
  document.getElementById("loading").innerHTML = loading;
  document.getElementById("loading").style.display = "block";
  setTimeout(function() {
    document.getElementById("result").style.display = "block";
    document.getElementById("loading").style.display = "none";
  }, 2000);
}

function getGif() {
  var base_url = "https://api.giphy.com/v1/gifs/search?";
  var api_key = "&api_key=2llSOKtoCXEhm80DKkWdaHWDzf4e9PkM";
  var input = document.getElementById("input").value.trim();
  var query = "&q=" + input;
  var limit = "&limit=11";
  var full_url = base_url + api_key + query + limit;

  getLoader();
  fetch(full_url)
    .then(res => res.json())
    .then(gifs => {
      let output = "";
      for (var i = 0; i < gifs.data.length; i++) {
        let credit = gifs.data[i].username;
        if (credit == "") {
          credit = "anonnym";
        }
        output += `
        <div class="card mt-3 border-outline-secondary" display="none">
          <div class="card-header">
          <p class="text-center mb-2 h5 font-weight-bold ">${
            gifs.data[i].title
          }</p>
          <p class="mt-2 h6 text-center">Credit ⭐ ${credit} </p>
          <img class="img-fluid mx-auto d-block mt-1" alt="Responsive image" src=" ${gifs.data[
            i
          ].images.original.url.replace(/^http:\/\//i, "https://")} " >
         </div>
        </div>
        `;
      }
      document.getElementById("result").innerHTML = output;
    })
    .catch(err => console.log(err));
}
