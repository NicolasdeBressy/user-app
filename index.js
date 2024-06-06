// Tableau vide pour stocker les données d'utilisateurs
let userData = [];

// Fonction asynchrone pour récupérer les données d'utilisateurs depuis l'API
const fetchUser = async () => {
  // Effectue une requête à l'API randomuser.me pour obtenir 24 résultats
  await fetch("https://randomuser.me/api/?results=24")
    .then((res) => res.json()) // Convertit la réponse en format JSON
    .then((data) => (userData = data.results)); // Stocke les résultats dans le tableau userData
  console.log(userData); // Affiche les données dans la console
};

// Fonction asynchrone pour afficher les données d'utilisateurs
const userDisplay = async () => {
  // Appelle la fonction fetchUser pour obtenir les données
  await fetchUser();

  // Fonction pour formater la date
  const dateParser = (date) => {
    let newDate = new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return newDate;
  };

  // Fonction pour calculer le nombre de jours depuis l'enregistrement
  const dayCalc = (date) => {
    let today = new Date();
    let todayTimestamp = Date.parse(today);
    let timestamp = Date.parse(date);

    return Math.ceil((todayTimestamp - timestamp) / 8.64e7);
  };

  // Affiche les données d'utilisateurs dans le corps du document HTML
  document.body.innerHTML = userData
    .map(
      (user) =>
        `
    <div class="card">
      <img src="${user.picture.large}" alt="photo de ${user.name.last}">
      <h3>${user.name.first} ${user.name.last}</h3>
      <p>${user.location.city}, ${dateParser(user.dob.date)}</p>
      <em>Membre depuis : ${dayCalc(user.registered.date)} jours</em>
    </div>
    `
    )
    .join("");
};

// Appelle la fonction pour afficher les données d'utilisateurs
userDisplay();
