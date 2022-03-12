import router from '../router'

export function authGuard(to){
    //  fonction permettant la vérification du token 
    // Et pouvoir laisser les utilisateurs entrer dans notre site
    let token = localStorage.getItem('token') 
    if(token){ // si il ya le token dans le localstorage 
        // Alors accesses authoriser 
        return true
    }



    // Si pas de token retour à la page accueil
    router.push({path: '/', query: {returnUrl: to.fullPath}})
    return false
}