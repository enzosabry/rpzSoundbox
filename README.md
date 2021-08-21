
<img src="https://raw.githubusercontent.com/enzosabry/rpzSoundbox/master/assets/img/logorpz.png" width=200 >

**Sound box non officielle: par des fans pour des fans**

[Google Play Store](https://play.google.com/store/apps/details?id=com.playadev.rpzsoundbox)

[Version web](https://enzosabry.github.io/rpzSoundbox/)

[Twitter](https://twitter.com/Playa_Dev)

# Une image ou un son vous appartient?
Contactez-nous via une Issue ou sur [Discord](https://discord.gg/Ry5qNYJG83), nous la supprimerons.
Ce projet ne contient pas de pub, il est à but non lucratif.

# Tu veux un nouveau son?
Crée une issue sur github ou parle nous sur [Discord!](https://discord.gg/Ry5qNYJG83)

# Tu veux améliorer l'application?
Le projet est en [React Native](https://github.com/facebook/react-native) et utilise [Expo](https://github.com/expo/expo), fais-nous une pull request propre et elle sera certainement acceptée ;)
## Guide de développement
### Ajout de réplique
   - ajouter le fichier audio dans assets/category/[nom du perso], le nom de la réplique est le nom du fichier audio avec des "_" à la place des espaces
   - si il n'y a pas de miniature pour le perso : ajouter une image de **300x300** avec le nom "thumb_0"
   - Avant de push, executer la commande : ``` node src/utils/soundLibrary.js ```
### Deploiment de la version web
   - Executer ``` yarn deploy ```
   - push les fichiers créés
